const changePassword = require("../controllers/changePassword.js");

const changePasswordHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await changePassword(email, password);
    return res
      .status(200)
      .send({ message: "¡La Contraseña ha cambiado con éxito!", result });
  } catch (error) {
    if (
      error.message ===
      "No se pudo completar esta operacion, no se encontro el email en la base de datos"
    ) {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = changePasswordHandler;
