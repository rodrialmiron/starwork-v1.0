const deleteClass = require("../../controllers/admin/deleteClass.js");

const deleteClassHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteClass(id);
    return res.status(200).send(result);
  } catch (error) {
    if (error.message === `La clase que intentas eliminar no existe`) {
      return res.status(404).send({ error: error.message });
    } else if (error.message.includes("No se pudo eliminar las invitaciones de la clase")) {
      return res.status(409).send({ error: error.message });
    } else if (error.message.includes("No se pudo ordenar las clases")) {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = deleteClassHandler;
