/*
 * @Description: 订座表字段结构
 * @Author: 余子怡
 * @Date: 2023-01-14 18:24:53
 * @LastEditTime: 2023-01-14 18:51:49
 */
const sequelize = require('./db')
const {
    DataTypes
} = require('sequelize');
const OrderSeat = sequelize.define('OrderSeat', {
    status: { // 状态
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_time: { // 开始时间
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: { // 结束时间
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
});
module.exports = OrderSeat
