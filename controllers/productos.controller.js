import { response } from "express";
import conexion from "../conector_bd.js";

export const crearProducto = async (req, res) => {
  const { body } = req;

  const categoria = await conexion.categoria.findFirst({
    where: { id: +body.categoriaId },
  });

  if (!categoria) {
    return res.json({
      message: "categoria no existe",
    });
  }

  //   console.log(body);
  const resultado = await conexion.producto.create({
    data: body,
  });
  return res.json({
    message: "Producto creado exitosamente",
    content: resultado,
  });
};

export const listarProducto = async (req, res) => {
  const resultado = await conexion.producto.findMany();
  res.json({
    content: resultado,
  });
};

export const buscarProductoID = async (req, res) => {
  const { id } = req.params;
  const resultado = await conexion.producto.findFirst({ where: { id: +id } });
  if (!resultado) {
    return res.json({
      message: "El producto no existe",
    });
  } else {
    return res.json({
      content: resultado,
    });
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const producto = await conexion.producto.findFirst({ where: { id: +id } });
  if (!producto) {
    return res.json({
      message: "Producto no existe",
    });
  }

  const resultado = await conexion.producto.update({
    data: {
      ...body,
    },
    where: { id: +id },
  });
  return res.json({
    content: resultado,
  });
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await conexion.producto.findFirst({ where: { id: +id } });
  if (!producto) {
    return res.json({
      message: "Producto no existe",
    });
  }
  await conexion.producto.delete({ where: { id: +id } });
  return res.json({
    message: "Productos eliminado exitosamente",
  });
};

export const toggleProducto = async (req, res) => {
  const { id } = req.params;

  const producto = await conexion.producto.findFirst({
    where: {
      id: +id,
    },
    select: {
      estado: true,
    },
  });
  if (!producto) {
    return res.json({ message: "El producto no existe" });
  }

  const resultado = await conexion.producto.update({
    where: { id: +id },
    data: { estado: !producto.estado },
    select: { estado: true },
  });
  console.log(resultado);
  return res.json({
    message:
      "Producto " + (resultado.estado === true ? "habilitado" : "desabilitado"),
  });
};
