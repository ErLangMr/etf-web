<script setup lang="ts">
import { ElIcon } from "element-plus";
import {
  Setting,
  Edit,
  Location,
  OfficeBuilding,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { nextTick, onMounted } from "vue";
import * as echarts from "echarts";

const cards = [
  {
    title: "ETF 筛选器",
    desc: "根据资产类别、发行人、市值、费用率等筛选 ETF。",
    icon: Setting,
    path: "/screener",
  },
  {
    title: "ETF 类型",
    desc: 'ETF数据库工作人员将 ETF 标记为多种类型；例如"杠杆"、"政府债券"和"债券"',
    icon: Edit,
    path: "/etfs",
  },
  {
    title: "ETF 跟踪指数",
    desc: "想要为您的投资组合添加特定国家/地区的敞口吗？使用我们的国家/地区敞口工具！",
    icon: Location,
    path: "/tool",
  },
  {
    title: "ETF 发行人",
    desc: "使用我们的数据库工具可以快速轻松地查找由 70 多个不同发行人发行的 ETF。",
    icon: OfficeBuilding,
    path: "/issuers",
  },
];
const router = useRouter();
const handleClick = (path: string) => {
  router.push({
    path: path,
  });
};

onMounted(() => {
  initLeftChart();
  initRightChart();
});
const initLeftChart = () => {
  const leftChart = echarts.init(
    document.getElementById("leftChart") as HTMLElement
  );
  leftChart.setOption({
    legend: {
      data: ["资产净值"],
    },
    tooltip: {
      trigger: "axis",
      // axisPointer: {
      //   type: 'cross',
      //   label: {
      //     backgroundColor: '#6a7985'
      //   }
      // }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      // boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "资产净值",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "bar",
      },
    ],
  });
};
const initRightChart = () => {
  const rightChart = echarts.init(
    document.getElementById("rightChart") as HTMLElement
  );
  rightChart.setOption({
    legend: {
      data: ["资产净值"],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "资产净值",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        smooth: true,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
      },
    ],
  });
};
function goToSJS() {
  window.open("https://www.sse.com.cn/assortment/fund/etf/home/");
}
function goToSZ() {
  window.open("https://fund.szse.cn/");
}

const indexList = [
  {
    title: "热门宽基类",
    children: [
      {
        title: "创业板人创业板人",
        code: "2914.26",
      },
      {
        title: "中韩半导创业板人",
        code: "3584.51",
      },
      {
        title: "恒生港股创业板人",
        code: "2779.89",
      },
    ],
  },
  {
    title: "热门行业类",
    children: [
      { title: "科技传媒", code: "1858.75" },
      { title: "云计算", code: "4412.56" },
      { title: "恒生生物", code: "12738.36" },
    ],
  },
];
</script>

<template>
  <div class="home-chart">
    <div class="home-chart-left">
      <div id="leftChart"></div>
      <img src="@/assets/上证基金网.png" alt="chart-left" @click="goToSJS" />
    </div>
    <div class="home-chart-right">
      <div id="rightChart"></div>
      <img src="@/assets/深圳.png" alt="chart-left" @click="goToSZ" />
    </div>
  </div>
  <div class="divider"></div>
  <div class="card-grid">
    <div class="grid">
      <div v-for="(card, idx) in cards" :key="idx" class="card">
        <div class="icon-bg">
          <el-icon :size="24" color="#3b3b6d">
            <component :is="card.icon" />
          </el-icon>
        </div>
        <div class="content">
          <div class="title" @click="handleClick(card.path)">
            {{ card.title }}
          </div>
          <div class="desc">{{ card.desc }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="index-list">
    <div class="index-list-content">
      <div class="index-list-item" v-for="item in indexList" :key="item.title">
        <div class="index-list-item-title">{{ item.title }}</div>
        <div class="index-list-item-content">
          <div class="index-list-item-content-item" v-for="child in item.children" :key="child.title">
            <div class="index-list-item-content-item-title">{{ child.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/variables.scss" as *;
@use "@/styles/mixins.scss" as *;
.home-chart {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 470px;
  @include mobile {
    flex-direction: column;
    height: 750px;
  }
  img {
    height: 60px;
    width: 85%;
    cursor: pointer;
    @include mobile {
      height: 40px;
    }
  }
  .home-chart-left {
    width: 50%;
    height: 100%;
    text-align: center;
    @include mobile {
      width: 100%;
    }
    #leftChart {
      width: 100%;
      height: calc(100% - 70px);
    }
  }
  .home-chart-right {
    width: 50%;
    height: 100%;
    text-align: center;
    @include mobile {
      width: 100%;
    }
    #rightChart {
      width: 100%;
      height: calc(100% - 70px);
    }
  }
}

.divider {
  width: 100%;
  height: 4px;
  background: var(--theme-purple);
  margin: 20px 0;
}

.card-grid {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background: #ffffff;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  // max-width: 1200px;
  column-gap: 100px;
}
.card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.icon-bg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f3fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.content {
  flex: 1;
}
.title {
  font-weight: 600;
  color: $theme-purple;
  font-size: var(--font-size-medium);
  margin-bottom: 8px;
  position: relative;
  display: inline-block;
}
.title:hover {
  color: #1da4a8;
}
.title::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #3b3b6d;
}
.desc {
  color: #5c5c7b;
  font-size: var(--font-size-base);
  line-height: 1.6;
}
.index-list{
  padding: 20px;
}
.index-list-item {
  margin-bottom: 30px;
  .index-list-item-title {
    font-size: var(--font-size-medium);
    font-weight: bold;
    margin-bottom: 10px;
  }
  .index-list-item-content {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    .index-list-item-content-item {
      margin-right: 20px;
      // height: 60px;
      width: 300px;
      padding: 10px 20px;
      // line-height: 60px;
      border-radius: 4px;
      background: #f6f6f6;
      // padding: 0 10px;
      font-size: var(--font-size-base);
      font-weight: bold;
      border: 1px solid #eeeeee;
      color: var(--theme-purple);
      cursor: pointer;
      &:hover {
        color: #1da4a8;
      }
    }
  }
}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .card {
    padding: 16px;
  }
  .card-grid {
    padding: 16px;
  }
  .icon-bg {
    width: 36px;
    height: 36px;
  }
  .title {
    font-size: var(--font-size-base);
  }
  .desc {
    font-size: var(--font-size-base);
  }
  .index-list-item-content {
    flex-wrap: wrap;
  }
  .index-list-item-content-item {
    width: 200px;
    margin-bottom: 10px;
  }
}
</style>
