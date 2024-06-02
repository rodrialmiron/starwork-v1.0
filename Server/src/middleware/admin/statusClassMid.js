function statusClassMid(req, res, next) {
    const { id, status } = req.body;

    try {
        if (!id) {
            throw new Error("El ID de la clase es requerido para realizar la actualización");
        }

        if (isNaN(parseInt(id)) || parseInt(id) < 1) {
            throw new Error("El ID de la clase debe ser un número entero positivo");
        }

        if (typeof status !== 'boolean') {
            throw new Error("El estado de la clase debe ser un valor booleano (true o false)");
        }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = statusClassMid;
