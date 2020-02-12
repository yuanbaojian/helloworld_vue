<template>
	<div>
		<!-- begin login-cover -->
		<div class="login-cover">
<!--			<div class="login-cover-image" v-bind:style="{ backgroundImage: 'url(../assets/img/login-bg/login-bg-13.jpg)' }"></div>-->
      <img src="../assets/img/login-bg/login-bg-13.jpg" alt="">
			<div class="login-cover-bg"></div>
		</div>
		<!-- end login-cover -->

		<!-- begin login -->
		<div class="login login-v2" data-pageload-addclass="animated fadeIn">
			<!-- begin brand -->
			<div class="login-header">
				<div class="brand">
					<span class="logo"></span> <b>3DCAPP</b>
					<small>项目管理系统</small>
				</div>
				<div class="icon">
					<i class="fa fa-lock"></i>
				</div>
			</div>
			<!-- end brand -->
			<!-- begin login-content -->
			<div class="login-content">
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px">
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="loginForm.loginName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-button type="success" @click="login('loginForm')">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form>
			</div>
			<!-- end login-content -->
		</div>
		<!-- end login -->
	</div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm : {
          loginName : 'admin',
          password : '123456'
        },
        //验证规则
        loginFormRules: {
          loginName: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      login :function(formName) {
        this.$refs[formName].validate( (valid) => {
            if(valid){
              //    使用 箭头标识符  就可以避免this成undedined
              this.$http.post("auth/login", this.loginForm)
                .then( response => {
                  if(response.data.status == 200){
                    // return  this.$message.success("登陆成功")
                    window.sessionStorage.setItem("token", response.data.data)
                    this.$message.success("success")
                    this.$router.push("/home")
                  } else {
                    this.$message.error("登录失败")
                  }
                })

            } else {
              return ;
            }
          },
        )
      }
    }

  }
</script>
