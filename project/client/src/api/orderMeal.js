/*
 * @Description: 订餐信息
 * @Author: 余子怡
 * @Date: 2023-02-08 22:48:10
 * @LastEditTime: 2023-02-17 17:56:47
 */
import axios from './index';

export default {
   // 查询所有订餐
   findAll(params) {
    return axios.get('/orderMeal/all', { params });
  },
  // 查询某一订餐
  findOne(id) {
    return axios.get(`/orderMeal/${id}`);
  },
  // 删除订餐
  delete(id) {
    return axios.delete(`/orderMeal/${id}`);
  },
  // 更新订餐
  update(id, obj) {
    return axios.put(`/orderMeal/${id}`, obj);
  },
  // 增加订餐信息
  add(params) {
    return axios.post('/orderMeal/add', params);
  },
};