<!--
 * @Description: 订餐管理
 * @Author: 余子怡
 * @Date: 2023-02-10 16:33:38
 * @LastEditTime: 2023-02-17 18:59:53
-->
<template>
  <div class="orderMeal">
    <div class="search">
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="display: inline"
      >
        <el-form-item label="状态：">
          <el-select v-model="form.status" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pageChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleClick">新增订单</el-button>
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
        <el-table-column align="center" label="相关用户">
          <template slot-scope="scope">
            {{ scope.row.User.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="餐品名称">
          <template slot-scope="scope">
            {{ scope.row.Food.name || "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="图片">
          <template slot-scope="scope">
            <el-image
        style="width: 100px; height: 100px"
      :src="scope.row.picture ? scope.row.Food.picture : url"
      fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订餐时间">
          <template slot-scope="scope">
            {{ scope.row.time || "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单状态">
          <template slot-scope="scope">
            {{ options.find((it) => it.value === scope.row.status)?.label || "" }}
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
              content="删除订单信息"
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
          <el-form-item label="相关用户:" :label-width="formLabelWidth">
            <el-input v-model="row.User.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="餐品名称:" :label-width="formLabelWidth">
            <el-select
    v-model="row.Food.name"
    multiple
    collapse-tags
    filterable
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in foodOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
          </el-form-item>
          <el-form-item label="订单时间:" :label-width="formLabelWidth">
            <el-date-picker
      v-model="row.time"
      type="datetime"
      placeholder="选择日期时间"
      default-time="09:00:00">
    </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态:" :label-width="formLabelWidth">
            <el-select v-model="row.status" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
import { getTimeTranslate } from "@/utils/time.js";
import orderMeal from "@/api/orderBook";
export default {
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
      url:'https://img2.baidu.com/it/u=1914820766,171297871&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
      imgSrc: "",
      loading: false,
      dialogFormVisible: false,
      formLabelWidth: "160px",

      rules: {
        name: [
          {
            required: true,
            message: "请输入餐品名称",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入相关用户姓名",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "请输入订单状态",
            trigger: "blur",
          },
        ],
      },
      options: [
        { label: "制作中...", value: 0 },
        { label: "已出餐", value: 1 },
      ],
      foodOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    };
  },
  async created() {
    await this.search();
  },
  methods: {
    // 所有订单
    async search() {
      this.loading = true;
      await orderMeal.findAll(this.form).then((r) => {
        this.tableData = r.data.data.data.map((it) => {
          it.time = getTimeTranslate(it.time);
          return it;
        });
        this.total = r.data.data.total;
        this.loading = false;
      });
    },
    handleClick(e) {
      if (e.id) {
        this.title = "修改订单信息";
        this.row = { ...e };
      } else {
        this.title = "新增订单信息";
        this.row = {};
      }
      this.dialogFormVisible = true;
    },
    handleDelete(e) {
      this.row = { ...e };
      this.$confirm("此操作将永久删除该订单信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          orderMeal.delete(this.row.id).then(() => {
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
    async handleEdit() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (!this.row.id) {
            // 新增
            await orderMeal.add({...this.row}).then(() => {
              this.search();
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "新增成功!",
              });
            });
            return;
          }
          await orderMeal.update(this.row.id, {...this.row}).then(() => {
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
.orderMeal {
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
  // 上传图片
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
