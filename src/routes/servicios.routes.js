import { Router } from "express";
import { borrarServicioPorID, buscarServicioPorID, crearServicio, editarServicioPorID, listarServicios, prueba } from "../controllers/servicios.controllers.js";
import { validacionServicio } from "../middleware/validacionServicio.js";

const router = Router();
//http://localhost:3000/api/servcicios/test

//get-post-put-patch-delete
router.route('/test').get(prueba)
router.route('/').post(validacionServicio,crearServicio).get(listarServicios)
router.route('/:id').get(buscarServicioPorID).delete(borrarServicioPorID).put(editarServicioPorID).patch(editarServicioPorID)

export default router
