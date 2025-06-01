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
            <div class="info-label">
              Total Assets<br /><span class="info-unit">($B)</span>
            </div>
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
    </div>
    <div class="proshares-table">
      <h2>ETF 概览</h2>
      <div class="list-box">
        <ScreenerTable
          class="table-area"
          :table-data="etfList"
          :hasTableFilter="true">
          <template #table-pagination>
            <el-pagination
              v-model:current-page="page"
              layout="total, prev, pager, next"
              :pager-count="!isMobile() ? 7 : 3"
              :total="total"
              :page-size="pageSize"
              @current-change="handlePageChange" />
          </template>
        </ScreenerTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ScreenerTable from "@/components/ScreenerTable.vue";
import * as echarts from "echarts";
import { useRoute } from "vue-router";
import { getFilterTableApi } from "@/api/filterTable";
import { useDevice } from "@/utils/device";

const route = useRoute();
const issue = JSON.parse(route.query.issuer as string || '{}');
const { isMobile } = useDevice();

const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const getFilterTableData = async () => {
  const res: any = await getFilterTableApi({
    page: page.value,
    pageSize: pageSize.value,
    fundMgrs: issue.issuer || issue.fundMgrs,
  });
  etfList.value = res.content;
  total.value = res.totalElements;
};

const handlePageChange = (newPage: number) => {
  page.value = newPage;
  getFilterTableData();
};

let myChart: any = null;

onMounted(() => {
  initChart();
  getFilterTableData();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
const etfList = ref<any[]>([]);
function getRecentDates(days: number) {
  const arr = [];
  const today = new Date("2025-05-16");
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

function initChart() {
  const chartDom = document.getElementById("proshares-chart");
  myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: "1 Month Fund Flows",
      left: "center",
      top: "bottom",
      textStyle: {
        fontSize: 14,
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: 40,
      top: 10,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        show: false,
        rotate: 40,
        fontSize: 11,
        color: "#666",
        formatter: function (value: any) {
          return value;
        },
      },
    },
    yAxis: {
      type: "value",
      position: "right",
      min: -1,
      max: 0.5,
      splitLine: { show: true },
      axisLabel: {
        formatter: function (value: any) {
          if (value === 0.5) return "0.5 B";
          if (value === 0) return "0 B";
          if (value === -0.5) return "-0.5 B";
          if (value === -1) return "-1 B";
          return "";
        },
        color: "#222",
        fontWeight: 500,
        fontSize: 13,
      },
    },
    series: [
      {
        type: "bar",
        data: [
          0.3, -0.5, 0.4, -0.7, 0.2, -0.6, -0.4, -0.3, 0.1, -0.2, 0.5, 0.2, 0.1,
          0.05, -0.05,
        ],
        itemStyle: {
          color: function (params: any) {
            return params.value >= 0 ? "#2ca02c" : "#d62728";
          },
        },
        barWidth: 12,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: function (params: any) {
        return params[0].axisValue + ": " + params[0].value + " B";
      },
    },
  };
  myChart.setOption(option);
  window.addEventListener("resize", resizeChart);
}

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
  margin-bottom: 30px;
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

@media (max-width: 768px) {
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
