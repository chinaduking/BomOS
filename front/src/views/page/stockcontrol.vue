<template>
	<div>
		<h1>this is  stock control page</h1>
		<h2>实现库存的购入与库存物料的消耗</h2>
		<h2>显示最近几次物料的购入与消耗详情</h2>
		<el-upload class="upload-demo" drag action="/api/upfileaddbom" multiple>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</div>
</template>