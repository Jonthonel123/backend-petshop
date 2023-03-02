import express from "express";
import {
  crearCategoria,
  listarCategorias,
  buscarCategoriaPorID,
  actualizarCategoria,
  eliminarCategoria,
} from "./controllers/categorias.controller.js";
import { productoRouter } from "./routes/productos.routes.js";
import { grupoRouter } from "./routes/grupo.routes.js";
import { marcaRouter } from "./routes/marca.routes.js";
import { usuarioRouter } from "./routes/usuarios.routes.js";
import { perfilRouter } from "./routes/perfil.routes.js";
import { calendarioRouter } from "./routes/calendarios.routes.js";
import cors from "cors";

const servidor = express();

servidor.use(cors());
// convierte la inf. a  JSON
//midedleware para convertir la inf. entrante a un formato legible
servidor.use(express.json());

servidor.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a mi API",
  });
});

servidor.use(
  productoRouter,
  grupoRouter,
  marcaRouter,
  usuarioRouter,
  perfilRouter,
  calendarioRouter
);

servidor.route("/categorias").post(crearCategoria).get(listarCategorias);
servidor
  .route("/categoria/:id")
  .get(buscarCategoriaPorID)
  .put(actualizarCategoria)
  .delete(eliminarCategoria);

servidor.post("/productos", (req, res) => {
  console.log(req.body);
  res.json({
    message: "Producto creado exitosamente",
  });
});

servidor.listen(5000, () => {
  console.log("Servidor corriendo exitosamente en el puerto 5000");
});
