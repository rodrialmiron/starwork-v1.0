const statusClass = require("../../controllers/admin/statusClass.js");

const statusClassHandler = async (req, res) => {
  const { id, status } = req.body;
  try {
    const result = await statusClass(id, status);
    return res.status(200).send(result);
  } catch (error) {
    if (error.message === "Clase no encontrada") {
      return res.status(404).send({ error: error.message });
    } else if (error.message.includes("No se pudieron actualizar los datos de las invitaciones")) {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "No se pudo ordenar las clases") {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = statusClassHandler;
