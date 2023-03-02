import { Router } from "express";
import * as controller from "../controllers/grupo.controller.js";
import { validarToken } from "../utils/validador.js";

export const grupoRouter = Router();

grupoRouter.get("/grupos", validarToken, controller.listarGrupo);
grupoRouter.post("/grupos", validarToken, controller.crearGrupo);
grupoRouter.get("/grupos/:id", validarToken, controller.buscarGrupoID);
grupoRouter.put("/grupos/:id", validarToken, controller.actualizarGrupo);
grupoRouter.delete("/grupos/:id", validarToken, controller.eliminarGrupo);
