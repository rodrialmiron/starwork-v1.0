const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Roles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.ENUM("Admin", "Supervisor", "Collaborator"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
