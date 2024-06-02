function searchCourseMid(req, res, next) {
  const query = req.query.query;
  try {
    if (typeof query !== "string") {
      throw new Error("El parámetro de búsqueda debe ser tipo string");
    }

    if (query.length > 100) {
      throw new Error(
        "La longitud del parámetro de búsqueda no puede ser mayor a 100 caracteres"
      );
    }

    if (query.trim() !== "") {
      const validarQuery =
        /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/;
      if (!validarQuery.test(query)) {
        throw new Error(
          "El parámetro de búsqueda contiene caracteres no válidos"
        );
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = searchCourseMid;
