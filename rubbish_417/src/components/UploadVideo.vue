<template>
  <div style="display: flex; height: 90vh; flex-direction: column">
    <div class="send_img">
      <div style="margin-top: 50px">
        <h1>上传图片:</h1>
        <!--开启摄像头-->
        <div style="margin-top: 20px;">
          <div>
            <el-button size="mini" type="info" @click="callCamera"
              >打开摄像头</el-button
            >
          </div>
          <!--canvas截取流-->
          <canvas ref="canvas" width="240" height="240"></canvas>
          <!--图片展示-->
          <video video ref="video" width="240" height="240" autoplay></video>
          <div>
            <!--确认-->
            <el-button size="mini" type="info" plain @click="photograph"
              >拍照</el-button
            >
            <!--关闭-->
            <el-button size="mini" type="danger" @click="closeCamera"
              >关闭</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="progress_bar">
      <div style="flex: 1"><h1 style="white-space: nowrap">识别进度</h1></div>
      <div style="flex: 8; margin-left: 30px">
        <el-progress
          :text-inside="true"
          color="rgb(53,54,58)"
          :show-text="false"
          :stroke-width="26"
          :percentage="identify_percentage"
        ></el-progress>
      </div>
      <div style="flex: 8"></div>
    </div>
    <div class="result">
      <!-- <h1>识别结果</h1> -->
      <div class="card">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px">识别结果</span>
            </div>
            <el-table :data="result_data" stripe style="width: 100%">
              <el-table-column prop="Bgroup" label="大类" width="180">
              </el-table-column>
              <el-table-column prop="Sgroup" label="小类" width="180">
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>

      <div class="end">
        <div class="buttton_group">
          <el-button
            @click="submitUpload"
            style="margin-right: 20px"
            type="info"
            >上传</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  name: "UploadVideo",
  component: {},
  data() {
    return {
      formData: "", //表单要提交的参数
      dialogVisible: false,
      fileList: [],
      username: "scq",
      result_data: [],
      identify_percentage: 0, // 假数据
      result: [],
      resultList: [],
      loading: true,
      img: "",
    };
  },
  methods: {
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    submitUpload() {
      for (let i = 0; i < 100; i += 25) {
        this.identify_percentage += 25;
      }
      if (this.img != "") {
        this.loading = true;
        let formData = new FormData(); // 创建form对象
        formData.append("file", this.img, this.img.name); // 通过append向form对象添加数据
        request({
          url: "/rubbish",
          method: "post",
          data: formData,
          contentType: false, // 告诉axios不要去设置Content-Type请求头
        }).then((res) => {
          console.log("res", res);
          this.result_data = res;

          let str = "此物品是" + Object.values(this.result[0])[0];
          this.resultList.push(str);
          this.loading = false;
          this.img = "";
        });
      }
    },
    //调用camera
    async callCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.video.srcObject = stream;
      } catch (err) {
        console.error("Error starting camera", err);
      }
    },
    //拍照
    photograph() {
      let ctx = this.$refs["canvas"].getContext("2d"); // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs["video"], 0, 0, 224, 224); // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7);
      this.img = this.dataURLtoFile(imgBase64, "img");
    },
    // 关闭摄像头
    closeCamera() {
      this.img = "";
      let ctx = this.$refs["canvas"].getContext("2d");
      ctx.clearRect(0, 0, 240, 240);
      if (!this.$refs["video"].srcObject) {
        this.dialogCamera = false;
        return;
      }
      let stream = this.$refs["video"].srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.$refs["video"].srcObject = null;
    },
    // 判断图片格式
    beforeAvatarUploadImage(file) {
      const isJpeg = file.type === "image/png" || file.type === "image/jpg";
      if (!isJpeg) {
        this.$message.error("请选择正确的文件格式上传");
      }
      return isJpeg;
    },
    onchange(fileList) {
      this.fileList.push(fileList);
      console.log(this.fileList.length);
    },
    handleRemove(fileList) {
      this.fileList.map((value, i) => {
        if (value.name === fileList.name) {
          this.fileList.splice(i, 1);
        }
      });
      this.identify_percentage = 0;
      console.log("remove", fileList, this.fileList);
    },
    deleteForm() {
      if (this.fileList.length === 0) {
        this.$message.warning("请选取文件");
        // console.log("请选取文件");
        return;
      }
      this.fileList = []; // 清空图片列表（一定要清空，否则上传成功后还是会调用handleChange（）函数，上传成功后列表中还存在图片）
      this.formData = new window.FormData(); //清空之前的文件，避免影响下一次的运行
      this.result_data = [];
      this.identify_percentage = 0;
    },
  },
};
</script>

<style scoped>
.send_img {
  flex: 8;
  margin-left: 30px;

}
.progress_bar {
  flex: 2;
  /* background-color: antiquewhite; */
  display: flex;
  margin-top: 50px;
  margin-left: 30px;
}
.result {
  flex: 8;
  /* background-color: cadetblue; */
  margin-left: 30px;
  margin-top: 50px;
}
.el-upload el-upload--picture-card {
  border: 1px dashed black;
}
.card {
  display: flex;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
}
.end {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
.buttton_group {
  margin-bottom: 20px;
}
</style>
