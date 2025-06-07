<script setup lang="ts">
import ScreenerTable from '@/components/ScreenerTable.vue';
import { ref } from 'vue';
import { getIssuerRevenueApi, getIssuerFundFlowApi, getIssuerReturnApi, getIssuerAumApi, getIssuerExpenseApi, getIssuerDividendApi } from '@/api/issuers'
import { useRouter } from 'vue-router'
import { formatValue } from '@/utils/formatValue'
const router = useRouter()
const tableData = ref([])

// 表头配置
const tableColumns = ref<any[]>([])
const description = ref<any>({})

const filterTabs = [
  { label: '发行人收入', value: 'Revenue',
    columns: [
      { prop: 'issuer', label: '发行人',type:'link',url:'/proshares' },
      { prop: 'fundRank', label: '收入排名' },
      { prop: 'dataValue', label: '发行人收入（百万元）', unit: 'million' },
      { prop: 'eftSize', label: 'ETF数量',type:'link',url:'/proshares' },
    ],
    description: {
      title: 'ETF发行人收入排行榜',
      desc: 'ETF发行人的排名基于其ETF业务的预估收入。ETF 发行人的预估收入是通过汇总所有发行人 ETF 的预估收入计算得出的。要计算单个ETF的预估收入，需要将资产管理规模(AUM)乘以该 ETF 的费用率。所有数值均以元为单位。'
    }
   },
  { label: '资金流入', value: 'Fund Flows',
    columns: [
      { prop: 'issuer', label: '发行人',type:'link',url:'/proshares' },
      { prop: 'fundRank', label: '资金净流入排名' },
      { prop: 'dataValue', label: '过去3个月资金净流入（百万元）', unit: 'million' },
      { prop: 'eftSize', label: 'ETF数量',type:'link',url:'/proshares' },
    ],
    description: {
      title: 'ETF发行人资金流向排行榜',
      desc: 'ETF发行人排名基于其 3 个月总资金流。3 个月资金流是一个指标，可用于衡量不同ETF发行人在投资者中的受欢迎程度。所有数值均以元为单位'
    }
   },
  { label: '收益', value: 'Return',
    columns: [
      { prop: 'issuer', label: '发行人',type:'link',url:'/proshares' },
      { prop: 'fundRank', label: '收益排名' },
      { prop: 'dataValue', label: '过去3个月平均收益（%）' },
      { prop: 'eftSize', label: 'ETF数量',type:'link',url:'/proshares' },
    ],
    description: {
      title: 'ETF发行人收益排行榜',
      desc: 'ETF发行人的排名基于其资产管理规模（AUM）加权平均3个月回报率。除价格表现外，3个月回报率还假设过去3个月内所有股息均已进行再投资'
    }
   },
  { label: '管理规模', value: 'AUM',
    columns: [
      { prop: 'issuer', label: '发行人',type:'link',url:'/proshares' },
      { prop: 'fundRank', label: '规模排名' },
      { prop: 'dataValue', label: '资产规模（百万元）', unit: 'million' },
      { prop: 'eftSize', label: 'ETF数量',type:'link',url:'/proshares' },
    ],
    description: {
      title: 'ETF发行人资产管理规模排行榜',
      desc: 'ETF发行人根据其管理资产总额（AUM）进行排名。所有价值均以元计算'
    }
   },
  { label: '费用', value: 'Expenses',
    columns: [
      { prop: 'issuer', label: '发行人',type:'link',url:'/proshares' },
      { prop: 'fundRank', label: '费用排名' },
      { prop: 'dataValue', label: '平均费用率（%）' },
      { prop: 'eftSize', label: 'ETF数量',type:'link',url:'/proshares' },
    ],
    description: {
      title: 'ETF 发行人费用排行榜',
      desc: 'ETF发行人的排名基于其资产管理规模（AUM）加权平均费用率。某一发行人所有上市ETF的平均费用率越低，其排名越高。'
    }
   },
  { label: '分红', value: 'Dividends',
    columns: [
      { prop: 'issuer', label: '发行人',type:'link',url:'/proshares' },
      { prop: 'fundRank', label: '分红率排名' },
      { prop: 'dataValue', label: '平均分红率（%）' },
      { prop: 'eftSize', label: 'ETF数量',type:'link',url:'/proshares' },
    ],
    description: {
      title: 'ETF发行人分红排行榜',
      desc: 'ETF发行人根据其AUM加权平均股息收益率进行排名'
    }
   },
]
const activeTab = ref('Revenue')
const activeTabChange = (value: string) => {
  activeTab.value = value
  updateColumns()
}
updateColumns()
function updateColumns() {
  const selectedTab = filterTabs.find(tab => tab.value === activeTab.value)
  if (selectedTab) {
    tableColumns.value = selectedTab.columns
    description.value = selectedTab.description
    if(activeTab.value === 'Revenue') {
      getIssuerRevenueApi().then((res: any) => {
        tableData.value = res[0].data
      })
    }
    if(activeTab.value === 'Fund Flows') {
      getIssuerFundFlowApi().then((res: any) => {
        tableData.value = res[0].data
      })
    }
    if(activeTab.value === 'Return') {
      getIssuerReturnApi().then((res: any) => {
        tableData.value = res[0].data
      })
    }
    if(activeTab.value === 'AUM') {
      getIssuerAumApi().then((res: any) => {
        tableData.value = res[0].data
      })
    }
    if(activeTab.value === 'Expenses') {
      getIssuerExpenseApi().then((res: any) => {
        tableData.value = res[0].data
      })
    }
    if(activeTab.value === 'Dividends') {
      getIssuerDividendApi().then((res: any) => {
        tableData.value = res[0].data
      })
    }
  }
}
const columnClick = (row: any, prop: string) => {
  console.log(row, prop)
  router.push(
    {
      path: '/proshares',
      query: {
        issuer: JSON.stringify(row),
      }
    }
  )
}
</script>

