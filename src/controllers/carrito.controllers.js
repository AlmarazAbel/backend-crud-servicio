import Servicio from "../models/servicios.js";
import buscarOcrearCarrito from "../utils/buscarOcrearCarrito.js";

export const agregarAlCarrito = async (req, res) => {
  try {
    //todo:agregar validacion a los datos del body
    const { servicio, cantidad } = req.body;
    const usuarioId = req.user.id;

    const servicioExistente = await Servicio.findById(servicio);
    if (!servicioExistente) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro el servicio enviado" });
    }
    //buscar o crear el usuario para el carrito
    const carrito = await buscarOcrearCarrito(usuarioId);
    //buscar si el servicio ya esta en el carrito
    const itemIndex = carrito.items.findIndex(
      (item) => item.servicio.toString() === servicio,
    );
    //verificar si encontro el indice del servicio
    if (itemIndex > -1) {
      //incremento la cantidad en el servicio
      carrito.items[itemIndex].cantidad += cantidad;
    } else {
      //agregar el servicio y la cantidad al carrito
      carrito.items.push({
        servicio: servicio,
        cantidad: cantidad,
      });
    }
    //guardar los cambios del carrito
    carrito.save();

    await carrito.populate("items.servicio", "nombreServicio precio imagen");
    res
      .status(201)
      .json({ mensaje: "Servicio agregado correctamente", carrito });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al agregar un servicio al carrito" });
  }
};
