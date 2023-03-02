import conexion from "../conector_bd.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registroUsuario = async (req, res) => {
  const data = req.body;
  const { body } = req;
  const passwordHash = await bcrypt.hashSync(data.password, 10);
  console.log(passwordHash);

  // console.log(data);
  try {
    const resultado = await conexion.usuario.create({
      data: {
        ...data,
        password: passwordHash,
      },
    });
    console.log(resultado);
    return res
      .json({
        message: "Usuario creado exitosamente",
        content: resultado,
      })
      .status(201);
  } catch (error) {
    console.log(error);
    return res
      .json({
        message: "Error al crear usuario",
      })
      .status(400);
  }
};

export const login = async (req, res) => {
  const data = req.body;
  const usuarioEcontrado = await conexion.usuario.findFirst({
    where: { email: data.email },
  });

  if (!usuarioEcontrado) {
    return res.status(404).json({
      message: "Usuario no existe",
    });
  }

  const resultado = bcrypt.compareSync(
    data.password,
    usuarioEcontrado.password
  );
  if (resultado) {
    // inf. adicional que usara la token
    const payload = {
      email: usuarioEcontrado.email,
    };
    // aca creo la token
    const token = jwt.sign(payload, "ultramegasupersecreto", {
      expiresIn: "1h",
    });
    return res.json({
      message: "Bienvenido",
      content: token,
    });
  } else {
    return res.status(403).json({
      message: "Usuario no existe",
    });
  }
};
