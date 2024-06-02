const updateSlot = require("../../controllers/admin/updateSlot");

const updateSlotHandler = async (req, res) => {
  const { id, limitSlot } = req.body;

  try {
    const result = await updateSlot(id, limitSlot);
    return res.status(200).send({
      message: result,
    });
  } catch (error) {
    if (error.message === "El usuario no se encuentra registrado en nuestro sistema") {
      return res.status(404).send({ error: error.message });
    }
    return res.status(500).send({ error: error.message });
  }
};

module.exports = updateSlotHandler;
