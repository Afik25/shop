const { Model, DataTypes } = require("sequelize");

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        organization_id: DataTypes.INTEGER,
        dates_sub: DataTypes.DATE,
        type_sub: DataTypes.STRING,
        package_sub: DataTypes.STRING,
        amount: DataTypes.DOUBLE,
        currency: DataTypes.STRING,
        reference_transaction: DataTypes.STRING,
        transaction_status: DataTypes.STRING,
        pay_method: DataTypes.STRING,
        end_sub: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "payments",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Organization, {
      foreignKey: "organization_id",
      as: "payment_organization",
      allowNull: false,
    });
    this.hasMany(models.Subscription, {
      foreignKey: "payment_id",
      as: "payment_subscription",
      allowNull: false,
    });
  }
}
module.exports = Payment;
