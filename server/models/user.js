export default (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      isNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid Email",
        },
      },
    },
  });

  return User;
};
