// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  let sequelizeClient = app;
  if (typeof app.get !== "undefined" && typeof app.get === "function") {
    sequelizeClient = app.get("sequelizeClient");
  }
  const machine = sequelizeClient.define('machine', {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  machine.associate = function (models) {
    machine.belongsTo(models.users);
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return machine;
};
