/*
 * @Description: 借阅书籍接口
 * @Author: 余子怡
 * @Date: 2023-01-17 17:58:45
 * @LastEditTime: 2023-01-17 18:36:23
 */
const express = require('express');
const router = express.Router();
const borrowServ = require('../../service/borrowServ');
const cryptor = require('../../util/crypt')
const {
    asyncHandler
} = require('../getSendResult')

//获取借阅信息的接口
router.get('/all', asyncHandler(async (req, res) => {
    return await borrowServ.getBorrows(req.query)
}))
//获取某条借阅的信息
router.get('/:id', asyncHandler(async (req, res) => {
    return await borrowServ.getBorrowById(req.params.id)
}))
//增加借阅
router.post('/add', asyncHandler(async (req, res) => {
    return await borrowServ.addBorrow(req.body)
}))
//修改借阅信息
router.put('/:id', asyncHandler(async (req, res) => {
    return borrowServ.updateBorrow(req.params.id, req.body)
}))
//删除借阅信息
router.delete('/:id', asyncHandler(async (req, res, next) => {
    return await borrowServ.deleteBorrow(req.params.id)
}))
module.exports = router