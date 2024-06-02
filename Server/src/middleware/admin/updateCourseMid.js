const updateCourseMid = async (req, res, next) => {
  const { id, courseName, description, topic } = req.body;

  try {

    const idInt = parseInt(id, 10);
    if (isNaN(idInt) || idInt <= 0) {
      throw new Error("El ID debe ser un número entero positivo");
    }

    if (!courseName || typeof courseName !== "string") {
      throw new Error("El nombre del curso debe ser un string");
    }

    const formatCourseName =
      /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/;
    if (!formatCourseName.test(courseName)) {
      throw new Error(
        "El nombre del curso solo puede incluir letras, números, espacios, puntos, comas, signos de interrogación, de exclamación, guiones y caracteres diacríticos."
      );
    }

    if (!description || typeof description !== "string") {
      throw new Error("La descripcion del curso debe ser un string");
    }

    if (description.length < 10 || description.length > 200) {
      throw new Error("La descripción debe tener entre 10 y 200 caracteres");
    }

    if (!topic || typeof topic !== "string") {
      throw new Error("El tema del curso debe ser un string");
    }

    const formatTopic =
      /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/;
    if (!formatTopic.test(topic)) {
      throw new Error(
        "El tema solo puede incluir letras, números, espacios, puntos, comas, signos de interrogación, de exclamación, guiones y caracteres diacríticos"
      );
    }

    if (courseName.length < 5 || courseName.length > 100) {
      throw new Error(
        "El nombre del curso debe tener entre 5 y 100 caracteres"
      );
    }

    if (topic.length < 1 || topic.length > 100) {
      throw new Error("El tema debe tener entre 1 y 100 caracteres");
    }

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = updateCourseMid;
