const getEnrollments = require("../../controllers/supervisor/getEnrollments");

const getEnrollmentsHandler = async (req, res) => {
  const id = req.id;

  try {
    const enrollments = await getEnrollments(id);

    return res.status(200).send(enrollments);
  } catch (error) {
    if (error.message === "Aún no tienes colaboradores a tu cargo para ver su seguimiento") {
      return res.status(404).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = getEnrollmentsHandler;
