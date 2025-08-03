// models/index.js

import sequelize from "./sequelize.js"
import User from "./userModel.js";
import Movie from "./movieModel.js";

// Define associations
User.hasMany(Movie, { foreignKey: "userId", onDelete: "CASCADE" });
Movie.belongsTo(User, { foreignKey: "userId" });

const db = {
  sequelize,
  User,
  Movie,
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized");
  } catch (error) {
    console.error("❌ DB error:", error);
  }
})();

export default db;
