export const validationForm=(property, value, password)=>{
    const errors = {};   
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.()])/;   
    
      if (property === "password"){
        if (value.length === 0) {
          errors.password = 'Este campo es obligatorio';
        } else if (!passwordRegex.test(value)) {
        errors.password = 'La contraseña debe comenzar con mayúscula, contener un número y un carácter especial';
        } else if(value.length < 8 ){
          errors.password='Contraseña muy corta'
        }else if(value.length > 50 ){
          errors.password='Contraseña muy larga'
        }
        
      }
    
      if (property === "repeatPassword"){
        if(value !== password) {
          errors.repeatPassword = "Las constraseñas no coinciden"
        }
      }
      
       return errors;
   }