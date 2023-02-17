/*
 * @Description: 食物接口
 * @Author: 余子怡
 * @Date: 2022-02-24 11:18:00
 * @LastEditTime: 2023-01-17 18:37:18
 */
const express = require('express');
const router = express.Router();
const foodServ = require('../../service/foodServ');
const cryptor = require('../../util/crypt')
const {
    asyncHandler
} = require('../getSendResult')

//获取所有食物信息的接口
router.get('/all', asyncHandler(async (req, res) => {
    return await foodServ.getFood(req.query)
}))
//获取某一食物信息
router.get('/:id', asyncHandler(async (req, res) => {
    return await foodServ.getFoodById(req.params.id)
}))
//增加食物接口
router.post('/add', asyncHandler(async (req, res) => {
    return await foodServ.addFood(req.body)
}))
//修改食物信息
router.put('/:id', asyncHandler(async (req, res) => {
    return foodServ.updateFood(req.params.id, req.body)
}))
//删除食物信息
router.delete('/:id', asyncHandler(async (req, res, next) => {
    return await foodServ.deleteFood(req.params.id)
}))
module.exports = router