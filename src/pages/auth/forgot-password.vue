<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="7">
      <el-card :body-style="{ padding: '0px', }"  style="margin:50px 0 0 0;">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px; text-align:center;">找回密码</span>
        </div>
        <div style="padding: 14px;" @keyup.enter="onSubmit">
          <el-form :model="findForm" :rules="rules" ref="findForm" label-width="160px" class="loginForm">
            <el-form-item label="邮箱" prop="email"
              :error="errors.email" style="width:80%;">
              <el-input v-model="findForm.email"></el-input>
            </el-form-item>
            <div class="bottom clearfix"
              style="text-align:center;margin-bottom:10px;">
              <el-button @click="onSubmit" type="primary" class="button">找回密码</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  import Vue from 'vue';

  export default {
    name: 'ForgetPassword',
    data () {
      return {
        findForm: {
          email: '',
        },
        errors: {
          email: null,
        },
        rules: {
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
          ],
        },
      };
    },
    methods: {
      onSubmit () {
        this.$refs.findForm.validate((valid) => { // eslint-disable-line
          if (!valid) {
            console.log('error submit!!');
            return false;
          }

          Vue.http.post('/password/email', this.findForm)
          .then((resp) => {
            if (resp.ok) {
              this.$message({
                message: '邮件已发送，请查收！',
                type: 'success'
              });
              window.vue.$router.push('/login'); // eslint-disable-line
            }
          }, (err) => {
            if (err.status === 422) {
              for (const name in err.body) { // eslint-disable-line
                const message = typeof err.body[name] === 'string'
                  ? err.body[name]
                  : err.body[name].join('\n');
                this.errors[name] = message;
              }
            }
          });
        });
      }
    }
  };
</script>
