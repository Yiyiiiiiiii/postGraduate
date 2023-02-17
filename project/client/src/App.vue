<!--
 * @Description: 
 * @Author: 余子怡
 * @Date: 2023-01-20 17:18:20
 * @LastEditTime: 2023-02-10 15:27:07
-->
<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  // 防止每次刷新，store丢失
  // 每次刷新，重取store数据
  created(){
    const userInfo = localStorage.getItem("userInfo")
    if(userInfo){
      this.$store.dispatch("setUserInfo", JSON.parse(userInfo));
    }
  },
  methods: {
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}

</style>
