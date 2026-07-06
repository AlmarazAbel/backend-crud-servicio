import Servicio from "../models/servicios.js";

export const prueba = (req, res) => {
  const vehiculos = ["🏎️", "🚗", "🚕"];

  res.json({
    mensaje: "Bienvenidos a nuestro backend",
    vehiculos,
  });
};

export const crearServicio = async (req, res) => {
  try {
    const servicioNuevo = new Servicio(req.body);
    await servicioNuevo.save();

    //luego agregamos la validacion
    res.status(201).json({ mensaje: "El servicio fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar crear el servicio",
    });
  }
};

export const listarServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.status(200).json(servicios)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar crear el servicio",
    });
  }
};

export const buscarServicioPorID = async (req, res) => {
  try {
   
    const servicioBuscado = await Servicio.findById(req.params.id);
    if(!servicioBuscado){
        return  res.status(404).json({mensaje:'no se encontro un servicio con el id enviado'})
    }
    res.status(200).json(servicioBuscado)

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar crear el servicio",
    });
  }
};
export const borrarServicioPorID = async (req, res) => {
  try {
    
    const servicioBorrado = await Servicio.findByIdAndDelete(req.params.id);
    if(!servicioBorrado){
        return  res.status(404).json({mensaje:'no se encontro un servicio con el id enviado'})
    }
    res.status(200).json({mensaje:'El servicio se borro correctamente'})

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar eliminar un  servicio por id",
    });
  }
};
export const editarServicioPorID = async (req, res) => {
  try {
    
    const servicioEditado = await Servicio.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!servicioEditado){
        return  res.status(404).json({mensaje:'no se encontro un servicio con el id enviado'})
    }
    res.status(200).json({mensaje:'El servicio se actualizo  correctamente',servicio:servicioEditado})

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar editar un  servicio por id",
    });
  }
};
