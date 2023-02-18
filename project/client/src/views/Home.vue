<!--
 * @Description: 首页
 * @Author: 余子怡
 * @Date: 2023-02-05 22:38:53
 * @LastEditTime: 2023-02-17 21:09:44
-->
<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <div class="logo">
          <span>考</span>
          <span>研</span>
          <span>自</span>
          <span>习</span>
        </div>
      </div>
      <div class="right">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
              class="user-avatar"
            />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="personal" v-if="role != 1">
              <el-dropdown-item> 个人中心 </el-dropdown-item>
            </router-link>
            <el-dropdown-item v-if="role == 1"> 管理员 </el-dropdown-item>
            <el-dropdown-item divided @click.native="handlePwd">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="out">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="aside">
      <Aside />
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 修改密码弹窗 -->
    <el-dialog title="修改密码" :visible.sync="updatePwd" width="570px">
      <el-form
        :model="upPwdForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input
            type="password"
            v-model="upPwdForm.oldPass"
            autocomplete="off"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            type="password"
            v-model="upPwdForm.password"
            autocomplete="off"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="upPwdForm.checkPass"
            autocomplete="off"
            placeholder="请再输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Aside from "@/views/layout/Aside.vue";

export default {
  components: {
    Aside,
  },
  data() {
    // 密码校验
    var validateOldPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入旧密码"));
      } else if (value !== this.pwd) {
        console.log("cccccccc", value, this.pwd);
        callback(new Error("密码错误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else {
        if (this.upPwdForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.upPwdForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      role: "",
      toPerson: "",
      updatePwd: false,
      upPwdForm: {},
      pwd: "",
      id: "",
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.role = this.$store.state.user.role;
    this.id = this.$store.state.user.id;
    this.pwd = this.$store.state.user.password;
    console.log(this.$store.state.user);
  },
  methods: {
    handlePwd() {
      this.updatePwd = true;
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await user
            .update(this.id, this.upPwdForm)
            .then(({ data }) => {
              if (data.code === 0) {
                this.resetForm();
                this.$message({
                  type: "success",
                  message: "修改成功，请重新登录！",
                });
                this.$store.dispatch("loginOut");
                this.$router.push("/login");
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "修改失败!",
              });
            });
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    // 退出登录
    out() {
      this.$store.dispatch("loginOut");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .aside {
    float: left;
    width: 150px;
    height: 100vh;
    overflow: hidden;
  }
  .header {
    position: relative;
    width: 100%;
    height: 60px;
    text-align: center;
    .left {
      float: left;
      margin-left: 10px;
      letter-spacing: 5px;
      .logo {
        cursor: pointer;
        img {
          width: 70px;
          vertical-align: middle;
        }
        @keyframes jumping {
          0% {
            transform: translateY(0);
            text-shadow: 4px 2px 6px #ccc;
          }
          100% {
            transform: translateY(10px);
            text-shadow: 4px 6px 6px #ccc;
          }
        }
        span {
          display: inline-block;
          color: rgb(76, 78, 252);
          font-weight: bolder;
          font-size: 20px;
          text-shadow: 4px 2px 6px #ccc;
          animation: jumping 0.7s infinite alternate;
        }

        span:nth-of-type(1) {
          animation-delay: 0s;
        }
        span:nth-of-type(2) {
          animation-delay: 0.25s;
        }
        span:nth-of-type(3) {
          animation-delay: 0.5s;
        }
        span:nth-of-type(4) {
          animation-delay: 0.75s;
        }
      }
    }
    .right {
      float: right;
      height: 100%;
      line-height: 50px;
      &:focus {
        outline: none;
      }

      div:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;
        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .main {
    overflow: hidden;
    height: 100vh;
    text-align: center;
    padding: 30px;
    background-color: rgb(247, 248, 252);
  }
}
</style>
