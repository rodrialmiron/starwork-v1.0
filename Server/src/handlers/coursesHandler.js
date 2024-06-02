const getAllCourses = require("../controllers/getAllCourses.js");
const getAllCoursesSup = require("../controllers/supervisor/getAllCoursesSup.js");

const coursesHandler = async (req, res) => {
  const role = req.role;
  try {
    let allCourses;
    if (role === 1) {
      allCourses = await getAllCourses();
    }
    if (role === 2) {
      allCourses = await getAllCoursesSup();
    }
    
    return res.status(200).send(allCourses);
  } catch (error) {
    if (error.message === "No se encontraron cursos") {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = coursesHandler;
