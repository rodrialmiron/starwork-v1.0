const getAllUsers = require("../controllers/getAllUsers.js");

const usersHandler = async (req, res) => {
  const { sortParam, sortOrder } = req.query;
  const id = req.id;
  try {
    const allUsers = await getAllUsers(id, sortParam, sortOrder);
    return res.status(200).send(allUsers);
  } catch (error) {
    if (error.message === "Aun no existen usuarios registrados bajo su supervision") {
      return res.status(404).send({ error: error.message });
    } else if (error.message.includes("Error al buscar usuarios: ")) {
      return res.status(500).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = usersHandler;
