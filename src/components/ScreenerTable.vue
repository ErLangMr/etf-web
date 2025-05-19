<script setup lang="ts">
import { useRouter } from 'vue-router'
import { QuestionFilled } from '@element-plus/icons-vue'
import { ref, type PropType } from 'vue'
import { useDevice } from '@/utils/device'

const { isMobile } = useDevice()

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
const expanded = ref<string | null>(null);
const toggleExpand = (symbol: string) => {
  expanded.value = expanded.value === symbol ? null : symbol;
};
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
    <div class="table-scroll" v-if="!isMobile()">
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
    <div class="mobile-etf-list" v-if="isMobile()"">
      <div v-for="etf in tableData" :key="etf.symbol" class="etf-row-card">
        <div class="etf-row-summary" @click="toggleExpand(etf.symbol)">
          <span class="symbol">{{ etf.symbol }}</span>
          <span class="symbol-divider">-</span>
          <span class="name">{{ etf.name }}</span>
          <span class="arrow" :class="{ expanded: expanded === etf.symbol }">
            <van-icon name="arrow" />
          </span>
        </div>
        <transition name="fade">
          <div v-if="expanded === etf.symbol" class="etf-row-detail">
            <div
              v-for="header in tableColumns"
              :key="header.prop"
              class="etf-detail-item"
            >
              <span class="label">{{ header.label }}：</span>
              <span
                class="value linkStyle"
                v-if="header.type === 'link'"
                @click="router.push(header.url)"
                >{{ etf[header.prop as keyof typeof etf] }}</span
              >
              <span class="value" v-else>{{
                etf[header.prop as keyof typeof etf]
              }}</span>
            </div>
          </div>
        </transition>
      </div>
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
@media (max-width: 768px) {
  .mobile-etf-list {
  padding: 8px;
  .etf-row-card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-left: 4px solid #e8e8f5;
    border-right: 4px solid #e8e8f5;
    border-top: 4px solid #e8e8f5;
    border-bottom: 2px solid #e8e8f5;
    box-sizing: border-box;
    // margin-bottom: 12px;
    overflow: hidden;
    transition: box-shadow 0.2s;
    &:active,
    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }
    .etf-row-summary {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
      .symbol-divider {
        margin: 0 3px;
      }
      .name {
        flex: 1;
        margin-right: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .arrow {
        font-size: 16px;
        font-weight: 600;
        transition: transform 0.2s;
        color: var(--theme-purple);
        &.expanded {
          transform: rotate(90deg);
        }
      }
    }
    .etf-row-detail {
      padding: 10px 14px 14px 14px;
      background: #f9f9fb;
      .etf-detail-item {
        display: flex;
        font-size: 14px;
        padding: 6px 0;
        justify-content: space-between;
        border-bottom: 1px solid #f0f0f0;
        &:last-child {
          border-bottom: none;
        }
        .label {
          color: #888;
          min-width: 140px;
          flex-shrink: 0;
        }
        .value {
          color: #222;
          font-weight: 500;
          word-break: break-all;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
}
@media (max-width: 768px) {
  .mobile-etf-list {
    padding: 0;
    .etf-row-card {
      border-radius: 0;
      // margin-bottom: 8px;
    }
  }
}
</style>
