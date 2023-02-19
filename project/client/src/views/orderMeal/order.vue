<!--
 * @Description: 订餐
 * @Author: 余子怡
 * @Date: 2023-02-17 19:22:43
 * @LastEditTime: 2023-02-19 23:12:20
-->
<template>
  <div class="meal">
    <ul class="row">
      <li class="item"  v-for="item in food">
        <el-image
          class="images"
          :src="item.picture || url"
          fit="cover"
        ></el-image>
        <div class="title">
          <div class="b-name">{{ item.name }}</div>
          <div class="b-in">
            <span class="i-item">￥<p class="price">{{ item.price }}</p></span>
            <span class="i-item2">库存：{{ item.stock }}</span></br>
          </div>
          <div class="btn">
            <el-button size="small" type="primary" :disabled="!item.stock" @click="handleOrder(item)">加入购物车</el-button>
          </div>
        </div>
      </li>
      <div class="car">
      <div class="car-in" @click="openCar = true">
      </div>
      </div>
    </ul>
    <!-- 购物车 -->
    <el-dialog title="购物车" :visible.sync="openCar">
  <el-table
    ref="multipleTable"
    :data="car"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="80">
    </el-table-column>
    <el-table-column
      label="餐品"
      width="120">
      <template slot-scope="scope">{{ scope.row.name }}</template>
    </el-table-column>
    <el-table-column
      label="价格"
      width="120"
      align='center'>
      <template slot-scope="scope">{{ scope.row.price }}</template>

    </el-table-column>
    <el-table-column
      label="数量"
      width="180"
      align="center">
      <template slot-scope="scope">
         <el-input-number v-model="scope.row.num" size="mini"  :min="1" :max="scope.row.stock"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      label="总价（元）"
      align='center'>
      <template slot-scope="scope">
         {{ scope.row.price * scope.row.num}}
      </template>
    </el-table-column>
  </el-table>
  <div class="pay">共支付：{{totalPrice}}元</div>
  <div class="pay-btn">
    <el-button @click="clear('pay')">支付</el-button>
    <el-button @click="clear('delete')">删除</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import meal from "@/api/food";
import orderMeal from "@/api/orderMeal";
export default {
  data() {
    return {
      url: "https://img2.baidu.com/it/u=1914820766,171297871&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500",
      food: [],
      id: 0,
      car: [],
      multipleSelection: [], //需结算的食物
      openCar: false,
      num: 1,
    };
  },
  created() {
    this.search();
    this.id = this.$store.state.user.id;
    const getCar = localStorage.getItem("Car");
    if (getCar) {
      this.car = JSON.parse(getCar);
    }
  },
  computed: {
    totalPrice() {
      let tempPrice = 0;
      this.multipleSelection.forEach((it) => {
        tempPrice += it.price * it.num;
      });
      return tempPrice;
    },
  },
  methods: {
    async search() {
      await meal.findAll().then((r) => {
        this.food = r.data.data.data;
      });
    },
    handleOrder(item) {
      const hasThfeFood = this.car.some((it) => it.id === item.id);
      if (hasThfeFood) {
        this.$message.error("此食物已在购物车中，请选择其他食物！");
        return;
      }
      this.$confirm("是否加入购物车?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.car.push({ ...item, num: 1 });
          localStorage.setItem("Car", JSON.stringify(this.car));
          console.log(this.car);
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加",
          });
        });
    },
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 删除or支付
    clear(type) {
      if (!this.multipleSelection?.length) {
        this.$message.warning("请勾选");
        return;
      }
      if (type == "pay") {
        this.$confirm("是否确认支付?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warn",
        })
          .then(() => {
            const ids = this.multipleSelection.map((it) => it.id);
            orderMeal.adds(this.multipleSelection).then(() => {
              this.car = this.car.filter((i) => !ids.includes(i.id));
              localStorage.setItem("Car", JSON.stringify(this.car));
              this.$message({
                type: "success",
                message: "支付成功!",
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消支付",
            });
          });
      } else {
        this.$confirm("是否确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warn",
        })
          .then(() => {
            const ids = this.multipleSelection.map((it) => it.id);
            this.car = this.car.filter((i) => !ids.includes(i.id));
            localStorage.setItem("Car", JSON.stringify(this.car));
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
            });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.meal {
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
          display: block;
          text-align: left;
          padding: 0 10px;
          width: 100%;
        }
        .b-name {
          font-size: 24px;
          line-height: 24px;
          margin-bottom: 10px;
          color: black;
        }
        .b-in {
          color: #666;
          display: table-cell;
          vertical-align: bottom;
          .i-item {
            display: inline-block;
            color: red;
            .price {
              display: inline;
              font-size: 30px;
              line-height: 30px;
            }
          }
          .i-item2 {
            margin-left: 20px;
          }
        }
        .btn {
          position: absolute;
          bottom: 20px;
          right: 0;
        }
      }
    }
    .car {
      width: 80px;
      height: 80px;
      background-color: #fff;
      border-radius: 50%;
      position: fixed;
      bottom: 20px;
      right: 100px;
      .car-in {
        width: 60px;
        height: 70px;
        background: url("../../assets/orderMeal/car.svg") no-repeat;
        background-size: cover;
        margin: 5px auto;
        cursor: pointer;
      }
    }
  }
  .pay {
    margin: 10px;
    color: red;
    font-weight: bold;
    float: left;
  }
  .pay-btn {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>