/*
 * @Description: 用户信息
 * @Author: 余子怡
 * @Date: 2023-02-08 22:48:10
 * @LastEditTime: 2023-02-08 22:50:29
 */
import axios from './index';

export default {
   // 查询所有用户
   findAll(params) {
    return axios.get('/user/all', { params });
  },
  // 查询某一用户
  findOne(id) {
    return axios.get(`/user/${id}`);
  },
  // 删除用户
  delete(id) {
    return axios.delete(`/user/${id}`);
  },
  // 更新用户
  update(id, obj) {
    return axios.put(`/user/${id}`, obj);
  },
  // 增加用户信息
  add(params) {
    return axios.post('/user/add', params);
  },
};