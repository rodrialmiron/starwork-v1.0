function restarTresMin(horaCreacionCod) {
  const fechaActual = new Date();
  const tiempoTranscurrido = fechaActual - new Date(horaCreacionCod);
  const tiempoRestante = 180000 - tiempoTranscurrido;
  const minutos = Math.floor((tiempoRestante / 1000 / 60) % 60);
  const segundos = Math.floor((tiempoRestante / 1000) % 60);

  if (tiempoRestante <= 0) {
    return "Tiempo expirado";
  }

  return `${minutos} min ${segundos} seg`;
}
export default restarTresMin;
