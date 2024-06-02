const { Enrollment, Course, Class, User } = require("../../db");
const getMyCourses = async (id) => {
  const dataUser = await User.findByPk(id, {
    attributes: ["id", "firstName", "lastName"],
    include: [
      {
        model: Course,
        where: { status: true },
        through: {
          model: Enrollment,
          where: { id_user: id },
        },
        required: false,
        include: [
          {
            model: Class,
            where: { status: true },
            required: false,
          },
        ],
      },
    ],
  });

  if (!dataUser) throw new Error("El usuario no existe");

  if (!dataUser.Courses || dataUser.Courses.length === 0) {
    throw new Error("Aún no tienes cursos asignados");
  }

  const dataUserObject = dataUser.toJSON();

  for (const course of dataUserObject.Courses) {
    const totalClass = await Class.count({ where: { id_course: course.id } });
    const classView = course.Enrollment.classView || 0;
    let progress = totalClass > 0 ? (classView / totalClass) * 100 : 0;

    progress = Math.ceil(progress);

    course.Enrollment.totalClass = totalClass;
    course.Enrollment.progress = progress;
  }

  return dataUserObject;
};

module.exports = getMyCourses;
