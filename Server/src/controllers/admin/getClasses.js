const { Class } = require("../../db");

const getClasses = async (id_course) => {
  const classes = await Class.findAll({
    where: { id_course: id_course },
  });
  
  if (!classes || classes.length === 0) {
    throw new Error("No se encontraron clases para el curso proporcionado");
  }
  return classes;
};

module.exports = getClasses;
