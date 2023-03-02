import conexion from "../conector_bd.js";

export const crearGrupo = async (req, res) => {
  const { body } = req;

  console.log(body);

  const respuesta = await conexion.grupo.create({
    data: {
      ...body,
    },
  });

  res.json({
    message: "Se creo el grupo exitosamente",
    content: respuesta,
  });
};
export const listarGrupo = async (req, res) => {
  const resultado = await conexion.grupo.findMany();
  res.json({
    content: resultado,
  });
};

export const buscarGrupoID = async (req, res) => {
  const { id } = req.params;
  const resultado = await conexion.grupo.findFirst({ where: { id: +id } });
  if (!resultado) {
    return res.json({
      message: "Grupo no existe",
    });
  } else {
    return res.json({
      content: resultado,
    });
  }
};

export const actualizarGrupo = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const grupo = await conexion.grupo.findFirst({ where: { id: +id } });
  if (!grupo) {
    return res.json({
      message: "Grupo no exite",
    });
  }
  const resultado = await conexion.grupo.update({
    data: {
      ...body,
    },
    where: { id: +id },
  });
  return res.json({
    content: resultado,
  });
};

export const eliminarGrupo = async (req, res) => {
  const { id } = req.params;
  const grupo = await conexion.grupo.findFirst({ where: { id: +id } });
  if (!grupo) {
    return res.json({
      message: "Grupo no existe",
    });
  }

  await conexion.grupo.delete({ where: { id: +id } });
  return res.json({
    message: "Grupo eliminada exitosamente",
  });
};
