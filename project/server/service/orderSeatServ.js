/*
 * @Description: 订座
 * @Author: 余子怡
 * @Date: 2023-01-17 17:59:42
 * @LastEditTime: 2023-02-10 21:52:37
 */
const orderSeat = require('../models/order_seat');
const User = require('../models/user');
const Seat = require('../models/seat');
const validate = require('validate.js')
const {
    Op
} = require('sequelize')
const {
    pick
} = require('../util/propertyHelper')
exports.addOrderSeat = async function (orderSeatObj) {
    orderSeatObj = pick(orderSeatObj, 'status', 'start_time', 'end_time','UserId','SeatId')
    const rule = {
        status: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        start_time: {
            presence: {
                allowEmpty: false
            },
            type: 'date',
        },
        end_time: {
            presence: {
                allowEmpty: false
            },
            type: 'date',
        },
        UserId:{
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        SeatId:{
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
    }
    await validate.async(orderSeatObj, rule)
    const ins = await orderSeat.create(orderSeatObj);
    return ins.toJSON();
}
exports.deleteOrderSeat = async function (id) {
    const ins = await orderSeat.destroy({
        where: {
            id,
        }
    })
    return ins
}
exports.updateOrderSeat = async function (id, orderSeatObj) {
    const ins = await orderSeat.update(orderSeatObj, {
        where: {
            id
        }
    })
    return ins;
}
exports.getOrderSeatById = async function (id) {
    const result = await orderSeat.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.getOrderSeats = async function (
    { UserId,SeatId, page = 1, limit = 1000 }
) {
    let where = {}
    if (UserId) {
        where.UserId = {
          [Op.eq]: UserId
        }
      }
    if (SeatId) {
        where.SeatId = {
            [Op.eq]: SeatId
        };
    }
    const result = await orderSeat.findAndCountAll({
        attributes: ['id', 'status', 'start_time', 'end_time','UserId','SeatId'],
        include: [User,Seat],
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}