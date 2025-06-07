<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from 'vue';
const router = useRouter();
const indexList = [
  {
    title: "XXX大类",
    children: [
      {
        title: "创业板人创业板人",
        value: "2914.26",
        rate: "6.38",
        fundCount: 2,
      },
      {
        title: "中韩半导创业板人",
        value: "3584.51",
        rate: "6.17",
        fundCount: 2,
      },
      {
        title: "恒生港股创业板人",
        value: "2779.89",
        rate: "6.02",
        fundCount: 2,
      },
      {
        title: "港股创新创业板人",
        value: "1110.75",
        rate: "5.92",
        fundCount: 2,
      },
      {
        title: "港股通创创业板人",
        value: "886.51",
        rate: "5.87",
        fundCount: 2,
      },
      {
        title: "港股通创创业板人",
        value: "1741.45",
        rate: "5.75",
        fundCount: 4,
      },
      { title: "通信技术", value: "1054.05", rate: "5.62", fundCount: 2 },
      { title: "通信设备", value: "6527.55", rate: "5.49", fundCount: 4 },
      { title: "5G通信", value: "912.68", rate: "5.48", fundCount: 4 },
      { title: "通信设备", value: "1589.04", rate: "5.17", fundCount: 4 },
      {
        title: "港股通医创业板人",
        value: "2892.85",
        rate: "4.59",
        fundCount: 2,
      },
    ],
  },
  {
    title: "XXX大类",
    children: [
      { title: "科技传媒", value: "1858.75", rate: "4.54", fundCount: 2 },
      { title: "云计算", value: "4412.56", rate: "4.53", fundCount: 16 },
      { title: "恒生生物", value: "12738.36", rate: "4.52", fundCount: 8 },
      {
        title: "SHS云计创业板人",
        value: "2282.71",
        rate: "4.43",
        fundCount: 2,
      },
      {
        title: "纳斯达克创业板人",
        value: "4254.94",
        rate: "4.31",
        fundCount: 6,
      },
      { title: "动漫游戏", value: "1711.90", rate: "4.28", fundCount: 6 },
      { title: "稀土产业", value: "1719.29", rate: "4.13", fundCount: 4 },
      { title: "恒生医疗", value: "3313.32", rate: "4.11", fundCount: 4 },
      { title: "CSSW电子", value: "3579.77", rate: "4.09", fundCount: 2 },
    ],
  },
];
const filterTabs = [
  { label: '日涨幅', value: 'day', gray: false },
  { label: '近1周', value: 'week', gray: false },
  { label: '近1月', value: 'month', gray: false },
  { label: '近3月', value: '3month', gray: false },
  { label: '近6月', value: '6month', gray: false },
  { label: '近1年', value: 'year', gray: false },
];
const activeTab = ref('week');
const setActiveTab = (val: string) => {
  activeTab.value = val;
  // 这里可以加数据切换逻辑
};
const handleCountryClick = (name: string) => {
  router.push({
    path: "/exposure",
    query: {
      country: name,
    },
  });
};
</script>

<template>
  <div class="tool-view-container">
    <div class="tool-view-header">
      <h1>ETF 跟踪指数</h1>
      <!-- <p class="tool-view-desc">
        How It Works: Use either the map tool or drop down box to find the equity ETFs with exposure to a particular country. Once a country is selected, click the icon to see all ETFs with exposure to that country.
      </p> -->
    </div>
    <div class="tool-filter">
      <span class="tool-filter-label">阶段涨幅：</span>
      <span
        v-for="(tab, idx) in filterTabs"
        :key="tab.value"
        :class="['tool-filter-tab', { active: activeTab === tab.value }]"
        @click="setActiveTab(tab.value)"
      >
        {{ tab.label }}
      </span>
    </div>
    <div class="tool-content">
      <div v-for="group in indexList" :key="group.title" class="index-group-block">
        <div class="index-group-title">{{ group.title }}</div>
        <div class="index-card-list">
          <div
            v-for="item in group.children"
            :key="item.title"
            class="index-card"
          >
            <div class="index-card-title-row">
              <span class="index-card-title">{{ item.title }}</span>
              <span class="index-card-value">{{ item.value }}</span>
            </div>
            <div class="index-card-info-row">
              <span class="index-card-period">近1周</span>
              <span class="index-card-rate">{{ item.rate }}<span class="index-card-rate-percent">%</span></span>
            </div>
            <div class="index-card-link-row">
              <span class="index-card-link">
                查看<span style="color: #e53935">{{ item.fundCount }}</span>只指数相关基金
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "@/styles/variables.scss" as *;

.tool-view-container {
  width: 100%;
  padding: 20px;
  .tool-view-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .tool-view-desc {
    font-size: 1.08rem;
    color: #222;
    margin-bottom: 1.1rem;
    line-height: 1.7;
  }
}
.tool-content {
  margin-top: 20px;
}
.index-group-block {
  margin-bottom: 32px;
}
.index-group-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
  padding-left: 2px;
}
.index-card-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px 18px;
  margin-top: 10px;
}
.index-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  padding: 18px 16px 10px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 90px;
  transition: box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid #f2f2f2;
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
    border-color: #e0e0e0;
  }
}
.index-card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.index-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index-card-value {
  font-size: 1rem;
  color: #b0b0b0;
  font-weight: 500;
}
.index-card-info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
}
.index-card-period {
  font-size: 0.95rem;
  color: #888;
}
.index-card-rate {
  font-size: 1.35rem;
  color: #e53935;
  font-weight: 700;
}
.index-card-rate-percent {
  font-size: 1rem;
  margin-left: 1px;
}
.index-card-link-row {
  text-align: center;
}
.index-card-link {
  font-size: 0.95rem;
  color: #888;
  cursor: pointer;
  &:hover {
    color: #222;
    text-decoration: underline;
  }
}
@media (max-width: 1200px) {
  .index-card-list {
    grid-template-columns: repeat(4, 1fr);
  }
  .index-card-title {
    max-width: 250px;
  }
}
@media (max-width: 900px) {
  .index-card-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .index-card-list {
    grid-template-columns: 1fr;
  }
}
.tool-filter {
  margin: 30px 0 18px 0;
  font-size: var(--font-size-medium);
  display: flex;
  align-items: center;
  .tool-filter-label {
    color: #8a8787;
    margin-right: 6px;
    font-size: var(--font-size-medium);
  }
  .tool-filter-tab {
    margin-right: 12px;
    color: #222;
    cursor: pointer;
    font-size: var(--font-size-medium);
    transition: color 0.2s;
    &.active {
      color: #ff5722;
      font-weight: 500;
      // border-bottom: 2px solid #ff5722;
      // padding-bottom: 1px;
    }
    &.gray {
      color: #bdbdbd;
      cursor: default;
    }
    &:hover:not(.active):not(.gray) {
      color: #ff5722;
    }
  }
}
</style>
