<script setup lang="ts">
import { useRouter } from 'vue-router'
import { QuestionFilled } from '@element-plus/icons-vue'
import type { PropType } from 'vue'

defineProps({
  tableColumns: {
    type: Array as PropType<any[]>,
    required: true
  },
  tableData: {
    type: Array as PropType<any[]>,
    required: true
  },
  filterTabs: {
    type: Array as PropType<any[]>,
    required: false
  },
  activeTab: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
})
const router = useRouter()
const emit = defineEmits(['update:activeTab'])

const handleTabClick = (tab: string) => {
  emit('update:activeTab', tab)
}

// 处理跳转
const handleJump = (url: string) => {
  router.push(`${url}`)
}
</script>
<template>
  <div class="screener-table-area">
    <div v-if="filterTabs" class="filter-tabs-wrapper">
      <div class="filter-tabs">
        <div
          v-for="tab in filterTabs"
          :key="tab.value"
          :class="['filter-tab', { active: activeTab === tab.value } ]"
          @click="handleTabClick(tab.value)"
        >
          {{ tab.label }}
          <el-tooltip v-if="tab.icon" content="ESG 说明" placement="top">
            <el-icon style="font-size:14px;margin-left:2px;"><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div v-if="description" class="description">
      {{ description }}
    </div>
    <div class="table-scroll">
      <el-table :data="tableData" border>
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
        >
          <template #default="scope" v-if="column.type === 'link'">
            <span
              class="link-cell"
              @click="handleJump(column.url)"
            >
              {{ scope.row[column.prop] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.screener-table-area {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  border: 1px solid #ebeef5;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 100%;
}
.description {
  font-size: 1.08rem;
  color: #222;
  margin-bottom: 1.1rem;
  line-height: 1.7;
  padding: 0 16px;
}
.filter-tabs-wrapper {
  width: 100%;
  padding: 16px;
}
.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  background: #fafafd;
}
.filter-tab {
  flex: 0 0 calc(100% / 6);
  max-width: calc(100% / 6);
  min-width: 0;
  box-sizing: border-box;
  text-align: center;
  padding: 10px 0;
  font-size: 1rem;
  color: #333;
  background: #fafafd;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  user-select: none;
  white-space: nowrap;
  &:nth-child(6n) {
    border-right: none;
  }
  &:last-child {
    border-right: none;
  }
  &.active {
    background: $theme-purple;
    color: #fff;
    font-weight: 600;
  }
}
@media (max-width: 768px) {
  .filter-tab {
    flex: 0 0 calc(100% / 3);
    max-width: calc(100% / 3);
    padding: 8px 0;
    font-size: 0.95rem;
  }
}
.table-scroll {
  min-width: 0;
  overflow-x: auto;
}
:deep(.el-table) {
  max-width: 100%;
}
.link-cell {
  color: $theme-purple;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
