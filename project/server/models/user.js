/*
 * @Description: 用户表字段结构
 * @Author: 余子怡
 * @Date: 2023-01-14 14:39:23
 * @LastEditTime: 2023-02-11 23:20:53
 */
const sequelize = require('./db')
const {
    DataTypes
} = require('sequelize');
const User = sequelize.define('User', {
    name: { // 姓名
        type: DataTypes.STRING,
        allowNull: false,
    },
    account: { // 账号
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: { // 密码
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: { // 年龄
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sex: { // 性别
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: { // 手机号
        type: DataTypes.STRING,
        allowNull: false,
    },
    money: { // 余额
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: { // 角色
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: { // 头像
        type: DataTypes.STRING,
        allowNull: true,
    },
    score: { // 信誉分
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
});
module.exports = User