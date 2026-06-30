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
  validacionServicio,
} from "../middleware/validacionServicio.js";

const router = Router();
//http://localhost:3000/api/servcicios/test

//get-post-put-patch-delete
router.route("/test").get(prueba);
router.route("/").post(validacionServicio, crearServicio).get(listarServicios);
router.route("/:id")
  .get(validacionIDServicio, buscarServicioPorID)
  .delete(validacionIDServicio, borrarServicioPorID)
  .put([validacionIDServicio, validacionServicio], editarServicioPorID)
  .patch(validacionIDServicio, editarServicioPorID);

export default router;
