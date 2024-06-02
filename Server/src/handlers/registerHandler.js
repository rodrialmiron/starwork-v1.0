const registerUser = require("../controllers/registerUser");

const registerHandler = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, company, position, sector, code } = req.body;

  const createdAt = req.createdAt;

  try {
    const newUser = await registerUser(
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      company,
      position,
      sector,
      code
    );
    return res.status(201).send({ message: "Usuario registrado con exito", codeVerify: createdAt, newUser });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).send({ error: error.errors[0].message });
    } else {
      return res.status(500).send({ error: error.message });
    }
  }
};

module.exports = registerHandler;
