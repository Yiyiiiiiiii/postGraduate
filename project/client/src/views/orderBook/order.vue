<!--
 * @Description: 二手书
 * @Author: 余子怡
 * @Date: 2023-02-17 19:22:43
 * @LastEditTime: 2023-02-19 19:48:36
-->
<template>
  <div class="book">
    <ul class="row">
      <li class="item"  v-for="item in Book">
        <el-image
          class="images"
          :src="item.picture || url"
          fit="cover"
        ></el-image>
        <div class="title">
          <div class="b-name">{{ item.name }}</div>
          <div class="b-in">
            <span class="i-item">{{ item.author }}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="i-item">{{ types[item.type] }}</span>
            <el-divider direction="vertical"></el-divider>
            <span class="i-item">{{ item.stock }}</span></br>
            <span class="i-item2">
              {{ item.introduction }}简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
            </span>
          </div>
          <div class="btn">
            <el-button size="small" type="primary" :disabled="!item.stock" @click="handleOrder(item)">租借</el-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Book from "@/api/book";
import orderBook from "@/api/orderBook";
export default {
  data() {
    return {
      url: "https://img2.baidu.com/it/u=1914820766,171297871&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500",
      Book: [],
      types: {
        0: "数学",
        1: "英语",
        2: "专业",
        3: "考公",
        4: "教资",
        5: "政治",
      },
      id: 0,
    };
  },
  created() {
    this.search();
    this.id = this.$store.state.user.id;
  },
  methods: {
    async search() {
      await Book.findAll().then((r) => {
        this.Book = r.data.data.data;
      });
    },
    handleOrder(item) {
      console.log(item);
      this.$confirm("是否借阅本书?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          orderBook
            .add({ UserId: +this.id, BookId: +item.id, status: 0 })
            .then(() => {
              Book.update(item.id, { ...item, stock: item.stock - 1 }).then(
                () => {
                  this.search();
                }
              );
            });
          this.$message({
            type: "success",
            message: "借阅成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消借阅",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.book {
  height: 100%;
  background-color: #fff;
  padding: 40px;
  overflow-y: scroll;
  box-sizing: border-box;
  .row {
    min-height: 550px;
    border: 1px solid #d5d5d5;
    padding-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    .item {
      list-style: none;
      margin: 10px 20px;
      display: flex;
      width: calc(50% - 40px);
      box-sizing: border-box;
      border-bottom: 1px solid #d5d5d5;
      position: relative;
      max-height: 180px;
      .images {
        height: 150px;
        width: 150px;
        border: 1px solid #d5d5d5;
      }
      .title {
        margin: 10px 0;
        font-size: 18px;
        line-height: 18px;
        width: 100%;
        position: relative;
        .b-name,
        .b-in {
          overflow: hidden;
          display: block;
          text-align: left;
          padding: 0 10px;
          width: 100%;
        }
        .b-name {
          font-size: 24px;
          line-height: 24px;
          margin-bottom: 10px;
          color: #06a;
        }
        .b-in {
          color: #666;
          .i-item {
            display: inline-block;
          }
          .i-item2 {
            margin-top: 10px;
            font-size: 12px;
            -webkit-line-clamp: 4;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .btn {
          position: absolute;
          top: 0px;
          right: 0;
        }
      }
    }
  }
}
</style>