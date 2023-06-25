<template>
  <div style="display: flex; height: 90vh; flex-direction: column">
    <div class="send_img">
      <div style="margin-top: 50px">
        <h1>上传图片:</h1>
      </div>
      <el-upload
        ref="upload"
        action="1"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :auto-upload="false"
        :multiple="true"
        :before-upload="beforeAvatarUploadImage"
        :file-list="fileList"
        :on-change="onchange"
        style="margin-top: 20px"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
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
              <el-table-column label="图片序号" type="index" width="100" :index="indexMethod" >
              </el-table-column>
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
          <el-button @click="uploadForm" style="margin-right: 20px" type="info"
            >上传</el-button
          >
          <el-button @click="deleteForm" style="margin-right: 50px"
            >清除</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  name: "Upload",
  component: {},
  data() {
    return {
      formData: "", //表单要提交的参数
      dialogVisible: false,
      fileList: [],
      username: "scq",
      result_data: [],
      identify_percentage: 0, // 假数据
    };
  },
  methods: {
    //card行号
    indexMethod(index) {
        return index+1;
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
    uploadForm() {
      if (this.fileList.length === 0) {
        this.$message.warning("请选取文件");
        // console.log("请选取文件");
        return;
      }
      const formData = new FormData();
      this.fileList.forEach((file) => {
        console.log("files", file.raw, file.name);
        formData.append("file", file.raw, file.name);
      });
      formData.append("username", this.username); // 自定义参数
      console.log("formData", formData.getAll("files")[0]);
      for (var value of formData.values()) {
        console.log(value);
      }
      for (let i = 0; i < 100; i += 25) {
        this.identify_percentage += 25;
      }
      request({
        url: "/rubbish",
        method: "post",
        data: formData,
        contentType: false, // 告诉axios不要去设置Content-Type请求头
      }).then((res) => {
        console.log("res", res);
        this.result_data = res;

        //后端res里面没有状态码
        // //看具体接口怎么写的来定
        // if (res && res.code == "200") {
        //   // this.$message({
        //   //     type: "success",
        //   //     message: "导入成功"
        //   // });
        //   console.log("yes");
        // } else {
        //   // this.$message({
        //   //     type: "error",
        //   //     message: "导入失败," + res.data.msg
        //   // });
        //   console.log("wrong");
        // }
      });
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
  width: 500px;
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
