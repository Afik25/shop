const { Model, DataTypes } = require("sequelize");

class Module extends Model {
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
        tableName: "modules",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Subscription, {
      foreignKey: "module_id",
      as: "module_subscription",
      allowNull: false,
    });
  }
}

module.exports = Module;
