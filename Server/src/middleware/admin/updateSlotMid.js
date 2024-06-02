const updateSlotMid = (req, res, next) => {
  try {
    const { id, limitSlot } = req.body;

    if (!id || typeof id !== "number" || id <= 0) {
      throw new Error("El ID debe ser un número entero positivo");
    }

    if (limitSlot === undefined || typeof limitSlot !== "number" || limitSlot < 0) {
      throw new Error("El limite debe ser un número entero positivo o cero");
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateSlotMid;
