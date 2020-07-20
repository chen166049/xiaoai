<template>
  <div>
    <home-one></home-one>
    <hometwo></hometwo>
    <div class="box">
      <homethree></homethree>
      <homefour></homefour>
      <homefive></homefive>
    </div>
    <div class="box1">
      <homesix></homesix>
      <hometodolist></hometodolist>
      <homeeight></homeeight>
    </div>
  </div>
</template>

<script>
import HomeOne from "../../components/home/HomeOne";
import Hometwo from "../../components/home/Hometwo";
import Homethree from "../../components/home/Homethree";
import Homefour from "../../components/home/Homefour";
import Homefive from "../../components/home/Homefive";
import Homesix from "../../components/home/Homesix";
import Hometodolist from "../../components/home/Hometodolist";
import Homeeight from "../../components/home/Homeeight";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {
    HomeOne,
    Hometwo,
    Homethree,
    Homefour,
    Homefive,
    Homesix,
    Hometodolist,
    Homeeight,
  },
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
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.box1{
   width: 100%;
   display: flex;
   justify-content: space-between;
}
</style>