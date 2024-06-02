const { Class } = require("../../db");

const orderClassNumber = async (reorderedClasses) => {
  for (let i = 0; i < reorderedClasses.length; i++) {
    let classId = reorderedClasses[i];
    await Class.update({ classNumber: i + 1 }, { where: { id: classId } });
  }

  const updatedClasses = await Class.findAll({ where: { id: reorderedClasses }, order: [["classNumber", "ASC"]] });

  if (!updatedClasses) {
    throw new Error("No se pudo obtener las clases actualizadas");
  }

  return updatedClasses;
};

module.exports = orderClassNumber;
