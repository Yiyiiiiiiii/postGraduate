/*
 * @Description: 订餐
 * @Author: 余子怡
 * @Date: 2023-01-17 17:59:42
 * @LastEditTime: 2023-02-11 22:46:21
 */
const Order = require('../models/order');
const User = require('../models/user');
const Food = require('../models/food');
const validate = require('validate.js')
const {
    Op
} = require('sequelize')
const {
    pick
} = require('../util/propertyHelper')
exports.addOrder = async function (orderObj) {
    orderObj = pick(orderObj, 'time','status','UserId','FoodId')
    const rule = {
        status: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        time: {
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
        FoodId:{
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
    }
    await validate.async(orderObj, rule)
    const ins = await Order.create(orderObj);
    return ins.toJSON();
}
exports.deleteOrder = async function (id) {
    const ins = await Order.destroy({
        where: {
            id,
        }
    })
    return ins
}
exports.updateOrder = async function (id, orderObj) {
    const ins = await Order.update(orderObj, {
        where: {
            id
        }
    })
    return ins;
}
exports.getOrderById = async function (id) {
    const result = await Order.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.getOrders = async function (
    { UserId,FoodId, page = 1, limit = 1000 }
) {
    let where = {}
    if (UserId) {
        where.UserId = {
          [Op.eq]: UserId
        }
      }
    if (FoodId) {
        where.FoodId = {
            [Op.eq]: FoodId
        };
    }
    const result = await Order.findAndCountAll({
        attributes: ['id', 'status', 'time','UserId','FoodId'],
        include: [User,Food],
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}