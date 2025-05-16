<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tableList = [
  {
    title: 'Asset Class',
    data: [
      { theme: 'Equity', rank: 1, flow: '$171,618', issuer: 'Vanguard Group Inc' },
      { theme: 'Bond', rank: 2, flow: '$74,847', issuer: 'BlackRock, Inc.' },
      { theme: 'Commodity', rank: 3, flow: '$16,947', issuer: 'Invesco Fund' },
      { theme: 'Bond', rank: 2, flow: '$74,847', issuer: 'BlackRock, Inc.' },
      { theme: 'Commodity', rank: 3, flow: '$16,947', issuer: 'Invesco Fund' },
    ],
    columns: [
      { prop: 'theme', label: 'ETF THEME', minWidth: '120' },
      { prop: 'rank', label: 'FUND FLOW RANK', minWidth: '120' },
      { prop: 'flow', label: '3-MO. FUND FLOW ($MM)', minWidth: '180' },
      { prop: 'issuer', label: 'TOP ISSUER BY FUND FLOW ($MM)', minWidth: '220', isIssuer: true },
    ],
  },
  {
    title: 'Sector',
    data: [
      { theme: 'Technology', rank: 1, flow: '$3,879', issuer: 'Rafferty Asset Management' },
      { theme: 'Utilities', rank: 2, flow: '$1,183', issuer: 'BlackRock Financial Management' },
      { theme: 'Consumer Discretionary', rank: 3, flow: '$78', issuer: 'Rafferty Asset Management' },
      { theme: 'Utilities', rank: 2, flow: '$1,183', issuer: 'BlackRock Financial Management' },
      { theme: 'Consumer Discretionary', rank: 3, flow: '$78', issuer: 'Rafferty Asset Management' },
    ],
    columns: [
      { prop: 'theme', label: 'ETF THEME', minWidth: '120' },
      { prop: 'rank', label: 'FUND FLOW RANK', minWidth: '120' },
      { prop: 'flow', label: '3-MO. FUND FLOW ($MM)', minWidth: '180' },
      { prop: 'issuer', label: 'TOP ISSUER BY FUND FLOW ($MM)', minWidth: '220', isIssuer: true },
    ],
  },
];

const tabs = [
  { label: 'A to Z', value: 'A to Z' },
  { label: 'Fund Flow', value: 'Fund Flow' },
  { label: 'Return', value: 'Return' },
  { label: 'AUM', value: 'AUM' },
  { label: 'Expense', value: 'Expense' },
  { label: 'Dividend', value: 'Dividend' },
  { label: 'Issuer Revenue', value: 'Issuer Revenue' },
];
const activeTab = ref('Fund Flow');

// 控制每个表格的展开状态，类型安全
const expanded = reactive<Record<number, boolean>>({});
tableList.forEach((_, idx) => expanded[idx] = false);

const columnClick = (row: any, prop: string) => {
  console.log(row, prop);
  router.push({
    name: 'etfs-list',
    query: {
      theme: row[prop],
    },
  });
};
</script>

<template>
  <div class="etf-directory-container">
    <h1 class="etf-title">ETF Directory</h1>
    <p class="etf-desc">
      随着ETF市场的不断扩展，您可以使用下表来缩小不同ETF主题的范围。它们涵盖了各种资产类别、行业、发行人和投资风格。所有基金都属于多个ETF主题。例如，杠杆型美国国债ETF既是"杠杆债券"，也是"政府债券"、"债券"、"美国"以及"北美"区域。
    </p>
    <div class="etf-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="['etf-tab-btn', { active: activeTab === tab.value },
          tabs.indexOf(tab) === 0 ? 'first' : '',
          tabs.indexOf(tab) === tabs.length - 1 ? 'last' : ''
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <section v-for="(table, idx) in tableList" :key="table.title" class="etf-table-section">
      <h2 class="etf-table-title">{{ table.title }}</h2>
      <el-table :data="expanded[idx] || table.data.length <= 3 ? table.data : table.data.slice(0, 3)" class="etf-el-table" :header-cell-style="{ background: '#f5f5fa', color: '#4B2994', fontWeight: 'bold', fontSize: '1rem' }" :cell-style="{ fontSize: '1rem', padding: '0.7rem' }">
        <el-table-column
          v-for="col in table.columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :min-width="col.minWidth"
        >
          <template #default="scope">
            <span class="etf-issuer" @click="columnClick(scope.row, col.prop)">{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div
        v-if="table.data.length > 3"
        class="etf-table-more"
        @click="expanded[idx] = !expanded[idx]"
      >
        <template v-if="!expanded[idx]">
          SHOW {{ table.data.length - 3 }} MORE {{ table.title }} <span class="arrow">▼</span>
        </template>
        <template v-else>
          SHOW LESS <span class="arrow">▲</span>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
$primary: #4B2994;
$gray-bg: #eee;
$gray-text: #222;
$desc-color: #444;

.etf-directory-container {
  width: 100%;
  padding: 20px;
  font-family: 'Segoe UI', Arial, sans-serif;
  box-sizing: border-box;

  .etf-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .etf-desc {
    color: $desc-color;
    font-size: 1.1rem;
    margin-bottom: 2rem;
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
      background: $gray-bg;
      color: $gray-text;
      border: none;
      border-radius: 0;
      transition: background 0.2s, color 0.2s;
      cursor: pointer;
      &.first {
        border-radius: 4px 0 0 4px;
      }
      &.last {
        border-radius: 0 4px 4px 0;
      }
      &.active {
        background: $primary;
        color: #fff;
      }
    }
  }
  .etf-table-section {
    margin-bottom: 2.5rem;
    .etf-table-title {
      color: $primary;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .etf-el-table {
      width: 100%;
      margin-bottom: 0.5rem;
      // 让表格在小屏幕下可横向滚动
      overflow-x: auto;
      ::v-deep .el-table__body-wrapper,
      ::v-deep .el-table__header-wrapper {
        overflow-x: auto !important;
      }
    }
    .etf-issuer {
      color: #46338A;
      font-weight: 500;
      cursor: pointer;
    }
    .etf-table-more {
      color: $primary;
      font-size: 0.95rem;
      cursor: pointer;
      user-select: none;
      text-align: center;
      margin-top: 2px;
      .arrow {
        font-size: 1.1em;
      }
    }
  }

  // 移动端适配
  @media (max-width: 768px) {
    padding: 8px;
    .etf-title {
      font-size: 1.5rem;
      margin-bottom: 0.3rem;
    }
    .etf-desc {
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
    .etf-tabs {
      margin-bottom: 1rem;
      .etf-tab-btn {
        font-size: 0.95rem;
        height: 36px;
        padding: 0.4rem;
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
        ::v-deep .el-table__body-wrapper,
        ::v-deep .el-table__header-wrapper {
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
