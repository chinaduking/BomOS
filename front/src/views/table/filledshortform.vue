<template>
	<div class="shorform">
		<el-row class="user-header" style="background-color:#A9A9BF;">
	      <el-col :span="24">
	        <div>
	            <h2 style="text-align:center;">库存缺料表单</h2>
	        </div>
	      </el-col>
	    </el-row>

	    <el-row>
			<el-col :span="24">
				<div style="margin:20px auto">
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
		                  <el-tag style="color:red">{{ scope.row.Num }}</el-tag>
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
		                label="备注">
		                <template scope="scope">
		                  <el-tag>{{ scope.row.Remark }}</el-tag>
		                </template>
		              </el-table-column>
            		</el-table>
        		</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
import {getShortBomList} from '@/api/table'	
export default {
	data() {
			return {
				BomtableData: []
			}
	},

	created: function () {
		    this.reloaddate()
	},

	methods: {
			reloaddate() {
		        getShortBomList().then(response => {
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
</style>
