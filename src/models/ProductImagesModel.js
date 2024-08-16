const connection = require('../database/connection');
const { DataTypes } = require('sequelize');

const ProductModel = require('./ProductModel');

const ProductImagesModel = connection.define("ProductImages", {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProductModel,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    path: DataTypes.STRING(255),
});

module.exports = ProductImagesModel;