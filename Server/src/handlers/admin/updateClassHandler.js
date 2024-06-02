const updatedClass = require("../../controllers/admin/updateClass.js");

const updateClassHandler = async (req, res) => {
  const { id, classTitle, classContent, link, menssage, id_course } = req.body;
  try {
    const result = await updatedClass({
      id,
      classTitle,
      classContent,
      link,
      menssage,
      id_course,
    });
    return res.status(200).send({ message: "La clase ha sido actualizada correctamente", result });
  } catch (error) {
    if (error.message === `No se encontró la clase que intenta modificar`) {
      return res.status(404).send({ error: error.message });
    } else if (error.message === `El título '${classTitle}' ya está en uso por otra clase`) {
      return res.status(401).send({ error: error.message });
    } else if (error.menssage === `El enlace '${link}' ya está en uso por otra clase`) {
      return res.status(401).send({ error: error.menssage });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = updateClassHandler;
