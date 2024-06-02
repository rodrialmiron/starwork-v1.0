const verifyRecoverMid = (req, res, next) => {
  const { email, codeUser } = req.body;
  try {
    if (!email || !codeUser) {
      throw new Error("Datos faltantes");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del email no es valido");
    }

    if (codeUser.length > 20) {
      throw new Error("La longitud de este codigo es inusualmente larga");
    }

    if (typeof codeUser !== "string") {
      throw new Error("El código de recuperación debe ser un string");
    }
    
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = verifyRecoverMid;
