<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card :body-style="{ padding: '0px', }"  style="margin:50px 0 0 0;">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px; text-align:center;">登录系统</span>
          <el-button style="float: right;" type="primary">操作按钮</el-button>
        </div>
        <div style="padding: 14px;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    name: 'ResetPassword',
    data () {
      return {
        ruleForm: {
          name: '',
          region: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' },
          ],
        },
      };
    },
  };
</script>
