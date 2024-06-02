function registerMid(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      company,
      position,
      sector,
      code
    } = req.body;

    try {
        if (!email || email.trim() === "") {
            throw new Error("El email es obligatorio y no puede estar vacio.");
        }
        if (email.trim().length > 100) {
            throw new Error("El email debe tener menos de 100 caracteres.");
        }
        if (!password || password.trim() === "") {
            throw new Error("La contraseña es obligatoria y no puede estar vacia.");
        }
        if (password.trim().length < 6 || password.trim().length > 255) {
            throw new Error("La contraseña debe tener entre 6 y 255 caracteres.");
        }
        if (!firstName || firstName.trim() === "") {
            throw new Error("El nombre es obligatorio y no puede estar vacio.");
        }
        if (firstName.trim().length < 2 || firstName.trim().length > 50) {
            throw new Error("El nombre debe tener entre 2 y 50 caracteres.");
        }
        if (!lastName || lastName.trim() === "") {
            throw new Error("El apellido es obligatorio y no puede estar vacio.");
        }
        if (lastName.trim().length < 2 || lastName.trim().length > 50) {
            throw new Error("El apellido debe tener entre 2 y 50 caracteres.");
        }
        if (!phoneNumber || phoneNumber.trim() === "") {
            throw new Error("El numero de telefono es obligatorio y no puede estar vacio.");
        }
        if (phoneNumber.trim().length < 3 || phoneNumber.trim().length > 15) {
            throw new Error("El numero de telefono debe tener entre 3 y 15 caracteres.");
        }
        if (!code || code.trim() === "") {
            throw new Error("El codigo es obligatorio y no puede estar vacio.");
        }
        if (company && company.trim() === "") {
            throw new Error("El nombre de la empresa no puede estar vacio si se proporciona.");
        }
        if (company && (company.trim().length < 2 || company.trim().length > 100)) {
            throw new Error("El nombre de la empresa debe tener entre 2 y 100 caracteres.");
        }
        if (position && position.trim() === "") {
            throw new Error("El cargo no puede estar vacío si se proporciona.");
        }
        if (position && (position.trim().length < 2 || position.trim().length > 100)) {
            throw new Error("El cargo debe tener entre 2 y 100 caracteres.");
        }
        if (sector && sector.trim() === "") {
            throw new Error("El sector no puede estar vacío si se proporciona.");
        }
        if (sector && (sector.trim().length < 2 || sector.trim().length > 100)) {
            throw new Error("El sector debe tener entre 2 y 100 caracteres.");
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new Error("El formato del email no es válido.");
        }
        if (!/^\+?(\d.*){3,}$/.test(phoneNumber)) {
            throw new Error("El numero de telefono no es valido.");
        }

        next();
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = registerMid;
