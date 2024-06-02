const { User, AccessCode, Roles } = require("../db");

const getAllUsers = async (id, sortParam, sortOrder) => {
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

  let flattenedUsers = allUsers.flat();

  if (sortParam && sortOrder) {
    flattenedUsers.sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[sortParam] > b[sortParam] ? 1 : -1;
      } else {
        return a[sortParam] < b[sortParam] ? 1 : -1;
      }
    });
  }

  return flattenedUsers;
};

module.exports = getAllUsers;
