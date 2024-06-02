const { Course } = require("../../db");

const addCourse = async (objCourse) => {
  const { topic, courseName, description } = objCourse;

  const [course, created] = await Course.findOrCreate({
    where: {
      courseName,
    },
    defaults: {
      description,
      topic,
      courseName,
    },
  });

  if (!created) throw new Error("Ya tenes este curso");

  return course;
};

module.exports = addCourse;
