const verifyCodeRecover = require("../controllers/verifyCodeRecover.js");

const VerifyRecoverHandler = async (req, res) => {
  const { email, codeUser } = req.body;

  try {
    await verifyCodeRecover(email, codeUser);
    return res
      .status(200)
      .send({ message: "El codigo fue verificado con exito", email });
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

module.exports = VerifyRecoverHandler;
