const Seat = require('../models/seat');
const validate = require('validate.js')
const {
    Op
} = require('sequelize')
const {
    pick
} = require('../util/propertyHelper')
exports.addSeat = async function (seatObj) {
    seatObj = pick(seatObj, 'seat_no', 'type', 'price', 'status')
    const rule = {
        seat_no: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
        },
        type: {
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
        status: {
            presence: {
                allowEmpty: false
            },
            type: 'number',
        }
    }
    await validate.async(seatObj, rule)
    const ins = await Seat.create(seatObj);
    return ins.toJSON();
}
exports.deleteSeat = async function (id) {
    const ins = await Seat.destroy({
        where: {
            id,
        }
    })
    return ins
}
exports.updateSeat = async function (id, seatObj) {
    console.log('ccc',id,seatObj);
    const ins = await Seat.update(seatObj, {
        where: {
            id
        }
    })
    return ins;
}
exports.getSeatById = async function (id) {
    const result = await Seat.findByPk(id);
    if (result) {
        return result.toJSON();
    }
    return null;
}

exports.getSeats = async function (
    { status,type, page = 1, limit = 1000 }
) {
    const where = {};
    if (status) {
        where.status = {
            [Op.eq]: status,
        };
    }
    if (type) {
        where.type = {
            [Op.eq]: type,
        };
    }
    const result = await Seat.findAndCountAll({
        attributes: ['id', 'seat_no', 'type', 'price', 'status'],
        where,
        offset: (page - 1) * limit,
        limit: +limit,
    });
    return {
        total: result.count,
        data: JSON.parse(JSON.stringify(result.rows))
    }
}