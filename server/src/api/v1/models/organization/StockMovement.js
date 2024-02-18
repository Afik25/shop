const { Model, DataTypes } = require("sequelize");

class StockMovement extends Model {
  static init(sequelize) {
    super.init(
      {
        detailsOrder_id: DataTypes.INTEGER,
        type: DataTypes.STRING, // in or out
        quantity: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "StockMovements",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.DetailsOrder, {
      foreignKey: "detailsOrder_id",
      as: "stockMovement_detailsOrder",
      allowNull: false,
    });
  }
}
module.exports = StockMovement;
