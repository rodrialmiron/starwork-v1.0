const { searchAccessCode } = require("../../controllers/accesCode/searchAccessCode.js");

module.exports = {
  searchAccessCodeHandler: async (req, res) => {
    const id = req.id;
    const { query } = req.query;
    try {
      const searchCode = await searchAccessCode(id, query);
      res.status(201).json(searchCode);
    } catch (error) {
      if (error.message === "No se encontraron códigos que coincidan con la búsqueda") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
