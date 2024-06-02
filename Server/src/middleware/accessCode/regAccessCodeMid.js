const regAccessCodeMid = (req, res, next) => {
  try {
    const { code, email, limitCode } = req.body;

    if (!code || typeof code !== "string" || code.trim() === "") {
      throw new Error("El código personalizado es obligatorio y no puede estar vacío");
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      throw new Error("El correo electrónico es obligatorio y no puede estar vacío");
    } else {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(email)) {
        throw new Error("Ingrese un correo electrónico válido");
      }
    }

    if (limitCode) {
      if (typeof limitCode !== "number" || limitCode <= 0) {
        throw new Error("Limite del codigo debe ser un número entero positivo");
      }
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  regAccessCodeMid,
};
