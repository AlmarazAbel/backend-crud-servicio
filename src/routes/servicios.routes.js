import { Router } from "express";
import { crearServicio, prueba } from "../controllers/servicios.controllers.js";

const router = Router();
//http://localhost:3000/api/servcicios/test
router.route('/test').get(prueba)
router.route('/').post(crearServicio)

export default router