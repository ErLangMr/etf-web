<script setup lang="ts">
// PC 端特有的逻辑和状态
import { ref } from 'vue'
import 'vant/lib/index.css'

// 一级资产类型
const assetClasses = [
  { label: 'Asset Class', value: 'assetClass',children:[
    { label: 'Alternatives', value: 'alternatives',children:[
      {label:'Hedge Fund',value:'hedge-fund', cont: 0},
      {label:'Commodity',value:'commodity', cont: 456},
      {label:'Equity',value:'equity', cont: 789},
    ] },
    { label: 'Bonds', value: 'bonds' },
    { label: 'Commodity', value: 'commodity' },
  ] },
  { label: 'Attributes', value: 'attributes' },
  { label: 'Issuer', value: 'issuer' },
  { label: 'Expenses & Dividend', value: 'expenses' },
]

const activeNames = ref('assetClass')
const chidActiveName = ref('')
const selectedChild = ref('')
const selectedItems = ref<string[]>([])

function resetFilters() {
  activeNames.value = ''
  chidActiveName.value = ''
  selectedChild.value = ''
  selectedItems.value = []
}

function handleCheckboxChange(value: string, checked: boolean) {
  if (checked) {
    selectedItems.value.push(value)
  } else {
    const index = selectedItems.value.indexOf(value)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    }
  }
}

function handleRadioChange(value: string) {
  selectedChild.value = value
  selectedItems.value = [] // 清空多选项的值
}

const etfList = ref([
  { symbol: 'FTLS', name: 'First Trust Long/Short Equity ETF', asset: 'Alternatives', total: '$1,951', ytd: '-2.91%', volume: '162,536', price: '$63.75' },
  { symbol: 'DBMF', name: 'iMGP DBi Managed Futures Strategy ETF', asset: 'Alternatives', total: '$1,191', ytd: '-2.58%', volume: '778,684', price: '$25.31' },
  // ... 其他数据
])
</script>

<template>
  <div class="screener-pc">
    <div class="filters">
      <div class="filters-header">
        <h2>Filters</h2>
        <button class="reset-btn" @click="resetFilters">Reset</button>
      </div>
      <van-collapse v-model="activeNames" accordion class="main-collapse">
        <van-collapse-item
          v-for="item in assetClasses"
          :key="item.value"
          :name="item.value"
          :title="item.label">
        <template v-if="item.value === 'assetClass' && item.children">
          <van-collapse v-model="chidActiveName" accordion>
            <van-collapse-item
              v-for="child in item.children"
              :key="child.value"
              :name="child.value"
              :title="child.label"
              :is-link="false"
              class="child-collapse-item">
              <template #title>
                <van-radio-group v-model="selectedChild" @change="handleRadioChange">
                  <van-radio :name="child.value">{{ child.label }}</van-radio>
                </van-radio-group>
              </template>
              <div class="children-list">
                <div v-for="subChild in child.children" :key="subChild.value" class="child-item">
                  <van-checkbox
                    :model-value="selectedItems.includes(subChild.value)"
                    @update:model-value="(checked) => handleCheckboxChange(subChild.value, checked)"
                    shape="square"
                    icon-size="14px"
                  >
                    {{ subChild.label }}
                  </van-checkbox>
                  <span
                    class="cont"
                    :class="{
                      'cont-error': subChild.cont === 0,
                      'cont-success': subChild.cont > 0
                    }"
                  >
                    {{ subChild.cont }}
                  </span>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </template>
        <template v-else>
          <div>{{ item.label }}</div>
        </template>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="table-area">
      <div class="table-header">
        <span>Symbol</span>
        <span>ETF Name</span>
        <span>Asset Class</span>
        <span>Total Assets</span>
        <span>YTD Price Change</span>
        <span>Avg. Daily Volume</span>
        <span>Previous Price</span>
      </div>
      <div class="table-body">
        <div class="table-row" v-for="etf in etfList" :key="etf.symbol">
          <span>{{ etf.symbol }}</span>
          <span>{{ etf.name }}</span>
          <span>{{ etf.asset }}</span>
          <span>{{ etf.total }}</span>
          <span>{{ etf.ytd }}</span>
          <span>{{ etf.volume }}</span>
          <span>{{ etf.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screener-pc {
  display: flex;
  align-items: flex-start;
  min-height: 100vh;
  padding: 32px;
  background: #f8f9fa;

  .filters {
    width: 320px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    min-width: 260px;
    padding: 0;
    overflow: hidden;

    .filters-header {
      padding: 18px 16px 12px 16px;
      border-bottom: 1px solid #f0f0f0;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-size: 20px;
        margin: 0;
        font-weight: 600;
      }
      .reset-btn {
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
    }
    .child-collapse-item{
      :deep(.van-collapse-item__title) {
        background: none;
      }
    }

    .children-list {
      padding: 8px 16px;
      .child-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        .cont {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          margin-left: 8px;
          &.cont-error {
            background-color: #ee0a24;
            color: #fff;
          }
          &.cont-success {
            background-color: #07c160;
            color: #fff;
          }
        }
      }
    }

    .filter-section {
      background: #fff;
      border-radius: 8px;
      margin-top: 8px;
      .filter-item {
        border-bottom: 1px solid #f0f0f0;
        &:last-child {
          border-bottom: none;
        }
        background: #f5f5f5;
        border-radius: 0;
        padding: 0 16px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: #222;
        cursor: pointer;
        transition: background 0.2s;
        .arrow {
          color: #bbb;
          font-size: 18px;
        }
        &:hover {
          background: #e6e6e6;
        }
      }
    }

    // 让 collapse 整体有圆角和边框
    :deep(.van-collapse) {
      background: #fff;
      border-radius: 8px;
      border: none;
      margin: 0;
    }
    // 让每个 collapse-item 有底部分隔线
    :deep(.van-collapse-item) {
      border-bottom: 1px solid #f0f0f0;
      &:last-child {
        border-bottom: none;
      }
    }
    // 一级标题栏背景色、圆角、分隔线
    :deep(.van-collapse-item__title) {
      background: #f5f5f5;
      border-radius: 0;
      font-weight: 500;
      font-size: 15px;
      color: #222;
      border-bottom: 1px solid #e0e0e0;
      padding: 0 16px;
      min-height: 44px;
      display: flex;
      align-items: center;
    }
    // 内容区背景
    :deep(.van-collapse-item__content) {
      background: #fff;
      padding: 0 0 8px 0;
    }
  }
}
</style>