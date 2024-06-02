function searchUserMid(req, res, next) {
  const query = req.query.query;

  try {
    if (typeof query !== "string") {
      throw new Error("El parámetro de búsqueda debe ser tipo string");
    }

    if (query.length > 50) {
      throw new Error("La longitud del parámetro de búsqueda no puede ser mayor a 50 caracteres");
    }

    if (query.trim() !== "") {
      const validarQuery = /^[a-zA-Z\s]*$/;
      if (!validarQuery.test(query)) {
        throw new Error("El parámetro de búsqueda contiene caracteres no válidos");
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = searchUserMid;
