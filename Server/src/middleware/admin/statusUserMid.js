function statusUserMid(req, res, next) {
    const { id, status } = req.body;

    try {
        if (!id) {
            throw new Error("El ID del usuario es requerido para realizar la actualización del estado");
        }

        if (isNaN(parseInt(id)) || parseInt(id) < 1) {
            throw new Error("El ID del usuario debe ser un número entero positivo");
        }

        if (typeof status !== 'boolean') {
            throw new Error("El estado del usuario debe ser un valor booleano (true o false)");
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = statusUserMid;
