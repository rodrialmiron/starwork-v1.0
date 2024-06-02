const orderClassNumber = require("../../controllers/admin/orderClassNumber");

const orderClassHandler = async (req, res) => {
  const { reorderedClasses } = req.body;

  try {
    const newOrder = await orderClassNumber(reorderedClasses);
    return res.status(200).send({ message: "Se actualizo el orden de las clases", newOrder });
  } catch (error) {
    if (error.message === "No se pudo obtener las clases actualizadas") {
      return res.status(409).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};
module.exports = orderClassHandler;
