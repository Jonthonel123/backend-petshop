import { Router } from "express";
import * as controller from "../controllers/calendarios.controller.js";
import { validarToken } from "../utils/validador.js";

export const calendarioRouter = Router();

calendarioRouter.get(
  "/calendarios",
  validarToken,
  controller.retornarCalendarios
);
