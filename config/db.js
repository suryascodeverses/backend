const { Sequelize } = require("sequelize");
const { secret } = require("./secret");
process.env.db_name;
const sequelize = new Sequelize(
  process.env.db_name,
  process.env.db_user,
  process.env.db_pass,
  {
    host: process.env.db_host || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
};

module.exports = { sequelize, connectDB };
