webpackJsonp([6],{"3X6B":function(t,e,a){var o=a("iMe2");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a("rjj0")("2162b3ae",o,!0)},OVQD:function(t,e,a){"use strict";function o(t){return a.i(p.a)({url:"/table/list",method:"get",params:t})}function r(){return a.i(p.a)({url:"/api/bomlist",method:"get"})}function n(t,e){return a.i(p.a)({url:"/api/delbom",method:"post",data:{token:t,id:e}})}function i(t,e){return a.i(p.a)({url:"/api/upbom",method:"post",data:{token:t,form:e}})}function l(t){return a.i(p.a)({url:"/api/findbymfrvalue",method:"get",params:{MfrValue:t}})}function c(t){return a.i(p.a)({url:"/api/findbyencodenum",method:"get",params:{EncodeNum:t}})}function s(){return a.i(p.a)({url:"/api/shortbomlist",method:"get"})}function u(t,e){return a.i(p.a)({url:"/api/addrecordlist",method:"get",params:{start:t,end:e}})}function d(t,e,o){return a.i(p.a)({url:"/api/subrecordlist",method:"get",params:{start:t,end:e,project:o}})}e.g=o,e.b=r,e.c=n,e.d=i,e.e=l,e.f=c,e.h=s,e.i=u,e.a=d;var p=a("Vo7i")},aXh7:function(t,e,a){"use strict";var o=a("OVQD");e.a={data:function(){return{totalPrice:0,pickerOptions2:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},inputtime:"",BomtableData:[]}},created:function(){var t=new Date,e=new Date;e.setTime(e.getTime()-2592e6),this.reloaddate(e,t)},methods:{reloaddate:function(t,e){var r=this;a.i(o.i)(t,e).then(function(t){var e=t.data;if(1==e.success){r.BomtableData=e.Result,r.totalPrice=0;var a=r.totalPrice;e.Result.forEach(function(t){a+=t.Price*t.Num}),r.totalPrice=a.toFixed(2)}else console.log(e.message)})},dateFormat:function(t,e){var a=t[e.property];return new Date(a).toLocaleString()},tableRowClassName:function(t,e){return e%3==1?"info-row":e%3==2?"positive-row":""},AddRecordSerach:function(){console.log(this.inputtime[0],this.inputtime[1]),this.reloaddate(this.inputtime[0],this.inputtime[1])}}}},iMe2:function(t,e,a){e=t.exports=a("FZ+f")(!0),e.push([t.i,".search-col{width:600px;margin:10px auto}.demonstration{font-weight:700}.el-table .info-row{background:#c9e5f5}.el-table .positive-row{background:#e2f0e4}","",{version:3,sources:["E:/work/BomOS/front/src/views/table/addrecord.vue"],names:[],mappings:"AACA,YACE,YAAa,AACb,gBAAkB,CACnB,AACD,eACE,eAAiB,CAClB,AACD,oBACM,kBAAoB,CACzB,AACD,wBACM,kBAAoB,CACzB",file:"addrecord.vue",sourcesContent:["\n.search-col {\n\t\twidth: 600px;\n\t\tmargin: 10px auto;\n}\n.demonstration{\n\t\tfont-weight:bold;\n}\n.el-table .info-row {\n      background: #c9e5f5;\n}\n.el-table .positive-row {\n      background: #e2f0e4;\n}\n"],sourceRoot:""}])},y8FN:function(t,e,a){"use strict";function o(t){a("3X6B")}Object.defineProperty(e,"__esModule",{value:!0});var r=a("aXh7"),n=a("zO3O"),i=a("VU/8"),l=o,c=i(r.a,n.a,l,null,null);e.default=c.exports},zO3O:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{staticClass:"user-header",staticStyle:{"background-color":"#A9A9BF"}},[a("el-col",{attrs:{span:24}},[a("div",[a("h2",{staticStyle:{"text-align":"center"}},[t._v("入库记录")])])])],1),t._v(" "),a("el-row",{staticStyle:{"background-color":"#D3DCE6"}},[a("div",{staticClass:"search-col"},[a("span",{staticClass:"demonstration"},[t._v("历史入库记录查询:")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions2,placeholder:"选择时间范围",align:"right"},model:{value:t.inputtime,callback:function(e){t.inputtime=e},expression:"inputtime"}}),t._v(" "),a("el-button",{attrs:{icon:"search"},on:{click:function(e){t.AddRecordSerach()}},slot:"append"})],1)]),t._v(" "),a("el-row",[a("label",{staticStyle:{"margin-top":"10px",display:"block"}},[t._v("总价："),a("strong",[t._v(t._s(t.totalPrice))]),t._v("  元")])]),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticStyle:{margin:"20px auto"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.BomtableData,"row-class-name":t.tableRowClassName}},[a("el-table-column",{attrs:{prop:"Mfr_Value",label:"Mfr_P/N&Value",width:"220"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Mfr",label:"Mfr",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Num",label:"入库数量",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Waring_Value",label:"预警值",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"EncodeNum",label:"编号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Price",label:"入库价格",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createdAt",label:"入库时间",formatter:t.dateFormat,width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"Remark",label:"备注"}})],1)],1)])],1)],1)},r=[],n={render:o,staticRenderFns:r};e.a=n}});
//# sourceMappingURL=6.61cad3d53b98997bb151.js.map