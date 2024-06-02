function userActivesMid(req, res, next) {
  const { firstName } = req.query;

  const validNameRegex = /^[a-zA-Z\s]*$/;

  try {
    if (firstName) {
      if (firstName.trim().length > 50) {
        throw new Error("No existen nombres con más de 50 caracteres");
      }

      if (!validNameRegex.test(firstName)) {
        throw new Error("El nombre solo puede contener letras y espacios");
      }
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = userActivesMid;
