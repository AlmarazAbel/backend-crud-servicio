import {
  MercadoPagoConfig,
  Preference,
  Payment,
} from "mercadopago";

import buscarOcrearCarrito from "../utils/buscarOcrearCarrito.js";
import Orden from "../models/orden.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// ======================================================
// CREAR PREFERENCIA DE PAGO
// ======================================================

export const crearPreferenciaPago = async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar o crear carrito
    const carrito = await buscarOcrearCarrito(userId);

    // Cargar los servicios de los items
    await carrito.populate("items.servicio");

    // Verificar carrito vacío
    if (carrito.items.length === 0) {
      return res.status(400).json({
        mensaje: "El carrito está vacío",
      });
    }

    // ==================================================
    // CREAR ITEMS PARA MERCADO PAGO
    // ==================================================

    let montoTotal = 0;

    const itemsMP = carrito.items.map((item) => {
      const subTotal =
        Number(item.servicio.precio) *
        Number(item.cantidad);

      montoTotal += subTotal;

      return {
        id: item.servicio._id.toString(),
        title: item.servicio.nombreServicio,
        unit_price: Number(item.servicio.precio),
        quantity: Number(item.cantidad),
        currency_id: "ARS",
        picture_url: item.servicio.imagen,
      };
    });

    // ==================================================
    // CREAR ITEMS PARA LA ORDEN
    // ==================================================

    const itemsOrden = carrito.items.map((item) => ({
      servicio: item.servicio._id,
      nombreServicio: item.servicio.nombreServicio,
      precioUnitario: Number(item.servicio.precio),
      cantidad: Number(item.cantidad),
    }));

    // ==================================================
    // CREAR ORDEN
    // ==================================================

    const nuevaOrden = new Orden({
      usuario: userId,
      item: itemsOrden,
      montoTotal,
      estado: "pendiente",
    });

    await nuevaOrden.save();

    console.log("🧾 Orden creada:", nuevaOrden._id);

    // ==================================================
    // CREAR PREFERENCIA DE MERCADO PAGO
    // ==================================================

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: itemsMP,

        // Relacionamos el pago con nuestra orden
        external_reference: nuevaOrden._id.toString(),

        // Webhook
        notification_url:
          `${process.env.BACKEND_URL}/api/pago/webhook`,

        // URLs de retorno
        back_urls: {
          success:
            `${process.env.FRONTEND_URL}/checkout/resultado?status=success`,

          failure:
            `${process.env.FRONTEND_URL}/checkout/resultado?status=failure`,

          pending:
            `${process.env.FRONTEND_URL}/checkout/resultado?status=pending`,
        },

        auto_return: "approved",
      },
    });

    // ==================================================
    // GUARDAR ID DE PREFERENCIA
    // ==================================================

    nuevaOrden.preferenceId = result.id;

    await nuevaOrden.save();

    console.log(
      "💳 Preferencia creada:",
      result.id
    );

    console.log(
      "🔔 Webhook:",
      `${process.env.BACKEND_URL}/api/pago/webhook`
    );

    // ==================================================
    // RESPUESTA AL FRONTEND
    // ==================================================

    return res.status(201).json({
      mensaje:
        "La preferencia de pago fue creada con éxito",

      init_point: result.init_point,

      sandbox_init_point:
        result.sandbox_init_point,

      ordenId: nuevaOrden._id,
    });

  } catch (error) {
    console.error(
      "❌ Error al crear la preferencia:",
      error
    );

    return res.status(500).json({
      mensaje:
        "Ocurrió un error al crear la preferencia de pago",

      error: error.message,
    });
  }
};


// ======================================================
// WEBHOOK MERCADO PAGO
// ======================================================

