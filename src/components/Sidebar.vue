<template>
  <div>
    <div>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            :default-active="$route.meta.parentpath"
            router
            class="box el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="width:250px"
          >
            <el-menu-item index="/homepage">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/release">
              <i class="el-icon-menu"></i>
              <span slot="title">已发布</span>
            </el-menu-item>
            <el-menu-item index="/statistics">
              <i class="el-icon-document"></i>
              <span slot="title">统计</span>
            </el-menu-item>
            <el-menu-item index="/article">
              <i class="el-icon-document"></i>
              <span slot="title">发表文章</span>
            </el-menu-item>
            <el-menu-item index="/label">
              <i class="el-icon-setting"></i>
              <span slot="title">标签页</span>
            </el-menu-item>
            <el-menu-item index="/export">
              <i class="el-icon-setting"></i>
              <span slot="title">导出excel</span>
            </el-menu-item>
            <el-menu-item index="/upload">
              <i class="el-icon-setting"></i>
              <span slot="title">图片上传</span>
            </el-menu-item>
            <el-menu-item index="/out">
              <i class="el-icon-delete"></i>
              <span slot="title">退出系统</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
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
  methods: {
      handleOpen(){

      },
      handleClose(){

      }
  },
  //挂载
  mounted() {},
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box{
    height:700px  !important;
}
</style>