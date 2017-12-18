<template>
	<div class="stock">
		<el-row class="stockform-header" style="background-color:#A9A9BF;">
	      <el-col :span="24">
	        <div>
	            <h2 style="text-align:center;">库存管理工具</h2>
	        </div>
	      </el-col>
	    </el-row>

	    <el-dialog title="出库管理" :visible.sync="ShowSubbomInfo">
	    	<el-select v-model="subbom.value" placeholder="请选择项目" style="width:250px;">
			    <el-option
			      	v-for="item in options"
			      	:key="item.value"
			      	:label="item.label"
			      	:value="item.value">
			    </el-option>
			</el-select>
			<el-upload
			  	ref="upload"
			  	:data= "subbom"
			  	action="/api/upfilesubbomnum"
			  	:show-file-list = false
			  	:on-success="success">
			  	<el-button :disabled=DisableUploadBotton style="margin-top: 20px;width:250px" type="primary">点击选择需要上传的表格</el-button>
			</el-upload>
      	</el-dialog>

      	<el-dialog title="入库管理" :visible.sync="ShowAddbomNumInfo">
			<el-upload
			  	ref="upload"
			  	action="/api/upfileaddbomnum"
			  	:show-file-list = false
			  	:on-success="success">
			  	<el-button style="margin-top: 20px;width:250px" type="primary">点击选择需要上传的表格</el-button>
			</el-upload>
      	</el-dialog>

      	<el-dialog title="BOM物料对比" :visible.sync="ShowComparebomNumInfo">
			<el-upload
			  	ref="upload"
			  	action="/api/upfilecomparebom"
			  	:show-file-list = false
			  	:on-success="success_res">
			  	<el-button style="margin-top: 20px;width:250px" type="primary">点击选择需要上传的表格</el-button>
			</el-upload>
      	</el-dialog>

      	<el-dialog title="添加新物料" :visible.sync="ShowAddbomInfo">
			<el-upload
			  	ref="upload"
			  	action="/api/upfileaddbom"
			  	:show-file-list = false
			  	:on-success="success">
			  	<el-button style="margin-top: 20px;width:250px" type="primary">点击选择需要上传的表格</el-button>
			</el-upload>
      	</el-dialog>
      	<el-row>
	      	<div class="Items">
	      		<div class="Item_div">
			    	<el-button class="Item Itemadd" @click= "ShowAddbomInfo=true" ></el-button>
			    	<h3 style="text-align:center">添加新物料</h3>
				</div>
				<div class="Item_div">
				    <el-button class="Item Itemcomp" @click= "ShowComparebomNumInfo=true"></el-button>
				    <h3 style="text-align:center">BOM对比</h3>
				</div>
				<div class="Item_div">
			      	<el-button class="Item Itemsub" @click= "ShowSubbomInfo=true"></el-button>
			      	<h3 style="text-align:center">出库管理</h3>
		      	</div>
		      	<div class="Item_div">
				    <el-button class="Item Itemaddnum" @click= "ShowAddbomNumInfo=true"></el-button>
				    <h3 style="text-align:center">入库管理</h3>
				</div>
	      	</div>
      	</el-row>

	</div>
</template>

<script>
import xlsx from '@/utils/exportxlsx'

export default {
	data() {
			return {
					ShowSubbomInfo: false,
					ShowAddbomNumInfo: false,
					ShowAddbomInfo: false,
					ShowComparebomNumInfo: false,

					DisableUploadBotton: true,
					options: [{
				          value: 'APR_G1',
				          label: 'APR_G1'
				    }, {
				          value: 'APR_G2',
				          label: 'APR_G2'
				    }, {
				          value: 'APR_GX',
				          label: 'APR_GX'
				    }, {
				          value: 'LoomoGo',
				          label: 'LoomoGo'
				    }],
				    subbom: {
				        value: ''
				    },
				}
			},

	watch: {
		'subbom.value' : 'updateDisableUploadBottonVaule',
	},

	methods: {
		success_res(res,file,filelist) {
			if(res.success == true)
			{
				var rec = false;
				rec = xlsx.exportXls(res.data)

		        this.$alert('操作成功', '操作结果', {
		          confirmButtonText: '确定',
		          type: 'success',
		          callback: action => {
		          	this.ShowSubbomInfo = false;
		          	this.ShowAddbomNumInfo = false;
		          	this.ShowAddbomInfo = false;
		          	this.ShowComparebomNumInfo = false;
		          }
		        });
		    }else
		    {
		       this.$alert('操作失败,请检查上传的表是否正确', '操作结果', {
		          confirmButtonText: '确定',
		          type: 'error',
		        });
		    }
		},

		success(response,file,filelist){
		    if(response.success == true)
		    {
		        this.$alert('操作成功', '操作结果', {
		          confirmButtonText: '确定',
		          type: 'success',
		          callback: action => {
		          	this.ShowSubbomInfo = false;
		          	this.ShowAddbomNumInfo = false;
		          	this.ShowAddbomInfo = false;
		          	this.ShowComparebomNumInfo = false;
		          	this.value = '';
		          }
		        });
		    }else
		    {
		        this.$alert('操作失败,请检查上传的表是否正确', '操作结果', {
		          confirmButtonText: '确定',
		          type: 'error',
		        });
		    }
		},

		updateDisableUploadBottonVaule(){
			if(this.subbom.value != '')
			{
				this.DisableUploadBotton = false;
			}else
			{
				this.DisableUploadBotton = true;
			}
		},
	},
}
</script>

<style type="text/css">
  .stock {
     min-height:850px;
     background-color: #E5E9F2;
  }
  .el-dialog {
  		padding-top: 10px;
		width: 300px;
  }

  .Items{
  	margin: 20px auto;
  	width: 500px;
  }
  .Item_div {
  	width: 200px;
  	float: left;
  	margin: 20px 20px;
  }
  .Item{
  	border:2px solid;
	border-radius:100px;
  	margin: 10px 10px;
  	width: 200px;
  	height: 200px;
  }

  .Itemadd{
  	background:url("../../assets/images/addbom.png") center center no-repeat;
  }
  .Itemcomp{
  	background:url("../../assets/images/compare.png") center center no-repeat;
  }
  .Itemsub{
  	background:url("../../assets/images/sub.png") center center no-repeat;
  }
  .Itemaddnum{
  	background:url("../../assets/images/add.png") center center no-repeat;
  }
</style>