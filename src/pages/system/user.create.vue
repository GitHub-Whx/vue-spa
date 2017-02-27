<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card :body-style="{ padding: '0px', }"  style="margin:50px 0 0 0;">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px; text-align:center;">添加用户</span>
        </div>
        <div style="padding: 14px;">
          <el-form :model="user" :rules="rules" ref="user" label-width="160px" class="loginForm">
            <el-form-item label="姓名" prop="name"
              :error="errors.name" style="width:80%;" ref="name">
              <el-input type="name" v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" ref="email"
              :error="errors.email" style="width:80%;">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
<!-- 
            <el-form-item label="角色" prop="roles"
              style="width:80%;">
              <el-checkbox-group v-model="user.roles">
                <el-checkbox :label="role.id" v-for="role in roles">{{ role.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item> -->

<!--             <el-form-item label="小组" prop="groups"
              style="width:80%;">
              <el-checkbox-group v-model="user.groups">
                <el-checkbox :label="group.id" v-for="group in groups">{{ group.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
 -->
            <div class="bottom clearfix"
              style="margin-left:160px;margin-bottom:10px;">
              <el-button @click="onSubmit" type="primary" class="button">添加用户</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  import request from '../../services/request';

  export default {
    data () {
      return {
        user: {
          email: '',
          name: '',
          roles: [],
          groups: [],
        },
        roles: [],
        groups: [],
        errors: {
          email: null,
          name: null,
        },
        rules: {
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'change' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      onSubmit () {
        this.user.name = this.user.name.trim();
        this.user.email = this.user.email.trim();
        this.$refs.user.validate((valid) => { // eslint-disable-line
          if (!valid) {
            return false;
          }
          request.post(`/system/user`, this.user)
          .then((resp) => {
            if (resp.code === 0) {
              const id = resp.data;
              this.$router.push({
                name: 'system.user.show',
                params: { id },
              });
              this.$message.success('添加成功');
            }
          }, (err) => {
            if (err.status === 422) {
              for (const name in err.body) { // eslint-disable-line
                const message = typeof err.body[name] === 'string'
                  ? err.body[name]
                  : err.body[name].join('\n');
                this.$refs.user.fields[0].validateState = 'error';
                this.$refs.user.fields[0].validateMessage = message;
                // this.errors[name] = message;
              }
            }
          });
        });
      },
      httpGet () {
        // request.get('/system/user/config')
        // .then((resp) => {
        //   if (resp.code === 0) {
        //     this.roles = resp.data.roleData;
        //     this.groups = resp.data.groupData;
        //   }
        // });
      }
    },
    mounted () {
      this.httpGet();
    },
  };
</script>
