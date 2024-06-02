const jwt = require("jsonwebtoken");
const { User } = require("../db.js");
const { SECRET } = process.env;

const tokenServices = async (req, res, next) => {
  const auth = req.headers.auth;
  let token = null;

  if (!auth) return res.status(401).send({ error: "Inicie sesion primero" });

  if (auth.startsWith("Bearer")) {
    token = auth.substring(7);
  }

  if (!token) {
    return res.status(401).send({ error: "Acceso denegado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user.status) {
      return res.status(400).send({ error: "Usuario bloqueado" });
    }

    req.role = user.id_role;
    req.id = user.id

    next();
  } catch (error) {
    res.status(400).send({ error: "Token invalido" });
  }
};

module.exports = tokenServices;
