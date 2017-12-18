<template>
  <div class="dashboard-container">
    <div class="carousel">
      <h1>纳恩博物料管理系统</h1>
      <el-carousel :interval="4000" type="card" height="600px">
        <el-carousel-item v-for="item in items" :key="item.key">
          <h1>{{item.title}}</h1>
          <router-link :to=item.path>
          <div class="bk"></div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
        items: [
        {title:'库存管理',path:"/menu/stockcontrol",key:1},
        {title:'用户管理',path:"/menu/user",key:2},
        {title:'库存表',path:"/table/stockform",key:3},
        {title:'缺料表',path:"/table/filledshortform",key:4},
        {title:'入库记录',path:"/table/addrecord",key:5},
        {title:'出库记录',path:"/table/subrecord",key:6},
        ]

      }
  },

  methods: {
    change(index,preindex){
      console.log(index,preindex);
    },
     setActiveItem(index) {
      console.log('..')
        this.$refs.carousel.setActiveItem(index);
      }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-carousel__item:nth-child(2n){
    background-color: #bef1ff;
   }
  .el-carousel__item:nth-child(2n+1){
    background-color: #9398bf;
  }
  .el-carousel__item:nth-child(3) .bk {
    background:url("../../assets/images/3.png") center center no-repeat;
  }
  .el-carousel__item:nth-child(4) .bk{
    background:url("../../assets/images/4.png") center center no-repeat;
  }
  .el-carousel__item:nth-child(5) .bk{
    background:url("../../assets/images/addbom.png") center center no-repeat;
  }
  .el-carousel__item:nth-child(6) .bk{
    background:url("../../assets/images/6.png") center center no-repeat;
  }
  .el-carousel__item:nth-child(7) .bk{
    background:url("../../assets/images/add.png") center center no-repeat;
  }
  .el-carousel__item:nth-child(8) .bk{
    background:url("../../assets/images/sub.png") center center no-repeat;
  }

  .dashboard-container h1{
    dispaly:block;
    margin:30px auto;
    text-align:center;
  }
  .dashboard-container .bk{
    width:720px;
    height:520px;
  }
  .dashboard-container{
    height: 895px;
    background-color:#E5E9F2;
  }
  .carousel{
    padding: 25px 150px;
  }
</style>
