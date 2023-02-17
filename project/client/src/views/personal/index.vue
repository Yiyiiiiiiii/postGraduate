<!--
 * @Description: 个人中心
 * @Author: 余子怡
 * @Date: 2023-02-07 21:51:53
 * @LastEditTime: 2023-02-12 23:10:35
-->
<template>
  <div class="personal">
    <!-- 顶部资料 -->
    <div class="info">
      <!-- 头像 -->
      <div class="avatar">
        <el-image
          v-if="user.avatar"
          class="avatar-img"
          :src="user.avatar || url"
        ></el-image>
        <div class="avatar-bottom">
          <p class="upload" @click="uploadImg = true">更换头像</p>
        </div>
      </div>
      <!-- 信息 -->
      <div class="right">
        <div class="name">
          <div class="name-left">
            <!-- 用户名 -->
            <span class="username">{{ user.account }}</span>
            <i v-if="user.sex == '女'" class="icon-sex"
              ><img src="../../assets/personal/woman.svg"
            /></i>
            <i v-if="user.sex == '男' || user.sex == ''" class="icon-sex"
              ><img src="../../assets/personal/man.svg"
            /></i>
          </div>
          <!-- 修改资料 -->
          <div class="edit">
            <span class="btn" @click="handleEdit">编辑个人资料</span>
          </div>
        </div>
        <div class="infomation">
          <el-descriptions title="个人信息">
            <el-descriptions-item label="姓名">{{
              user.name
            }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{
              user.sex
            }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{
              user.age
            }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{
              user.phone
            }}</el-descriptions-item>
            <el-descriptions-item label="信誉分">{{
              user.score
            }}</el-descriptions-item>
            <el-descriptions-item label="余额"
              >{{ user.money }}元</el-descriptions-item
            >
          </el-descriptions>
        </div>
      </div>
    </div>
    <!-- 选座历史 -->
    <div class="seat">
      <div class="title">
        <div>
          <h3>历史选座</h3>
          <h4>累积选座{{ total }}次</h4>
        </div>
        <div class="title-right">
          <span :class="check == 0 ? 'active' : ''" @click="orderWeek"
            >最近一周</span
          >
          <el-divider direction="vertical"></el-divider>
          <span :class="check == 1 ? 'active' : ''" @click="orderAll"
            >所有时间</span
          >
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="seatTable" stripe style="width: 100%" max-height="360px">
        <el-table-column type="index" width="50" align="center">
        </el-table-column>
        <el-table-column
          prop="seat_no"
          label="座位号"
          align="center"
          width="200"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.Seat && scope.row.Seat.seat_no }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="订座类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.Seat && scope.row.Seat.type }}
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="订座日期"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="退座日期"
          width="180"
          align="center"
        >
        </el-table-column>
      </el-table>
      <!-- 查看更多 -->
      <div class="more">
        <a href="">查看更多></a>
      </div>
    </div>
    <!-- 修改资料弹窗 -->
    <el-dialog title="个人资料" :visible.sync="updateInfo" width="570px">
      <el-form :model="userform">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="userform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄:" :label-width="formLabelWidth">
          <el-input v-model="userform.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-select v-model="userform.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="userform.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(userform)"
          >保 存</el-button
        >
      </div>
    </el-dialog>
    <!-- 上传头像弹窗 -->
    <el-dialog title="更换头像" :visible.sync="uploadImg">
      <!-- 图片上传 -->
      <UploadImg @imgChange="imageUpload"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadImg = false">取 消</el-button>
        <el-button type="primary" @click="handleImg">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import userApi from "@/api/user";
