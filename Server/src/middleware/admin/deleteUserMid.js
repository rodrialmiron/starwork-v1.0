function deleteUserMid(req, res, next) {
  const { id } = req.params;

  try {
      if (!id) {
          throw new Error("El ID del usuario es requerido para eliminarlo");
      }

      if (isNaN(parseInt(id)) || parseInt(id) < 1) {
          throw new Error("El ID del usuario debe ser un número entero positivo");
      }

      next();
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

module.exports = deleteUserMid;
