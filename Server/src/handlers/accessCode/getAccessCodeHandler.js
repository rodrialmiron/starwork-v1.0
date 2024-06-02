const {
  getAccessCode,
} = require("../../controllers/accesCode/getAccessCode.js");

module.exports = {
  getAccessCodeHandler: async (req, res) => {
    const id = req.id;
    try {
      const allAccessCode = await getAccessCode(id);
      res.status(201).json(allAccessCode);
    } catch (error) {
      if (error.message === "Aún no existen codigos creados") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
