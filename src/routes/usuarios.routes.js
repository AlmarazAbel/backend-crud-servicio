import { Router } from "express";
import { buscarUsuarioPorID, crearUsuario, listarUsuarios, registroUsuario } from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/").post(crearUsuario).get(listarUsuarios)
router.route("/:id").get(buscarUsuarioPorID)
router.route("/regitro").post(registroUsuario)


export default router;
