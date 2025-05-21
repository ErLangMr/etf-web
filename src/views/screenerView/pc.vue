<script setup lang="ts">
// PC 端特有的逻辑和状态
import { ref, onMounted, nextTick, computed } from 'vue'
import ScreenerFilter from '@/components/ScreenerFilter.vue'
import type { FilterItem } from '@/components/ScreenerFilter.vue'
import ScreenerTable from '@/components/ScreenerTable.vue'
import { useDevice } from '@/utils/device'
import { Operation } from '@element-plus/icons-vue'
import { getFilterTable } from '@/api/filterTable'
const { isMobile } = useDevice()
getFilterTable().then(res => {
  console.log(res,11111)
})
// 一级资产类型
const assetClasses: FilterItem[] = [
  { label: 'Asset Class', value: 'assetClass', children: [
    { label: 'Alternatives', value: 'alternatives', children: [
      { label: 'Hedge Fund', value: 'hedge-fund', cont: 0 },
      { label: 'Commodity', value: 'commodity', cont: 456 },
      { label: 'Equity', value: 'equity', cont: 789 },
    ] },
    { label: 'Bonds', value: 'bonds' },
    { label: 'Commodity', value: 'commodity' },
  ] },
  { label: 'Attributes', value: 'attributes', children: [
    { label: 'Any', value: 'any', cont: 1243 },
    { label: 'Active', value: 'active', cont: 344 },
    { label: 'Passive', value: 'passive', cont: 45 }
  ] },
  { label: 'Issuer', value: 'issuer' },
  { label: 'Expenses & Dividend', value: 'expenses', type: 'slider', children: [
    { start: 0, end: 19 },
    { start: 0, end: 19 },
    { start: 20, end: 716 }
  ] },
]

const mobileFilterRef = ref()
const selectedChild = ref('')
const selectedItems = ref<string[]>([])

const etfList = ref([
  { symbol: 'FTLS', name: 'First Trust Long/Short Equity ETF', asset: 'Alternatives', total: '$1,951', ytd: '-2.91%', volume: '162,536', price: '$63.75' },
  { symbol: 'DBMF', name: 'iMGP DBi Managed Futures Strategy ETF', asset: 'Alternatives', total: '$1,191', ytd: '-2.58%', volume: '778,684', price: '$25.31' },
  { symbol: 'CTA', name: 'Simplify Managed Futures Strategy ETF', asset: 'Alternatives', total: '$1,034', ytd: '-0.25%', volume: '638,084', price: '$27.71' },
  { symbol: 'QAI', name: 'NYLI Hedge Multi-Strategy Tracker ETF', asset: 'Alternatives', total: '$692', ytd: '0.25%', volume: '69,002', price: '$31.49' },
  { symbol: 'RLY', name: 'SPDR SSgA Multi-Asset Real Return ETF', asset: 'Alternatives', total: '$477', ytd: '4.52%', volume: '84,514', price: '$28.24' },
  { symbol: 'BTAL', name: 'AGF U.S. Market Neutral Anti-Beta Fund', asset: 'Alternatives', total: '$389', ytd: '6.11%', volume: '945,519', price: '$19.61' },
  { symbol: 'FLSP', name: 'Franklin Systematic Style Premia ETF', asset: 'Alternatives', total: '$337', ytd: '0.84%', volume: '55,541', price: '$24.11' },
  { symbol: 'MNA', name: 'NYLI Merger Arbitrage ETF', asset: 'Alternatives', total: '$234', ytd: '5.43%', volume: '39,944', price: '$34.75' },
  { symbol: 'KMLM', name: 'KFA Mount Lucas Managed Futures Index Strategy ETF', asset: 'Alternatives', total: '$194', ytd: '-6.37%', volume: '164,363', price: '$26.31' },
  { symbol: 'CLSE', name: 'Convergence Long/Short Equity ETF', asset: 'Alternatives', total: '$172', ytd: '-3.71%', volume: '116,822', price: '$22.06' },
  { symbol: 'WTMF', name: 'WisdomTree Managed Futures Strategy Fund', asset: 'Alternatives', total: '$158', ytd: '-1.23%', volume: '27,181', price: '$34.50' },
  { symbol: 'FMF', name: 'First Trust Managed Futures Strategy Fund', asset: 'Alternatives', total: '$151', ytd: '-4.02%', volume: '25,977', price: '$45.43' },
])

