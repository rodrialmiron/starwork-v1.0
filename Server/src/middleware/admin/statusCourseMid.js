function statusCourseMid(req, res, next) {
    const { id, status } = req.body;

    try {
        if (!id) {
            throw new Error("El ID del curso es requerido para realizar la actualizacion");
        }

        if (isNaN(parseInt(id)) || parseInt(id) < 1) {
            throw new Error("El ID del curso debe ser un número entero positivo");
        }

        if (typeof status !== 'boolean') {
            throw new Error("El estado del curso es obligatorio debe ser un valor booleano (true o false)");
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = statusCourseMid;
