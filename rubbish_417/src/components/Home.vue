<template>
  <el-container class="layout-container-demo" style="min-height: 100vh">
    <el-aside width="sideWith+'px'">
      <el-scrollbar style="min-height: 100%; background-color: rgb(53, 54, 58)">
        <el-menu
          :default-openeds="[]"
          style="min-height: 100%; background-color: rgb(53, 54, 58)"
          :collapse="isCollapse"
        >
          <div
            style="
              line-height: 60px;
              height: 60px;
              text-align: center;
              background-color: rgb(53, 54, 58);
            "
            @click="collapse"
            v-show="!isCollapse"
          >
            <h1
              style="
                width: 180px;
                height: 60px;
                position: relative;
                color: aliceblue;
                padding-left: 0px;
              "
            >
              垃圾分类
            </h1>
          </div>
          <!--            个人中心-->
          <router-link to="/personalCenter" v-show="!isCollapse">
            <el-sub-menu index="1" class="personal_center">
              <template #title>
                <el-icon><help-filled /></el-icon
                ><span style="color: white">个人中心</span>
              </template>
            </el-sub-menu>
          </router-link>
          <!--           上传-->
          <router-link to="/upload" v-show="!isCollapse">
            <el-sub-menu index="2" class="upload">
              <template #title>
                <el-icon><Menu /></el-icon
                ><span style="color: white">上传</span>
              </template>
              <el-menu-item-group class="upload_sub" style="background-color: rgb(53, 54, 58);">
                <router-link to="/upload">
                <el-menu-item class="upload1" style="color: white;" index="1-1">批量上传图片</el-menu-item>
              </router-link>
              <router-link to="/uploadVideo">
                <el-menu-item class="upload1" style="color: white;" index="1-2">视频图片</el-menu-item>
              </router-link>
              </el-menu-item-group>
            </el-sub-menu>
          </router-link>
          <!--            历史记录-->
          <router-link to="/history" v-show="!isCollapse">
            <el-sub-menu index="3" class="history">
              <template #title>
                <el-icon><list /></el-icon
                ><span style="color: white">历史记录</span>
              </template>
            </el-sub-menu>
          </router-link>
          <!--            环保小知识-->
          <router-link to="/tips" v-show="!isCollapse">
            <el-sub-menu index="6" class="tips">
              <template #title>
                <el-icon><flag /></el-icon
                ><span style="color: white">环保小知识</span>
              </template>
            </el-sub-menu>
          </router-link>
          <router-link to="/login">
            <div v-show="!isCollapse">
              <el-button
                style="
                  margin-top: 330px;
                  margin-left: 50px;
                  color: rgb(53, 54, 58);
                "
                >登出</el-button
              >
            </div>
          </router-link>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header
        style="
          text-align: right;
          font-size: 25px;
          background-color: rgb(53, 54, 58);
          padding-right: 5px;
          height: 10vh;
        "
      >
        <el-button style="cursor: pointer; margin-right: 10px" @click="collapse"
          ><el-icon><Fold /></el-icon
        ></el-button>
        <div class="toolbar">
          <el-dropdown style="cursor: pointer">
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Logout</el-dropdown-item>
                <el-dropdown-item>Community</el-dropdown-item>
                <el-dropdown-item>About</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span style="color: white; margin-right: 10px">Batman</span>
          <img
            src="../assets/Batman.jpg"
            style="width: 60px; height: 60px; position: relative"
          />
        </div>
      </el-header>

      <el-main style="background-color: rgb(245, 245, 245); height: 90vh">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Fold } from "@element-plus/icons-vue";
export default {
  name: "HomeView",
  components: { Fold },
  data() {
    return {
      isCollapse: false,
      sideWith: 200,
    };
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.sideWith === 200) {
        this.sideWith = 0;
      } else {
        this.sideWith = 200;
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.personal_center :hover {
  background-color: rgb(97, 98, 101);
}
.upload :hover {
  background-color: rgb(97, 98, 101);
}
.history :hover {
  background-color: rgb(97, 98, 101);
}
.tips :hover {
  background-color: rgb(97, 98, 101);
}
.upload_sub :hover{
 background-color: rgb(53, 54, 58);
}
.upload1 :hover{
  background-color: rgb(97, 98, 101);

}
</style>
