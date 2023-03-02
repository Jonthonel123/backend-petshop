import { Router } from "express";
import * as controller from "../controllers/marca.controller.js";
import { validarToken } from "../utils/validador.js";

export const marcaRouter = Router();

marcaRouter.get("/marcas", validarToken, controller.listarMarca);
marcaRouter.post("/marcas", validarToken, controller.crearMarca);
marcaRouter.get("/marcas/:id", validarToken, controller.buscarMarcaID);
marcaRouter.put("/marcas/:id", validarToken, controller.actualizarMarca);
marcaRouter.delete("/marcas/:id", validarToken, controller.eliminarMarca);
