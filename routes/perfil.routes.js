import { Router } from "express";
import * as controller from "../controllers/perfil.controlle.js";
import { validarToken } from "../utils/validador.js";

export const perfilRouter = Router();

perfilRouter.get("/perfil", validarToken, controller.listarPerfiles);
perfilRouter.post("/perfil", validarToken, controller.crearPerfil);
