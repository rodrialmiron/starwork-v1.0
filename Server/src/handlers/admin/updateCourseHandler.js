const updateCourse = require("../../controllers/admin/updateCourse");

const updateCourseHandler = async (req, res) => {
  const { id, courseName, description, topic } = req.body;
  try {
    const result = await updateCourse(id, courseName, description, topic);
    return res.status(200).send({ message: "Curso modificado correctamente!", result });
  } catch (error) {
    if (error.message === "El nombre que esta ingresando ya pertenece a otro curso") {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "Este curso no se encuentra registrado en nuestro sistema") {
      return res.status(404).send({ error: error.message });
    }
    return res.status(500).send({ error: error.message });
  }
};

module.exports = updateCourseHandler;
