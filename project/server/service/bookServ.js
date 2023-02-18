/*
 * @Description: 
 * @Author: 余子怡
 * @Date: 2023-01-15 21:46:50
 * @LastEditTime: 2023-02-18 14:15:18
 */
const Book = require('../models/book');
const validate = require('validate.js')
const {
    Op
} = require('sequelize')
const {
    pick
} = require('../util/propertyHelper')
exports.addBook = async function (bookObj) {
    bookObj = pick(bookObj, 'name', 'picture', 'type', 'stock')
    const rule = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            // length: {
            //     is: 4
            // },
        },
        picture: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        type: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        stock: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        introduction: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        author: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
    }
    await validate.async(bookObj, rule)
    const ins = await Book.create(bookObj);
    return ins.toJSON();
}
exports.deleteBook = async function (id) {
    const ins = await Book.destroy({
        where: {
            id,
        }
    })
    return ins
}
exports.updateBook = async function (id, bookObj) {
    const ins = await Book.update(bookObj, {
        where: {
            id
        }
    })
    return ins;
}
exports.getBookById = async function (id) {
    const result = await Book.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.getBooks = async function (
    { name, type, page = 1, limit = 1000 }
) {
    console.log(name, type);
    const where = {};
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`,
        };
    }
    if (type) {
        where.type = {
            [Op.eq]: type,
        };
    }
    const result = await Book.findAndCountAll({
        attributes: ['id', 'name', 'picture', 'type', 'stock', 'introduction', 'author'],
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}