<template>
	<div>
		<el-row class="stockform-header" style="background-color:#A9A9BF;">
	      <el-col :span="24">
	        <div>
	            <h2 style="text-align:center;">物料库存表单</h2>
	        </div>
	      </el-col>
	    </el-row>

	    <el-row class="serach">
	      <el-col :span="12">
			<div style="margin: 20px 50px;">
			  <el-input placeholder="请输入Mfr_P/N&Value进行模糊搜索" v-model="searchform.Mfr_Value">
			  	<el-button slot="append" icon="search" @click="MfrValueSerach()"></el-button>
			  </el-input>
			</div>
	      </el-col>
	      <el-col :span="12">
			<div style="margin: 15px 50px;">
			  <el-input placeholder="请输入编号进行精准搜索" v-model="searchform.EncodeNum">
			    <el-button slot="append" icon="search" @click="EncodeNumSerach()"></el-button>
			  </el-input>
			</div>
	      </el-col>
	    </el-row>

       	<el-dialog title="修改BOM" :visible.sync="dialogFormVisible">
			<el-form :model="form" label-width="120px">
	        	<el-form-item label="Mfr_P/N&Value">
	              	<el-input v-model="form.Mfr_Value" auto-complete="off"></el-input>
	        	</el-form-item>
	        	<el-form-item label="Mfr" >
	              	<el-input v-model="form.Mfr" auto-complete="off"></el-input>
	        	</el-form-item>
	        	<el-form-item label="数量" >
	              	<el-input v-model="form.Num" auto-complete="off"></el-input>
	        	</el-form-item>
	        	<el-form-item label="预警值" >
	              	<el-input v-model="form.Waring_Value" auto-complete="off"></el-input>
	        	</el-form-item>
	        	<el-form-item label="编号" >
	              	<el-input v-model="form.EncodeNum" auto-complete="off"></el-input>
	        	</el-form-item>
	        	<el-form-item label="价格" >
	              	<el-input v-model="form.Price" auto-complete="off"></el-input>
	        	</el-form-item>
	        	<el-form-item label="备注" >
	              	<el-input v-model="form.Remark" auto-complete="off"></el-input>
	        	</el-form-item>
	    	</el-form>
	    	<div slot="footer" class="dialog-footer">
	        	<el-button @click="dialogFormVisible = false">取 消</el-button>
	        	<el-button type="primary" @click="dialogFormVisible = false;handleUpdta()">确 定</el-button>
	    	</div>
      	</el-dialog>

	    <el-row class="stockform-bottom">
			<el-col :span="24">
				<div class="grid-content-bottom bg-purple-dark">
		  			<el-table :data="BomtableData" style="width: 100%" :row-class-name="tableRowClassName">
		              <el-table-column
		                label="Mfr_P/N&Value"
		                width="220">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.Mfr_Value }}</el-tag>
		                </template>
		              </el-table-column>
		              <el-table-column
		                label="Mfr"
		                width="180">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.Mfr }}</el-tag>
		                </template>
		              </el-table-column>
		              <el-table-column
		                label="数量"
		                width="120">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.Num }}</el-tag>
		                </template>
		              </el-table-column>
		              <el-table-column
		                label="预警值"
		                width="120">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.Waring_Value }}</el-tag>
		                </template>
		              </el-table-column>
		              <el-table-column
		                label="编号"
		                width="120">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.EncodeNum }}</el-tag>
		                </template>
		              </el-table-column>
		              <el-table-column
		                label="价格"
		                width="120">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.Price }}</el-tag>
		                </template>
		              </el-table-column>
		              <el-table-column
		                label="备注"
		                width="300">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.Remark }}</el-tag>
		                </template>
		              </el-table-column>
	              
		              <el-table-column label="操作">
		                <template scope="scope">
		                  <el-button
		                    size="small"
		                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
import {getBomList,delBom,upBom,SearchBomByMfrValue,SearchBomByEncodeNum} from '@/api/table'
import { getToken } from '@/utils/auth' // 验权
	export default {
		data() {
			return {
				BomtableData: [],
				dialogFormVisible: false,
				form: {
					Mfr_Value: '',
					Mfr: '',
					Num: '',
					Waring_Value: '',
					EncodeNum: '',
					Price: '',
					Remark: '',
					Id: ''
				},
				searchform: {
					Mfr_Value: '',
					EncodeNum: ''
				}
			}
		},

		created: function () {
		    this.reloaddate()
		},

		methods: {
			reloaddate() {
		        getBomList().then(response => {
		          const data = response.data
		          if(data.success == true){
		            this.BomtableData = data.Result
		          }else
		          {
		            console.log(data.message)
		          }
		        })
		    },

		    tableRowClassName(row, index) {
		        if (index%3 === 1) {
		          return 'info-row';
		        } else if (index%3 === 2) {
		          return 'positive-row';
		        }
		        return '';
		    },

		    handleDelete(index,row) {
		      this.$confirm('此操作将永久删除这条记录, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          delBom(getToken(),row.ID).then(response => {
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

		    handleEdit(index,row) {
		    	this.dialogFormVisible  = true
		    	this.form.Mfr_Value = row.Mfr_Value
		    	this.form.Mfr = row.Mfr
		    	this.form.Num = row.Num
				this.form.Waring_Value = row.Waring_Value
				this.form.EncodeNum = row.EncodeNum
				this.form.Price = row.Price
				this.form.Remark = row.Remark
				this.form.Id = row.ID
		    },

		    handleUpdta() {
		    	upBom(getToken(),this.form).then(response => {
			        const data = response.data
			        if(data.success == true){
			          this.$message({
		                type: 'success',
		                message: data.message
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
		    },

		    MfrValueSerach() {
		    	if(this.searchform.Mfr_Value != '')
		    	{
		    		SearchBomByMfrValue(this.searchform.Mfr_Value).then(response => {
			          const data = response.data
			          if(data.success == true){
			            this.BomtableData = data.Result
			          }else
			          {
			            console.log(data.message)
			          }
			        })

		    	}else{
		    		this.$message({
		            type: 'warning',
		            message: '请输入搜索内容'
		          }); 
		          this.reloaddate()         
		    	}
		    },

		    EncodeNumSerach() {
		    	if(this.searchform.EncodeNum != '')
		    	{
		    		SearchBomByEncodeNum(this.searchform.EncodeNum).then(response => {
			          const data = response.data
			          if(data.success == true){
			            this.BomtableData = data.Result
			          }else
			          {
			            console.log(data.message)
			          }
			        })
		    	}else{
		    		this.$message({
		            type: 'warning',
		            message: '请输入搜索内容'
		          }); 
		          this.reloaddate()         
		    	}
		    }

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
    .el-table .info-row {
      background: #c9e5f5;
    }

    .el-table .positive-row {
      background: #e2f0e4;
    }

    .el-dialog {
    	width: 500px;
    }
</style>