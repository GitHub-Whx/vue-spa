<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="7">
      <el-card :body-style="{ padding: '0px', }"  style="margin:50px 0 0 0;">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px; text-align:center;">登录系统</span>
        </div>
        <div style="padding: 14px;" @keyup.enter="onSubmit">
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="160px" class="loginForm">
            <el-form-item label="邮箱" prop="email"
              :error="errors.email" style="width:80%;">
              <el-input v-model="loginForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password"
              :error="errors.password" style="width:80%;">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <div class="bottom clearfix"
                style="margin-left:160px;margin-bottom:10px;">
              <label>
                <input type="checkbox" v-model="loginForm.remember">
                记住登录
              </label>
            </div>
            <div class="bottom clearfix"
              style="margin-left:160px;margin-bottom:10px;">
              <el-button @click="onSubmit" type="primary" class="button">登录系统</el-button>
              <router-link to="/forgot-password" style="margin-left:2em;">忘记密码</router-link>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  import Vue from 'vue';
  import _ from 'underscore';
  import store from '../../store';
  import dict from '../../dict';

  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          email: '',
          password: '',
          remember: false,
        },
        errors: {
          email: null,
          password: null,
        },
        rules: {
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          ],
        },
      };
    },
    mounted () {
      let orderId = window.localStorage.getItem('order_id');
      if (orderId) {
        this.loginForm.order_id = orderId;
      }
    },
    methods: {
      onSubmit () {
        this.$refs.loginForm.validate((valid) => { // eslint-disable-line
          if (!valid) {
            console.log('error submit!!');
            return false;
          }
          Vue.http.post('/login', this.loginForm)
          .then((resp) => {
            window.localStorage.removeItem('order_id');
            if (resp.body.code === 0) {
              const data = resp.body.data;
              store.user = data.user;
              store.order.roles = data.roles;
              _.extendOwn(dict, resp.body.data.dict);
              store.setPermissions(data.permissions);
              window.vue.$router.push('/'); // eslint-disable-line
            } else {
              this.errors.email = resp.body.msg;
            }
            return false;
          }, (err) => {
            if (err.status === 422) {
              for (const name in err.body) { // eslint-disable-line
                const message = typeof err.body[name] === 'string'
                  ? err.body[name]
                  : err.body[name].join('\n');
                this.$refs.loginForm.fields[0].validateState = 'error';
                this.$refs.loginForm.fields[0].validateMessage = message;
                // this.errors[name] = message;
              }
            }
          });
        });
      }
    }
  };
</script>
