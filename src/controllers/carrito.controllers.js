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

export const obtenerCarrito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const carrito = await buscarOcrearCarrito(usuarioId);

    await carrito.populate("items.servicio", "nombreServicio imagen precio");

    res.status(200).json({ mensaje: carrito });
  } catch (error) {
    console.error(error);
    res.status(500).jsom({ mensaje: "Ocurrio un error al obtener un carrito" });
  }
};

export const vaciarCarrito = async(req,res)=>{
    try {
    const userId= req.user.id
    //obtener el carrito
    const carrito = await buscarOcrearCarrito(userId)
    //vaciar los elementos del carrito
    carrito.items = []
    //guardar los cambios del carrito en  la base de datos
    await carrito.save()

    res.status(200).json({mensaje:'el carrito fue vaciado con exito',carrito})

  } catch (error) {
    console.error(error);
    res.status(500).jsom({ mensaje: "Ocurrio un error al obtener un carrito" });
  } 
}