/*
 * @Description: 公共组件接口
 * @Author: 余子怡
 * @Date: 2023-02-07 23:04:12
 * @LastEditTime: 2023-02-10 20:11:51
 */
const express = require('express');
var svgCaptcha = require('svg-captcha');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const {
    asyncHandler
} = require('../getSendResult')
//获取验证码
router.get('/captcha', (req, res) => {
    var captcha = svgCaptcha.create();
    req.session.captcha = captcha.text.toLowerCase();
    res.type('svg');
    res.status(200).send(captcha.data)
})
// 图片上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/img'))  //建立对应保存文件的文件夹
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // 获取req后缀然后拼接
        const { originalname } = file
        const fileExtension = originalname.substring(originalname.lastIndexOf('.') + 1);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension)
    }
})
const upload = multer({ storage: storage })
router.post('/upload', upload.single("avatar"), (req, res) => {  //avatar是前端传参字段名
    res.send({
        code: 0,
        data: `http://localhost:3000/img/${req.file.filename}` // 返回给前端的img访问路径
    })
})
module.exports = router