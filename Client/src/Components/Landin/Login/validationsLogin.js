export const validationsLogin = (property, value) => {
const errors = {}

const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

if(property === "email"){
if(value.length === 0){
errors.email = "Este campo no puede estar vacío"
}
if(!emailRegex.test(value)){
errors.email = "Por favor, ingrese un email válido"
}
if(value.length > 100){
    errors.email = "El correo es demasiado largo"
  } 
}

if(property === "password"){
    if(value.length === 0){
        errors.password = "Este campo no puede estar vacío"
    }
    if(value.length > 50 ){
        errors.password='Contraseña muy larga'
      }
}
    return errors
}