<template>
	<div class="user-container">
		<el-row class="user-top">
		 	<el-col :span="16">
		  		<div class="grid-content bg-purple">
		  			<el-form autoComplete="on" :model="addUserForm" :rules="addUserRules" ref="loginForm" label-position="left" label-width="0px"
				      	class="card-box login-form">
				      	<h3 class="title">添加新用户</h3>
				      	<el-form-item prop="username">
				        	<span class="svg-container svg-container_login">
				          	<icon-svg icon-class="yonghuming" />
				        	</span>
				        	<el-input name="username" type="text" v-model="addUserForm.username" autoComplete="on" placeholder="username" />
				      	</el-form-item>
				      	<el-form-item prop="password">
				        	<span class="svg-container">
				          	<icon-svg icon-class="mima"></icon-svg>
				        	</span>
				        	<el-input name="password" type="password" @keyup.enter.native="addUser" v-model="addUserForm.password" autoComplete="on"
				          	placeholder="password"></el-input>
				      	</el-form-item>
				      	<el-form-item>
				        	<el-button type="primary" style="width:100%;" @click.native.prevent="addUser">
				          		添加
				        	</el-button>
				      	</el-form-item>
				      	<div class='tips'>
				        	<span style="margin-right:20px;color:red;" v-show=this.showinfo>{{info}}</span>
				      	</div>
				    </el-form>
		  		</div>
		  	</el-col>
		  	<el-col :span="8">
		  		<div class="grid-content bg-purple-light">
		  			yaw
		  		</div>
			</el-col>
		</el-row>

		<el-row class="user-bottom">
			<el-col :span="24">
				<div class="grid-content-bottom bg-purple-dark">
		  			hell0
		  		</div>
			</el-col>
		</el-row>
	</div>
</template>


<script>
export default {
    data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length <5) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      addUserForm: {
        username: '',
        password: ''
      },
      addUserRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      info: '登陆失败，请检查用户名或密码',
      showinfo: false
    }
  },

  methods: {
    addUser() {
      console.log('hello')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  	.user-container{

  	}
	.el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	.el-col {
	    border-radius: 4px;
	}
	.bg-purple-dark {
	    background: #99a9bf;
	}
	.bg-purple {
   		background: #d3dce6;
  	}
  	.bg-purple-light {
    	background: #e5e9f2;
  	}
  	.grid-content {
	    border-radius: 4px;
	    height: 300px;
	}

	.grid-content-bottom {
	    border-radius: 4px;
	    height: 550px;
	}

	input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      left: 0;
      right: 0;
      width: 400px;
      padding: 15px 15px 15px 35px;
     
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
</style>