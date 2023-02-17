/*
 * @Description: 食品
 * @Author: 余子怡
 * @Date: 2023-01-20 15:54:25
 * @LastEditTime: 2023-02-11 22:35:56
 */
const Food = require('../models/food');
const validate = require('validate.js')
const {
    Op
} = require('sequelize')
const {
    pick
} = require('../util/propertyHelper')
exports.addFood = async function (foodObj) {
    foodObj = pick(foodObj, 'name', 'picture', 'price', 'stock')
    const rule = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        picture: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        price: {
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
        }
    }
    await validate.async(foodObj, rule)
    const ins = await Food.create(foodObj);
    return ins.toJSON();
}
exports.deleteFood = async function (id) {
    const ins = await Food.destroy({
        where: {
            id,
        }
    })
    return ins
}
exports.updateFood = async function (id, foodObj) {
    const ins = await Food.update(foodObj, {
        where: {
            id
        }
    })
    return ins;
}
exports.getFoodById = async function (id) {
    const result = await Food.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.getFood = async function (
    { name, page = 1, limit = 1000 }
) {
    const where = {};
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`,
        };
    }
    const result = await Food.findAndCountAll({
        attributes: ['id', 'name', 'picture', 'price', 'stock'],
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}