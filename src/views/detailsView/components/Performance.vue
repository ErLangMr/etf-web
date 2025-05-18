<template>
  <div class="performance">
    <h2 class="h3">IVV Performance</h2>
    <p>This section shows how this ETF has performed relative to its peers. Returns over 1 year are annualized.</p>
    <EtfCompareTable :columns="columns" :data="data" />
  </div>
</template>

<script setup lang="ts">
import EtfCompareTable from "@/components/EtfCompareTable.vue";

const columns = [
  { key: 'name', label: '' },
  { key: 'IVV', label: 'IVV' },
  { key: 'ETF DatabaseCategory Average', label: 'ETF DatabaseCategory Average' },
  { key: 'FactSet Segment Average', label: 'FactSet Segment Average' },
];
const data = [
  { name: '1 Month', IVV: '10%', 'ETF DatabaseCategory Average': '15%', 'FactSet Segment Average': '20%' },
  { name: '3 Month', IVV: '10%', 'ETF DatabaseCategory Average': '15%', 'FactSet Segment Average': '20%' },
  { name: '6 Month', IVV: '10%', 'ETF DatabaseCategory Average': '15%', 'FactSet Segment Average': '20%' },
  { name: '1 Year', IVV: '10%', 'ETF DatabaseCategory Average': '15%', 'FactSet Segment Average': '20%' },
  { name: '3 Year', IVV: '10%', 'ETF DatabaseCategory Average': '15%', 'FactSet Segment Average': '20%' },
  { name: '5 Year', IVV: '10%', 'ETF DatabaseCategory Average': '15%', 'FactSet Segment Average': '20%' },
  { name: '10 Year', IVV: '10%', 'ETF DatabaseCategory Average': '15%', 'FactSet Segment Average': '20%' },
];
</script>

<style scoped lang="scss">
.performance {
  width: 100%;
  height: 100%;
}
</style>
