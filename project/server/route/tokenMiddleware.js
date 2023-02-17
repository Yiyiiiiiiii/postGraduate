/*
 * @Description: 设置token校验
 * @Author: 余子怡
 * @Date: 2022-05-05 09:57:22
 * @LastEditTime: 2023-02-05 23:17:25
 */
const {
    pathToRegexp
} = require('path-to-regexp');
const {
    getErr
} = require('./getSendResult');
const needTokenApi = [
    { method: 'POST', path: '/postgraduate/user/login' },
];
const cryptor = require('../util/crypt');
//解析token:
module.exports = (req, res, next) => {
    const apis = needTokenApi.filter(api => {
        const reg = pathToRegexp(api.path); //把路径转化成正则
        return api.method !== req.method || !reg.test(req.path);
    })
    if (apis.length === 0) {
        next();
        return;
    }
    let token = req.cookies.token;
    if (!token) {
        token = req.headers.authorization;
    }
    if (!token) {
        handleNonToken(req, res, next);
        return;
    }
    const userId = cryptor.decrypt(token);
    req.userId = userId;
    next();
}
function handleNonToken(req, res, next) {
    res.send(getErr('token失效', 403))
}