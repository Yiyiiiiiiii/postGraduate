// 设置模型关系
const Book = require('./book')
const Borrow = require('./borrow')
const Food = require('./food')
const OrderSeat = require('./order_seat')
const Order = require('./order')
const Seat = require('./seat')
const User = require('./user')

User.hasMany(Borrow)    // 一个用户借阅多本书
Borrow.belongsTo(User)

User.hasMany(OrderSeat)  // 一个用户在不同时间段内可以订多个座位（时间）
OrderSeat.belongsTo(User);

User.hasMany(Order)  // 一个用户订多份餐
Order.belongsTo(User);

Book.hasMany(Borrow)  // 一个本书被借阅多次（时间，库存）
Borrow.belongsTo(Book);

Food.hasMany(Order)  // 一种菜品被多个订餐订购（库存）
Order.belongsTo(Food);

Seat.hasMany(OrderSeat)  // 一个座位被多次预约（时间）
OrderSeat.belongsTo(Seat);



