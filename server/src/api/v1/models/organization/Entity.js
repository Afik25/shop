const { Model, DataTypes } = require("sequelize");

class Entity extends Model {
  static init(sequelize) {
    super.init(
      {
        organization_id: DataTypes.INTEGER,
        type: DataTypes.STRING,
        telephone: DataTypes.STRING,
        address: DataTypes.STRING,
        sys_id: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "entities",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Organization, {
      foreignKey: "organization_id",
      as: "entity_organization",
      allowNull: false,
    });
    this.hasMany(models.Department, {
      foreignKey: "entity_id",
      as: "entity_department",
      allowNull: false,
    });
  }
}
module.exports = Entity;
