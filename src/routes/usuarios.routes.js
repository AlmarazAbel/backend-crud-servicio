import { Router } from "express";
import { buscarUsuarioPorID, confirmarCodigoVerificacion, crearUsuario, listarUsuarios, login, registroUsuario, solicitarNuevoCodigo } from "../controllers/usuarios.controllers.js";
import { authenticate } from "../middleware/authenticator.js";

const router = Router();

router.route("/").post(crearUsuario).get(listarUsuarios)

router.route("/registrar").post(registroUsuario)
router.route("/verificar").post(confirmarCodigoVerificacion)
router.route("/reenviar-codigo").post(solicitarNuevoCodigo)
router.route("/login").post(login)
//ruta privada
router.route("/perfil").get(authenticate,(req,res)=>{
    res.status(200).json({mensaje:'bienvenido al perfil'})
})
router.route("/:id").get(buscarUsuarioPorID)

export default router;
