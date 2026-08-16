import MercadoPagoConfig from "mercadopago";
import mongoose, { Schema } from "mongoose";

const ordenSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: true,
    },
    items: [
      {
        servicio: {
          type: Schema.Types.ObjectId,
          ref: "servicio",
          required: "true",
        },
        nombreServicio: {
          type: String,
          required: true,
        },
        precioUnitario: {
          type: Number,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    montoTotal: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado", "cancelado"],
      default: "pendiente",
    },
    //id de mercado pago para realizar auditoria
    preferenceId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Orden = mongoose.model('orden', ordenSchema)

export default Orden;