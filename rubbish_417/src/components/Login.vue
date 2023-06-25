<template>
  <div
    style="
      background-color: rgb(53, 54, 58);
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
    "
  >
    <el-card class="box-card">
      <h2>登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="70px"
        class="login-from"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          v-loading="loading"
          style="background-color: rgb(53, 54, 58)"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <router-link to="/register">
          <el-button style="margin-left: 10px">注册</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "blur" },
        ],
      },
      loading: false, // 是否显示加载动画
    };
  },
  methods: {
    submitForm(formName) {
      // 验证表单中的账号密码是否有效，因为在上面rules中定义为了必填 required: true
      this.$refs[formName].validate((valid) => {
        // 点击登录后，让登录按钮开始转圈圈（展示加载动画）
        this.loading = true;
        // 如果经过校验，账号密码都不为空，则发送请求到后端登录接口
        if (valid) {
          let _this = this;
          // 使用 axios 将登录信息发送到后端
          request({
            url: "/login", // 请求地址
            method: "post", // 请求方法
            data: this.ruleForm,
          }).then((res) => {
            // 当收到后端的响应时执行该括号内的代码，res 为响应信息，也就是后端返回的信息
            console.log("res", {
              message: "登录成功",
              success: true,
            });
            this.$router.push("/");
            if (res.code === "0") {
              // 当响应的编码为 0 时，说明登录成功
              // 将用户信息存储到sessionStorage中
              localStorage.setItem("username", this.ruleForm.username);
              console.log("res", res);
              // 跳转页面到首页
              this.$router.push("/");
              // 显示后端响应的成功信息
              // this.$message({
              //   message: res.data.msg,
              //   type: "success",
              // });
            } else {
              // 当响应的编码不为 0 时，说明登录失败
              // 显示后端响应的失败信息
              // this.$message({
              //   message: res.data.msg,
              //   type: "warning",
              // });
            }
            // 不管响应成功还是失败，收到后端响应的消息后就不再让登录按钮显示加载动画了
            _this.loading = false;
            console.log("12", res);
            console.log("14", this.ruleForm);
          });
        } else {
          // 如果账号或密码有一个没填，就直接提示必填，不向后端请求
          console.log("error submit!!");
          this.loading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