export const recibirWebhook = async (req, res) => {
  try {
    console.log("\n========================================");
    console.log("🚨 WEBHOOK DE MERCADO PAGO RECIBIDO");
    console.log("========================================");

    console.log("📌 Método:", req.method);

    console.log(
      "📌 Query params:",
      req.query
    );

    console.log(
      "📌 Body:",
      req.body
    );

    // ==================================================
    // OBTENER PAYMENT ID
    // ==================================================

    const paymentId =
      req.query.id ||
      req.query["data.id"] ||
      req.body?.data?.id;

    // ==================================================
    // OBTENER TIPO DE EVENTO
    // ==================================================

    const topicOrType =
      req.query.topic ||
      req.query.type ||
      req.body?.type ||
      req.body?.action;

    console.log(
      "💳 Payment ID:",
      paymentId
    );

    console.log(
      "📨 Tipo de evento:",
      topicOrType
    );

    // ==================================================
    // IGNORAR EVENTOS QUE NO SEAN DE PAGO
    // ==================================================

    if (
      topicOrType !== "payment" &&
      topicOrType !== "payment.created" &&
      topicOrType !== "payment.updated"
    ) {
      console.log(
        "ℹ️ El evento no corresponde a un pago."
      );

      return res.sendStatus(200);
    }

    // ==================================================
    // VERIFICAR PAYMENT ID
    // ==================================================

    if (!paymentId) {
      console.log(
        "⚠️ El webhook no contiene payment ID."
      );

      return res.sendStatus(200);
    }

    // ==================================================
    // CONSULTAR PAGO EN MERCADO PAGO
    // ==================================================

    console.log(
      "🔎 Consultando pago en Mercado Pago..."
    );

    const payment = new Payment(client);

    const pagoData = await payment.get({
      id: paymentId,
    });

    console.log(
      "💰 Datos del pago recibidos:"
    );

    console.log({
      id: pagoData.id,

      status: pagoData.status,

      status_detail:
        pagoData.status_detail,

      external_reference:
        pagoData.external_reference,

      transaction_amount:
        pagoData.transaction_amount,
    });

    // ==================================================
    // VERIFICAR EXTERNAL REFERENCE
    // ==================================================

    if (!pagoData.external_reference) {
      console.log(
        "⚠️ El pago no contiene external_reference."
      );

      return res.sendStatus(200);
    }

    const ordenId =
      pagoData.external_reference;

    // ==================================================
    // SI EL PAGO NO ESTÁ APROBADO
    // ==================================================

    if (pagoData.status !== "approved") {
      console.log(
        `ℹ️ Pago recibido pero todavía no está aprobado. Estado: ${pagoData.status}`
      );

      // Guardamos el paymentId sin aprobar la orden
      await Orden.findByIdAndUpdate(
        ordenId,
        {
          $set: {
            paymentId: paymentId,
          },
        }
      );

      return res.sendStatus(200);
    }

    // ==================================================
    // ACTUALIZACIÓN ATÓMICA DE LA ORDEN
    // ==================================================
    //
    // ESTA ES LA PARTE IMPORTANTE PARA EVITAR
    // QUE DOS WEBHOOKS PROCESEN LA MISMA ORDEN.
    //
    // Solo un webhook puede cambiar:
    //
    // pendiente -> aprobado
    //
    // Si otro webhook llega al mismo tiempo,
    // ya no encontrará una orden pendiente.
    //
    // ==================================================

    console.log(
      "🔄 Intentando aprobar la orden:",
      ordenId
    );

    const ordenActualizada =
      await Orden.findOneAndUpdate(
        {
          _id: ordenId,

          // Solo procesamos órdenes que todavía
          // no están aprobadas
          estado: {
            $ne: "aprobado",
          },
        },
        {
          $set: {
            estado: "aprobado",
            paymentId: paymentId,
          },
        },
        {
          new: true,
        }
      );

    // ==================================================
    // OTRO WEBHOOK YA PROCESÓ LA ORDEN
    // ==================================================

    if (!ordenActualizada) {
      console.log(
        "ℹ️ La orden ya fue procesada anteriormente."
      );

      console.log(
        "🔁 Este webhook es una notificación repetida."
      );

      return res.sendStatus(200);
    }

    // ==================================================
    // ORDEN APROBADA
    // ==================================================

    console.log(
      "✅ PAGO APROBADO"
    );

    console.log(
      "🧾 Orden actualizada:",
      ordenActualizada._id
    );

    console.log(
      "💳 Payment ID:",
      paymentId
    );

    // ==================================================
    // VACIAR CARRITO
    // ==================================================

    try {
      console.log(
        "🛒 Intentando vaciar carrito..."
      );

      // IMPORTANTE:
      // Buscamos nuevamente el carrito después
      // de aprobar la orden.
      //
      // Esto evita trabajar con un documento
      // viejo que pueda haber sido modificado
      // por otra petición.

      const carrito =
        await buscarOcrearCarrito(
          ordenActualizada.usuario
        );

      // En lugar de carrito.save(), utilizamos
      // una actualización atómica de MongoDB.

      await carrito.constructor.findByIdAndUpdate(
        carrito._id,
        {
          $set: {
            items: [],
          },
        },
        {
          new: true,
        }
      );

      console.log(
        "🛒 Carrito vaciado correctamente."
      );

    } catch (errorCarrito) {

      console.error(
        "⚠️ Error al vaciar el carrito:",
        errorCarrito.message
      );

      // La orden ya fue aprobada.
      //
      // No devolvemos 500 porque el pago ya fue
      // procesado correctamente.
    }

    // ==================================================
    // FIN
    // ==================================================

    console.log(
      "🎉 PAGO PROCESADO CORRECTAMENTE"
    );

    console.log(
      "📡 Respondiendo 200 a Mercado Pago."
    );

    return res.sendStatus(200);

  } catch (error) {

    console.error(
      "\n❌❌❌ ERROR EN WEBHOOK ❌❌❌"
    );

    console.error(error);

    console.error(
      "Mensaje:",
      error.message
    );

    return res.status(500).json({
      error: error.message,
    });
  }
};