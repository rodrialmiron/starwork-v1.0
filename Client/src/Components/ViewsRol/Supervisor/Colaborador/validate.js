function validarNumero(event) {
  const input = event.target;
  const valor = input.value.replace(/\D/g, "");
  input.value = valor;
}
export default validarNumero;
