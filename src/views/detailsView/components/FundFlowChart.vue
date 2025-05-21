<template>
  <div class="fund-flow-chart">
    <h2 class="h3">IVV Fund Flows Charts</h2>
    <p>View charts featuring ETF fund flow data.</p>
    <div id="fund-flow-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUnmounted, watch, nextTick } from "vue";
import * as echarts from "echarts";
let myChart: echarts.ECharts | null = null;
const props = defineProps<{
  tabActiveName: string;
}>();

watch(() => props.tabActiveName, (newVal) => {
  if (newVal === '基金流动图表') {
    nextTick(() => {
      initChart()
    })
  }
}, { immediate: true });
function getRecentDates(days: number) {
  const arr: string[] = [];
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

const initChart = async () => {
  await nextTick()
  const chartDom = document.getElementById("fund-flow-chart");
  myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: "1 Month Fund Flows",
      left: "left",
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
      },
    },
    yAxis: {
      type: "value",
      position: "right",
      min: -1,
      max: 0.5,
      splitLine: { show: true },
      axisLabel: {
        // formatter: function (value) {
        //   if (value === 0.5) return "0.5 B";
        //   if (value === 0) return "0 B";
        //   if (value === -0.5) return "-0.5 B";
        //   if (value === -1) return "-1 B";
        //   return "";
        // },
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
          color: function (params: { value: number }) {
            return params.value >= 0 ? "#2ca02c" : "#d62728";
          },
        },
        barWidth: 12,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: function (
        params: {
          axisValue: string;
          value: string;
        }[]
      ) {
        return params[0].axisValue + ": " + params[0].value + " B";
      },
    },
  };
  myChart.setOption(option);
  window.addEventListener("resize", resizeChart);
};

onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }
});
</script>

<style scoped lang="scss">
.fund-flow-chart {
  width: 100%;
  height: 100%;
  #fund-flow-chart {
    width: 100%;
    height: 320px;
  }
}
@media (max-width: 768px) {
  #fund-flow-chart {
    height: 220px;
  }
}
</style>
