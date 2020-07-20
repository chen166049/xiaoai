<template>
  <div style="width:48%;">
    <el-card>
      <div class="box">
        <div class="one">Order_No</div>
        <div class="two">Price</div>
        <div class="three">Status</div>
      </div>
      <div v-for="(item,index) in arr" :key="index">
        <div class="box1">
          <div class="one">{{item.num}}</div>
          <div class="two">¥{{item.price}}</div>
          <div class="four">
            <div v-if="item.status === 0" class="box2">pending</div>
            <div v-if="item.status === 1" class="box3">succes</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      arr: ""
    };
  },
  //监听方法  click事件等
  methods: {
    getData() {
      axios
        .get("/api/orderData")
        .then(res => {
          // window.console.log(res.data);
          //请求到的数据赋值
          if (res.data.code === 0) {
            this.arr = res.data.data;
            // console.log(this.arr);
          }
        })
        .catch(err => {});
    }
  },
  //挂载
  mounted() {
    this.getData();
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>

.box {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.box1 {
  display: flex;
  padding: 3px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.one{
    width: 60%;
    line-height: 45px;
    text-align: center;
}
.two{
    width: 20%;
    line-height: 45px;
    text-align: center;
}
.three{
    width: 20%;
    line-height: 45px;
}
.four{
  width: 20%;
  line-height: 30px;
}
.box2{
    width: 80px;
    text-align: center;
    border: 1px solid pink;
    border-radius: 3px;
    background: #FEF0F0;
    color: #F57170;
}
.box3{
    width: 80px;
    text-align: center;
    border: 1px solid #A1CB68;
    border-radius: 3px;
    background: #F0F9EB;
    color: #A1CB68;
}
</style>