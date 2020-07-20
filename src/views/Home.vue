<template>
  <div class="box2">
    <div>
      <navigation></navigation>
    </div>
    <div class="box">
      <div style="width:16%; display:flex">
        <sidebar></sidebar>
      </div>
      <div style="width:83%" class="box1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {
    Navigation,
    Sidebar
  },
  // 定义变量
  data() {
    return {};
  },
  //监听方法  click事件等
  methods: {},
  //调用
  mounted() {},
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box2{
  width: 100%;
}
.box {
  display: flex;
  justify-content: space-between;
}
.box1 {
  height: 700px;
  overflow: auto;
}
</style>