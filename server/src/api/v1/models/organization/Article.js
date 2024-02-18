const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static init(sequelize) {
    super.init(
      {
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        threshold: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "articles",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Grouped, {
      foreignKey: "article_id",
      as: "article_grouped",
      allowNull: false,
    });
    this.hasMany(models.DetailsOrder, {
      foreignKey: "article_id",
      as: "article_detailsOrder",
      allowNull: false,
    });
  }
}
module.exports = Article;
