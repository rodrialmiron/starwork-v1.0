const { Op } = require("sequelize");
const { User, AccessCode, Roles } = require("../db");

const searchUsers = async (query, id) => {
  const getAllCode = await AccessCode.findAll({ where: { id_creator: id } });

  if (getAllCode.length === 0) {
    throw new Error("Aun no existen usuarios registrados bajo su supervision");
  }

  const allUsers = await Promise.all(
    getAllCode.map(async (code) => {
      try {
        return await User.findAll({
          where: { id_code: code.id },
          include: [
            {
              model: Roles,
              attributes: ["roleName"],
            },
            {
              model: AccessCode,
              as: "AccessCode",
              attributes: ["code"],
            },
          ],
        });
      } catch (error) {
        throw new Error("Error al buscar usuarios: " + error.message);
      }
    })
  );

  const flattenedUsers = allUsers.flat();

  const filteredUsers = flattenedUsers.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.company.toLowerCase().includes(query.toLowerCase())
    );
  });

  if (filteredUsers.length > 0) {
    return filteredUsers;
  } else {
    throw new Error("No se encontraron coincidencias");
  }
};

module.exports = searchUsers;
