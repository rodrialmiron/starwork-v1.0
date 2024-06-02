const { Router } = require("express");
const updateProfile = require("../../controllers/profile/updateProfile.js");
const getProfile = require("../../controllers/profile/getProfile.js");
const updateProfileMid = require("../../middleware/updateProfileMid.js");

const profileRoute = Router();

profileRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await getProfile(id);
    res.status(200).send(profile);
  } catch (error) {
    if (error.message === "Usuario no encontrado") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

profileRoute.put("/update", updateProfileMid, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, position, sector, id } = req.body;
  try {
    const result = await updateProfile({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      position,
      sector,
      id,
    });
    res.status(200).send({ message: "Datos actualizados", result });
  } catch (error) {
    if (error.message === "El email que estas ingresando ya se encuentra en uso por otro usuario") {
      return res.status(409).send({ error: error.message });
    } else if (error.message === "Error al modificar los datos") {
      return res.status(500).send({ error: error.message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
});

module.exports = profileRoute;
