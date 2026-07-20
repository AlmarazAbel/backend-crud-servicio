import Usuario from "../models/usuarios.js";
import { transporter } from "../utils/mailer.js";


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

export const registroUsuario = async (req,res)=>{
  try {
    const {nombre, email, password, rol}=req.body;
    //verificar si el mail existe
    //const usuarioExistente = await Usuario.findOne({email:req.boy.email})
    const usuarioExistente = await Usuario.findOne({email})
    if(usuarioExistente){
      return res.status(409).json({mensaje:'El mail ya esta registrado'})
    }
// generar el codigo de verificacion y tiempo d expiracion
const codigoVerificacion = Math.floor(
  100000 + Math.random() * 900000
).toString();

const tiempoExpiracion = new Date(Date.now() + 15 *60 *1000)// el tiempo configurado son 15`

//preparar los datos para la BD

const datosUsuarios ={

  nombre,
  email,
  password,
  verificationCode: codigoVerificacion,
  verificationExpires: tiempoExpiracion
}
if(rol && rol.trim()!=="" ){
datosUsuarios.rol= rol
}

const nuevoUsuario =await Usuario.create(datosUsuarios)
//enviar el correo con el codigo de verificacion
await transporter.sendMail({
      from: '"Crud Servicios" <no-reply@crud-servicios.com>',
      to: email,
      subject: "🔑 Código de Verificación de Cuenta",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">¡Hola, ${nombre}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Gracias por registrarte. Para activar tu cuenta y poder ingresar a la plataforma, por favor utiliza el siguiente código de verificación:
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 4px; color: #007bff;">
            ${codigoVerificacion}
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este código vencerá en 15 minutos. Si no solicitaste este registro, puedes ignorar este correo de forma segura.
          </p>
        </div>
      `
    });
    //envaimos la respuesta al frontend
return res.status(201).json({
  mensaje: "Usuario registrado correctamente. Revisa tu correo para verificar tu cuenta."
});

//---------------
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "ocurrio un error al intentar registrarar un usuario",
    });
  }
}