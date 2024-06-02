const deleteUser = require("../../controllers/admin/deleteUser.js");

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  const idSession = req.id;
  try {
    const result = await deleteUser(id, idSession);
    return res.status(200).send({ message: result });
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      return res.status(404).send({ error: error.message });
    } else if (error.message.includes("No se pudo eliminar las invitaciones del usuario")) {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "Solo quien invitó a este usuario puede eliminarlo") {
      return res.status(401).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = deleteUserHandler;
