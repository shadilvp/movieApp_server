import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import User from "./userModel.js";

const Movie = sequelize.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "movies",
    timestamps: true,
  }
);

User.hasMany(Movie, { foreignKey: "userId" });
Movie.belongsTo(User, { foreignKey: "userId" });

export default Movie;
