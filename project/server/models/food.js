/*
 * @Description: 食物表字段结构
 * @Author: 余子怡
 * @Date: 2023-01-14 18:24:53
 * @LastEditTime: 2023-01-14 18:38:06
 */
const sequelize = require('./db')
const {
    DataTypes
} = require('sequelize');
const Food = sequelize.define('Food', {
    name: { // 名称
        type: DataTypes.STRING,
        allowNull: false,
    },
    picture: { // 图片
        type: DataTypes.STRING,
        allowNull: false
    },
    price: { // 价格
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: { // 库存
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
});
module.exports = Food
