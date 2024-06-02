function loginMid(req, res, next) {
  const { email, password } = req.body;
  
  try {

    if (!email || email.trim() === "") {
      throw new Error("El email debe existir");
    }

    if (email.trim().length < 6 || email.trim().length > 100) {
      throw new Error(
        "El correo electronico debe contener mas de 6 caracteres y menor de 100"
      );
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw new Error("El formato del correo electrinico no es válido.");
    }

    if (!password || password.trim() === "") {
      throw new Error("La contraseña debe de existir");
    }

    if (password.trim().length < 6 || password.trim().lenght > 255) {
      throw Error("La contraseña debe tener mas de 6 caracteres y menor a 255");
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = loginMid;
