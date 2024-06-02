const getClasses = require("../../controllers/admin/getClasses.js");
 
const classHandler = async (req, res) => {
  const { id_course } = req.params;
  try {
    const classes = await getClasses(id_course);
    return res.status(200).send(classes);
  } catch (error) {
    if (error.message === "No se encontraron clases para el curso proporcionado") {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = classHandler;
