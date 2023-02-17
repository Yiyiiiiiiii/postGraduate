/*
 * @Description: 借阅
 * @Author: 余子怡
 * @Date: 2023-01-17 17:59:42
 * @LastEditTime: 2023-02-11 23:09:38
 */
const Borrow = require('../models/borrow');
const User = require('../models/user');
const Book = require('../models/book');
const validate = require('validate.js')
const {
    Op
} = require('sequelize')
const {
    pick
} = require('../util/propertyHelper')
exports.addBorrow = async function (borrowObj) {
    borrowObj = pick(borrowObj, 'status','UserId','BookId')
    const rule = {
        status: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        UserId:{
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        BookId:{
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
    }
    await validate.async(borrowObj, rule)
    const ins = await Borrow.create(borrowObj);
    return ins.toJSON();
}
exports.deleteBorrow = async function (id) {
    const ins = await Borrow.destroy({
        where: {
            id,
        }
    })
    return ins
}
exports.updateBorrow = async function (id, borrowObj) {
    const ins = await Borrow.update(borrowObj, {
        where: {
            id
        }
    })
    return ins;
}
exports.getBorrowById = async function (id) {
    const result = await Borrow.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.getBorrows = async function (
    { UserId,BookId, page = 1, limit = 1000 }
) {
    const where = {};
    if (UserId) {
        where.UserId = {
          [Op.eq]: UserId
        }
      }
    if (BookId) {
        where.BookId = {
            [Op.eq]: BookId

        };
    }
    const result = await Borrow.findAndCountAll({
        attributes: ['id', 'status','UserId','BookId'],
    include: [User,Book],
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}