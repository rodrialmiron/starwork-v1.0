const { Class } = require("../db");

const addOrderClassNumber = async (classFind) => {
  try {
    const allClass = await Class.findAll({
      where: {
        id_course: classFind.id_course,
      },
      order: [["classNumber", "ASC"]],
    });

    const ultimateClass = allClass[allClass.length - 1];

    if (allClass.length > 0) {
      const classNumberUltimate = ultimateClass.classNumber;
      await Class.update(
        { classNumber: classNumberUltimate + 1 },
        {
          where: {
            id: classFind.id,
          },
        }
      );
    }
  } catch (error) {
    throw new Error("No se pudo ordenar las clases");
  }
};

module.exports = addOrderClassNumber;
