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
    res.status(201).json({mensaje:'El servicio fue creado correctamente'})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar crear el servicio",
    });
  }
};
