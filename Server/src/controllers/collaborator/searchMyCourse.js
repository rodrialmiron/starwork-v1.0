const { Op } = require("sequelize");
const { Course, Class, User } = require("../../db");

const searchMyCourse = async (id, query) => {
  const dataUser = await User.findByPk(id, {
    include: [
      {
        model: Course,
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
      },
    ],
  });

  if (dataUser && dataUser.Courses && dataUser.Courses.length > 0) {
    return dataUser.Courses;
  } else {
    throw new Error("No se encontraron cursos que coincidan con la consulta");
  }
};

module.exports = searchMyCourse;
