const { Course, Class } = require("../db.js");

const getAllCourses = async () => {
  const allCourses = await Course.findAll({
    include: [
      {
        model: Class,
      },
    ],
  });

  if (allCourses.length === 0) {
    throw new Error("No se encontraron cursos");
  }

  return allCourses;
};

module.exports = getAllCourses;
