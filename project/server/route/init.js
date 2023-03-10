/*
 * @Description: 
 * @Author: 余子怡
 * @Date: 2023-01-15 21:50:46
 * @LastEditTime: 2023-02-05 23:27:57
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const session = require('express-session')
app.use(session({
    secret: 'postgraduate'
}))
//使用静态资源中间件
const staticRoot = path.resolve(__dirname, '../public')
app.use(express.static(staticRoot))
//使用跨域中间件
// const whiteList = ["null", "http://localhost:8080","http://127.0.0.1:5500"];
app.use(
    cors({
        origin(origin, callback) {
            // if (whiteList.includes(origin)) {
            //     callback(null, origin);
            // } else {
            //     callback(new Error("not allowed"));
            // }
            if (!origin) {
                callback(null, '*')
                return;
            }
            callback(null, origin)
        },
        credentials: true,
    })
);
//加入cookie-parser中间件
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//使用token中间件：
// app.use(require('./tokenMiddleware'))


// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({
    extended: true
}));

// 解析 application/json 格式的请求体
app.use(express.json())

//处理api请求的中间件
app.use('/postgraduate/book', require('./api/book'))
app.use('/postgraduate/borrow', require('./api/borrow'))
app.use('/postgraduate/food', require('./api/food'))
app.use('/postgraduate/order', require('./api/order'))
app.use('/postgraduate/orderSeat', require('./api/orderSeat'))
app.use('/postgraduate/seat', require('./api/seat'))
app.use('/postgraduate/user', require('./api/user'))
app.use('/postgraduate/common', require('./api/common'))


//处理错误的中间件
app.use(require('./errorMiddleware'))

app.listen(3000, () => {
    console.log('serve started !!!')
})