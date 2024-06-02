const { Class, Course } = require("../../db");
const addOrderClassNumber = require("../../utils/addOrderClassNumber");

const addClassandInvitation = async ({ classTitle, classContent, link, menssage, id_course }) => {
  const courseId = await Course.findByPk(id_course);

  if (!courseId) {
    throw new Error("La clase debe pertenecer a un curso válido");
  }

  const existingClass = await Class.findOne({
    where: {
      classTitle,
    },
  });

  if (existingClass) {
    throw new Error("Ya existe una clase con este título");
  }

  let newClass = await Class.create({
    classTitle,
    classContent,
    link,
    menssage,
    id_course,
    classNumber: 0,
  });

  if (newClass) {
    await addOrderClassNumber(newClass);
    newClass = await Class.findByPk(newClass.id);
  }

  if (!newClass) {
    throw new Error("No se pudo crear la nueva clase");
  }

  return newClass;
};

module.exports = addClassandInvitation;
