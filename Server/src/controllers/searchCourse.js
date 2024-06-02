const { Op } = require("sequelize");
const { Course, Class } = require("../db");

const searchCourse = async (query) => {
  const courses = await Course.findAll({
    where: {
      [Op.or]: [
        {
          courseName: {
            [Op.iLike]: `%${query}%`,
          },
        },
        {
          topic: {
            [Op.iLike]: `%${query}%`,
          },
        },
      ],
    },
    include: [
      {
        model: Class,
      },
    ],
  });

  if (courses.length > 0) {
    return courses;
  } else {
    throw new Error("No se encontraron cursos que coincidan con la consulta");
  }
};

module.exports = searchCourse;
