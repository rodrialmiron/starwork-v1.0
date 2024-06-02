const { Course, Class } = require("../db.js");

const viewCourses = async () => {
    const allViewCourses = await Course.findAll({
      attributes: ['courseName', 'topic', 'description'],
      where: { status: true },
      include: [
        {
          model: Class,
          attributes: ['classNumber', 'classTitle'],
          where: { status: true },
        },
      ],
    });
  
    if (!allViewCourses.length) {
      throw new Error("No se encontraron cursos");
    }
  
    return allViewCourses;
  };
  

module.exports = viewCourses;
