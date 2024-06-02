const updateProfileMid = (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, position, sector } = req.body;

    if (!firstName || typeof firstName !== "string" || firstName.trim() === "") {
      throw new Error("El nombre es requerido y debe ser un string");
    } else if (!/^[a-zA-Z\s\-]+$/.test(firstName)) {
      throw new Error("El nombre solo puede contener letras, espacios y guiones");
    } else if (firstName.length < 2 || firstName.length > 50) {
      throw new Error("El nombre debe tener entre 2 y 50 caracteres");
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim() === "") {
      throw new Error("El apellido es requerido y debe ser un string");
    } else if (!/^[a-zA-Z\s\-]+$/.test(lastName)) {
      throw new Error("El apellido solo puede contener letras, espacios y guiones");
    } else if (lastName.length < 2 || lastName.length > 50) {
      throw new Error("El apellido debe tener entre 2 y 50 caracteres");
    }

    if (!email || !isValidEmail(email)) {
      throw new Error("Ingrese un correo electrónico válido");
    }

    if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
      throw new Error("Ingrese un número de teléfono válido");
    }

    if (!company || typeof company !== "string" || company.trim() === "") {
      throw new Error("El nombre de la empresa es requerido y debe ser un string");
    } else if (!/^[a-zA-Z\s\-]+$/.test(company)) {
      throw new Error("El nombre de la empresa solo puede contener letras, espacios y guiones");
    } else if (company.length < 2 || company.length > 100) {
      throw new Error("El nombre de la empresa debe tener entre 2 y 100 caracteres");
    }

    if (!position || typeof position !== "string" || position.trim() === "") {
      throw new Error("El cargo es requerido y debe ser un string");
    } else if (!/^[a-zA-Z\s\-]+$/.test(position)) {
      throw new Error("El cargo solo puede contener letras, espacios y guiones");
    } else if (position.length < 2 || position.length > 100) {
      throw new Error("El cargo debe tener entre 2 y 100 caracteres");
    }

    if (!sector || typeof sector !== "string" || sector.trim() === "") {
      throw new Error("El sector es requerido y debe ser un string");
    } else if (!/^[a-zA-Z\s\-]+$/.test(sector)) {
      throw new Error("El sector solo puede contener letras, espacios y guiones");
    } else if (sector.length < 2 || sector.length > 100) {
      throw new Error("El sector debe tener entre 2 y 100 caracteres");
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+[1-9]\d*$/;
  return phoneRegex.test(phoneNumber);
};

module.exports = updateProfileMid;
