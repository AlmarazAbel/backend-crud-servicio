import { Router } from "express";
import {
  agregarAlCarrito,
  obtenerCarrito,
  vaciarCarrito,
} from "../controllers/carrito.controllers.js";
import { authenticate } from "../middleware/authenticator.js";

const router = Router();

router
  .route("/")
  .post(authenticate, agregarAlCarrito)
  .get(authenticate, obtenerCarrito)
  .delete(authenticate, vaciarCarrito);

export default router;
