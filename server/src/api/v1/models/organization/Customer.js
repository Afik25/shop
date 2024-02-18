const { Model, DataTypes } = require("sequelize");

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        organization_id: DataTypes.INTEGER,
        names: DataTypes.STRING,
        type: DataTypes.STRING, // physical or moral
        telephone: DataTypes.STRING,
        mail: DataTypes.STRING,
        address: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "customers",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Organization, {
      foreignKey: "organization_id",
      as: "customer_organization",
      allowNull: false,
    });
    this.hasMany(models.Order, {
      foreignKey: "customer_id",
      as: "customer_order",
      allowNull: false,
    });
  }
}
module.exports = Customer;
