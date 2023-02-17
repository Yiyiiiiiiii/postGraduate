/*
 * @Description: 
 * @Author: 余子怡
 * @Date: 2023-01-14 14:39:23
 * @LastEditTime: 2023-02-12 22:39:35
 */
const {
    Sequelize
} = require('sequelize')
const sequelize = new Sequelize('postgraduate', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */,
    logging: null
});
module.exports = sequelize;