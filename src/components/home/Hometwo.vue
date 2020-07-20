<template>
  <div>
    <div>
      <el-card>
        <ve-line :data="chartData"></ve-line>
      </el-card>
    </div>
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
      chartData: {
        columns: ["date", "expected", "actual"],
        rows: [
          
        ]
      }
    };
  },
  //监听方法  click事件等
  methods: {
    //折线图的数据请求
    getData() {
      axios
        .get("/api/homeChat")
        .then(res => {
        //   window.console.log(res.data);
        //请求到的数据赋值
          if(res.data.code === 0){
              this.chartData.rows = res.data.data
              // console.log(this.chartData.rows)
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