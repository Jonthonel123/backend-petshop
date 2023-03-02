import conexion from "../conector_bd.js";

export const retornarCalendarios = async (req, res) => {
  console.log(req.user);
  return res.json({
    message: "llegaste al final",
  });
};
