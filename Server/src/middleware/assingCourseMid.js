const assingCourseMid = (req, res, next) => {
  try {
    const { id_user, id_course, dayOfWeek, hour } = req.body;
    const id_supervisor = req.id;

    if (!id_user || typeof id_user !== "number" || id_user <= 0) {
      throw new Error("El ID del usuario debe ser un número entero positivo");
    }

    if (!id_course || typeof id_course !== "number" || id_course <= 0) {
      throw new Error("El ID del curso debe ser un número entero positivo");
    }

    if (dayOfWeek === undefined || typeof dayOfWeek !== "number" || dayOfWeek < 0 || dayOfWeek > 6) {
      throw new Error("El día de la semana debe ser un número entre 0 y 6");
    }

    if (!hour || typeof hour !== "string" || hour.trim() === "") {
      throw new Error("La hora es obligatoria y debe ser una cadena no vacía");
    }

    if (!id_supervisor || typeof id_supervisor !== "number" || id_supervisor <= 0) {
      throw new Error("El ID del supervisor debe ser un número entero positivo");
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = assingCourseMid;
