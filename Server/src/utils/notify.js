const nodemailer = require("nodemailer");
const { EMAIL, PASSEMAIL } = process.env;

const notify = async (email, template) => {
  try {
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: EMAIL,
        pass: PASSEMAIL,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    const msg = {
      from: EMAIL,
      to: email,
      subject: "Starwork",
      html: template,
    };

    const transport = nodemailer.createTransport(config);

    await transport.sendMail(msg);

    return "Mensaje enviado correctamente";
  } catch (error) {
    throw new Error("No se pudo enviar el mensaje");
  }
};

module.exports = notify;
