<template>
	<div class="user-container">
    <el-row class="user-header" style="background-color:#99A9BF;">
      <el-col :span="24">
        <div>
            <h2 style="text-align:center;">用户管理系统</h2>
        </div>
      </el-col>
    </el-row>

		<el-row class="user-top">
		 	<el-col :span="12">
		  		<div class="grid-content bg-purple">
		  			<el-form autoComplete="on" :model="addUserForm" :rules="addUserRules" ref="loginForm" label-position="left" label-width="0px"
				      	class="card-box login-form">
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
				          		添加新用户
				        	</el-button>
				      	</el-form-item>
				    </el-form>
		  		</div>
		  	</el-col>
		  	<el-col :span="12">
		  		<div class="grid-content bg-purple-light">
		  			<div class="user-content">
              <div class="user-info">
                <h2 style="text-align:center;">当前登陆用户信息</h2>
                <h3 style="padding-left: 20px;"><el-tag type="primary">当前登录用户:</el-tag>  {{name}}</h3>
                <h3 style="padding-left: 20px;"><el-tag type="primary">当前登录用户角色:</el-tag>  {{roles}}</h3>
                <div style="margin: 20px 100px;width:100%;">
                  <el-button  type="primary" style="width:50%;" @click="EditPasswd(name)">修改当前用户密码</el-button>
                </div>
              </div>
            </div>
		  		</div>
			</el-col>
		</el-row>

		<el-row class="user-bottom">
			<el-col :span="24">
				<div class="grid-content-bottom bg-purple-dark">
            <span style="margin-right:20px;color:red;" v-show=this.showuserlistInfo>{{userlistInfo}}</span>
		  			<el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
              <el-table-column
                label="用户名"
                width="180">
                <template scope="scope">
                  <el-tag>{{ scope.row.username }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="用户密码"
                width="180">
                <template scope="scope">
                  <el-tag>{{ scope.row.password }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="权限级别"
                width="120">
                <template scope="scope">
                  <el-tag>{{ scope.row.admin }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="createdAt"  
                label="创建日期"
                :formatter="dateFormat"
                width="210">
                <!--
                <template scope="scope">
                  <el-icon name="time"></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
                </template>
                -->
              </el-table-column>
              <el-table-column
                prop="updatedAt"
                label="最后修改日期"
                :formatter="dateFormat"
                width="210">
                <!--
                <template scope="scope">
                  <el-icon name="time"></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.updatedAt }}</span>
                </template>
                -->
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
			</el-col>
		</el-row>
	</div>
</template>


<script>
import {getAllUser,addUser,upPasswd,delUser} from '@/api/login'
import { getToken } from '@/utils/auth' // 验权
import { mapGetters } from 'vuex'

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


      userlistInfo: '',
      showuserlistInfo: false,

      tableData:[]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },

  created: function () {
    this.reloaddate()
  },

  methods: {
    tableRowClassName(row, index) {
        if (index%3 === 1) {
          return 'info-row';
        } else if (index%3 === 2) {
          return 'positive-row';
        }
        return '';
    },

    dateFormat:function(row, column) {
      var date = row[column.property]
      var newDate = new Date(date)
      return newDate.toLocaleString()
    },

    reloaddate() {
        getAllUser(getToken()).then(response => {
          const data = response.data
          if(data.success == true){
            this.tableData = data.Result
            this.showuserlistInfo = false
            this.userlistInfo = ''
          }else
          {
            this.userlistInfo = data.message
            this.showuserlistInfo = true
            console.log(data.message)
          }
        })
    },

    addUser() {
      addUser(getToken(),this.addUserForm.username,this.addUserForm.password).then(response => {
          const data = response.data
          if(data.success == true){
            this.$alert('新用户添加成功', '操作提示！', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `账户添加成功`
                });
                
                //刷新数据
                this.reloaddate()
              }
            });
          }else
          {
            this.$alert(data.message, '操作提示！', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `账户添加失败`
                });
              }
            });
          }
        })
    },

    handleEdit(index,row) {
      this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /^[a-zA-Z0-9]{6,20}$/,
          inputErrorMessage: '密码格式不正确，密码应由6~20数字或字母组成'
        }).then(({ value }) => {
          upPasswd(row.username,value).then(response => {
            const data = response.data
            console.log(data.message)
          })
          this.$message({
            type: 'success',
            message: '你的新密码是: ' + value
          });
          this.reloaddate()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },

    EditPasswd(name) {
      this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /^[a-zA-Z0-9]{6,20}$/,
          inputErrorMessage: '密码格式不正确，密码应由6~20数字或字母组成'
        }).then(({ value }) => {
          upPasswd(name,value).then(response => {
            const data = response.data
            console.log(data.message)
          })
          this.$message({
            type: 'success',
            message: '你的新密码是: ' + value
          });
          this.reloaddate()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },

    handleDelete(index,row) {
      this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser(row.username).then(response => {
            const data = response.data
            if(data.success == true)
            {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else
            {
              this.$message({
                type: 'warning',
                message: data.message
              });
            }
            this.reloaddate()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .user-container{

  }

  .user-bottom{
  }
	.el-row {
      padding:20px 60px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	.el-col {
	    border-radius: 4px;
	}
	.bg-purple-dark {
	    background: #F9FAFC;
	}
	.bg-purple {
   		background: #d3dce6;
  	}
  	.bg-purple-light {
    	background: #e5e9f2;
  	}
  	.grid-content {
	    border-radius: 4px;
	    height: 250px;
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
    .login-form {
      left: 0;
      right: 0;
      width: 400px;
      padding: 15px 15px 15px 35px;

    }
    .el-form{
      margin: 0px auto;
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

    .el-table .info-row {
      background: #c9e5f5;
    }

    .el-table .positive-row {
      background: #e2f0e4;
    }

    .user-content{
      padding: 10px 10px;
      margin: 0px auto;
      width: 400px;
      height:250px;
    }

    .user-info{
      border: 2px solid #c9e5f5;
      border-radius: 5px;
    }
</style>
