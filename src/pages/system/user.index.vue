<template>
  <el-col :span="24">
    <el-card class="filter-form box-card">
      <div @keyup.enter="handleSearch">
        <el-form :inline="true" :model="query" ref="form">
          <el-form-item prop="name">
            <el-input placeholder="用户名" style="width: 180px;" v-model="query.name">
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="邮箱" style="width: 180px;" v-model="query.email">
            </el-input>
          </el-form-item>
          <el-form-item class="filter-buttom">
            <el-button @click.native.prevent="handleSearch" icon="search" type="primary">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table :data="data" style="width: 100%">
        <el-table-column label="id" prop="id" width="60">
        </el-table-column>
        <el-table-column label="姓名" prop="name" width="100">
        </el-table-column>
        <el-table-column label="邮箱" prop="email" width="160" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="角色" prop="group" inline-template>
          <template>
            <el-tag v-for="name in row.roles"
                  type="primary" close-transition>
              {{ name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="小组" prop="role" width="160" inline-template>
          <template>
            <el-tag v-for="name in row.groups"
                type="primary" close-transition>
              {{ name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间" prop="last_login" width="170">
        </el-table-column>
        <el-table-column
                inline-template
                width="80"
                align="center"
                prop="id"
                label="操作">
          <template>
            <router-link :to="{ name: 'system.user.show', params: { id: row.id }}"> 查看</router-link>
            <!-- <el-button type="success" icon="search" size="small" @click="seeContent(row.id)">查看</el-button> -->
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
  </el-col>
</template>
<script>

  import request from '../../services/request';

  export default {
    data () {
      return {
        query: {
          pageSize: 20,
          page: 1,
        },
        total: 0,
        per_page: 20,
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
        from: 1,
        to: 1,
        data: [],
      };
    },
    mounted () {
      this.httpGet();
    },
    methods: {
      httpGet () {
        request.get('/data/user/users.json', this.query)
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
        this.query.page = 1;
        this.total = 0;
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
    },
  };
</script>
