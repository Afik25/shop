const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        entity_id: DataTypes.INTEGER,
        role_id: DataTypes.INTEGER,
        prename: DataTypes.STRING,
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        telephone: DataTypes.STRING,
        mail: DataTypes.STRING,
        birth: DataTypes.STRING,
        birth_location: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        thumbnails: DataTypes.STRING,
        is_completed: DataTypes.BOOLEAN,
        sys_role: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "users",
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          },
        },
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "user_role",
      allowNull: false,
    });
    this.belongsTo(models.Entity, {
      foreignKey: "entity_id",
      as: "user_entity",
      allowNull: false,
    });
    this.hasMany(models.Permission, {
      foreignKey: "user_id",
      as: "user_Permission",
      allowNull: false,
    });
    this.hasMany(models.Login, {
      foreignKey: "user_id",
      as: "user_login",
      allowNull: false,
    });
    this.hasMany(models.Configuration, {
      foreignKey: "user_id",
      as: "user_configuration",
      allowNull: false,
    });
    this.hasMany(models.Order, {
      foreignKey: "user_id",
      as: "user_order",
      allowNull: false,
    });
  }
}
module.exports = User;
