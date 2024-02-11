import { Router } from "express";
import {
  sendRecoveryEmail
} from "../controllers/email.controller"; // Asegúrate de importar los controladores de usuarios

const router = Router();

router.post("/send-email", sendRecoveryEmail);

export default router;
