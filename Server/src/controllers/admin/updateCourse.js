const { Op } = require("sequelize");
const { Course } = require("../../db");

const updateCourse = async (id, courseName, description, topic) => {
  const courseInstance = await Course.findByPk(id);

  if (courseInstance) {
    const courseSameName = await Course.findOne({
      where: {
        courseName,
        id: {
          [Op.ne]: id,
        },
      },
    });

    if (courseSameName) {
      throw new Error(
        "El nombre que esta ingresando ya pertenece a otro curso"
      );
    }

    await courseInstance.update({
      courseName: courseName,
      description: description,
      topic: topic,
    });
    
    return courseInstance;
  } else {
    throw new Error("Este curso no se encuentra registrado en nuestro sistema");
  }
};

module.exports = updateCourse;
