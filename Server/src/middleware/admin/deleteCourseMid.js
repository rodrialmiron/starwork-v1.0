const deleteCourseMid = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("debes proporcionar un ID");
    }

    if (isNaN(id) || typeof id !== "string") {
      throw new Error("El ID proporcionado no es válido");
    }

    const idInt = parseInt(id, 10);

    if (idInt <= 0 || !Number.isInteger(idInt)) {
      throw new Error("El ID debe ser un número entero positivo");
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = deleteCourseMid
