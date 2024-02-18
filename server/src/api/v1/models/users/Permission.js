const { Model, DataTypes } = require("sequelize");

class Permission extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        subscription_id: DataTypes.INTEGER,
        write_action: DataTypes.BOOLEAN,
        read_action: DataTypes.BOOLEAN,
        update_action: DataTypes.BOOLEAN,
        delete_action: DataTypes.BOOLEAN,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "permissions",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "permission_user",
      allowNull: false,
    });
    this.belongsTo(models.Module, {
      foreignKey: "module_id",
      as: "permission_module",
      allowNull: false,
    });
  }
}

module.exports = Permission;
