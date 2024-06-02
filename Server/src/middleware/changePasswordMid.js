const changePasswordMid = (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Datos faltantes");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del email no es valido");
    }

    if (password.length < 6 || password.length > 255) {
      throw new Error(
        "La contraseña debe ser mayor a 6 caracteres y menor de 255"
      );
    }

    if (typeof password !== "string") {
      throw new Error("La contraseña debe ser de tipo string");
    }

    next()
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = changePasswordMid;
