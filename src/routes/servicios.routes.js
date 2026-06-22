import { Router } from "express";
import { crearServicio, listarServicios, prueba } from "../controllers/servicios.controllers.js";

const router = Router();
//http://localhost:3000/api/servcicios/test

//get-post-put-patch-delete
router.route('/test').get(prueba)
router.route('/').post(crearServicio).get(listarServicios)

export default router
