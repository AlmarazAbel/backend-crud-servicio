import { Router } from "express";
import { buscarUsuarioPorID, confirmarCodigoVerificacion, crearUsuario, listarUsuarios, login, logout, obtenerPerfil, registroUsuario, solicitarNuevoCodigo } from "../controllers/usuarios.controllers.js";
import { authenticate, isAdmin } from "../middleware/authenticator.js";

const router = Router();

router.route("/").post(crearUsuario).get([authenticate,isAdmin],listarUsuarios)//ruta privada

router.route("/registrar").post(registroUsuario)
router.route("/verificar").post(confirmarCodigoVerificacion)
router.route("/reenviar-codigo").post(solicitarNuevoCodigo)
router.route("/login").post(login)
router.route("/logout").post(authenticate,logout)
//ruta privada
router.route("/perfil").get(authenticate, obtenerPerfil)
router.route("/:id").get(buscarUsuarioPorID)

export default router;
