import conexion from "../conector_bd.js";

export const crearCategoria = async (req, res) => {
  const { body } = req;
  console.log(body);

  const respuesta = await conexion.categoria.create({
    data: {
      codigo_categoria: body.codigo_categoria,
      nombre_categoria: body.nombre_categoria,
      fecha_creacion: body.fecha_creacion,
      estado_categoria: body.estado_categoria,
    },
  });

  res.json({
    message: "Se creo la categoria exitosamente",
    content: respuesta,
  });
};

export const listarCategorias = async (req, res) => {
  const respuesta = await conexion.categoria.findMany();

  res.json({
    content: respuesta,
  });
};

export const buscarCategoriaPorID = async (req, res) => {
  const { id } = req.params;
  const respuesta = await conexion.categoria.findFirst({
    where: { id: +id },
    include: { productos: true },
  });
  if (!respuesta) {
    return res.json({
      message: "Categoria no existe",
    });
  } else {
    return res.json({
      content: respuesta,
    });
  }
};

export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const categoria = await conexion.categoria.findFirst({ where: { id: +id } });
  if (!categoria) {
    return res.json({
      message: "Categoria no existe",
    });
  }

  const respuesta = await conexion.categoria.update({
    data: {
      codigo_categoria: body.codigo_categoria,
      nombre_categoria: body.nombre_categoria,
      fecha_creacion: body.fecha_creacion,
      estado_categoria: body.estado_categoria,
    },
    where: { id: +id },
  });

  return res.json({
    content: respuesta,
  });
};

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await conexion.categoria.findFirst({ where: { id: +id } });
  if (!categoria) {
    return res.json({
      message: "Categoria no existe",
    });
  }

  await conexion.categoria.delete({ where: { id: +id } });
  return res.json({
    message: "Categoria eliminada exitosamente",
  });
};