// 表头配置
const tableColumns = ref([
  { prop: 'symbol', label: 'Symbol',type:'link',url:'/details' },
  { prop: 'name', label: 'ETF Name',type:'link',url:'/details' },
  { prop: 'asset', label: 'Asset Class' },
  { prop: 'total', label: 'Total Assets ($MM)' },
  { prop: 'ytd', label: 'YTD Price Change' },
  { prop: 'volume', label: 'Avg. Daily Share Volume (3mo)' },
  { prop: 'price', label: 'Previous Closing Price' },
])

const filterTabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Returns', value: 'returns' },
  { label: 'Fund Flows', value: 'fund-flows' },
  { label: 'Expenses', value: 'expenses' },
  { label: 'ESG', value: 'esg', icon: true },
  { label: 'Dividends', value: 'dividends' },
  { label: 'Risk', value: 'risk' },
  { label: 'Holdings', value: 'holdings' },
  { label: 'Taxes', value: 'taxes' },
  { label: 'Technicals', value: 'technicals' },
  { label: 'Analysis', value: 'analysis' },
  { label: 'Realtime Ratings', value: 'realtime-ratings' },
]
const activeTab = ref('overview')

const showMobileFilter = ref(false)
function openMobileFilter() {
  showMobileFilter.value = true
}
function closeMobileFilter() {
  showMobileFilter.value = false
}

onMounted(() => {
  nextTick(() => {
    // 横向筛选菜单相关逻辑精简，无需折叠和更多按钮
  })
})
</script>

<template>
  <div class="screener-pc">
    <!-- 移动端 Filter 按钮 -->
    <button class="mobile-filter-btn" @click="openMobileFilter" v-show="isMobile()"><Operation />筛选</button>
    <!-- PC端筛选器 -->
    <div class="filter-left pc-filter" v-show="!isMobile()">
      <ScreenerFilter
        :filter-data="assetClasses"
        v-model:selected-child="selectedChild"
        v-model:selected-items="selectedItems"
      />
    </div>
    <!-- 移动端遮罩和弹窗 -->
    <div v-if="showMobileFilter" class="mobile-filter-mask">
      <div class="mobile-filter-panel">
        <div class="mobile-filter-header">
          <span>筛选器</span>
          <button class="reset-btn" @click="mobileFilterRef?.resetFilters()">重置</button>
          <span class="close-btn" @click="closeMobileFilter">×</span>
        </div>
        <div class="mobile-filter-content">
          <ScreenerFilter
            ref="mobileFilterRef"
            :filter-data="assetClasses"
            v-model:selected-child="selectedChild"
            v-model:selected-items="selectedItems"
          />
        </div>
      </div>
    </div>
    <ScreenerTable
      class="table-area"
      :table-columns="tableColumns"
      :tableData="etfList"
      :filter-tabs="filterTabs"
      :active-tab="activeTab"
      @update:activeTab="activeTab = $event"
    />
  </div>
</template>

<style scoped lang="scss">
.screener-pc {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  background: #ffffff;
}
.filter-left {
  width: 320px;
  flex-shrink: 0;
}
.table-area {
  flex: 1;
  min-width: 0;
  margin-left: 20px;
}
// 移动端样式
.mobile-filter-btn {
  display: none;
  position: fixed;
  top: 95px;
  right: calc(50% - 45px);
  z-index: 1001;
  background: var(--theme-purple);
  border: 1px solid var(--theme-purple);
  border-radius: 4px;
  padding: 5px 20px;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  color: #fff;
  svg{
    height: 18px;
    vertical-align: middle;
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
.mobile-filter-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: flex-end;
}
.mobile-filter-panel {
  background: #fff;
  width: 100vw;
  max-width: none;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  border: none;
}
.mobile-filter-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 20px 12px 20px;
  font-size: 22px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  background: #fff;
  position: relative;
  gap: 12px;
  span {
    font-weight: 600;
  }
  .reset-btn {
    margin-left: 12px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #888;
    cursor: pointer;
    font-size: 14px;
    padding: 4px 12px;
    border-radius: 5px;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 4px;
    &:hover {
      background: #e6e6e6;
      color: #409eff;
      border-color: #409eff;
    }
  }
  .close-btn {
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
    position: absolute;
    right: 20px;
    top: 16px;
  }
}
.mobile-filter-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 0 24px 0;
}
// 响应式：移动端显示移动筛选，隐藏PC筛选
@media (max-width: 768px) {
  :deep(.filters-header) {
    display: none !important;
  }
  .filter-left.pc-filter {
    display: none !important;
  }
  .mobile-filter-btn {
    display: block;
  }
  .table-area {
    margin-left: 0;
  }
  .mobile-filter-panel {
    width: 100vw;
    max-width: none;
    border-radius: 0;
  }
}
</style>
