const statusUser = require("../../controllers/admin/statusUser.js");

const statusUserHandler = async (req, res) => {
  const { id, status } = req.body;
  const idSession = req.id;

  try {
    const result = await statusUser(id, status, idSession);
    return res.status(200).send({ message: result });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).send({ error: error.message });
    } else if (
      error.message.includes("No se pudieron actualizar los datos de las invitaciones del usuario")
    ) {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "Solo quien invitó a este usuario puede cambiar su estado") {
      return res.status(401).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = statusUserHandler;
