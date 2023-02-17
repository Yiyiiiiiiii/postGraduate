/*
 * @Description: 座位表字段结构
 * @Author: 余子怡
 * @Date: 2023-01-14 18:24:53
 * @LastEditTime: 2023-02-11 22:31:34
 */
const sequelize = require('./db')
const {
    DataTypes
} = require('sequelize');
const Seat = sequelize.define('Seat', {
    seat_no: { // 座位号
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: { // 座位类型
        type: DataTypes.STRING,
        allowNull: false
    },
    price: { // 座位价格
        type: DataTypes.INTEGER,
        allowNull: false
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
module.exports = Seat
