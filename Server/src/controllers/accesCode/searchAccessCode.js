const { Op } = require("sequelize");
const { AccessCode } = require("../../db.js");

const searchAccessCode = async (id, query) => {
  const searchCode = await AccessCode.findAll({
    where: {
      id_creator: id,
      code: {
        [Op.iLike]: `%${query}%`,
      },
    },
  });

  if (searchCode.length > 0) {
    return searchCode;
  } else {
    throw new Error("No se encontraron códigos que coincidan con la búsqueda");
  }
};

module.exports = {
  searchAccessCode,
};
