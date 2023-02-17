/*
 * @Description: 
 * @Author: 余子怡
 * @Date: 2023-01-14 14:39:23
 * @LastEditTime: 2023-01-14 19:02:29
 */
const sequelize = require('./db')
require('./user')
require('./book')
require('./borrow')
require('./food')
require('./order')
require('./order_seat')
require('./seat')
sequelize.sync({
    alter: true,
}).then(() => {
    console.log("所有模型均已成功同步.");
})
