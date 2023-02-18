<!--
 * @Description: 二手书
 * @Author: 余子怡
 * @Date: 2023-02-17 19:22:43
 * @LastEditTime: 2023-02-18 15:13:25
-->
<template>
  <div class="book">
    <ul class="row">
      <li class="item" @click="">
        <el-image class="images" :src="url" fit="cover"></el-image>
        <p class="title">
          <span class="b-name">数学</span>
          <span class="b-in">简介</span>
        </p>
      </li>
      <li class="item">
        <div class="images">
          <el-image
            style="width: 150px; height: 200px"
            :src="url"
            fit="cover"
          ></el-image>
        </div>
        <p class="title">数学</p>
      </li>
      <li class="item">
        <div class="images">
          <el-image
            style="width: 150px; height: 200px"
            :src="url"
            fit="cover"
          ></el-image>
        </div>
        <p class="title">数学</p>
      </li>
      <li class="item">
        <div class="images">
          <el-image
            style="width: 150px; height: 200px"
            :src="url"
            fit="cover"
          ></el-image>
        </div>
        <p class="title">数学</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "https://img2.baidu.com/it/u=1914820766,171297871&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500",
    };
  },
};
</script>

<style lang="less" scoped>
.book {
  width: 90%;
  height: 100%;
  background-color: #fff;
  padding: 40px;
  overflow-y: scroll;
  .row {
    display: flex;
    justify-content: space-around;
    border: 1px solid #d5d5d5;
    .item {
      list-style: none;
      padding: 10px;
      cursor: pointer;
      .images {
        height: 200px;
        width: 150px;
        border: 1px solid #d5d5d5;
      }
      .title {
        margin: 10px 0;
        font-size: 14px;
        line-height: 14px;
        .b-name {
          white-space: nowrap;
          overflow: hidden;
          width: 125px;
          color: antiquewhite;
        }
        .b-in {
          overflow: hidden;
          width: 135px;
          display: block;
          height: 18px;
        }
      }
    }
  }
}
</style>