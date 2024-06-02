const searchcourse = require("../controllers/searchCourse.js");

const searchCourseHandler = async (req, res) => {
  const { query } = req.query;

  try {
    const result = await searchcourse(query);
    return res.status(200).send(result);
  } catch (error) {
    if (error.message === "No se encontraron cursos que coincidan con la consulta") {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = searchCourseHandler;
