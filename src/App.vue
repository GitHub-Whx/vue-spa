<template>
  <div v-if="$route.meta.layout==='single'" id="app">
    <el-menu theme="dark" class="el-menu-fixed" mode="horizontal" router>
      <el-menu-item class="nav-band" index="/">
        <i class="el-icon-menu"></i>
        {{ config.siteName }}
      </el-menu-item>
    </el-menu>
    <el-row>
      <el-col :span="24" style="overflow:hidden;">
        <router-view class="page-fixed-header"></router-view>
      </el-col>
    </el-row>
  </div>
  <div v-else  id="app">
    <el-menu theme="dark" 
      :default-active="store.currentNavPath" 
      class="el-menu-demo" mode="horizontal" 
      router @select="handleMenuClick">
      <el-menu-item index="/" class="nav-band">
        <i class="el-icon-menu"></i>
        {{ config.siteName }}
      </el-menu-item>
      <el-menu-item v-for="(item,index) in store.menus" 
        :route="item['routes'][item['index']]" 
        :index="item['routes'][item['index']]['path']" >
        {{ item['name'] }}
      </el-menu-item>
      <el-submenu index="/user/" class="pull-right" style="float:right;">
        <template slot="title">{{ store.user ? store.user.name : 'loading' }}</template>
        <el-menu-item index="/works"> 操作记录 </el-menu-item>
        <el-menu-item index="/messages"> 消息中心 </el-menu-item>
        <el-menu-item index="/modify-password"> 修改密码 </el-menu-item>
        <el-menu-item index="/logout"> 退出登录 </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-row>
      <el-col :span="4">
        <el-menu mode="vertical" default-active="1" router
            :default-openeds="store.openedGroups"
            :default-active="$route.path"
            class="el-menu-vertical-demo">
          <el-submenu v-for="(item,key) in store.currentMenu['groups']" 
              v-bind:index="key">
              <template slot="title">{{ key }}</template>
              <el-menu-item
                  v-for="k in item"
                  v-bind:index="store.currentMenu['routes'][k]['path']"
                  :route="store.currentMenu['routes'][k]">
                {{ store.currentMenu['routes'][k]['meta']['title'] }}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <router-view single-btn="store.singleBtn"></router-view>
        </div>
      </el-col>
      <el-dialog title="提示" v-model="password.visible" size="tiny">
        <el-form :model="password">
          <el-form-item label="旧密码" label-width="80px">
            <el-input v-model="password.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="80px">
            <el-input v-model="password.newpassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="80px" style="margin-bottom:0;">
            <el-input v-model="password.repassword" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="password.visible = false">取 消</el-button>
          <el-button type="primary" @click="password.visible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import store from './store';
  import dict from './dict';
  import config from './config';
  import request from './services/request';

  export default {
    name: 'app',
    data () {
      return {
        dict,
        store,
        config,
        password: {
          password: '',
          newpassword: '',
          repassword: '',
          visible: false,
        }
      };
    },
    mounted () {
    },
    methods: {
      handleMenuClick (index) {
        if (index === '/logout') {
          this.logout();
        } else if (index === '/modify-password') {
          this.modifyPassword();
        }
      },
      logout () {
        request.post('/data/user/logout.json')
        .then((resp) => {
          if (resp.code === 0) {
            store.clearUserInfo();
            window.location.reload();
          } else {
            this.$message({
              type: 'error',
              message: resp.msg || '操作失败!'
            });
          }
        });
      },
      modifyPassword () {
        this.password.visible = true;
      }
    }
  };
</script>
<style>
  body{
    margin:0px;
    background: #efefef;
  }

  #app .sidebar{
    padding-bottom: 10000px;
    background: #e5e9f2;
    margin-bottom: -10000px;
  }

  #app .nav-message {
    color: #1D8CE0;
    line-height: 60px;
  }

  #app .el-menu-fixed{
    position: fixed;
    width: 100%;
    z-index: 1000;
  }

  #app .page-fixed-header{
    padding-top:80px;
  }

  #app .el-menu{
    border-radius: 0;
  }
  #app .grid-content{
    padding:15px;
  }
  #app .box-card{
    border-radius:0;
    margin-bottom: 10px;
  }

  /* 重置导航 */
  .nav-actions{
    float:right !important;
    /*margin-right: 15px;*/
    line-height: 60px;
  }

  .nav-actions a{
    color: #20a0ff;
    line-height: 20px;
    margin-left: 5px;
    font-size: 13px;
    text-decoration: none;
  }


  .nav-actions .el-button{
    margin-right:12px;
  }

  .nav-actions .el-switch__label span{
    top: 6px;
  }

  .nav-actions .el-select .el-input__inner{
    background: transparent;
    color: #fff;
  }


  .filter-form{
    margin-bottom:15px;
  }
  .filter-form form{
    margin-bottom:-20px;
  }
  .filter-button{
    float:right;
  }

  .el-pagination{
    text-align: right;
    margin-top: 15px;
  }

  .el-table__body a,
  .el-tooltip__popper a{
    color:#20a0ff
  }
</style>
