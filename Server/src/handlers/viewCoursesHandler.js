const viewCourses = require("../controllers/viewCourses.js");

const viewCoursesHandler = async (req, res) => {
  try {
    const allViewCourses = await viewCourses();
    return res.status(200).send(allViewCourses);
  } catch (error) {
    if (error.message === "No se encontraron cursos") {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = viewCoursesHandler;
