/*
 * @Description: 座位接口
 * @Author: 余子怡
 * @Date: 2022-03-23 22:39:34
 * @LastEditTime: 2023-02-12 00:23:36
 */
const express = require('express');
const router = express.Router();
const seatServ = require('../../service/seatServ');
const cryptor = require('../../util/crypt')
const {
    asyncHandler
} = require('../getSendResult')

//获取所有座位的接口
router.get('/all', asyncHandler(async (req, res) => {
    return await seatServ.getSeats(req.query)
}))
//获取某一座位信息
router.get('/:id', asyncHandler(async (req, res) => {
    return await seatServ.getSeatById(req.params.id)
}))
//增加座位接口
router.post('/add', asyncHandler(async (req, res) => {
    return await seatServ.addSeat(req.body)
}))
//修改座位信息
router.put('/:id', asyncHandler(async (req, res) => {
    return seatServ.updateSeat(req.params.id, req.body)
}))
//删除座位信息
router.delete('/:id', asyncHandler(async (req, res, next) => {
    return await seatServ.deleteSeat(req.params.id)
}))
module.exports = router