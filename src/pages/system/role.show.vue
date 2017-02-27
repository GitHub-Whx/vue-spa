<template>
  <el-col :span="24">
    <el-card style="margin-bottom:15px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 24px;">【{{ role.name }}】节点配置</span>
        <el-button type="primary" style="float:right;" @click="saveForm">保存</el-button>
      </div>
    </el-card>

    <el-card v-for="(module,i) in permissions" style="margin-bottom:15px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 24px;">{{ module.name }}</span>
      </div>
      <el-tree 
        node-key="key"
        :ref="`tree${i}`"
        :data="module.data" 
        :props="defaultProps" 
        :default-checked-keys="role.permissions"
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
        role: {},
        nodes: {},
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
        request.get(`data/user/role.${id}.json`)
        .then((resp) => {
          this.role = resp;
          this.permissions.forEach((module, i) => {
            const d = this.$refs[`tree${i}`][0];
            if (_.contains(this.role.permissions, 'super')) {
              d.setCheckedKeys(this.permissionKeys, 0);
            } else {
              d.setCheckedKeys(this.role.permissions, 0);
            }
          });
        });
      },
      saveForm () {
        const data = {
          permissions: [],
          nodes: [],
        };
        this.permissions.forEach((module, i) => {
          const d = this.$refs[`tree${i}`][0];
          data.permissions = data.permissions.concat(d.getCheckedKeys());
        });
        if (_.contains(this.role.permissions, 'super')) {
          data.permissions = ['super'];
        }

        const id = this.$route.params.id;
        request.put(`system/role/${id}`, data)
        .then((resp) => {
          if (resp.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.$router.push({name: 'system.role.index'});
          }
        });
      },
      handleCheckChange (data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
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
