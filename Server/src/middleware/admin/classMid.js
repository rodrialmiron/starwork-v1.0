function classMid(req, res, next) {
    const { id_course } = req.params;

    try {

        if (!id_course) {
            throw new Error("El ID del curso es obligatorio.");
        } else if (isNaN(parseInt(id_course)) || parseInt(id_course) < 1) {
            throw new Error("El ID del curso debe ser un número entero positivo.");
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = classMid;
