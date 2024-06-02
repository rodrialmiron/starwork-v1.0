const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_DEPLOY } = process.env;
const pg = require("pg");

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  dialectModule: pg,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { AccessCode, Class, Course, Enrollment, InvitationUser, Roles, User, Verify } = sequelize.models;

User.belongsTo(Roles, { foreignKey: "id_role" });
Roles.hasMany(User, { foreignKey: "id_role" });

User.hasMany(AccessCode, { as: "CreatedCodes", foreignKey: "id_creator" });
AccessCode.belongsTo(User, { as: "Creator", foreignKey: "id_creator" });

AccessCode.hasMany(User, { as: "Users", foreignKey: "id_code" });
User.belongsTo(AccessCode, { as: "AccessCode", foreignKey: "id_code" });

AccessCode.belongsTo(Roles, { foreignKey: "id_role" });
Roles.hasMany(AccessCode, { foreignKey: "id_role" });

User.belongsToMany(Course, { through: Enrollment, foreignKey: "id_user" });
Course.belongsToMany(User, { through: Enrollment, foreignKey: "id_course" });

User.hasMany(Enrollment, { foreignKey: "id_supervisor" });
Enrollment.belongsTo(User, { as: "supervisor", foreignKey: "id_supervisor" });

Course.hasMany(Class, { foreignKey: "id_course" });
Class.belongsTo(Course, { foreignKey: "id_course" });

Course.hasMany(InvitationUser, { foreignKey: "id_course" });
InvitationUser.belongsTo(Course, { foreignKey: "id_course" });

Class.belongsToMany(User, {
  through: InvitationUser,
  foreignKey: "id_class",
});
User.belongsToMany(Class, {
  through: InvitationUser,
  foreignKey: "id_user",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
