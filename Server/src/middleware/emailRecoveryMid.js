const emailRecoveryMid = (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error("El email es requerido");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del email no es valido");
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = emailRecoveryMid;
