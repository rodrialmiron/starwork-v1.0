const { Class } = require("../db");

const orderClassNumber = async (classFind) => {
  try {
    const allClass = await Class.findAll({
      where: {
        id_course: classFind.id_course,
      },
      order: [["classNumber", "ASC"]],
    });

    if (allClass.length > 0) {
      const classNumberToDelete = classFind.classNumber;
      const classesToUpdate = allClass.filter((c) => c.classNumber > classNumberToDelete);

      for (let i = 0; i < classesToUpdate.length; i++) {
        classesToUpdate[i].classNumber -= 1;
        await classesToUpdate[i].save();
      }
    }
  } catch (error) {
    throw new Error("No se pudo ordenar las clases");
  }
};

module.exports = orderClassNumber;
