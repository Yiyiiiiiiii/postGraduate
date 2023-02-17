/*
 * @Description: 订单接口
 * @Author: 余子怡
 * @Date: 2022-02-17 22:37:08
 * @LastEditTime: 2023-01-17 18:38:45
 */
const express = require('express');
const router = express.Router();
const orderServ = require('../../service/orderServ');
const cryptor = require('../../util/crypt')
const {
    asyncHandler
} = require('../getSendResult')

//获取所有订单信息的接口
router.get('/all', asyncHandler(async (req, res) => {
    return await orderServ.getOrders(req.query)
}))
//获取某一订单信息
router.get('/:id', asyncHandler(async (req, res) => {
    return await orderServ.getOrderById(req.params.id)
}))
//增加订单接口
router.post('/add', asyncHandler(async (req, res) => {
    return await orderServ.addOrder(req.body)
}))
//修改订单信息
router.put('/:id', asyncHandler(async (req, res) => {
    return orderServ.updateOrder(req.params.id, req.body)
}))
//删除订单信息
router.delete('/:id', asyncHandler(async (req, res, next) => {
    return await orderServ.deleteOrder(req.params.id)
}))
module.exports = router