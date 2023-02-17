<!--
 * @Description: 用户管理
 * @Author: 余子怡
 * @Date: 2023-02-10 16:33:38
 * @LastEditTime: 2023-02-11 00:13:46
-->
<template>
  <div class="user">
    <div class="search">
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="display: inline"
      >
        <el-form-item label="姓名：">
          <el-input
            v-model="form.name"
            clearable
            placeholder="输入姓名查询"
          ></el-input>
        </el-form-item>
        <el-form-item label="信誉分：">
          <el-input
            v-model="form.score"
            clearable
            placeholder="输入信誉分查询"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pageChange(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleClick">新增用户</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        v-loading="loading"
      >
        <el-table-column
          fixed
          type="index"
          label="ID"
          align="center"
          :index="(form.page - 1) * form.limit + 1"
        >
        </el-table-column>
        <el-table-column align="center" label="账号">
          <template slot-scope="scope">
            {{ scope.row.account || '' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
            {{ scope.row.name || '' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="年龄">
          <template slot-scope="scope">
            {{ scope.row.age }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别">
          <template slot-scope="scope">
            {{ scope.row.sex }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号">
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="信誉分">
          <template slot-scope="scope">
            {{ scope.row.score }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="余额">
          <template slot-scope="scope">
            {{ scope.row.money }}
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
              content="删除用户信息"
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
          <el-form-item label="账号:" :label-width="formLabelWidth">
            <el-input v-model="row.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" :label-width="formLabelWidth">
            <el-input v-model="row.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄:" :label-width="formLabelWidth">
            <el-input v-model.number="row.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别:" :label-width="formLabelWidth">
            <el-select v-model="row.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号:" :label-width="formLabelWidth">
            <el-input v-model="row.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="信誉分:" :label-width="formLabelWidth">
            <el-input
              v-model.number="row.score"
              autocomplete="off"
            ></el-input> </el-form-item
          ><el-form-item label="余额:" :label-width="formLabelWidth">
            <el-input v-model.number="row.money" autocomplete="off"></el-input>
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
        :page-sizes="[4, 10, 20, 30]"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import user from '@/api/user';

export default {
  data() {
    return {
      tableData: [],
      row: {},
      form: {
        page: 1,
        limit: 4,
        role: '0'
      },
      title: '',
      total: 0,
      loading: false,
      dialogFormVisible: false,
      formLabelWidth: '160px',
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          }
        ],
        standard: [
          {
            required: true,
            message: '请输入合格成绩',
            trigger: 'blur'
          }
        ],
        perfect: [
          {
            required: true,
            message: '请输入满分成绩',
            trigger: 'blur'
          }
        ],
        unit: [
          {
            required: true,
            message: '请输入单位',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  async created() {
    await this.search();
  },
  methods: {
    // 所有用户
    async search() {
      this.loading = true;
      await user.findAll(this.form).then((r) => {
        this.tableData = r.data.data.data;
        this.total = r.data.data.total;
        this.loading = false;
      });
    },
    handleClick(e) {
      if (e.id) {
        this.title = '修改用户信息';
        this.row = { ...e };
      } else {
        this.title = '新增用户信息';
        this.row = { score: 0,money:0,password:'123456',role:'0' };
      }
      this.dialogFormVisible = true;
    },
    handleDelete(e) {
      this.row = { ...e };
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          user.delete(this.row.id).then(() => {
            this.pageChange(1);
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    async handleEdit() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          if (!this.row.id) {
            // 新增
            await user.add(this.row).then(() => {
              this.search();
              this.dialogFormVisible = false;
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
            });
            return;
          }
          await user.update(this.row.id, this.row).then(() => {
            this.search();
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
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
  }
};
</script>

<style scoped lang="less">
.user {
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
    /deep/.el-dialog{
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
