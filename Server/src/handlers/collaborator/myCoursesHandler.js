const getMyCourses = require("../../controllers/collaborator/getMyCourses");

const myCoursesHandler = async (req, res) => {
  const id = req.id;
  try {
    const result = await getMyCourses(id);
    return res.status(200).send(result);
  } catch (error) {
    if (error.message === "El usuario no existe") {
      return res.status(404).send({ error: error.message });
    } else if (error.message === "Aún no tienes cursos asignados") {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = myCoursesHandler;
