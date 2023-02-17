const express = require('express');
const router = express.Router();
const bookServ = require('../../service/bookServ');
const cryptor = require('../../util/crypt')
const {
    asyncHandler
} = require('../getSendResult')

//获取二手书信息的接口
router.get('/all', asyncHandler(async (req, res) => {
    return await bookServ.getBooks(req.query)
}))
//获取某本书的信息
router.get('/:id', asyncHandler(async (req, res) => {
    return await bookServ.getBookById(req.params.id)
}))
//增加二手书
router.post('/add', asyncHandler(async (req, res) => {
    return await bookServ.addBook(req.body)
}))
//修改二手书信息
router.put('/:id', asyncHandler(async (req, res) => {
    return bookServ.updateBook(req.params.id, req.body)
}))
//删除二手书信息
router.delete('/:id', asyncHandler(async (req, res, next) => {
    return await bookServ.deleteBook(req.params.id)
}))
module.exports = router