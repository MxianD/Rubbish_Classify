<template>
    <div style="display: flex;height:90vh; flex-direction: column;">
        <div class="send_img">
            <div>
                上传图片
            </div>
                <el-upload
                ref="upload"
                action="1"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload=false
                :multiple=true
                :before-upload="beforeAvatarUploadImage"
                :file-list="fileList"
                :on-change="onchange"
                >              
                <i class="el-icon-plus"></i>
                </el-upload>
        </div>
        <div class="progress_bar">
            进度条
        </div>
        <div class="result">
            识别结果
            <el-button @click="uploadForm">上传</el-button>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
    name: "Upload",
    component: {},
    data() {
        return {
            form: {
                name: ''
            },
            formData: "",//表单要提交的参数
            url: '',
            dialogVisible: false,
            src: '',
            fileList: [],
            dialogVisible_up_image: false,
            username: 'scq',
        }
    },
    methods: {
           // 判断图片格式
        beforeAvatarUploadImage(file) {
            const isJpeg = file.type === 'image/png' || file.type === 'image/jpg'
            if (!isJpeg) {
                // this.$message.error('请选择正确的文件格式上传')
                console.log('请选择正确的文件格式上传');
            }
            return isJpeg
        },
        onchange(fileList) {
            this.fileList.push(fileList);
            console.log(this.fileList.length);
        },
        uploadForm() {
            if (this.fileList.length === 0) {
                // this.$message.warning('请选取文件')
                console.log('请选取文件');
             return
            }
            const formData = new FormData();
            this.fileList.forEach(file => {
                console.log('files',file.raw,file.name);
                formData.append('files', file.raw, file.name);
            })
            formData.append('username', this.username) // 自定义参数
            console.log('formData', formData.getAll('files')[0])
            for (var value of formData.values()) {
                console.log(value);
            }
            request({
                url: '/rubbish',
                method: "post",
                data: formData,
                contentType: false,// 告诉axios不要去设置Content-Type请求头  
            }).then(res => {
                console.log('res',res);
                //看具体接口怎么写的来定        
                if (res && res.code == "200") {
                    this.fileList = [];
                    this.formData = new window.FormData(); //清空之前的文件，避免影响下一次的运行
                    // this.$message({
                    //     type: "success",
                    //     message: "导入成功"
                    // });
                    console.log('yes');
                    this.fileList = [];// 清空图片列表（一定要清空，否则上传成功后还是会调用handleChange（）函数，上传成功后列表中还存在图片）
                } else {
                    this.fileList = [];// 清空图片列表（一定要清空，否则上传成功后还是会调用handleChange（）函数，上传成功后列表中还存在图片）
                    this.formData = new window.FormData();
                    // this.$message({
                    //     type: "error",
                    //     message: "导入失败," + res.data.msg
                    // });
                    console.log('wrong');
                }
            });
        },
    }
}
</script>

<style scoped>
.send_img{
  flex: 8;   
  background-color: aqua;
}
.progress_bar{
    flex: 2;
    background-color: antiquewhite;
}
.result{
    flex: 8;
    background-color: cadetblue;
}
</style>