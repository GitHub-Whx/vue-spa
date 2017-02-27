<template>
  <el-col :span="24">

    <el-card style="margin-bottom:15px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 24px;">【{{ user.name }}】角色&小组 配置</span>
        
        <el-switch
          v-model="user.activated"
          on-text="正常"
          off-text="禁用">
        </el-switch>

        <el-button type="primary" style="float:right;" @click="saveUserInfo"> 保存修改 </el-button>
      </div>

      <el-form :model="user" ref="user">
        <el-form-item label="角色" prop="roles"
          style="width:80%;">
          <el-checkbox-group v-model="user.roles">
            <el-checkbox :label="role.id" v-for="role in roles">{{ role.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="小组" prop="groups"
          style="width:80%;">
          <el-checkbox-group v-model="user.groups">
            <el-checkbox :label="group.id" v-for="group in groups">{{ group.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      
    </el-card>

    <el-card v-for="(module,i) in permissions" style="margin-bottom:15px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 24px;">{{ module.name }}[不可编辑]</span>
      </div>
      <el-tree 
        node-key="key"
        :ref="`tree${i}`"
        :data="module.data" 
        :props="defaultProps" 
        :default-checked-keys="user.permissions"
        default-expand-all="" 
        check-strictly
        show-checkbox="">
      </el-tree>
    </el-card>
  </el-col>
</template>
<script>
  import _ from 'underscore';
  import request from '../../services/request';
  import permissions from '../../config/permissions';

  export default {
    data () {
      return {
        permissions: [],
        permissionKeys: [],
        user: {},
        nodes: [],
        groups: [],
        roles: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          value: 'key'
        }
      };
    },
    mounted () {
       this.transConfigToData();
       this.httpGet();
    },
    methods: {
      httpGet () {
        const id = this.$route.params.id;
        request.get(`/data/user/user.${id}.json`)
        .then((resp) => {
          this.user = resp.user;
          this.roles = resp.roles;
          this.groups = resp.groups;

          this.permissions.forEach((module, i) => {
            const d = this.$refs[`tree${i}`][0];
            if (_.contains(this.user.permissions, 'super')) {
              d.setCheckedKeys(this.permissionKeys, 0);
            } else {
              d.setCheckedKeys(this.user.permissions, 0);
            }
          });
        });
      },
      saveUserInfo () {
        const id = this.$route.params.id;
        const data = {
          roles: this.user.roles,
          groups: this.user.groups,
          activated: this.user.activated ? 1 : 0,
        };
        request.put(`system/user/${id}`, data)
        .then((resp) => {
          if (resp.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.httpGet();
          }
        });
      },
      transConfigToData () {
        this.permissions = _.clone(permissions);
        this.permissions.forEach((module, i) => {
          this.permissions[i].data = [];
          this.permissions[i].has = [];
        });

        this.permissions.forEach((module) => {
          _.chain(module.groups).values().flatten().each((key) => {
            let item = { // 生成父级
              key,
              name: module.routes[key].meta.title,
              children: [],
            };
            this.permissionKeys.push(key);

            _.each(module.routes, (i, k) => {
              if (i.refer === key) { // 生成子级
                item.children.push({
                  key: k,
                  name: i.meta.title,
                });
                this.permissionKeys.push(k);
              }
            });
            module.data.push(item);
          });
        });
      },
    }
  };
</script>
