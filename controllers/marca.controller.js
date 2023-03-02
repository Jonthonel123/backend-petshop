import conexion from "../conector_bd.js";

export const crearMarca = async (req, res) => {
  const { body } = req;

  console.log(body);

  const respuesta = await conexion.marca.create({
    data: {
      ...body,
    },
  });

  res.json({
    message: "Se creo la marca exitosamente",
    content: respuesta,
  });
};
export const listarMarca = async (req, res) => {
  const respuesta = await conexion.marca.findMany();
  res.json({
    content: respuesta,
  });
};
export const buscarMarcaID = async (req, res) => {
  const { id } = req.params;
  const respuesta = await conexion.marca.findFirst({ where: { id: +id } });
  if (!respuesta) {
    return res.json({
      message: "Marca no existe",
    });
  } else {
    return res.json({
      content: respuesta,
    });
  }
};
export const actualizarMarca = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const marca = await conexion.marca.findFirst({ where: { id: +id } });
  if (!marca) {
    return res.json({
      message: "Esta Marca no existe",
    });
  }
  const resultado = await conexion.marca.update({
    data: {
      ...body,
    },
    where: { id: +id },
  });
  return res.json({
    content: resultado,
  });
};

export const eliminarMarca = async (req, res) => {
  const { id } = req.params;
  const marca = await conexion.marca.findFirst({ where: { id: +id } });
  if (!marca) {
    return res.json({
      message: "Esta Marca no existe",
    });
  }
  await conexion.marca.delete({ where: { id: +id } });
  return res.json({
    message: "La marca fue eliminada exitosamente",
  });
};
