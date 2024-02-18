const { Model, DataTypes } = require("sequelize");

class Partner extends Model {
  static init(sequelize) {
    super.init(
      {
        organization_id: DataTypes.INTEGER,
        names: DataTypes.STRING,
        partner_type: DataTypes.STRING, // customer or provider
        partner_form: DataTypes.STRING, // physical or moral
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
        tableName: "partners",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Organization, {
      foreignKey: "organization_id",
      as: "provider_organization",
      allowNull: false,
    });
    this.hasMany(models.Order, {
      foreignKey: "partner_id",
      as: "partner_order",
      allowNull: false,
    });
  }
}
module.exports = Partner;
