import { Router } from "express";
import { buscarUsuarioPorID, crearUsuario, listarUsuarios, registroUsuario } from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/").post(crearUsuario).get(listarUsuarios)
router.route("/:id").get(buscarUsuarioPorID)
router.route("/registrar").post(registroUsuario)
//router.route("/verificar").post(confirmarCodigoVerificaicon)
//router.route("/reenviar-codigo").post(solicitarNuevoCodigo)
//ver clase 13/07 y completar codigo


export default router;
