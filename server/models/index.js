import Sequelize from "sequelize";
import user from "./user.js";
import file from "./file.js";

const sequelize = new Sequelize("uploader", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  define: {
    underscored: true,
  },
});

const models = {
  User: user(sequelize, Sequelize.DataTypes),
  File: file(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
