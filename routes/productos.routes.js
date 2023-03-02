import { Router } from "express";
import * as controller from "../controllers/productos.controller.js";
import { validarToken } from "../utils/validador.js";

export const productoRouter = Router();

productoRouter.get("/productos", validarToken, controller.listarProducto);
productoRouter.post("/productos", validarToken, controller.crearProducto);
productoRouter.get("/productos/:id", validarToken, controller.buscarProductoID);
productoRouter.put(
  "/productos/:id",
  validarToken,
  controller.actualizarProducto
);
productoRouter.delete(
  "/productos/:id",
  validarToken,
  controller.eliminarProducto
);
productoRouter.post(
  "/toggle-productos/:id",
  validarToken,
  controller.toggleProducto
);