import orderSeat from "@/api/orderSeat";
import { getTimeTranslate } from "@/utils/time.js";
import UploadImg from "@/components/uploadImg.vue"
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", //头像
      user: {}, //用户信息
      check: 0,
      seatTable: [],
      tempTable: [],
      total: 0, //选座次数
      updateInfo: false,
      uploadImg: false,
      form: {},
      userform: {},
      formLabelWidth: "160px",
      imgSrc:''
    };
  },
  async created() {
    this.user = this.$store.state.user;
    await this.search();
    this.orderWeek();
    this.userInfo();
  },
  methods: {
    // 当前用户信息
    async userInfo() {
      await userApi.findOne(this.user.id).then(async (r) => {
        console.log("当前用户信息", r.data.data);
        this.user = r.data.data;
        await this.$store.dispatch("setUserInfo", r.data.data);
      });
    },
    // 查询登录用户订座的接口
    async search() {
      await orderSeat.findAll({ UserId: this.user.id }).then(async (r) => {
        this.seatTable = r.data.data.data.map((it) => {
          it.start_time = getTimeTranslate(it.start_time);
          it.end_time = getTimeTranslate(it.end_time);
          return it;
        });
        const tempWeek = this.seatTable.map((it) => {
          const now = moment().format("YYYY-MM-DD HH:mm:ss");
          const lastWeek = moment()
            .subtract(7, "days")
            .format("YYYY-MM-DD HH:mm:ss");
          if (!(it.start_time > now || it.end_time < lastWeek)) {
            return it;
          }
        });
        this.weekTable = tempWeek.filter(Boolean);
        console.log(this.weekTable);
        this.total = r.data.data.total;
      });
    },
    // 修改资料
    async handleEdit() {
      this.updateInfo = true;
      this.userform = this.user;
    },
    // 确认修改
    async handleUpdate(userform) {
      await userApi.update(this.user.id, userform).then(async () => {
        await this.userInfo();
        this.$message.success("修改成功");
        this.updateInfo = false;
      });
    },
    // 取消修改
    onCancel() {
      this.$message.warning("已取消修改");
      this.updateInfo = false;
    },
    // 上传图片
    imageUpload(images){
      this.imgSrc = images
    },
    // 确认修改头像
    handleImg() {
      userApi
        .update(this.user.id, { ...this.user, avatar: this.imgSrc })
        .then(async () => {
          await this.userInfo();
          this.$message.success("上传成功");
          this.uploadImg = false;
        });
    },
    orderWeek() {
      this.check = 0;
      this.seatTable = this.weekTable;
    },
    orderAll() {
      this.check = 1;
      this.search();
    },
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 90%;
  height: 100%;
  background-color: #fff;
  padding: 40px;

  // 顶部资料
  .info {
    width: 90%;
    height: 200px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    // 头像
    .avatar {
      width: 188px;
      height: 188px;
      flex: 1;
      position: absolute;
      &:hover {
        .avatar-bottom {
          display: block;
        }
      }
      .avatar-img {
        display: block;
        width: 180px;
        height: 180px;
        padding: 3px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }
      // 更改头像
      .avatar-bottom {
        position: absolute;
        display: none;
        left: 4px;
        bottom: 3px;
        // display: block;
        width: 180px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        color: #fff;
        background: #8e8e8e;
        opacity: 0.8;
        cursor: pointer;
        .upload {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 3px;
          display: block;
          width: 180px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          color: #fff;
          font-size: 13px;
          text-decoration: none;
        }
      }
    }
    // 用户信息
    .right {
      margin-left: 230px;
      text-align: left;
      height: 188px;

      .name {
        padding-bottom: 12px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;

        .name-left {
          float: left;

          .username {
            float: left;
            margin-top: 3px;
            font-size: 30px;
            font-weight: normal;
            line-height: 30px;
          }
          .icon-sex {
            img {
              width: 40px;
              height: 37px;
            }
          }
        }
        // 编辑按钮
        .edit {
          float: right;
          margin-top: 4px;
          border: 1px solid #cdcdcd;
          border-radius: 5px;
          height: 30px;
          background: #f6f6f6;
          cursor: pointer;
          box-shadow: -1px 1px #dad8d8;
          .btn {
            text-align: center;
            padding: 0 20px;
            font-size: 12px;
            line-height: 30px;
          }
        }
        .edit:hover {
          box-shadow: -1px 1px #b5b5b5;
          background: #fdfdfd;
        }
      }

      // 清除浮动
      .name::after {
        content: ".";
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
      }
    }
  }

  // 选座历史
  .seat {
    width: 90%;
    // 标题
    .title {
      height: 31px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #c20c0c;
      h3 {
        display: inline-block;
        font-size: 20px;
        line-height: 28px;
        color: #666;
      }
      h4 {
        display: inline-block;
        margin-top: 5px;
        margin-left: 10px;
        line-height: 26px;
        font-weight: 400;
        color: #666;
      }
      .title-right {
        span {
          cursor: pointer;
          line-height: 26px;
          color: #666;
          font-size: 12px;
        }
        //  选种后样式
        .active {
          color: #333;
          font-weight: 700;
        }
      }
    }
    // 更多
    .more {
      height: 32px;
      line-height: 32px;
      text-align: right;
      a {
        color: #666;
        cursor: pointer;
        text-decoration: none;
        font-size: 12px;
      }
    }
  }

  // 弹窗
  /deep/.el-form-item__content {
    margin-left: 0;
    width: 220px;
  }
}
</style>
