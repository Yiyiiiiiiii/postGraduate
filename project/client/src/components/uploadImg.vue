<!--
 * @Description: 上传图片
 * @Author: 余子怡
 * @Date: 2023-02-12 22:52:24
 * @LastEditTime: 2023-02-12 23:50:20
-->
<template>
    <div class="avatar">
        <el-upload
        class="avatar-uploader"
        action="/postgraduate/common/upload"
        :show-file-list="false"
        name="avatar"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  
</template>

<script>
export default {
    data () {
        return {
            imageUrl: "",
        }
    },
    methods:{
        // 上传头像
    handleAvatarSuccess(res, file) {
    //   console.log(res, file, URL.createObjectURL(file.raw));
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('imgChange',res.data)
    },
    }
}
</script>

<style lang="less" scoped>
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>