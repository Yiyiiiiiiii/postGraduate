/*
 * @Description: store登录缓存
 * @Author: 余子怡
 * @Date: 2023-01-20 17:18:20
 * @LastEditTime: 2023-02-05 22:28:18
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as cookie from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: cookie.getCookie(),
    menuRoutes: [],
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.user = cookie.setCookie(userInfo);
    },
    loginOut(state) {
      state.user = null;
    },
    getMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      cookie.setCookie(userInfo);
    },
    loginOut({ commit }) {
      commit('loginOut');
      cookie.removeCookie();
    },
    getMenuRoutes({ commit }, routes) {
      commit('getMenuRoutes', routes);
    },
  },
});
