<template>
  <div class="personal-center">
    <h2 class="personal-center__title">个人信息</h2>
    <div class="personal-center__card">
      <el-form
        :model="userInfo"
        label-width="80px"
        class="personal-center__form"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="userInfo.username"
            class="personal-center__input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="userInfo.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input
            type="password"
            v-model="passwordConfirm"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="personal-center__form-item">
          <el-button
            type="primary"
            @click="saveUserInfo"
            class="personal-center__button"
            >修改密码</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      userInfo: {
        username: "scq",
        password: "123",
      },
      passwordConfirm: "",
    };
  },
  methods: {
    saveUserInfo() {
      // 在这里执行保存用户信息的操作
      // 可以使用 this.userInfo 来获取用户填写的信息
      if (this.userInfo.password === this.passwordConfirm) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "修改失败",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.personal-center {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.personal-center__title {
  font-size: 24px;
  margin-bottom: 20px;
}

.personal-center__card {
  background-color: #fff;
  border: 1px solid #eaecef;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.personal-center__form {
  width: 100%;
}

.personal-center__form-item {
  margin-top: 20px;
}

.personal-center__input {
  width: 100%;
}

.personal-center__button {
  width: 100%;
  background-color: rgb(53, 54, 58);
  color: #fff;
}

.personal-center__button:hover {
  background-color: rgb(97, 98, 101);
}
.btnFalses {
  background-color: rgb(97, 98, 101);
}
</style>
