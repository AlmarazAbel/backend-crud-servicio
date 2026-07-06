import Usuario from "../models/usuarios.js";

export const crearUsuario = async (req, res) => {
  try {
    const usuarioNuevo = new Usuario(req.body)
    await usuarioNuevo.save()
    res.status(201).json({ mensaje: "El usaurio fue creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar crear un usuario",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar crear el usuario",
    });
  }
};

export const buscarUsuarioPorID = async (req, res) => {
  try {
   
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if(!usuarioBuscado){
        return  res.status(404).json({mensaje:'no se encontro un usuario con el id enviado'})
    }
    res.status(200).json(usuarioBuscado)

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar crear el usuario",
    });
  }
};