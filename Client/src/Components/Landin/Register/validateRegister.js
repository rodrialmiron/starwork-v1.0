export const validateRegister = (property, value, password) => {
  const errors = {};
  const specialCharRegex = /^[^\W_]+(?: [\^\W_]+)*$/;
  const letrasRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.()])/;
  const phoneRegex = /^\+?\d+$/;
  const phoneRegex1 = /^\+?(\d.*){3,}$/;
  const phoneRegex2 = /^\+[1-9]\d*$/;

  if (property === "code") {
    if (value.length === 0) {
      errors.code = "Este campo no puede estar vacío";
    }
    if (value.length > 30) {
      errors.code = "Este campo no puede tener más de 30 caracteres";
    }
  }
  if (property === "firstName") {
    if (value.length === 0) {
      errors.firstName = "Este campo no puede estar vacío";
    }
    if (value.length !== 0 && value.length < 2) {
      errors.firstName = "Este campo no puede tener menos de 2 caracteres";
    }
    if (value.length > 35) {
      errors.firstName = "Este campo no puede tener más de 35 caracteres";
    }

    if (!letrasRegex.test(value)) {
      errors.firstName = "Este campo solo puede contener letras";
    }
  }

  if (property === "lastName") {
    if (value.length === 0) {
      errors.lastName = "Este campo no puede estar vacío";
    }
    if (value.length !== 0 && value.length < 2) {
      errors.lastName = "Este campo no puede tener menos de 2 caracteres";
    }
    if (value.length > 35) {
      errors.lastName = "Este campo no puede tener más de 35 caracteres";
    }
    if (!letrasRegex.test(value)) {
      errors.lastName = "Este campo solo puede contener letras";
    }
  }
  if (property === "phoneNumber") {
    if (value.length === 0) {
      errors.phoneNumber = "Este campo es obligatorio";
    } else if (!phoneRegex.test(value)) {
      errors.phoneNumber = "Solo puede contener numeros";
    } else if (value.length < 8 || value.length > 15) {
      errors.phoneNumber =
        "Debe tener un mínimo de 8 números y un máximo de 15 números";
    } else if (!phoneRegex1.test(value)) {
      errors.phoneNumber = "El numero de telefono no es valido.";
    } else if (!phoneRegex2.test(value)) {
      errors.phoneNumber =
        "El numero de telefono debe comenzar con el signo +, seguido de un digito de 1 a 9, y luego cualquier combinacion de digitos.";
    }
  }

  if (property === "email") {
    if (value.length === 0) {
      errors.email = "Este campo no puede estar vacío";
    } else if (!emailRegex.test(value)) {
      errors.email = "Debe ingresar un correo válido";
    }
    if (value.length > 50) {
      errors.email = "El correo es demasiado largo";
    }
  }

  if (property === "password") {
    if (value.length === 0) {
      errors.password = "Este campo es obligatorio";
    } else if (!passwordRegex.test(value)) {
      errors.password =
        "La contraseña debe comenzar con mayúscula, contener un número y un carácter especial";
    } else if (value.length < 8) {
      errors.password = "Contraseña muy corta";
    } else if (value.length > 50) {
      errors.password = "Contraseña muy larga";
    }
  }

  if (property === "repeatPassword") {
    if (value !== password) {
      errors.repeatPassword = "Las constraseñas no coinciden";
    }
  }

  if (property === "company") {
    if (value.length === 0) {
      errors.company = "Este campo es obligatorio";
    }
    if (value.length > 50) {
      errors.company = "Este campo no puede tener más de 30 caracteres";
    }

    if (!letrasRegex.test(value)) {
      errors.company = "Este campo solo puede contener letras";
    }
  }

  if (property === "position") {
    if (value.length === 0) {
      errors.position = "Este campo es obligatorio";
    }
    if (value.length > 50) {
      errors.position = "Este campo no puede tener más de 30 caracteres";
    }
    if (!letrasRegex.test(value)) {
      errors.position = "Este campo solo puede contener letras";
    }
  }

  if (property === "sector") {
    if (value.length === 0) {
      errors.sector = "Este campo es obligatorio";
    }
    if (value.length > 50) {
      errors.sector = "Este campo no puede tener más de 50 caracteres";
    }
    if (!letrasRegex.test(value)) {
      errors.sector = "Este campo solo puede contener letras";
    }
  }

  return errors;
};
