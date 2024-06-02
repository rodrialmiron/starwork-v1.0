const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Verify",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          args: true,
          msg: "Este correo electronico ya esta en uso",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Debe proporcionar una dirección de correo electronico valida",
          },
        },
      },
      code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "El codigo no puede estar vacio",
          },
        },
      },
      deletedCode: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      paranoid: false,
    }
  );
};