<template>
  <div class="issuers-container">
    <div class="issuers-header">
      <h1>所有ETF发行人</h1>
      <p class="issuers-desc">
        ETF 由ETF发行人发行或推出。市场上有很多ETF发行人。完整的发行人列表如下。
      </p>
    </div>
    <div class="issuers-header">
      <h1 class="issuers-title" style="margin-top: 3rem;">ETF发行人排行榜</h1>
      <p class="issuers-desc">
        发行人排行榜是根据某些投资相关指标对ETF发行人进行排名，这些指标包括预计收入、3个月资金流量、3个月回报率、资产管理规模 (AUM)、平均ETF费用和平均股息收益率。该指标计算基于上市的ETF，每只ETF都有一个发行人。如果发行人更改其ETF，也会反映在投资指标计算中
      </p>
    </div>
    <div class="list-container">
      <div class="etf-tabs">
        <template v-for="tab in filterTabs" :key="tab.value">
          <button
            @click="activeTabChange(tab.value)"
            :class="[
              'etf-tab-btn',
              { active: activeTab === tab.value },
              filterTabs.indexOf(tab) === 0 ? 'first' : '',
              filterTabs.indexOf(tab) === filterTabs.length - 1 ? 'last' : '',
            ]"
          >
            {{ tab.label }}
          </button>
        </template>
      </div>
      <h2 style="margin: 1rem 0;">{{ description.title }}</h2>
      <p style="margin-bottom: 1rem; font-size: 1rem;">
        {{ description.desc }}
      </p>
      <div class="issuers-table">
        <el-table
          :data="tableData"
          :header-cell-style="{
            background: '#f5f5fa',
            color: '#333',
            fontWeight: 'bold',
            fontSize: '1rem',
          }"
        >
        <el-table-column
          v-for="col in tableColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        >
          <template #default="scope">
            <span
              v-if="col.type !== 'link'"
              >{{ formatValue(scope.row[col.prop], col?.unit) }}</span
            >
            <span
            class="link-cell"
            v-if="col.type === 'link'"
            @click="columnClick(scope.row, col.prop)"
            >{{ formatValue(scope.row[col.prop], col?.unit) }}</span
            >
          </template>
        </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/variables.scss" as *;
$gray-bg: #eee;
$gray-text: #222;
$desc-color: #444;

.issuers-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  .issuers-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.issuers-desc {
  font-size: 1.08rem;
  margin-bottom: 1.1rem;
  line-height: 1.7;
}
.list-container{
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 1rem;
  // background: #fff;
  // box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  .table-area{}
}
.etf-tabs {
  display: flex;
  margin-bottom: 2rem;
  .etf-tab-btn {
    flex: 1;
    padding: 0.7rem;
    font-weight: 500;
    font-size: 1rem;
    height: 44px;
    // background: $gray-bg;
    color: $gray-text;
    border: 1px solid #e5e5e5;
    border-right: none;
    border-bottom: none;
    border-radius: 0;
    // transition: background 0.2s, color 0.2s;
    cursor: pointer;
    &.first {
      border-radius: 4px 0 0 4px;
    }
    &.last {
      border-radius: 0 4px 4px 0;
    }
    &.active {
      background: $theme-purple;
      color: #fff;
    }
  }
}
.link-cell {
  color: $theme-purple;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
// 移动端适配
@media (max-width: 768px) {
    padding: 8px;
    .etf-tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      margin-bottom: 1rem;
      .etf-tab-btn {
        font-size: 0.95rem;
        height: 36px;
        padding: 0.4rem 0;
        border-radius: 0;
      }
    }
    .etf-table-section {
      margin-bottom: 1.2rem;
      .etf-table-title {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }
      .etf-el-table {
        font-size: 0.95rem;
        :deep(.el-table__body-wrapper),
        :deep(.el-table__header-wrapper) {
          overflow-x: auto !important;
        }
      }
      .etf-table-more {
        font-size: 0.85rem;
        margin-top: 0;
      }
    }
  }
}
</style>
