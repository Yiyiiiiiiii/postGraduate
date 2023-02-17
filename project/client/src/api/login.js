/*
 * @Description: 登录
 * @Author: 余子怡
 * @Date: 2023-02-04 18:53:18
 * @LastEditTime: 2023-02-06 14:09:28
 */
import axios from './index';

export default {
  // 用户登录
  userLogin(params) {
    return axios.post('/user/login', params, {

    });
  },
};
