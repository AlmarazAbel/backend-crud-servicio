import { Router } from "express";
import { crearPreferenciaPago, recibirWebhook } from "../controllers/pago.controllers.js";
import { authenticate } from "../middleware/authenticator.js";


const router = Router();

router
  .route("/crear-preferencia").post(authenticate,crearPreferenciaPago)
 //enpoint publico de mercado pago
 router.route("/webhook").post(recibirWebhook);

export default router;
