exports.validateCaptcha = function (req, res, next) {
    const reqCaptcha = req.body.captcha ? req.body.captcha.toLowerCase() : ""; //用户传递的验证码
    // console.log(reqCaptcha, req.session.captcha);
    // if (reqCaptcha !== req.session.captcha) {
    //     //验证码有问题
    //     res.send({
    //         code: 401,
    //         msg: "验证码有问题",
    //     });
    // } else {
    //     // next();
    //     res.send({
    //         code: '201',
    //         msg: '登录成功'
    //     })
    // }
    // req.session.captcha = "";
    return reqCaptcha === req.session.captcha
}
