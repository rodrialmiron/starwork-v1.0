const { Sequelize } = require("sequelize");
const { Class } = require("../../db");
const { Op } = Sequelize;

const updatedClass = async ({ id, classTitle, classContent, link, menssage, id_course }) => {
  let classModified = await Class.findByPk(id);
  if (classModified) {
    const classWithSameTitle = await Class.findOne({
      where: {
        classTitle,
        id: {
          [Op.not]: id,
        },
      },
    });

    const classWithSameLink = await Class.findOne({
      where: {
        link,
        id: {
          [Op.not]: id,
        },
      },
    });

    if (classWithSameTitle) {
      throw new Error(`El título '${classTitle}' ya está en uso por otra clase`);
    }

    if (classWithSameLink) {
      throw new Error(`El enlace '${link}' ya está en uso por otra clase`);
    }

    await classModified.update({
      classTitle,
      classContent,
      link,
      menssage,
    });
    
    return classModified;
  } else {
    throw new Error("No se encontró la clase que intenta modificar");
  }
};

module.exports = updatedClass;
