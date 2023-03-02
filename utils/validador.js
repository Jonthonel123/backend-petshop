import jwt from "jsonwebtoken";
import conexion from "../conector_bd.js";

export const validarToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Se necesita una token para realizar esta peticion",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message:
        "Formato de token invalido, debe ser en el formato Bearer <token>",
    });
  }

  try {
    const payload = jwt.verify(token, "ultramegasupersecreto");
    console.log("Payload", payload);
    const usuario = await conexion.usuario.findFirst({
      where: { email: payload.email },
    });
    // console.log(usuario);
    if (!usuario) {
      return res.json({
        message: "el usuaro no tiene permisos para realizar esta acction",
      });
    }
    req.user = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "error en la token",
      content: error.message,
    });
  }
};
