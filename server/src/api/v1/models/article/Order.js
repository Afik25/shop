const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        partner_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        status: DataTypes.STRING,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "orders",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Partner, {
      foreignKey: "partner_id",
      as: "order_partner",
      allowNull: false,
    });
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "order_user",
      allowNull: false,
    });
    this.hasMany(models.DetailsOrder, {
      foreignKey: "order_id",
      as: "order_detailsOrder",
      allowNull: false,
    });
  }
}
module.exports = Order;
