const crypto = require("crypto");
const { Verify, User } = require("../db.js");
const emailTemplate = require("../template/emailTemplate.js");
const notify = require("../utils/notify.js");
const codeVerify = require("../utils/codeVerify.js");

const emailRecoverServices = async (req, res) => {
  const { email } = req.body;

  try {
    const searchEmail = await User.findOne({ where: { email } });
    if (!searchEmail) {
      return res.status(404).send({
        error: "Este correo electronico no se encuentra registrado en nuestro sistema",
      });
    }

    const code = crypto.randomBytes(3).toString("hex");

    const verifyCode = await Verify.findOne({ where: { email: email } });
    let createdAt;
    if (verifyCode) {
      createdAt = await codeVerify(email, code, verifyCode);
    } else {
      createdAt = await codeVerify(email, code);
    }

    if (createdAt.error) {
      return res.status(401).send(createdAt);
    }

    await notify(email, emailTemplate(code));

    return res.status(200).send({
      message: "Se te ha enviado un codigo de verificación a tu correo electronico",
      email,
      createdAt,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = emailRecoverServices;
