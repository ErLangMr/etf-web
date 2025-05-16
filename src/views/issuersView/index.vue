<script setup lang="ts">
import ScreenerTable from '@/components/ScreenerTable.vue';
import { ref } from 'vue';
const description = 'ETF issuers are ranked based on their estimated revenue from their ETF business. Estimated revenue for an ETF issuer is calculated by aggregating the estimated revenue of all the respective issuer ETFs. To get the estimated issuer revenue from a single ETF, the AUM is multiplied by the ETF’s expense ratio. All values are in U.S. dollars.'
const etfList = ref([
  {
    Issuers: 'BlackRock',
    'Revenue Rank': 1,
    '+/-': '+2',
    'Estimated Issuer Revenue ($MM)': '$2,500',
    'of ETFs': 350
  },
  {
    Issuers: 'Vanguard',
    'Revenue Rank': 2,
    '+/-': '+1',
    'Estimated Issuer Revenue ($MM)': '$2,200',
    'of ETFs': 280
  },
  {
    Issuers: 'State Street',
    'Revenue Rank': 3,
    '+/-': '-1',
    'Estimated Issuer Revenue ($MM)': '$1,800',
    'of ETFs': 250
  },
  {
    Issuers: 'Invesco',
    'Revenue Rank': 4,
    '+/-': '+3',
    'Estimated Issuer Revenue ($MM)': '$1,500',
    'of ETFs': 200
  },
  {
    Issuers: 'Charles Schwab',
    'Revenue Rank': 5,
    '+/-': '0',
    'Estimated Issuer Revenue ($MM)': '$1,200',
    'of ETFs': 180
  },
  {
    Issuers: 'ProShares',
    'Revenue Rank': 6,
    '+/-': '+1',
    'Estimated Issuer Revenue ($MM)': '$950',
    'of ETFs': 150
  },
  {
    Issuers: 'First Trust',
    'Revenue Rank': 7,
    '+/-': '-2',
    'Estimated Issuer Revenue ($MM)': '$800',
    'of ETFs': 120
  },
  {
    Issuers: 'WisdomTree',
    'Revenue Rank': 8,
    '+/-': '+2',
    'Estimated Issuer Revenue ($MM)': '$750',
    'of ETFs': 100
  }
])

// 表头配置
const tableColumns = ref([
  { prop: 'Issuers', label: 'Issuers',type:'link',url:'/proshares' },
  { prop: 'Revenue Rank', label: 'Revenue Rank' },
  { prop: '+/-', label: '+/-' },
  { prop: 'Estimated Issuer Revenue ($MM)', label: 'Estimated Issuer Revenue ($MM)' },
  { prop: 'of ETFs', label: 'of ETFs' },
])

const filterTabs = [
  { label: 'Revenue', value: 'Revenue' },
  { label: 'Fund Flows', value: 'Fund Flows' },
  { label: 'Return', value: 'Return' },
  { label: 'AUM', value: 'AUM' },
  { label: 'Expenses', value: 'Expenses' },
  { label: 'Dividends', value: 'Dividends' },
]
const activeTab = ref('Revenue')
</script>

<template>
  <div class="issuers-container">
    <div class="issuers-header">
      <h1 class="issuers-title">Alternatives ETF List</h1>
      <p class="issuers-desc">
        ETFs are issued or launched by ETF issuers. There are a lot of ETF issuers in the market. The full list of issuers is below.
      </p>
    </div>
    <div class="issuers-header">
      <h1 class="issuers-title">ETF Issuer League Tables</h1>
      <p class="issuers-desc">
        Issuer league tables are rankings between ETF issuers on certain investment-related metrics, including estimated revenue, 3-month fund flows, 3-month return, AUM, average ETF expenses and average dividend yields. The metric calculations are based on U.S.-listed ETFs and every ETF has one issuer. If an issuer changes its ETFs, it will also be reflected in the investment metric calculations.
      </p>
    </div>
    <div class="list-container">
      <div class="list-box">
        <ScreenerTable
          class="table-area"
          :table-columns="tableColumns"
          :table-data="etfList"
          :filter-tabs="filterTabs"
          :active-tab="activeTab"
          @update:activeTab="activeTab = $event"
          :description="description"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.issuers-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  .issuers-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.issuers-desc {
  font-size: 1.08rem;
  color: #222;
  margin-bottom: 1.1rem;
  line-height: 1.7;
}

}
</style>