// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  let sequelizeClient = app;
  if (typeof app.get !== "undefined" && typeof app.get === "function") {
    sequelizeClient = app.get("sequelizeClient");
  }
  const machinerequests = sequelizeClient.define('machinerequests', {
    requestedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    approvalStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  machinerequests.associate = function (models) {
    machinerequests.belongsTo(models.machine);
    machinerequests.belongsTo(models.users);

    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return machinerequests;
};
