/*
 * @Description: 图书订单信息
 * @Author: 余子怡
 * @Date: 2023-02-08 22:48:10
 * @LastEditTime: 2023-02-17 17:12:26
 */
import axios from './index';

export default {
   // 查询所有订单
   findAll(params) {
    return axios.get('/borrow/all', { params });
  },
  // 查询某一订单
  findOne(id) {
    return axios.get(`/borrow/${id}`);
  },
  // 删除订单
  delete(id) {
    return axios.delete(`/borrow/${id}`);
  },
  // 更新订单
  update(id, obj) {
    return axios.put(`/borrow/${id}`, obj);
  },
  // 增加订单信息
  add(params) {
    return axios.post('/borrow/add', params);
  },
};