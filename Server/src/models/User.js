const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: "El nombre no puede estar vacío" },
          is: {
            args: /^[a-zA-Z\s]*$/,
            msg: "El nombre solo puede contener letras y espacios",
          },
          len: {
            args: [2, 50],
            msg: "El nombre debe tener entre 2 y 50 caracteres",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { msg: "El apellido no puede estar vacío" },
          is: {
            args: /^[a-zA-Z\s]*$/,
            msg: "El apellido solo puede contener letras y espacios",
          },
          len: {
            args: [2, 50],
            msg: "El apellido debe tener entre 2 y 50 caracteres",
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El password no puede estar vacío",
          },
          len: {
            args: [6, 255],
            msg: "La contraseña debe tener al menos 6 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          args: true,
          msg: "Este correo electronico ya esta en uso.",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Debe proporcionar una direccion de correo electronico valida.",
          },
          notEmpty: {
            args: true,
            msg: "El campo del correo electronico no puede estar vacio",
          },
          len: {
            args: [6, 100],
            msg: "El correo electronico debe tener entre 6 a 100 caracteres",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "El número de teléfono no puede estar vacío",
          },
          is: {
            args: /^\+[1-9]\d*$/,
            msg: "El numero de telefono debe comenzar con el signo +, seguido de un digito de 1 a 9, y luego cualquier combinacion de digitos.",
          },
          len: {
            args: [3, 15],
            msg: "El numero de telefono debe tener entre 3 y 15 caracteres",
          },
        },
      },
      company: {
        type: DataTypes.STRING(100),
        defaultValue: "No especificado",
        validate: {
          is: {
            args: /^[a-zA-Z\s\-]+$/,
            msg: "Company solo puede contener letras, espacios y guiones",
          },
          len: {
            args: [2, 100],
            msg: "Company debe tener entre 2 y 100 caracteres",
          },
        },
      },
      position: {
        type: DataTypes.STRING(100),
        defaultValue: "No especificado",
        validate: {
          is: {
            args: /^[a-zA-Z\s\-]+$/,
            msg: "Cargo solo puede contener letras, espacios y guiones",
          },
          len: {
            args: [2, 100],
            msg: "Cargo debe tener entre 2 y 100 caracteres",
          },
        },
      },
      sector: {
        type: DataTypes.STRING(100),
        defaultValue: "No especificado",
        validate: {
          is: {
            args: /^[a-zA-Z\s\-]+$/,
            msg: "Sector solo puede contener letras, espacios y guiones",
          },
          len: {
            args: [2, 100],
            msg: "Sector debe tener entre 2 y 100 caracteres",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      emailIsVerify: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      limitSlot: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      usedSlot: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeValidate: (user, options) => {
          const normalizeText = (text, defaultValue = "") => {
            return (text || defaultValue).trim();
          };

          user.firstName = normalizeText(user.firstName);
          user.lastName = normalizeText(user.lastName);
          user.email = normalizeText(user.email);
          user.company = normalizeText(user.company, "No especificado");
          user.position = normalizeText(user.position, "No especificado");
          user.sector = normalizeText(user.sector, "No especificado");
          user.phoneNumber = (user.phoneNumber || "").trim();
        },
      },
    }
  );
};
