<template>
  <div>
    <el-card>
      <div>
        <div class="font">支持拖拽</div>
        <el-upload
          class="upload-demo"
          drag
          action="/api/upload"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="bottom">
         <div class="font">支持裁剪</div>
        <el-button type="primary" @click="toggleShow">上传图片</el-button>
        <my-upload
          field="file"
          @crop-success="cropSuccess"
          v-model="show"
          :width="200"
          :height="200"
          img-format="png"
          :size="size"
          url="/api/upload"
        ></my-upload>
        <img :src="avatar" />
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios"
import myUpload from "vue-image-crop-upload";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {
    "my-upload": myUpload
  },
  // 定义变量
  data() {
    return {
      avatar: "",
      show: false,
      size: 2.1
    };
  },
  //监听方法  click事件等
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是经过base64转码过的图片
      this.avatar = imgDataUrl;
      // console.log(imgDataUrl); 这里打印出来的是base64格式的资源，太长了
      // //base64转blob格式
      // let arr = imgDataUrl.split(","),
      //   mime = arr[0].match(/:(.*?);/)[1],
      //   bstr = atob(arr[1]),
      //   n = bstr.length,
      //   u8arr = new Uint8Array(n);
      // while (n--) {
      //   u8arr[n] = bstr.charCodeAt(n);
      // }
      // let bdata = new Blob([u8arr], { type: mime });
      // console.log(new Blob([u8arr], { type: mime })) ;//这里打印base64转成blob的资源，根据自己的项目需求去转吧
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
.font {
  font-size: 30px;
}
.bottom{
   margin-top: 50px;
}
</style>