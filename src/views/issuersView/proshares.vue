<template>
  <div class="proshares-container">
    <div class="proshares-header">
      <h1 class="proshares-title">ProShares ETF List</h1>
    </div>
    <div class="proshares-main-box">
      <div class="proshares-content">
        <div class="proshares-chart">
          <div id="proshares-chart"></div>
        </div>
        <div class="proshares-info-img">
          <div class="info-row">
            <div class="info-value">$79.01</div>
            <div class="info-label">Total Assets<br><span class="info-unit">($B)</span></div>
          </div>
          <div class="info-row">
            <div class="info-value">146</div>
            <div class="info-label">U.S. Listed ETFs</div>
          </div>
          <div class="info-row">
            <div class="info-value">0.09% - 2.99%</div>
            <div class="info-label">Expense Ratio Range</div>
          </div>
        </div>
      </div>
      <div class="proshares-table">
        <h2>ETF Overview</h2>
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
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import ScreenerTable from '@/components/ScreenerTable.vue';
import * as echarts from 'echarts';

let myChart = null;

function getRecentDates(days) {
  const arr = [];
  const today = new Date('2025-05-16');
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
}
const xAxisData = getRecentDates(15);

function resizeChart() {
  if (myChart) {
    myChart.resize();
  }
}

onMounted(() => {
  const chartDom = document.getElementById('proshares-chart');
  myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '1 Month Fund Flows',
      left: 'center',
      top: 'bottom',
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: 40,
      top: 10,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        show: false,
        rotate: 40,
        fontSize: 11,
        color: '#666',
        formatter: function(value) {
          return value;
        }
      }
    },
    yAxis: {
      type: 'value',
      position: 'right',
      min: -1,
      max: 0.5,
      splitLine: { show: true },
      axisLabel: {
        formatter: function (value) {
          if (value === 0.5) return '0.5 B';
          if (value === 0) return '0 B';
          if (value === -0.5) return '-0.5 B';
          if (value === -1) return '-1 B';
          return '';
        },
        color: '#222',
        fontWeight: 500,
        fontSize: 13
      }
    },
    series: [
      {
        type: 'bar',
        data: [0.3, -0.5, 0.4, -0.7, 0.2, -0.6, -0.4, -0.3, 0.1, -0.2, 0.5, 0.2, 0.1, 0.05, -0.05],
        itemStyle: {
          color: function(params) {
            return params.value >= 0 ? '#2ca02c' : '#d62728';
          }
        },
        barWidth: 12
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        return params[0].axisValue + ': ' + params[0].value + ' B';
      }
    }
  };
  myChart.setOption(option);
  window.addEventListener('resize', resizeChart);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
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
  { prop: 'symbol', label: 'Symbol',type:'link',url:'/etf-detail' },
  { prop: 'name', label: 'ETF Name',type:'link',url:'/etf-detail' },
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
</script>

<style lang="scss" scoped>
.proshares-container {
  width: 100%;
  padding: 20px;
  .proshares-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.2rem;
  }
}
.proshares-main-box {
  background: #fff;
  border: 1px solid #d3d6db;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}
.proshares-content {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  min-height: 320px;
}
.proshares-chart {
  flex: 2;
  min-width: 370px;
  height: 320px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
#proshares-chart {
  width: 100%;
  height: 320px;
}
.proshares-info-img {
  flex: 1;
  min-width: 210px;
  background: #fff;
  border-left: 1px solid #d3d6db;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 320px;
  box-sizing: border-box;
  .info-row {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d3d6db;
    padding: 0;
    &:last-child {
      border-bottom: none;
    }
    .info-value {
      font-size: 2rem;
      font-weight: 400;
      color: #222;
      margin-bottom: 12px;
    }
    .info-label {
      color: #888;
      font-size: 1.08rem;
      text-align: center;
      line-height: 1.3;
      .info-unit {
        font-size: 0.95rem;
        color: #bbb;
        font-weight: normal;
      }
    }
  }
}

@media (max-width: 600px) {
  .proshares-main-box {
    border-radius: 0;
    padding: 0;
  }
  .proshares-content {
    flex-direction: column;
    min-height: unset;
  }
  .proshares-chart {
    min-width: 0;
    width: 100%;
    height: 220px;
  }
  #proshares-chart {
    height: 220px;
  }
  .proshares-info-img {
    min-width: 0;
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid #d3d6db;
    .info-row {
      border-bottom: 1px solid #d3d6db;
      padding: 12px 0 8px 0;
      .info-value {
        font-size: 1.3rem;
        margin-bottom: 6px;
      }
      .info-label {
        font-size: 0.95rem;
      }
      .info-unit {
        font-size: 0.85rem;
      }
    }
    .info-row:last-child {
      border-bottom: none;
    }
  }
  .proshares-title {
    font-size: 1.5rem;
    margin-bottom: 0.7rem;
  }
  .proshares-container {
    padding: 8px;
  }
}
</style>
