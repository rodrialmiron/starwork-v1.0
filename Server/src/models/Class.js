const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Class",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      classNumber:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      classTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          args: true,
          msg: "Este titulo ya esta en uso.",
        },
        validate: {
          notEmpty: {
            msg: "El titulo de la clase no puede estar vacío",
          },
          is: {
            args: /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/,
            msg: "El título de la clase solo puede incluir letras, numeros, espacios, puntos, comas, signos de interrogación, de exclamación, guiones y caracteres diacríticos.",
          },
          len: {
            args: [5, 100],
            msg: "El titulo de la clase debe tener entre 5 y 100 caracteres",
          },
        },
      },
      classContent: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "El contenido de la clase no puede estar vacío",
          },
          len: {
            args: [10, 200],
            msg: "El contenido de la clase debe tener entre 10 y 200 caracteres",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      link: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El enlace no puede estar vacío",
          },
          isUrl: {
            msg: "El enlace debe ser una URL valida",
          },
        },
      },
      menssage: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El mensaje no puede estar vacío",
          },
          len: {
            args: [10, 500],
            msg: "El mensaje debe tener entre 10 y 500 caracteres",
          },
        },
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeValidate: (cls, options) => {
          if (cls.classTitle) {
            cls.classTitle = cls.classTitle.trim();
          }
          if (cls.classContent) {
            cls.classContent = cls.classContent.trim();
          }
        },
      },
    }
  );
};
