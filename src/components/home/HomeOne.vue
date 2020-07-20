<template>
  <div>
    <div class="box">
      <el-card class="box-card1">
        <div class="box1">
          <i class="iconfont icon-gengduolianxiren"></i>
          <div style="line-height:40px">
            <div>New Visits</div>
            <countTo :startVal="startVal" :endVal="number.visits" :duration="2000"></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div class="box1">
          <i class="iconfont icon-xinxi"></i>
          <div style="line-height:40px">
            <div>Messages</div>
            <countTo :startVal="startVal" :endVal="number.messages" :duration="2000"></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card3">
        <div class="box1">
          <i class="iconfont icon-renminbi"></i>
          <div style="line-height:40px">
            <div>Purchases</div>
            <countTo :startVal="startVal" :endVal="number.purchases" :duration="2000"></countTo>
          </div>
        </div>
      </el-card>
      <el-card class="box-card4">
        <div class="box1">
          <i class="iconfont icon-gouwuche"></i>
          <div style="line-height:40px">
            <div>Shoppings</div>
            <countTo :startVal="startVal" :endVal="number.shopping" :duration="2000"></countTo>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import countTo from "vue-count-to";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {
    countTo
  },
  // 定义变量
  data() {
    return {
      number: "",
      startVal: 0
    };
  },
  //监听方法  click事件等
  methods: {
    //请求数据
    getData() {
      axios
        .get("/api/homeData")
        .then(res => {
          this.number = res.data.data;
          // window.console.log(this.number);
          // window.console.log(res.data)
        })
        .catch(err => {});
    }
  },
  //挂载
  mounted() {
    //调用请求事件
    this.getData();
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #eee;
  .box-card1 {
    width: 23%;
    i {
      font-size: 80px;
      color: #44c8c5;
    }
  }
  .box-card2 {
    width: 23%;
    i {
      font-size: 80px;
      color: skyblue;
    }
  }
  .box-card3 {
    width: 23%;
    i {
      font-size: 80px;
      color: #f2556f;
    }
  }
  .box-card4 {
    width: 23%;
    i {
      font-size: 80px;
      color: #feba85;
    }
  }
}
.box1 {
  display: flex;
  justify-content: space-between;
}
</style>