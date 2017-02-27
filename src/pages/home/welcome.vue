<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        hello1
        <span v-if="can('test01')">权限 test01</span>
        <span v-can="'test02'">权限 test02</span>
      </el-card>
    </el-col>
  </el-row>
</template>
