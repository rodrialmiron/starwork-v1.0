export const useValidateFields = (target, value) =>{
    const error = {}
    if(target === 'description'){
        if(value.length >= 200)
        error.description = "La descripción no puede tener más de 200 caracteres"
    }

    return error
}