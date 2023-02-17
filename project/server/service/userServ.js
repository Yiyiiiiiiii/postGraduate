/*
 * @Description: 用户
 * @Author: 余子怡
 * @Date: 2023-01-20 16:14:03
 * @LastEditTime: 2023-02-10 23:42:44
 */
const User = require('../models/user');
const validate = require('validate.js')
const {
    Op
} = require('sequelize')
const {
    pick
} = require('../util/propertyHelper')

exports.addUser = async function (userObj) {
    userObj = pick(userObj, 'name', 'account', 'password', 'age', 'sex', 'phone', 'money', 'role', 'avatar', 'score')
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
        account: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        password: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        age: {
            type: 'number',
        },
        sex: {
            type: 'string',
        },
        phone: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        money: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
        role: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        avatar: {
            type: 'string',
        },
        score: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        },
    }
    userObj.score = 0
    await validate.async(userObj, rule)
    const ins = await User.create(userObj);
    return ins.toJSON();
}
exports.deleteUser = async function (id) {
    const ins = await User.destroy({
        where: {
            id,
        }
    })
    return ins
}
exports.updateUser = async function (id, userObj) {
    const ins = await User.update(userObj, {
        where: {
            id
        }
    })
    return ins;
}
exports.getUserById = async function (id) {
    const result = await User.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.getUsers = async function (
    { name, score,role, page = 1, limit = 1000 }
) {
    const where = {
        role:{
            [Op.eq]:role
        }
    };
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`,
        };
    }
    if (score) {
        where.score = {
            [Op.eq]: score
        };
    }
    const result = await User.findAndCountAll({
        attributes: ['id', 'name', 'account', 'password', 'age', 'sex', 'phone', 'money', 'role', 'avatar', 'score'],
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}

//用户登录接口：
exports.login = async function (account, password) {
    let userInfo = await User.findOne({
        where: { account }
    })
    if (userInfo === null) {
        return '账户不存在'
    }
    let result = await User.findOne({
        where: {
            account,
            password
        }
    })
    if (result && result.account === account && result.password === password) {
        result = result.toJSON();
        result = pick(result, 'id', 'account', 'password', 'name', 'age', 'sex', 'phone', 'money', 'role', 'avatar', 'score')
        return result;
    }
    return null;
}