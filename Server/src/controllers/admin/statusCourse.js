const { Course, Class, InvitationUser } = require("../../db");

const statusCourse = async (id, status) => {
  const course = await Course.findByPk(id);
  if (!course) {
    throw new Error("Curso no encontrado.");
  }

  course.status = status;
  await course.save();

  const classes = await Class.findAll({ where: { id_course: id } });
  if (classes) {
    for (let cls of classes) {
      cls.status = status;
      await cls.save();

      const allInvitations = await InvitationUser.findAll({ where: { id_course: id } });
      if (allInvitations) {
        for (let oneInvitation of allInvitations) {
          oneInvitation.status = status;
          await oneInvitation.save();
        }
      }
    }
  }

  let msjStatus;
  if (status === false) {
    msjStatus = "inhabilitado";
  } else {
    msjStatus = "habilitado";
  }

  return `El curso ${course.courseName} y sus clases asociadas, se han ${msjStatus} correctamente`;
};

module.exports = statusCourse;
