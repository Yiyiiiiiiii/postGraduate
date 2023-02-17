/*
 * @Description: 选座信息
 * @Author: 余子怡
 * @Date: 2023-02-08 22:48:10
 * @LastEditTime: 2023-02-09 22:38:04
 */
import axios from './index';

export default {
   // 查询所有订座
   findAll(params) {
    return axios.get('/orderSeat/all', { params });
  },
  // 查询某一订座
  findOne(id) {
    return axios.get(`/orderSeat/${id}`);
  },
  // 删除订座
  delete(id) {
    return axios.delete(`/orderSeat/${id}`);
  },
  // 更新订座
  update(id, obj) {
    return axios.put(`/orderSeat/${id}`, obj);
  },
  // 增加订座信息
  add(params) {
    return axios.post('/orderSeat/add', params);
  },
};