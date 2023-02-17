/*
 * @Description: 订单表字段结构
 * @Author: 余子怡
 * @Date: 2023-01-14 18:24:53
 * @LastEditTime: 2023-02-11 22:40:30
 */
const sequelize = require('./db')
const {
    DataTypes
} = require('sequelize');
const Order = sequelize.define('Order', {
    time: { // 时间
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: { // 状态
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
});
module.exports = Order
