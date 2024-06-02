const { Course, Class, InvitationUser } = require("../../db");

const deleteCourse = async (id) => {
  const courseInstances = await Course.findByPk(id);

  if (courseInstances) {
    const allClass = await Class.findAll({ where: { id_course: id } });
    if (allClass.length > 0) {
      const classDestroy = await Class.destroy({ where: { id_course: id } });

      if (!classDestroy) {
        throw new Error(`No se pudo eliminar las clases del curso ${courseInstances.courseName}`);
      }
    }

    const allInvitations = await InvitationUser.findAll({ where: { id_course: id } });
    if (allInvitations.length > 0) {
      const invitationDestroy = await InvitationUser.destroy({
        where: { id_course: id },
      });

      if (!invitationDestroy) {
        throw new Error(`No se pudo eliminar las invitaciones del curso ${courseInstances.courseName}`);
      }
    }

    await courseInstances.destroy();
    return `Curso ${courseInstances.courseName} eliminado correctamente junto con sus clases e invitaciones`;
  } else {
    throw new Error("Este curso no se encuentra registra en nuestro sistema");
  }
};

module.exports = deleteCourse;
