<!--
 * @Description: 侧边栏
 * @Author: 余子怡
 * @Date: 2023-02-05 22:36:54
 * @LastEditTime: 2023-02-07 21:58:24
-->
<template>
  <div class="aside">
    <el-col :span="12">
      <el-menu
        :router="true"
        class="el-menu-vertical-demo"
        :default-active="$route.path"
      >
        <template v-for="item in $store.state.menuRoutes">
          <el-menu-item
            :index="item.path"
            :key="item.meta.id"
            v-if="item.meta && $store.state.user.role == item.meta.role || item.meta.role == 2"
          >
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<style scoped lang="less">
.aside {
  width: 100%;
  height: 100%;
  .el-col-12 {
    width: 100%;
    height: 100%;
    ul {
      height: calc(100% - 60px);
      a {
        display: inline-block;
        text-decoration: none;
        color: rgb(224, 210, 210);
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
