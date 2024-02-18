const { Model, DataTypes } = require("sequelize");

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        module_id: DataTypes.INTEGER,
        payment_id: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "subscriptions",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Payment, {
      foreignKey: "payment_id",
      as: "subscription_payment",
      allowNull: false,
    });
    this.belongsTo(models.Module, {
      foreignKey: "module_id",
      as: "subscription_module",
      allowNull: false,
    });
  }
}
module.exports = Subscription;
