<!--
 * @Description: 食物管理
 * @Author: 余子怡
 * @Date: 2023-02-10 16:33:38
 * @LastEditTime: 2023-02-17 16:46:32
-->
<template>
  <div class="seat">
    <div class="search">
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="display: inline"
      >
        <el-form-item label="名称：">
          <el-input v-model="form.name" clearable placeholder="请选择">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pageChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleClick">新增食物</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        v-loading="loading"
        max-height="440px"
      >
        <el-table-column
          fixed
          type="index"
          label="ID"
          align="center"
          :index="(form.page - 1) * form.limit + 1"
        >
        </el-table-column>
        <el-table-column align="center" label="食物名称">
          <template slot-scope="scope">
            {{ scope.row.name || "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="图片">
          <template slot-scope="scope">
            <el-image
        style="width: 100px; height: 100px"
      :src="scope.row.picture ? scope.row.picture : url"
      fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格">
          <template slot-scope="scope">
            {{ scope.row.price || "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="库存">
          <template slot-scope="scope">
            {{ scope.row.stock }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑信息"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleClick(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除食物信息"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="edit">
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="$refs['ruleForm'].resetFields()"
      >
        <template scope-slot="title">
          <h2 align="center" style="margin-bottom: 20px">{{ title }}</h2>
        </template>
        <el-form :model="row" :rules="rules" ref="ruleForm">
          <el-form-item label="食物名称:" :label-width="formLabelWidth">
            <el-input v-model="row.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格:" :label-width="formLabelWidth">
            <el-input v-model.number="row.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="库存:" :label-width="formLabelWidth">
            <el-input v-model.number="row.stock" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="食物图片:" :label-width="formLabelWidth">
             <!-- 图片上传 -->
             <UploadImg @imgChange="imageUpload"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="pager">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="form.page"
        @current-change="pageChange"
        @size-change="sizeChange"
        :page-size="form.limit"
        :page-sizes="[5, 10, 20, 30]"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import food from "@/api/food";
import UploadImg from "@/components/uploadImg.vue"
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      tableData: [],
      row: {},
      form: {
        page: 1,
        limit: 5,
      },
      title: "",
      total: 0,
      url:'https://img3.912688.com/326A3A9C31404BBC2C9AA488AC0C3824.jpg?imageMogr2/gravity/NorthWest/crop/660x660/quality/90',
      imgSrc: "",
      loading: false,
      dialogFormVisible: false,
      formLabelWidth: "160px",
      rules: {
        name: [
          {
            required: true,
            message: "请输入食物名称",
            trigger: "blur",
          },
        ],
        stock: [
          {
            required: true,
            message: "请输入食物库存",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async created() {
    await this.search();
  },
  methods: {
    // 所有食物
    async search() {
      this.loading = true;
      await food.findAll(this.form).then((r) => {
        this.tableData = r.data.data.data;
        this.total = r.data.data.total;
        this.loading = false;
      });
    },
    handleClick(e) {
      if (e.id) {
        this.title = "修改食物信息";
        this.row = { ...e };
      } else {
        this.title = "新增食物信息";
        this.row = {};
      }
      this.dialogFormVisible = true;
    },
    handleDelete(e) {
      this.row = { ...e };
      this.$confirm("此操作将永久删除该食物信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          food.delete(this.row.id).then(() => {
            this.pageChange(1);
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
     // 上传图片
     imageUpload(images){
      this.imgSrc = images
    },
    async handleEdit() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (!this.row.id) {
            // 新增
            await food.add({...this.row,picture: this.imgSrc}).then(() => {
              this.search();
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "新增成功!",
              });
            });
            return;
          }
          await food.update(this.row.id, {...this.row,picture: this.imgSrc}).then(() => {
            this.search();
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          });
        }
      });
    },
    async pageChange(e) {
      this.form.page = e;
      await this.search();
    },
    async sizeChange(e) {
      this.form.page = 1;
      this.form.limit = e;
      await this.search();
    },
  },
};
</script>

<style scoped lang="less">
.seat {
  width: 90%;
  height: 100%;
  background-color: #fff;
  padding: 40px;
  overflow-y: scroll;

  .search {
    width: 100%;
    margin-top: 20px;
    text-align: left;
  }

  .table {
    overflow-y: auto;
    margin-right: 100px;
  }

  .edit {
    position: absolute;
    left: 50%;
    top: 50%;

    .layout {
      float: left;
      width: 50%;

      .a {
        z-index: 999;
      }
    }

    // 弹窗
    /deep/.el-dialog {
      width: 36%;
    }
    /deep/.el-form-item__content {
      margin-left: 0;
      width: 220px;
    }

    /deep/ .el-dialog__body,
    /deep/ .el-form-item__label {
      color: #000;
    }
  }

  .pager {
    padding: 20px 0;
    text-align: left;
    margin-bottom: 20px;
  }

  /deep/ .el-table {
    color: #000;
  }

  /deep/ .el-table thead {
    color: #000;
  }
}
</style>
