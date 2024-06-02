const searchUser = require("../controllers/searchUser");

const searchUserHandler = async (req, res) => {
  const { query } = req.query;
  const id = req.id;

  try {
    const result = await searchUser(query, id);
    return res.status(200).send(result);
  } catch (error) {
    if (error.message === "Aun no existen usuarios registrados bajo su supervision") {
      return res.status(404).send({ error: error.message });
    } else if (error.message === "No se encontro ninguna coincidencia") {
      return res.status(404).send({ error: error.message });
    } else if (error.message.includes("Error al buscar usuarios: ")) {
      return res.status(500).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = searchUserHandler;
