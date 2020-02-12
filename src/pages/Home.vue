<template>
  <el-container class="homeContainer">
    <el-header>
      <div>
        <img src="../assets/img/logo.png" style="transform: scale(0.4)" alt="">
        <span>管理员后台</span>
      </div>

      <el-dropdown>
        <el-button type="primary">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="edit()">编辑个人资料</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>
    <el-container>
      <el-aside width="200px">
<!--        菜单项  router激活路由-->
        <el-menu
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
<!--          一级菜单-->
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>

<!--            二级菜单-->
            <el-menu-item :index="subitem.path" v-for="subitem in item.treeNode" :key="subitem.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subitem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

  created() {
    this.getMenu()
  },

  data(){
        return{
            menuList:[],

        }
    },

  methods: {
    logout() {
      debugger
      window.sessionStorage.clear();
      this.$http.delete('/auth/logout');
      this.$router.push('/login')
    },

    //异步获取数据， 执行完毕后 再执行下一句
    async getMenu() {
      let menu = await this.$http.post("/menu/getAll");

      this.menuList=menu.data
    },
    edit() {
      this.$router.push('/editUserInfo')
    }
  },

}
</script>

<style scoped>
  .el-header{
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: white;
    font-size: 20px;
    > div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }
  .el-aside{
    background-color: #545c64;

  }
  .el-main{
    background-color: white;
  }
  .homeContainer{
    height: 100%;
  }
  .el-menu{
    border-right: none;
  }
</style>
