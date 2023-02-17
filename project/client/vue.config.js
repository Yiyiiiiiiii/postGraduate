/*
 * @Description: 
 * @Author: 余子怡
 * @Date: 2023-02-04 18:54:21
 * @LastEditTime: 2023-02-04 18:55:30
 */
module.exports = {
  devServer: {
    proxy: {
      '/postgraduate': {
        target: 'http://localhost:3000',
      },
    },
  },
};
