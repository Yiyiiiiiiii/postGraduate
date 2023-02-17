/*
 * @Description: 
 * @Author: 余子怡
 * @Date: 2023-02-04 18:58:40
 * @LastEditTime: 2023-02-07 21:36:37
 */

import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import Cookie from 'js-cookie';
const service = axios.create({
    baseURL: '/postgraduate',
    withCredentials: true,  //允许携带cookie
    // timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        let token = Cookie.get('token')
        if (token) {
            config.headers['authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// response interceptor
// 拦截器响应
service.interceptors.response.use(
    response => {
        if (response.data.code == 403) {
            MessageBox.alert('身份信息失效，请重新登录', {
                confirmButtonText: '确定',
                title: '提示',
                type: 'warning',
                center: true,
                callback: () => {
                    window.top.location.href = '/login';
                }
            });
        }
        return response // 响应放行
    },
    error => {
        Message({
            type: "error",
            message: '接口报错，请联系管理员'
        })
        return Promise.reject(error)
    }
)
export default service;
