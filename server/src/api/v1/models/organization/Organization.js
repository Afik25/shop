const { Model, DataTypes } = require("sequelize");

class Organization extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        country: DataTypes.STRING,
        status: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        thumbnails: DataTypes.STRING,
        sys_id: DataTypes.STRING,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "organizations",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Role, {
      foreignKey: "organization_id",
      as: "organization_role",
      allowNull: false,
    });
    this.hasMany(models.Entity, {
      foreignKey: "organization_id",
      as: "organization_entity",
      allowNull: false,
    });
    this.hasMany(models.Inscription, {
      foreignKey: "organization_id",
      as: "organization_inscription",
      allowNull: false,
    });
    this.hasMany(models.Payment, {
      foreignKey: "organization_id",
      as: "organization_payment",
      allowNull: false,
    });
    this.hasMany(models.Partner, {
      foreignKey: "organization_id",
      as: "organization_partner",
      allowNull: false,
    });
  }
}

module.exports = Organization;
