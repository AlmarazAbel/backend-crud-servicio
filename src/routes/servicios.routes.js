import { Router } from "express";
import {
  borrarServicioPorID,
  buscarServicioPorID,
  crearServicio,
  editarServicioPorID,
  listarServicios,
  prueba,
} from "../controllers/servicios.controllers.js";
import {
  validacionIDServicio,
  validacionPathServicio,
  validacionServicio,
} from "../middleware/validacionServicio.js";
import { authenticate, isAdmin } from "../middleware/authenticator.js";

const router = Router();
//http://localhost:3000/api/servcicios/test

//get-post-put-patch-delete
router.route("/test").get(prueba);
router.route("/").post([authenticate,isAdmin ,validacionServicio], crearServicio)//ruta privada
.get(listarServicios);
router.route("/:id")
  .get(validacionIDServicio, buscarServicioPorID)
  .delete([authenticate,isAdmin,validacionIDServicio], borrarServicioPorID)//ruta privada
  .put([authenticate,isAdmin,validacionIDServicio, validacionServicio], editarServicioPorID)//ruta privada
  .patch([validacionIDServicio,validacionPathServicio], editarServicioPorID);

export default router;
