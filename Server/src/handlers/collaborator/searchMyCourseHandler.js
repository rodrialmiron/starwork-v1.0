const searchMyCourse = require("../../controllers/collaborator/searchMyCourse.js");

const searchMyCourseHandler = async (req, res) => {
  const { query } = req.query;
  const id = req.id;

  try {
    const result = await searchMyCourse(id, query);
    return res.status(200).send(result);
  } catch (error) {
    if (error.message === "No se encontraron cursos que coincidan con la consulta") {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = searchMyCourseHandler;
