const { Model, DataTypes } = require("sequelize");

class Department extends Model {
  static init(sequelize) {
    super.init(
      {
        entity_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        sys_id: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "departments",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Entity, {
      foreignKey: "entity_id",
      as: "department_entity",
      allowNull: false,
    });
    this.hasMany(models.Service, {
      foreignKey: "department_id",
      as: "department_service",
      allowNull: false,
    });
  }
}
module.exports = Department;
