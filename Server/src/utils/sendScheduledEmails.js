const classTemplate = require("../template/classTemplate");
const notify = require("./notify");

async function sendScheduledEmails(user, classSend, courseName) {
  try {
    await notify(
      user.email,
      classTemplate(
        user.firstName,
        user.lastName,
        courseName,
        classSend.classTitle,
        classSend.menssage,
        classSend.link
      )
    );
  } catch (error) {
    console.error("Error al enviar las invitaciones:", error);
  }
}

module.exports = sendScheduledEmails;
