const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      topic: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El tema no puede estar vacio",
          },
          is: {
            args: /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/,
            msg: "El tema solo puede incluir letras, numeros, espacios, puntos, comas, signos de interrogación, de exclamación, guiones y caracteres diacríticos.",
          },
          len: {
            args: [1, 100],
            msg: "El tema debe tener entre 1 y 100 caracteres",
          },
        },
      },
      courseName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          args: true,
          msg: "Este nombre del curso ya esta en uso.",
        },
        validate: {
          notEmpty: {
            msg: "El nombre del curso no puede estar vacio",
          },
          is: {
            args: /^[a-zA-Z0-9\s.,'?!¡¿\-()áéíóúÁÉÍÓÚñÑüÜçÇßàèìòùÀÈÌÒÙ]*$/,
            msg: "El nombre del curso solo puede incluir letras, numeros, espacios, puntos, comas, signos de interrogación, de exclamación, guiones y caracteres diacríticos.",
          },
          len: {
            args: [5, 100],
            msg: "El nombre del curso debe tener entre 5 y 100 caracteres",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La descripcion no puede estar vacia",
          },
          len: {
            args: [10, 200],
            msg: "La descripcion debe tener entre 10 y 200 caracteres",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeValidate: (course, options) => {
          if (course.topic) {
            course.topic = course.topic.trim();
          }
          if (course.courseName) {
            course.courseName = course.courseName.trim();
          }
        },
      },
    }
  );
};
