import conexion from "../conector_bd.js";

export const crearPerfil = async (req, res) => {
  const { body } = req;
  console.log(body);

  const respuesta = await conexion.perfil.create({
    data: {
      ...body,
    },
  });

  res.json({
    message: "Se creo el perfil exitosamente",
    content: respuesta,
  });
};

export const listarPerfiles = async (req, res) => {
  const respuesta = await conexion.perfil.findMany();

  res.json({
    content: respuesta,
  });
};
