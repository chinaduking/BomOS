<template>
	<div style="background-color:#DEEEEE; min-height:850px">
		<el-row class="stockform-header" style="background-color:#A9A9BF;">
	      <el-col :span="24">
	        <div>
	            <h2 style="text-align:center;">库存管理工具</h2>
	        </div>
	      </el-col>
	    </el-row>

		<el-row class="stockform-header" style="background-color:#EFF2F7; margin-top:30px;">
	      <el-col :span="12" style="background-color:#C9A9BF">
	        <div style="width:500px;margin:0 auto;">
	            <h3 style="text-align:center;">添加新物料</h3>
	            <el-upload class="upload-demo" drag action="/api/upfileaddbom" style="margin: 0 80px;padding-bottom:30px;" :on-success="addsuccess">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__text" style="color:red;">只能上传xlsx文件，且不超过2M</div>
				  <div class="el-upload__text" style="color:red;">必须上传正确格式的xlsx文件</div>
				</el-upload>
	        </div>
	      </el-col>
	      <el-col :span="12" style="background-color:#89A9BF">
	        <div style="width:500px;margin:0 auto;">
	            <h3 style="text-align:center;">BOM物料对比</h3>
	            <el-upload class="upload-demo" drag action="/api/upfilecomparebom" style="margin: 0 80px;padding-bottom:30px;" :on-success="success_res">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__text" style="color:red;">只能上传xlsx文件，且不超过2M</div>
				  <div class="el-upload__text" style="color:red;">必须上传正确格式的xlsx文件</div>
				</el-upload>
	        </div>
	      </el-col>
	    </el-row>
	    <el-row class="stockform-header" style="background-color:#EFF2F7;">
	      <el-col :span="12" style="background-color:#B9A9BF">
	        <div style="width:500px;margin:0 auto;">
	            <h3 style="text-align:center;">物料入库管理</h3>
	            <el-upload class="upload-demo" drag action="/api/upfileaddbomnum" style="margin: 0 80px;padding-bottom:30px;" :on-success="addnumsuccess">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__text" style="color:red;">只能上传xlsx文件，且不超过2M</div>
				  <div class="el-upload__text" style="color:red;">必须上传正确格式的xlsx文件</div>
				</el-upload>
	        </div>
	      </el-col>
	      <el-col :span="12" style="background-color:#99A9BF">
	        <div style="width:500px;margin:0 auto;">
	            <h3 style="text-align:center;">物料出库管理</h3>
	            <el-upload class="upload-demo" drag action="/api/upfilesubbomnum" style="margin: 0 80px;padding-bottom:30px;" :on-success="subnumsuccess">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__text" style="color:red;">只能上传xlsx文件，且不超过2M</div>
				  <div class="el-upload__text" style="color:red;">必须上传正确格式的xlsx文件</div>
				</el-upload>
	        </div>
	      </el-col>
	    </el-row>
	</div>
</template>

<script>
import xlsx from '@/utils/exportxlsx'

export default {
	methods: {
		success_res(res,file,filelist) {
			rec = xlsx.exportXls(res.data)
			if(rec == true)
		    {
		        this.$message({
		            type: 'success',
		            message: '缺料表下载成功'
		        });
		    }else
		    {
		        this.$message({
		        	type: 'warning',
		            message: '缺料表下载失败！'
		        });
		    }
		},

		addsuccess(response,file,filelist){
		    if(response.success == true)
		    {
		        this.$message({
		            type: 'success',
		            message: response.message
		        });
		    }else
		    {
		        this.$message({
		        	type: 'warning',
		            message: 'BOM数据库更新失败！'
		        });
		    }
		},

		addnumsuccess(response,file,filelist){
		    if(response.success == true)
		    {
		        this.$message({
		            type: 'success',
		            message: response.message
		        });
		    }else
		    {
		        this.$message({
		        	type: 'warning',
		            message: 'BOM数据库更新失败！'
		        });
		    }
		},

		subnumsuccess(response,file,filelist){
		    if(response.success == true)
		    {
		        this.$message({
		            type: 'success',
		            message: response.message
		        });
		    }else
		    {
		        this.$message({
		        	type: 'warning',
		            message: 'BOM数据库更新失败！'
		        });
		    }
		},
	},
}
</script>