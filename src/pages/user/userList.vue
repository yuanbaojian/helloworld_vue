<template>
<!--  面包屑导航-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--card区-->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success"  @click="userFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
<!--用户列表-->
    <el-table
      :data="userList"
      style="width: 100%">

      <el-table-column
        type="index">
      </el-table-column>

      <el-table-column
        label="登录名"
        prop="loginName">
      </el-table-column>

      <el-table-column
        label="全名"
        prop="userFullName">
      </el-table-column>

      <el-table-column
        label="邮箱"
        prop="email">
      </el-table-column>

      <el-table-column
        label="手机"
        prop="mobilePhone">
      </el-table-column>

      <el-table-column
        label="手机"
        prop="mobilePhone">
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status ==1" disabled></el-switch>
        </template>
      </el-table-column>


      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>

          <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
            <el-button size="mini" type="danger" @click="deleteFormVisible=true">删除</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

<!--    添加用户模态框-->
    <el-dialog title="添加用户" :visible.sync="userFormVisible">
      <el-form :model="user" :rules="userRules" ref="userRulesRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="user.loginName"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userFullName">
          <el-input v-model="user.userFullName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

<!--删除用户提示框-->
    <el-dialog
      title="删除提示"
      :visible.sync="deleteFormVisible"
      width="30%">
      <span>是否删除该用户</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteFormVisible = false">取 消</el-button>
    <el-button type="primary" >确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>


<script>

  export default {
    created() {
      this.getUserList()
    },
    data() {
        return {
          //查询条件
          queryInfo: {
            keyword: '',
            pageNum: 1,
            pageSize: 5
          },
          userList:[],
          total:0,
          userFormVisible:false,
          //单个用户信息
          user: {
            loginName:'',
            userFullName:'',
            password:'',
          },
          userRules: {
            loginName: [
              { required: true, message: '请输入登录名', trigger: 'blur' },
              { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
            ],
            userFullName: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
            ],
          },
          deleteFormVisible:false

        }
    },
    methods:{
      //异步函数
      async getUserList() {
        let axiosResponse = await this.$http.post('/user/getAllUsers', this.queryInfo);
        window.console.log(axiosResponse)
        if(axiosResponse.status!==200){
          this.$message.error("获取用户信息失败")
        }
        this.userList=axiosResponse.data;
        this.total=axiosResponse.data.length;
      },

      addUser() {
        //async 放到valid前面
        this.$refs.userRulesRef.validate(async valid => {
          if(valid){
            let response = await this.$http.post("user/user",this.user);
            debugger;
            if(response.data.status === 200){
              this.userFormVisible=false;
              this.getUserList();
              this.$message.success("添加成功")
            } else{
              this.$message.error("添加失败");
            }
          } else{
            return false;
          }
        })
        // this.userFormVisible = false

      },
      deleteUser() {
        de
      }
    }

  }
</script>

<style scoped>
  .el-breadcrumb{
    margin-bottom: 20px;
  }

</style>
