const { Enrollment, User, Course, Class, InvitationUser } = require("../../db.js");
const notify = require("../../utils/notify.js");
const courseTemplate = require("../../template/courseTemplate.js");
const cron = require("node-cron");
const sendScheduledEmails = require("../../utils/sendScheduledEmails.js");

const assingCourse = async (id_user, id_course, dayOfWeek, hourBody, id_supervisor) => {
  const userFind = await User.findByPk(id_user);
  let hour;
  let minute;

  if (userFind) {
    const supFind = await User.findByPk(id_supervisor);
    if (!supFind) {
      throw new Error("No se encontró el supervisor en nuestro sistema");
    }

    const courseFind = await Course.findByPk(id_course);
    if (!courseFind) {
      throw new Error("No se encontró el curso en nuestro sistema");
    }
    if (courseFind.status === false) {
      throw new Error("Este curso esta inhabilitado");
    }

    const allClass = await Class.findAll({ where: { id_course: id_course } });
    if (allClass.length <= 0) {
      throw new Error("El curso que intentas asignar no tiene ninguna clase creada");
    }

    const existingEnrollment = await Enrollment.findOne({ where: { id_user, id_course } });
    if (existingEnrollment) {
      await InvitationUser.update({ dayOfWeek, hour: hourBody }, { where: { id_user, id_course } });

      return `El usuario ${userFind.firstName} ${userFind.lastName} ya se encontraba asignado al curso ${courseFind.courseName}, no obstante su horario de envío de clase ha sido actualizado`;
    }

    const enrollmentCreated = await Enrollment.create({
      id_user,
      id_course,
      id_supervisor,
    });

    if (!enrollmentCreated) {
      throw new Error(`Error al asignar el curso al usuario ${userFind.lastName} ${userFind.firstName}`);
    }

    for (const oneClass of allClass) {
      await InvitationUser.create({
        dayOfWeek,
        hour: hourBody,
        id_user,
        id_course,
        id_class: oneClass.id,
      });
    }

    await notify(
      userFind.email,
      courseTemplate(
        userFind.firstName,
        userFind.lastName,
        courseFind.courseName,
        supFind.firstName,
        supFind.lastName,
        supFind.company
      )
    );

    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    [hour, minute] = hourBody.split(":");
    const hourSend = parseInt(hour);
    const minSend = parseInt(minute);

    if (dayOfWeek === currentDayOfWeek && hourSend >= currentHour && minSend > currentMinutes) {
      const classSend = await Class.findOne({
        where: { id_course: courseFind.id, classNumber: 1 },
      });

      const getInvitation = await InvitationUser.findOne({
        where: {
          id_class: classSend.id,
          id_user: userFind.id,
        },
      });

      cron.schedule(`${minSend} ${hourSend} * * ${currentDayOfWeek}`, async () => {
        await sendScheduledEmails(userFind, classSend, courseFind.courseName);

        await getInvitation.update({ sent: true });

        const actuView = await Enrollment.findOne({
          where: { id_user: userFind.id, id_course: courseFind.id },
        });
        const countClassView = actuView.classView + 1;

        await Enrollment.update(
          { classView: countClassView },
          { where: { id_user: userFind.id, id_course: courseFind.id } }
        );
      });
    }

    return `El curso ${courseFind.courseName} fue asignado con éxito`;
  } else {
    throw new Error("No se encontró el usuario en nuestro sistema");
  }
};

module.exports = assingCourse;
