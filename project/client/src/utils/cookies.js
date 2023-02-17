/*
 * @Description: cookie登录缓存
 * @Author: 余子怡
 * @Date: 2023-02-05 22:21:16
 * @LastEditTime: 2023-02-05 22:28:13
 */
import Cookie from 'js-cookie';

export function getCookie() {
  return {
    id: Cookie.get('id'),
    account: Cookie.get('account'),
    password: Cookie.get('password'),
    role: Cookie.get('role'),
    name: Cookie.get('name'),
    age: Cookie.get('age'),
    sex: Cookie.get('sex'),
    phone: Cookie.get('phone'),
    money: Cookie.get('money'),
    avatar: Cookie.get('avatar'),
    score: Cookie.get('score'),
  };
}

export function setCookie(userInfo) {
  const array = Object.entries(userInfo);
  for (let i = 0; i < array.length; i += 1) {
    Cookie.set(array[i][0], array[i][1]);
  }
  return getCookie();
}

export function removeCookie() {
  Cookie.remove('id');
  Cookie.remove('account');
  Cookie.remove('password');
  Cookie.remove('role');
  Cookie.remove('name');
  Cookie.remove('age');
  Cookie.remove('sex');
  Cookie.remove('phone');
  Cookie.remove('money');
  Cookie.remove('avatar');
  Cookie.remove('score');
}
