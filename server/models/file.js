export default (sequelize, DataTypes) => {
  const File = sequelize.define("file", {
    name: {
      type: DataTypes.STRING,
      isNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.BLOB,
      isNull: false,
    },
  });

  //   1 to 1 relation
  File.associate = (models) => {
    File.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return File;
};
