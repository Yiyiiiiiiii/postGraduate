/*
 * @Description: 座位信息
 * @Author: 余子怡
 * @Date: 2023-02-08 22:48:10
 * @LastEditTime: 2023-02-11 23:55:22
 */
import axios from './index';

export default {
   // 查询所有座位
   findAll(params) {
    return axios.get('/seat/all', { params });
  },
  // 查询某一座位
  findOne(id) {
    return axios.get(`/seat/${id}`);
  },
  // 删除座位
  delete(id) {
    return axios.delete(`/seat/${id}`);
  },
  // 更新座位
  update(id, obj) {
    return axios.put(`/seat/${id}`, obj);
  },
  // 增加座位信息
  add(params) {
    return axios.post('/seat/add', params);
  },
};