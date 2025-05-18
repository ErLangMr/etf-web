<template>
  <div class="details-view">
    <div class="details-header">
      <span class="details-symbol">BKLC</span>
      <span class="details-title">BNY Mellon US Large Cap Core Equity ETF</span>
    </div>
    <div class="details-info">
      <div>
        <span class="details-info-label">Price:</span>
        $113.66
        <el-icon><Top style="color: #1a7f37" /></el-icon>
      </div>
      <div>
        <span class="details-info-label">Change:</span>
        <span>$0.77 (0.68%)</span>
      </div>
      <div>
        <span class="details-info-label">Category:</span>
        <span class="linkStyle" @click.stop="router.push('/equities')"
         >Large Cap Growth Equities</span>
      </div>
      <div>
        <span class="details-info-label">Last Updated:</span>
        <span>May 16, 2025</span>
      </div>
    </div>
    <div class="details-content">
      <van-divider :style="{ borderColor: '#dedede' }" />
      <template v-if="!isMobile()">
        <el-tabs v-model="activeName" tab-position="left" class="details-tabs">
          <el-tab-pane
            v-for="(item, index) in tabList"
            :key="index"
            :label="item.label"
            :name="item.label"
          >
            <div class="tab-content">
              <component :is="item.component" :tabActiveName="activeName" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      <div v-else>
        <div v-for="(item, index) in tabList" :key="index">
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from "vue";
import { useRouter } from "vue-router";
import { useDevice } from "@/utils/device";
import StockProfilePrice from "./components/StockProfilePrice.vue";
import DividendAndValuation from "./components/DividendAndValuation.vue";
import ExpenseAndFee from "./components/ExpenseAndFee.vue";
import Holdings from "./components/Holdings.vue";
import HoldingAnalysisChart from "./components/HoldingAnalysisChart.vue";
import PriceAndVolumeChart from "./components/PriceAndVolumeChart.vue";
import FundFlowChart from "./components/FundFlowChart.vue";
import PriceAndFlowInfluenceChart from "./components/PriceAndFlowInfluenceChart.vue";
import Performance from "./components/Performance.vue";
import { Top } from "@element-plus/icons-vue";
const router = useRouter();
const { isMobile } = useDevice();
const activeName = ref("股票简介和价格");
const tabList = ref([
  {
    label: "股票简介和价格",
    component: markRaw(StockProfilePrice),
  },
  {
    label: "股息和估值",
    component: markRaw(DividendAndValuation),
  },
  {
    label: "费用率和费用",
    component: markRaw(ExpenseAndFee),
  },
  {
    label: "控股",
    component: markRaw(Holdings),
  },
  {
    label: "持股分析图表",
    component: markRaw(HoldingAnalysisChart),
  },
  {
    label: "价格和数量图表",
    component: markRaw(PriceAndVolumeChart),
  },
  {
    label: "基金流动图表",
    component: markRaw(FundFlowChart),
  },
  {
    label: "价格与流量影响力图表",
    component: markRaw(PriceAndFlowInfluenceChart),
  },
  // {
  //   label: "ESG",
  //   component: "ESG",
  // },
  {
    label: "性能",
    component: markRaw(Performance),
  },
]);
</script>

<style lang="scss" scoped>
.details-view {
  width: 100%;
  height: 100%;
  padding: 20px;
  .details-header {
    display: flex;
    align-items: flex-start;
    gap: 18px;
    .details-symbol {
      background: var(--theme-purple);
      color: #fff;
      border-radius: 4px;
      padding: 4px 12px;
      font-weight: 600;
      margin-top: 2px;
    }
    .details-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #23272b;
      margin-right: 24px;
      margin-top: 2px;
    }
  }
  .details-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 1rem;
    .details-info-label {
      color: #888;
      margin-right: 4px;
      display: inline-block;
      width: 110px;
      text-align: right;
    }
  }
  .details-content {
    margin-top: 20px;
    .details-tabs {
      height: 100%;
      :deep(.el-tabs__item) {
        width: 150px;
        height: 50px;
        white-space: wrap;
      }
      :deep(.el-tabs__item.is-active) {
        position: relative;
        color: var(--theme-purple);
        font-weight: bold;
        background: #fff;
        z-index: 1;
        &::before {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 50px;
          background: #e4e7ed;
        }
        &::after {
          content: "";
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          width: 17px;
          height: 20px;
          background: url('data:image/svg+xml;utf8,<svg width="17" height="20" viewBox="0 0 17 40" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="16,1 1,20 16,39" stroke="%23e5e6eb" stroke-width="4" fill="white" stroke-linecap="round"/></svg>')
            no-repeat center/contain;
          z-index: 2;
          pointer-events: none;
        }
      }
      :deep(.el-tabs__active-bar) {
        display: none;
      }
      :deep(.el-tabs__item:hover) {
        color: var(--theme-purple);
      }
    }
  }
  .tab-content {
    padding: 0 20px;
    max-width: 750px;
  }
}
</style>
