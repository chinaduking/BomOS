webpackJsonp([6],{"2gxT":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:t.list,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"ID",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.$index)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Title"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.title)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Author",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.author))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Pageviews",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.pageviews)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{"class-name":"status-col",label:"Status",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-tag",{attrs:{type:t._f("statusFilter")(e.row.status)}},[t._v(t._s(e.row.status))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"created_at",label:"Display_time",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("i",{staticClass:"el-icon-time"}),t._v(" "),n("span",[t._v(t._s(e.row.display_time))])]}}])})],1)],1)},i=[],l={render:a,staticRenderFns:i};e.a=l},OVQD:function(t,e,n){"use strict";function a(t){return n.i(o.a)({url:"/table/list",method:"get",params:t})}function i(){return n.i(o.a)({url:"/api/bomlist",method:"get"})}function l(t,e){return n.i(o.a)({url:"/api/delbom",method:"post",data:{token:t,id:e}})}function r(t,e){return n.i(o.a)({url:"/api/upbom",method:"post",data:{token:t,form:e}})}function s(t){return n.i(o.a)({url:"/api/findbymfrvalue",method:"get",params:{MfrValue:t}})}function u(t){return n.i(o.a)({url:"/api/findbyencodenum",method:"get",params:{EncodeNum:t}})}e.f=a,e.a=i,e.b=l,e.c=r,e.d=s,e.e=u;var o=n("Vo7i")},YBQJ:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("h5sP"),i=n("2gxT"),l=n("VU/8"),r=l(a.a,i.a,null,null,null);e.default=r.exports},h5sP:function(t,e,n){"use strict";var a=n("OVQD");e.a={data:function(){return{list:null,listLoading:!0}},filters:{statusFilter:function(t){return{published:"success",draft:"gray",deleted:"danger"}[t]}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.listLoading=!0,n.i(a.f)(this.listQuery).then(function(e){t.list=e.data.items,t.listLoading=!1})}}}}});
//# sourceMappingURL=6.4a331c6638be73469aa3.js.map