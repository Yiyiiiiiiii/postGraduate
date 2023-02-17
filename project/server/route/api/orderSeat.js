/*
 * @Description: 订座接口
 * @Author: 余子怡
 * @Date: 2022-04-21 11:28:42
 * @LastEditTime: 2023-01-20 16:40:47
 */
const express = require('express');
const router = express.Router();
const orderSeatServ = require('../../service/orderSeatServ');
const cryptor = require('../../util/crypt')
const {
    asyncHandler
} = require('../getSendResult')

//获取所有订座的接口
router.get('/all', asyncHandler(async (req, res) => {
    return await orderSeatServ.getOrderSeats(req.query)
}))
//获取某一订座信息
router.get('/:id', asyncHandler(async (req, res) => {
    return await orderSeatServ.getOrderSeatById(req.params.id)
}))
//增加订座信息接口
router.post('/add', asyncHandler(async (req, res) => {
    return await orderSeatServ.addOrderSeat(req.body)
}))
//修改订座信息
router.put('/:id', asyncHandler(async (req, res) => {
    return orderSeatServ.updateOrderSeat(req.params.id, req.body)
}))
//删除订座信息
router.delete('/:id', asyncHandler(async (req, res, next) => {
    return await orderSeatServ.deleteOrderSeat(req.params.id)
}))
module.exports = router