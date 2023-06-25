<template>
    <div style="background-color: rgb(53,54,58);width: 100vw;height: 100vh;display: flex;align-items: center;">
      <el-card class="box-card">
        <h2>注册</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btnGroup">
          <el-button type="primary" @click="submitForm('ruleForm')"  style="background-color: rgb(53,54,58);"  v-loading="loading"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="goBack">返回</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import request from '@/utils/request.js';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: "",
          pass: "",
          password: "",
        },
        rules: {
          username: [
            { required: true, message: "用户名不能为空！", trigger: "blur" },
          ],
          pass: [{ required: true, validator: validatePass, trigger: "blur" }],
          password: [
            { required: true, validator: validatePass2, trigger: "blur" },
          ],
        },
        loading: false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userInfo = {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            };
            request({     // axios 向后端发起请求
              url: "/register",  // 请求地址
              method: "post",             // 请求方法
              data: userInfo
            }).then((res) => { // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
                console.log('res', res);
                console.log('userInfo', userInfo);
              if (res.success === true) {  // 当响应的编码为 0 时，说明注册成功
                // 显示后端响应的成功信息
                this.$message({
                  message: '注册成功',
                  type: "success",
                });
              }else{  // 当响应的编码不为 0 时，说明注册失败
                // 显示后端响应的失败信息
                this.$message({
                  message: '注册失败',
                  type: "warning",
                });
              }
            });
          } else { // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 设置登录面板居中，宽度为400px */
  .box-card {
    margin: auto auto;
    width: 400px;
    height: 300px;
  }
  /* 设置登录面板中的表单居中 */
  .login-from {
    margin: auto auto;
  }

  </style>