const { Model, DataTypes } = require("sequelize");

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        department_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        sys_id: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "services",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "service_department",
      allowNull: false,
    });
    this.hasMany(models.User, {
      foreignKey: "service_id",
      as: "service_user",
      allowNull: false,
    });
  }
}
module.exports = Service;
