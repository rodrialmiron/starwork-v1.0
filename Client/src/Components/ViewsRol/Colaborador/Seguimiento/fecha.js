const fecha = (fechaCompleta) => {
  const fecha = new Date(fechaCompleta);

  const anio = fecha.getFullYear(); // Obtener el año (ejemplo: 2024)
  const mes = fecha.getMonth() + 1; // Obtener el mes (0-11, agregar +1 para obtener el mes real)
  const dia = fecha.getDate(); // Obtener el día del mes (1-31)

  const fechaFormateada = `${dia}/${mes}/${anio}`; // Formatear la fecha como dd/mm/yyyy

  return fechaFormateada;
};
export default fecha;
