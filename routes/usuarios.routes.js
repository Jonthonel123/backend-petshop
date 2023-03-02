import { Router } from "express";
import * as controller from "../controllers/usuarios.controller.js";

export const usuarioRouter = Router();

usuarioRouter.route("/registro").post(controller.registroUsuario);

usuarioRouter.route("/login").post(controller.login);
