export const ValidationCode = (property, value) => {
 const errors = {};
 if (
  property === "code1" ||
  property === "code2" ||
  property === "code3" ||
  property === "code4" ||
  property === "code5"
 ) {
  if (!value || value.length === 0) {
   errors[property] = "Debe completar todos los campos";
  }
 }
 return errors;
};
