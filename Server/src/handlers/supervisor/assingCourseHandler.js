const assingCourse = require("../../controllers/supervisor/assingCourse");

const assingCourseHandler = async (req, res) => {
  const { id_user, id_course, dayOfWeek, hour } = req.body;
  const id_supervisor = req.id;

  try {
    const result = await assingCourse(id_user, id_course, dayOfWeek, hour.toString(), id_supervisor);
    return res.status(200).send({ message: result });
  } catch (error) {
    if (error.message === "No se encontró el usuario en nuestro sistema") {
      return res.status(404).send({ error: error.message });
    } else if (error.message === "No se encontró el supervisor en nuestro sistema") {
      return res.status(404).send({ error: error.message });
    } else if (error.message === "No se encontró el curso en nuestro sistema") {
      return res.status(404).send({ error: error.message });
    } else if (error.message === "Este curso esta inhabilitado") {
      res.status(403).json({ error: error.message });
    } else if (error.message.includes("Error al asignar el curso al usuario")) {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = assingCourseHandler;
