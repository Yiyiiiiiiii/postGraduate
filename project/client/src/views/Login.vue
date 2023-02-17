<template>
  <div class="login-content">
    <div class="title-container">
      <h1 class="title">考研自习室</h1>
    </div>
    <div class="login">
      <el-form
        :inline="true"
        ref="form"
        :model="userForm"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="用户:">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input type="captcha" v-model="userForm.captcha">
            <template slot="append">
              <img
                style="height: 30px"
                src="postgraduate/common/captcha"
                alt="验证码"
                ref="img"
                @click="refreshCaptcha"
            /></template>
          </el-input>
        </el-form-item>

        <el-button type="primary" @click="Login" style="width: 80%"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import loginApi from "@/api/login";

export default {
  data() {
    return {
      userForm: {
        account: "",
        password: "",
        captcha: "",
      },
    };
  },
  methods: {
    async Login() {
      await loginApi.userLogin(this.userForm).then((r) => {
        if (r.data.data === "账户不存在") {
          this.$message.error("账户不存在");
          return;
        }
        if (r.data.data === null) {
          this.$message.error("密码错误");
          return;
        }
        if (r.data.data === "验证码错误") {
          this.$message.error("验证码错误");
          this.refreshCaptcha();
          this.userForm.captcha = "";
          return;
        }
        this.$store.dispatch("setUserInfo", r.data.data);
        localStorage.setItem("userInfo", JSON.stringify(r.data.data || {}));
        this.$router.push("/orderseat");
      });
    },
    handleClick({ label }) {
      this.role = label;
    },
    refreshCaptcha() {
      this.$refs.img.src = `/postgraduate/common/captcha?rad=${Math.random()}`;
    },
  },
};
</script>

<style scoped lang="less">
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: url("../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  // 标题
  .title-container {
    position: relative;
    margin-top: 50px;
    .title {
      font-size: 36px;
      color: white;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .login {
    width: 450px;
    height: 400px;
    // padding: 30px;
    /deep/.el-form-item__label {
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
    /deep/.el-input__inner {
      background-color: transparent;
      color: white;
    }
    /deep/.el-form-item__content {
      width: 360px;
    }
    /deep/.el-form-item {
      margin-bottom: 60px;
    }
  }
}
</style>
