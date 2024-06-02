export const validationsRecovery = (property, value) => {
    const errors = {};
   
    const emailRegex =
     /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
   
    if (property === "email") {
     if (!emailRegex.test(value)) {
      errors.email = "Por favor, ingrese un email válido";
     }
     if (value.length === 0) {
      errors.email = "Este campo no puede estar vacío";
     }
     if (value.length > 100) {
      errors.email = "El correo es demasiado largo";
     }
    }
    return errors;
   };