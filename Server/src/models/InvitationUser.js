const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "InvitationUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hour: {
        type: DataTypes.TIME,
      },
      dayOfWeek: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      sent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );
};
