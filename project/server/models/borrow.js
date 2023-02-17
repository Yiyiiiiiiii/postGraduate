/*
 * @Description: 借阅表字段结构
 * @Author: 余子怡
 * @Date: 2023-01-14 18:24:53
 * @LastEditTime: 2023-02-11 23:10:09
 */
const sequelize = require('./db')
const {
    DataTypes
} = require('sequelize');
const Borrow = sequelize.define('Borrow', {
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
module.exports = Borrow
