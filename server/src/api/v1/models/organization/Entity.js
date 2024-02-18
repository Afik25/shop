const { Model, DataTypes } = require("sequelize");

class Entity extends Model {
  static init(sequelize) {
    super.init(
      {
        organization_id: DataTypes.INTEGER,
        type: DataTypes.STRING,
        telephone: DataTypes.STRING,
        address: DataTypes.STRING,
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
      as: "organization_entity",
      allowNull: false,
    });
    this.hasMany(models.User, {
      foreignKey: "entity_id",
      as: "entity_user",
      allowNull: false,
    });
    this.hasMany(models.Grouped, {
      foreignKey: "entity_id",
      as: "entity_grouped",
      allowNull: false,
    });
  }
}
module.exports = Entity;
