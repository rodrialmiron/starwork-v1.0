const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Enrollment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      completionDate: {
        type: DataTypes.DATE,
        defaultValue: null,
        validate: {
          isDate: {
            msg: "La fecha de finalización debe ser una fecha válida, si se proporciona",
          },
          customValidator(value) {
            if (value && this.enrollmentDate && new Date(value) < new Date(this.enrollmentDate)) {
              throw new Error("La fecha de finalización no puede ser anterior a la fecha de inscripción");
            }
          },
        },
      },
      progress: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          min: {
            args: [0.0],
            msg: "El progreso no puede ser menor que 0",
          },
          max: {
            args: [100.0],
            msg: "El progreso no puede ser mayor que 100",
          },
        },
      },
      classView: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      id_supervisor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    { timestamps: true }
  );
};
