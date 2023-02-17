<!--
 * @Description: 二手书
 * @Author: 余子怡
 * @Date: 2023-02-17 19:22:43
 * @LastEditTime: 2023-02-17 19:57:43
-->
<template>
  <div class="book">
    <ul class="row">
        <li class="item">
            <div class="images">
                <el-image
        style="width: 100px; height: 200px"
      :src="url"
      fit="cover"></el-image>
            </div>
            <p class="title">数学</p>
        </li>
        <li class="item">
            <div class="images">
                <el-image
        style="width: 100px; height: 200px"
      :src="url"
      fit="cover"></el-image>
            </div>
            <p class="title">数学</p>
        </li>
        <li class="item">
            <div class="images">
                <el-image
        style="width: 100px; height: 200px"
      :src="url"
      fit="cover"></el-image>
            </div>
            <p class="title">数学</p>
        </li>
        <li class="item">
            <div class="images">
                <el-image
        style="width: 100px; height: 200px"
      :src="url"
      fit="cover"></el-image>
            </div>
            <p class="title">数学</p>
        </li>
    </ul>

  </div>
</template>

<script>
export default {
    data () {
        return {
            url:'https://img2.baidu.com/it/u=1914820766,171297871&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
        }
    }
}
</script>

<style lang="less" scoped>
.book{

}
</style>