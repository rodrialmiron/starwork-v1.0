const loginUser = require("../controllers/loginUser.js");

const loginHandler = async(req, res) => {
  const { email, password } = req.body;
  try {
    const loginSuccess = await loginUser(email, password);
    return res.status(200).send({message: "Inicio de sesion exitoso", loginSuccess});
  } catch (error) {
    if (error.message === "Usuario bloqueado") {
      return res.status(401).send({ error: error.message });
    } else if (error.message === "Email o contraseña incorrecta") {
      return res.status(401).send({ error: error.message });
    } else if (error.message === "Email no verificado") {
      return res.status(403).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
}

module.exports = loginHandler;
