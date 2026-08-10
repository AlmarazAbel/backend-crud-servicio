import { Router } from "express";
import {
  agregarAlCarrito,
  eliminarServicio,
  obtenerCarrito,
  restarCantidadServicio,
  vaciarCarrito,
} from "../controllers/carrito.controllers.js";
import { authenticate } from "../middleware/authenticator.js";

const router = Router();

router
  .route("/")
  .post(authenticate, agregarAlCarrito)
  .get(authenticate, obtenerCarrito)
  .delete(authenticate, vaciarCarrito);
router
  .route("/restar/:servicioId")
  .patch(authenticate,restarCantidadServicio)
  router  
  .route("/servicio/:servicioId").delete(authenticate,eliminarServicio)

export default router;
