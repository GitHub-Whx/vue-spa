<template>
  <el-col :span="24">
    <el-card style="margin-bottom:15px;">
      <div slot="header" class="clearfix">
        <el-input v-model="group.name" style="width:10em;"></el-input>
        <el-button type="primary" style="float:right;margin-top:-5px;" @click="saveGroupInfo"> 保存修改 </el-button>
      </div>

      <p class="h3">用户</p>
      <el-checkbox-group v-model="checked">
        <el-checkbox v-for="item in users" 
          :label="item.id" 
        >{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </el-card>
  </el-col>
</template>
<script>

  import dict from '../../dict';
  import request from '../../services/request';

  export default {
    name: 'GroupShow',
    data () {
      return {
        dict,
        group: {
          users: [],
          prefer: [],
        },
        users: [],
        checked: [],
      };
    },
    mounted () {
       this.httpGet();
    },
    methods: {
      httpGet () {
        const id = this.$route.params.id;
        request.get(`data/user/group.${id}.json`)
        .then((resp) => {
          this.group = resp;
          this.users = resp['all-users'];
          this.checked = this.group.users;
        });
      },
      saveGroupInfo () {
        const id = this.$route.params.id;
        const data = {
          checked: this.checked,
          name: this.group.name,
        };
        request.put(`system/group/${id}`, data)
        .then((resp) => {
          if (resp.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.$router.push({name: 'system.group.index'});
          }
        });
      },
    }
  };
</script>

<style>
  .el-checkbox {
    margin-left: 15px !important;
    margin-bottom: 8px;
  }
</style>
