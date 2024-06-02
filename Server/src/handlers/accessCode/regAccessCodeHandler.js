const {
  regAccessCodeADMIN,
} = require("../../controllers/accesCode/regAccessCodeADMIN.js");
const {
  regAccessCodeSUP,
} = require("../../controllers/accesCode/regAccessCodeSUP.js");

module.exports = {
  regAccessCodeHandler: async (req, res) => {
    const { code, email, limitCode } = req.body;
    const roleSession = req.role;
    const id = req.id;

    try {
      let accessCode;
      if (roleSession === 1) {
        accessCode = await regAccessCodeADMIN(code, email, id);
      }
      if (roleSession === 2) {
        accessCode = await regAccessCodeSUP(code, email, id, limitCode);
      }

      res.status(201).json({
        message: "Código de acceso registrado con éxito",
        accessCode,
      });
    } catch (error) {
      if (error.message === "Rol no encontrado") {
        res.status(404).json({ error: error.message });
      } else if (
        error.message ===
        "Parece que hubo un error en el registro, por favor intenta de nuevo"
      ) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
