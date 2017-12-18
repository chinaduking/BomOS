<template>
	<div>
		<el-row class="user-header" style="background-color:#A9A9BF;">
	      <el-col :span="24">
	        <div>
	            <h2 style="text-align:center;">出库记录</h2>
	        </div>
	      </el-col>
	    </el-row>
	    <el-row style="background-color:#D3DCE6;">
			<div class="search-col">
				<span class="demonstration">历史出库记录查询</span>
				<el-select v-model="subbom.value" placeholder="请选择查询项目" style="width:350px;">
				    <el-option
				      	v-for="item in options"
				      	:key="item.value"
				      	:label="item.label"
				      	:value="item.value">
				    </el-option>
				</el-select>
				<el-date-picker
				    v-model="inputtime"
				    type="datetimerange"
				    :picker-options="pickerOptions2"
				    placeholder="选择时间范围"
				    align="right">
				</el-date-picker>
				<el-button slot="append" icon="search" @click="SubRecordSerach()"></el-button>
			</div>
		</el-row>
		<el-row>
			<label style="margin-top: 10px;display:block;">总价：<strong>{{totalPrice}}</strong>  元</label>
		</el-row>
	    <el-row>
			<el-col :span="24">
				<div style="margin:20px auto">
		  			<el-table :data="BomtableData" style="width: 100%" :row-class-name="tableRowClassName">
		  			  <el-table-column
		                prop="Project"
		                label="所属项目"
		                width="120">
		              </el-table-column>
		              <el-table-column
		                prop="Mfr_Value"
		                label="Mfr_P/N&Value"
		                width="220">
		              </el-table-column>
		              <el-table-column
		              	prop="Mfr"
		                label="Mfr"
		                width="180">
		              </el-table-column>
		              <el-table-column
		              	prop="Num"
		                label="出库数量"
		                width="120">
		              </el-table-column>
		              <el-table-column
		              	prop="Waring_Value"
		                label="预警值"
		                width="120">
		              </el-table-column>
		              <el-table-column
		              	prop="EncodeNum"
		                label="编号"
		                width="120">
		              </el-table-column>
		              <el-table-column
		              	prop="Price"
		                label="出库价格"
		                width="120">
		              </el-table-column>
		              <el-table-column
		                prop="createdAt"
		                label="出库时间"
		                :formatter="dateFormat"
		                width="200">
		              </el-table-column>
		              <el-table-column
		              	prop="Remark"
		                label="备注">
		              </el-table-column>
            		</el-table>
        		</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import {SubRecordSerach} from '@/api/table'
  export default {
    data() {
      return {
      	totalPrice: 0,
      	options: [
      				{
				          value: '*',
				          label: '所有项目'
				    },{
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
      	subbom:{
				value: '*'
		},
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        inputtime: '',
        BomtableData:[]
      };
    },
    created: function () {
    		const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		    this.reloaddate(start,end)
		},

	methods: {
		reloaddate(start,end) {
		    SubRecordSerach(start,end,this.subbom.value).then(response => {
		        const data = response.data
		        if(data.success == true){
		           this.BomtableData = data.Result
		           this.totalPrice = 0;
		           var totalPriceResult = this.totalPrice;
		           data.Result.forEach(function(data){
		           		totalPriceResult += data.Price * data.Num;
		           })
		           this.totalPrice = totalPriceResult.toFixed(2);
		        }else
		        {
		           console.log(data.message)
		        }
		    })
		},

		dateFormat:function(row, column) {
	      var date = row[column.property]
	      var newDate = new Date(date)
	      return newDate.toLocaleString()
	    },

	    tableRowClassName(row, index) {
		        if (index%3 === 1) {
		          return 'info-row';
		        } else if (index%3 === 2) {
		          return 'positive-row';
		        }
		        return '';
		},

		SubRecordSerach() {
			this.reloaddate(this.inputtime[0],this.inputtime[1])
		},
	}
  };
</script>

<style type="text/css">
	.search-col {
		width: 420px;
		margin: 10px auto;
	}
	.demonstration{
		display: block;
		font-weight:bold;
		text-align: center;
		margin:10px auto;
	}
	.el-table .info-row {
      background: #c9e5f5;
    }

    .el-table .positive-row {
      background: #e2f0e4;
    }
</style>