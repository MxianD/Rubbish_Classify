<template>
    <div class="root">
      <div class="login_box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:"Login",
    data() {
      return {
        ruleForm: {
          name: "lord",
          password: "*****",
        },
        rules: {
          name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$router.push("/home");
        //   this.$refs[formName].validate(async (valid) => {
        //     if (valid) {
        //       const { data: result } = await this.$http.post(
        //         "login",
        //         this.ruleForm
        //       );
        //       if (result.meta.status !== 200) return console.log("登录失败");
        //       console.log("登录成功");
        //       window.sessionStorage.setItem("token", result.data.token);
        //       this.$router.push("/home");
        //     } else {
        //       console.log("error submit!!");
        //       return false;
        //     }
        //   });
      },
    },
  };
  </script>
  
  <style scoped>
  .root {
    background-color: rgb(53, 54, 58);
    height: 745px;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  </style>
  