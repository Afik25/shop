const { Model, DataTypes } = require("sequelize");

class Compartiment extends Model {
  static init(sequelize) {
    super.init(
      {
        rack_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "compartiments",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Rack, {
      foreignKey: "rack_id",
      as: "compartiment_rack",
      allowNull: false,
    });
    this.hasMany(models.Grouped, {
      foreignKey: "compartiment_id",
      as: "compartiment_grouped",
      allowNull: false,
    });
  }
}
module.exports = Compartiment;
