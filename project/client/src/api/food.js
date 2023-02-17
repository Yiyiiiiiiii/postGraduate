/*
 * @Description: 食物信息
 * @Author: 余子怡
 * @Date: 2023-02-08 22:48:10
 * @LastEditTime: 2023-02-11 23:56:05
 */
import axios from './index';

export default {
   // 查询所有食物
   findAll(params) {
    return axios.get('/food/all', { params });
  },
  // 查询某一食物
  findOne(id) {
    return axios.get(`/food/${id}`);
  },
  // 删除食物
  delete(id) {
    return axios.delete(`/food/${id}`);
  },
  // 更新食物
  update(id, obj) {
    return axios.put(`/food/${id}`, obj);
  },
  // 增加食物信息
  add(params) {
    return axios.post('/food/add', params);
  },
};