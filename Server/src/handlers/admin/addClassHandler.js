const addClass = require("../../controllers/admin/addClass.js");

const addClassHandler = async (req, res) => {
  const { classTitle, classContent, id_course, link, menssage } = req.body;
  try {
    const result = await addClass({
      classTitle,
      classContent,
      link,
      menssage,
      id_course,
    });

    return res.status(201).json({
      message: `Clase ${result.classTitle} creada con éxito`,
      result,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).send({ error: "Ya existe una clase con este título." });
    } else if (error.message === "La clase debe pertenecer a un curso válido") {
      return res.status(400).send({ error: error.message });
    } else if (error.message === "Ya existe una clase con este título.") {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "El enlace que estas ingresando ya pertenece a otra clase") {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "No se pudo ordenar las clases") {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "No se pudo crear la nueva clase") {
      return res.status(500).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = addClassHandler;
