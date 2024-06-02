require("dotenv").config();
const server = require("./src/server");
const { conn } = require("./src/db.js");

const cronjob = require("./src/utils/cronjob.js");
const { PORT } = process.env || 3001;

async function startServer() {
  try {
    await conn.authenticate();
    console.log("Connection has been established successfully.");
    await conn.sync({ force: false });
    console.log("All models were synchronized successfully");
    await cronjob();
    console.log("cronjob activado");
    await server.listen(PORT, () => {
      console.log(`Server is active and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect:", error.message);
  }
}

startServer();
