const crypto = require("crypto");
const { Verify, User, AccessCode } = require("../db.js");
const emailTemplate = require("../template/emailTemplate.js");
const notify = require("../utils/notify.js");
const codeVerify = require("../utils/codeVerify.js");

const emailServices = async (req, res, next) => {
  const body = req.body;
  const email = body.email;

  try {
    const user = await User.findOne({ where: { email } });

    if (body.code) {
      const codeAc = body.code;
      const codeUpper = codeAc.toUpperCase();
      const accessCode = await AccessCode.findOne({
        where: { code: codeUpper },
      });

      if (!accessCode) {
        throw new Error("Código de Acceso Inválido");
      }

      const userCreator = await User.findByPk(accessCode.id_creator);
      if (userCreator.usedSlot >= userCreator.limitSlot) {
        throw new Error(
          `El supervisor ${userCreator.firstName} ${userCreator.lastName} ya superó la cantidad máxima de invitaciones`
        );
      }

      if (accessCode.usedCode >= accessCode.limitCode) {
        throw new Error(`El codigo ${codeUpper} ya superó la cantidad maxima de usos`);
      }

      if (user) {
        if (user.emailIsVerify === false) {
          throw new Error(
            "El correo electronico que ingresaste ya esta en uso, puedes inicia sesion para continuar con el proceso de verificacion"
          );
        }
        throw new Error("Este correo electronico ya esta registrado en nuestro sistema");
      }
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

    req.createdAt = createdAt;

    next();
  } catch (error) {
    if (error.message === "Código de Acceso Inválido") {
      return res.status(404).send({ error: error.message });
    } else if (error.message.includes("ya superó la cantidad máxima de invitaciones")) {
      return res.status(409).send({ error: error.message });
    } else if (error.message.includes("ya superó la cantidad maxima de usos")) {
      return res.status(409).send({ error: error.message });
    } else if (
      error.message ===
      "El correo electronico que ingresaste ya esta en uso, puedes inicia sesion para continuar con el proceso de verificacion"
    ) {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "Este correo electronico ya esta registrado en nuestro sistema") {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = emailServices;
