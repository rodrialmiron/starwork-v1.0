const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "AccessCode",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "El código no puede estar vacio",
          },
          len: {
            args: [5, 20],
            msg: "El código debe tener entre 5 y 20 caracteres",
          },
        },
      },
      limitCode: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      usedCode: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    },
    {
      timestamps: true,
      hooks: {
        beforeValidate: (accessCode, options) => {
          accessCode.code = accessCode.code.trim();
        },
      },
    }
  );
};
