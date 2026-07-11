import { Router } from "express";
import { buscarUsuarioPorID, crearUsuario, listarUsuarios } from "../controllers/usuarios.controllers.js";

const router = Router();

router.route("/").post(crearUsuario).get(listarUsuarios)
router.route("/:id").get(buscarUsuarioPorID)
router.route()


export default router;
