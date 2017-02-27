<template>
  <el-col :span="24">
    <el-card class="filter-form box-card">
      <el-form :inline="true" :model="query" ref="form">
        <el-form-item class="filter-button">
          <el-button @click="dialogFormVisible = true" type="primary">
            创建
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table :data="data" style="width: 100%" border>
        <el-table-column label="id" prop="id" width="80">
        </el-table-column>
        <el-table-column label="名称" prop="name" width="120">
        </el-table-column>
        <el-table-column label="成员" prop="name" inline-template>
          <span>{{ row.users.join(',') }}</span>
        </el-table-column>
        <el-table-column
          inline-template
          width="150"
          align="center"
          prop="id"
          label="操作">
          <template>
            <router-link :to="{ name: 'system.group.show', params: { id: row.id }}"> 查看 </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="current_page"
        :page-size="per_page"
        :page-sizes="[20, 40, 60, 100]"
        :Total="total"
        @current-change="handleCurrentPageChange"
        @size-change="handlePageSizeChange"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-card>

    <el-dialog title="添加小组" v-model="dialogFormVisible">
      <el-form :model="group" :rules="rules" ref="group" >
        <el-form-item label="小组名称" prop="name" :label-width="formLabelWidth"
                      :error="errors.name" style="width:80%;">
          <el-input v-model="group.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>
<script>

  import request from '../../services/request';

  export default {
    name: 'GroupIndex',
    data () {
      return {
        query: {
          pageSize: 20,
          page: 1,
        },
        total: 1,
        per_page: 20,
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
        from: 1,
        to: 1,
        data: [],
        group: {
          name: '',
        },
        errors: {
          email: null,
          name: null,
        },
        dialogFormVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入小组姓名', trigger: 'change' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
          ],
        },
        formLabelWidth: '120px',
      };
    },
    mounted () {
      this.httpGet();
    },
    methods: {
      httpGet () {
        request.get('/data/user/groups.json', this.query)
        .then((resp) => {
          this.data = resp.data;
          this.total = resp.total;
          this.query.pageSize = resp.per_page;
          this.query.page = resp.current_page;
        }, (err) => {
          console.log(err);
        });
      },
      handleCurrentPageChange (val) {
        this.current_page = val;
        this.query.page = val;
        this.httpGet();
      },
      handleSearch () {
        this.httpGet();
      },
      handlePageSizeChange (val) {
        this.per_page = val;
        this.query.pageSize = val;
        this.httpGet();
      },
      seeContent (id) {
        return window.alert(id);
      },
      onSubmit () {
        this.$refs.group.validate((valid) => { // eslint-disable-line
          if (!valid) {
            return false;
          }
          request.post(`/system/group`, this.group)
          .then((resp) => {
            if (resp.code === 0) {
              const id = resp.data;
              this.$router.push({
                name: 'system.group.show',
                params: { id },
              });
            } else {
              this.$message({
                type: 'error',
                message: resp.msg || '操作失败！',
              });
            }
          });
        });
      }
    },
  };
</script>
