/*
 * @Description: 用户接口
 * @Author: 余子怡
 * @Date: 2022-05-04 22:42:52
 * @LastEditTime: 2023-02-17 20:35:09
 */
const express = require('express');
const router = express.Router();
const userServ = require('../../service/userServ');
const cryptor = require('../../util/crypt')
const {
    asyncHandler
} = require('../getSendResult')
const {
    validateCaptcha
} = require('../../util/validateCaptcha')

//获取所有用户信息的接口
router.get('/all', asyncHandler(async (req, res) => {
    return await userServ.getUsers(req.query)
}))
//获取某一用户信息
router.get('/:id', asyncHandler(async (req, res) => {
    return await userServ.getUserById(req.params.id)
}))
//增加用户接口
router.post('/add', asyncHandler(async (req, res) => {
    return await userServ.addUser(req.body)
}))
//修改用户信息
router.put('/:id', asyncHandler(async (req, res) => {
    return userServ.updateUser(req.params.id, req.body)
}))
//删除用户信息
router.delete('/:id', asyncHandler(async (req, res, next) => {
    return await userServ.deleteUser(req.params.id)
}))
//用户登录接口
router.post('/login', asyncHandler(async (req, res, next) => {
    const result = await userServ.login(req.body.account, req.body.password)
    if (result === '账户不存在') {
        return result
    }
    if (!validateCaptcha(req, res, next)) {
        return '验证码错误'
    }
    if (result) {
        //登录成功
        let value = result.id;
        value = cryptor.encrypt(value.toString());
        res.cookie(`token`, value, {
            path: '/',
            domain: 'localhost',
            maxAge: 3600 * 1000 * 24 * 7 //毫秒
        });
        res.header('authorization', value);
    }
    return result;
}))
module.exports = router