/*
 * @Description: 图书表字段结构
 * @Author: 余子怡
 * @Date: 2023-01-14 18:24:53
 * @LastEditTime: 2023-02-18 14:14:20
 */
const sequelize = require('./db')
const {
    DataTypes
} = require('sequelize');
const Book = sequelize.define('Book', {
    name: { // 名称
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: { // 图片
        type: DataTypes.STRING,
        allowNull: false
    },
    type: { // 类型
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: { // 库存
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    introduction: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
});
module.exports = Book
