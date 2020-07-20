<template>
  <div style="width:32%;">
    <el-card>
      <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
      this.chartSettings = {
        roseType: 'radius'
      }
    return {
      chartData: {
        columns: ["name", "data"],
        rows: [
          
        ]
      }
    };
  },
  //监听方法  click事件等
  methods: {
    //饼图的数据请求
    getData() {
      axios
        .get("/api/ringChat")
        .then(res => {
          //   window.console.log(res.data);
          //请求到的数据赋值
          if (res.data.code === 0) {
            this.chartData.rows = res.data.data;
            // console.log(this.chartData.rows);
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
</style>