const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        organization_id: DataTypes.INTEGER,
        title: DataTypes.STRING, // function title
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "roles",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Organization, {
      foreignKey: "organization_id",
      as: "organization_role",
      allowNull: false,
    });
    this.hasMany(models.User, {
      foreignKey: "role_id",
      as: "user_role",
      allowNull: false,
    });
  }
}

module.exports = Role;
