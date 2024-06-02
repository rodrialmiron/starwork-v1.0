const statusCourse = require("../../controllers/admin/statusCourse.js");

const statusCourseHandler = async (req, res) => {
  const { id, status } = req.body;

  try {
    const result = await statusCourse(id, status);
    return res.status(200).send({
      message: result,
    });
  } catch (error) {
    if (error.message === "Curso no encontrado.") {
      return res.status(404).send({ error: error.message });
    }
    return res.status(500).send({ error: "Error interno del servidor" });
  }
};

module.exports = statusCourseHandler;
