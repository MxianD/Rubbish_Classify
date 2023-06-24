<template>
    <div class="eco-tips">
      <h2 class="eco-tips__title">环保小知识</h2>
      <el-card v-for="tip in ecoTips" :key="tip.id" class="eco-tips__card">
        <div class="eco-tips__card-body">
          <h3 class="eco-tips__card-title">{{ tip.title }}</h3>
          <p class="eco-tips__card-description">{{ tip.description }}</p>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "Tips",
    data() {
      return {
        ecoTips: [
          {
            id: 1,
            title: "减少塑料袋使用",
            description: "每年全球使用的塑料袋数量达到数百亿个，可以通过使用环保袋或带自己的购物袋来减少塑料袋的使用。",
          },
          {
            id: 2,
            title: "节约用水",
            description: "使用节水设备、修复漏水和培养良好的用水习惯等方式可以帮助节约用水资源。",
          },
          {
            id: 3,
            title: "循环再利用",
            description: "鼓励回收和循环再利用，例如分类投放垃圾和回收可回收物品。",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .eco-tips {
    background-color: #222222;
    padding: 20px;
    height: 100%;
  }
  
  .eco-tips__title {
    color: #ffffff;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .eco-tips__card {
    background-color: #333333;
    border-radius: 4px;
    display: flex;
  }
  
  .eco-tips__card-body {
    padding: 20px;
  }
  
  .eco-tips__card-title {
    color: #ffffff;
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .eco-tips__card-description {
    color: #cccccc;
    font-size: 14px;
    line-height: 1.5;
  }
  </style>
  