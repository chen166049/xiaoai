<template>
  <div style="width:32%;">
    <el-card>
      <ve-radar :data="chartData"></ve-radar>
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
    return {
      chartData: {
        columns: ["name", "sales", "ministration", "techology", "marketing", "delelopmer" ],
        rows: [
          
        ]
      }
    };
  },
  //监听方法  click事件等
  methods: {
      //雷达图的数据请求
    getData() {
      axios
        .get("/api/radarChat")
        .then(res => {
        //   window.console.log(res.data);
        //请求到的数据赋值
          if(res.data.code === 0){
              this.chartData.rows = res.data.data
            //   console.log(this.chartData.rows)
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