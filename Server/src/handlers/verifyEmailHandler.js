const verifyEmail = require("../controllers/verifyEmail.js");

const verifyEmailHandler = async (req, res) => {
  const { email, codeUser } = req.body;

  if (!codeUser || !email) {
    return res.status(400).json({ error: "Faltan Datos" });
  }

  try {
    const verifySuccess = await verifyEmail(email, codeUser);
    res.status(200).send({ message: verifySuccess });
  } catch (error) {
    if (error.message === "Código incorrecto") {
      return res.status(401).send({ error: error.message });
    } else if (
      error.message === "El codigo no coincide con el email registrado"
    ) {
      return res.status(403).send({ error: error.message });
    } else if (error.message === "Email no registrado") {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = verifyEmailHandler;
