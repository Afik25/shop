const { Model, DataTypes } = require("sequelize");

class Rack extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "racks",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Compartiment, {
      foreignKey: "rack_id",
      as: "rack_compartiment",
      allowNull: false,
    });
  }
}
module.exports = Rack;
