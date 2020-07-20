<template>
  <div class="box">
    <div class="box1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //监听方法  click事件等
  methods: {},
  //挂载
  mounted() {},
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box{
   width: 100vw;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   background: skyblue; 
   .box1{
      width: 30%;
   }
}
</style>