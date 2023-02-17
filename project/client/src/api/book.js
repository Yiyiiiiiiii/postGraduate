/*
 * @Description: 二手书信息
 * @Author: 余子怡
 * @Date: 2023-02-08 22:48:10
 * @LastEditTime: 2023-02-11 23:56:43
 */
import axios from './index';

export default {
   // 查询所有二手书
   findAll(params) {
    return axios.get('/book/all', { params });
  },
  // 查询某一二手书
  findOne(id) {
    return axios.get(`/book/${id}`);
  },
  // 删除二手书
  delete(id) {
    return axios.delete(`/book/${id}`);
  },
  // 更新二手书
  update(id, obj) {
    return axios.put(`/book/${id}`, obj);
  },
  // 增加二手书信息
  add(params) {
    return axios.post('/book/add', params);
  },
};