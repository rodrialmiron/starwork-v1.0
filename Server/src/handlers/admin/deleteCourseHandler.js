const deleteCourse = require("../../controllers/admin/deleteCourse.js");

const deleteClassHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCourse(id);
    return res.status(200).send({ message: result });
  } catch (error) {
    if (error.message === "Este curso no se encuentra registra en nuestro sistema") {
      return res.status(404).send({ error: error.message });
    } else if (error.message.includes("No se pudo eliminar las clases del curso")) {
      return res.status(409).send({ error: error.message });
    } else if (error.message.includes("No se pudo eliminar las invitaciones del curso")) {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = deleteClassHandler;
