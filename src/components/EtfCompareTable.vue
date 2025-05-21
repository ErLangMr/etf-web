<!-- 自定义的表格组件 -->
<template>
  <div class="etf-compare-table">
    <div class="section-title" v-if="title">{{ title }}</div>
    <slot></slot>
    <div class="etf-table">
      <div class="table-header" :style="{ gridTemplateColumns: gridTemplateColumns }">
        <div v-for="col in columns" :key="col.key">{{ col.label }}</div>
      </div>
      <div class="table-row" v-for="(row, idx) in data" :key="idx" :style="{ gridTemplateColumns: gridTemplateColumns }">
        <div v-for="col in columns" :key="col.key">
          <span
            v-if="col.isLink"
            class="link"
            @click="col.onClick ? col.onClick(row[col.key], row) : null"
          >{{ row[col.key] }}</span>
          <span v-else>{{ row[col.key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title?: string
  columns: Array<{ key: string, label: string, isLink?: boolean, onClick?: Function }>
  data: Array<Record<string, any>>
}>()
const gridTemplateColumns = computed(() => {
  return `repeat(${props.columns.length}, 1fr)`
})
</script>

<style scoped lang="scss">
.etf-compare-table {
  margin-bottom: 0;
}
.section-title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}
.etf-table {
  width: 100%;
  margin-top: 8px;
  border-collapse: collapse;
  font-size: 14px;
}
.table-header, .table-row {
  display: grid;
  // grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr;
  // grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
}
.table-header {
  font-weight: 600;
  color: #333;
  border-bottom: 1.5px solid #e0e0e0;
  padding: 6px 0;
  background: none;
}
.table-row {
  border-bottom: 1px solid #ececec;
  color: #222;
  padding: 6px 0;
  min-height: 36px;
}
.table-row:last-child {
  border-bottom: none;
}
.table-row .link {
  color: var(--theme-purple);
  cursor: pointer;
  text-decoration: underline;
}
</style>
