function deleteClassMid(req, res, next) {
    const { id } = req.params;

    try {

        if (!id) {
            throw new Error("El ID de la Clase es requerido para realizar la eliminación");
          }
      
          if (isNaN(parseInt(id)) || parseInt(id) < 1) {
            throw new Error("El ID del usuario debe ser un número entero positivo");
          }

        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = deleteClassMid;
