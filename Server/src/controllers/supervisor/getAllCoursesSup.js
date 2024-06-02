const { where } = require("sequelize");
const { Course, Class } = require("../../db.js");

const getAllCoursesSup = async () => {
  const allCourses = await Course.findAll({
    where: { status: true },
    include: [
      {
        model: Class,
        where: { status: true },
      },
    ],
  });

  if (allCourses.length === 0) {
    throw new Error("No se encontraron cursos");
  }

  return allCourses;
};

module.exports = getAllCoursesSup;
