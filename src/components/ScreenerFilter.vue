// 筛选器组件 - 用于ETF筛选的过滤器组件
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTypeByCategoryApi } from "@/api/filterTable";

// 范围类型子项接口
interface RangeItem {
  start: number;
  end: number;
}

// 基础筛选项接口
interface BaseFilterItem {
  label: string;
  value: string;
  type?: string;
}

// 叶子节点接口
interface LeafFilterItem extends BaseFilterItem {
  cont?: number;
  fundType?: string;
  id?: string;
  count?: number;
}

// 普通筛选项接口
interface NormalFilterItem extends BaseFilterItem {
  children?: (NormalFilterItem | LeafFilterItem)[];
  classification?: {
    label: string;
    value: string;
    children: LeafFilterItem[];
  }[];
}

// 范围项接口
interface RangeChildItem {
  label: string;
  value: string;
  type: "slider" | "date";
  paramKeys: string[];
  range?: [number, number];
  date?: [string, string];
}

// 范围筛选项接口
interface RangeFilterItem extends BaseFilterItem {
  type: "slider" | "checkIssuer";
  children: RangeChildItem[];
}

// 筛选项联合类型
export type FilterItem = NormalFilterItem | RangeFilterItem;

// 类型守卫函数
function isRangeFilterItem(item: FilterItem): item is RangeFilterItem {
  return item.type === "slider" || item.type === "checkIssuer";
}

// 组件属性接口定义
// const props = defineProps<{ filterData: FilterItem[] }>()
// 定义组件事件
const emit = defineEmits([
  "update:selectedItems",
  "update:selectedChild",
  "update:sliderItems",
]);

// 当前激活的折叠面板
const activeNames = ref("assetClass");
// 子折叠面板激活项
const chidActiveName = ref("");
// 选中的子项
const selectedChild = ref("");
// 选中的项目列表
const selectedItems = ref<string[]>([]);
const sliderValues = ref<Record<string, [number, number]>>({});
const dateValues = ref<Record<string, [string, string]>>({});

// 初始化滑块值
function initSliderValues() {
  filterData.forEach((item) => {
    if (item.type === "slider" && item.children) {
      item.children.forEach((child) => {
        // 使用面板value和子项索引组合作为key
        const key = `${item.value}_${child.paramKeys[0]}`;
        if (child.type === "slider" && child.range) {
          sliderValues.value[key] = [...child.range] as [number, number];
        }
        if (child.type === "date" && child.date) {
          dateValues.value[key] = [child.date[0], child.date[1]];
        }
      });
    }
  });
}

// 修改接口定义
interface ApiResponseItem {
  id: string;
  fundType: string;
  count?: number;
  label?: string;
  value?: string;
  type?: string;
  paramKeys?: string[];
  range?: [number, number];
  date?: [string, string];
  codes?: string[];
}

// 一级资产类型
const filterData = [
  {
    label: "资产类别",
    value: "assetClass",
    children: [
      {
        label: "债券",
        value: "BOND",
        classification: [
          {
            label: "债券类型",
            value: "bondType",
            children: [],
          },
          {
            label: "债券久期",
            value: "bondDuration",
            children: [],
          },
        ],
      },
      {
        label: "商品",
        value: "GOODS",
        classification: [
          {
            label: "商品类型",
            value: "commodityType",
            children: [],
          },
          {
            label: "商品风险暴露",
            value: "commodityExposure",
            children: [],
          },
        ],
      },
      {
        label: "股票",
        value: "EQUITY",
        classification: [
          {
            label: "投资范围",
            value: "investScope",
            children: [],
          },
          {
            label: "成分股市值",
            value: "compMarketCap",
            children: [],
          },
          {
            label: "投资策略",
            value: "investStrategy",
            children: [],
          },
          {
            label: "部门",
            value: "sector",
            children: [],
          },
          {
            label: "投资风格",
            value: "styleAttribute",
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: "属性",
    value: "attributes",
    type: "checkIssuer",
    children: [],
  },
  {
    label: "发行人",
    value: "issuer",
    type: "checkIssuer",
    children: [],
  },
  {
    label: "费率和分红",
    value: "expenses",
    type: "slider",
    children: [
      {
        label: "托管费率(%)",
        type: "slider",
        paramKeys: ["custodyFeeStart", "custodyFeeEnd"],
        range: [0, 100],
      },
      {
        label: "单位分红率(%)",
        type: "slider",
        paramKeys: ["divYieldStart", "divYieldEnd"],
        range: [0, 100],
      },
      {
        label: "管理费率(%)",
        type: "slider",
        paramKeys: ["managementFeeStart", "managementFeeEnd"],
        range: [0, 100],
      },
      {
        label: "销售服务费率(%)",
        type: "slider",
        paramKeys: ["serviceFeeStart", "serviceFeeEnd"],
        range: [0, 100],
      },
    ],
  },
  {
    label: "流动性和成立日",
    value: "liquidityAndEstablishmentDate",
    type: "slider",
    children: [
      {
        label: "日均成交量(元)",
        type: "slider",
        paramKeys: ["avgDailyVolumeStart", "avgDailyVolumeEnd"],
        range: [0, 99999999],
      },
      {
        label: "交易价格(元)",
        type: "slider",
        paramKeys: ["currentCloseStart", "currentCloseEnd"],
        range: [0, 99999999],
      },
      {
        label: "资产规模(元)",
        type: "slider",
        paramKeys: ["totalMarketValueStart", "totalMarketValueEnd"],
        range: [0, 99999999],
      },
      {
        label: "成立日期",
        type: "date",
        paramKeys: ["setupDateStart", "setupDateEnd"],
        date: ["", ""],
      },
    ],
  },
  {
    label: "收益",
    value: "return",
    type: "slider",
    children: [
      {
        label: "近一周收益(%)",
        type: "slider",
        paramKeys: ["weeklyReturnsStart", "weeklyReturnsEnd"],
        range: [0, 100],
      },
      {
        label: "近一月收益(%)",
        type: "slider",
        paramKeys: ["monthlyReturnsStart", "monthlyReturnsEnd"],
        range: [0, 100],
      },
      {
        label: "今年以来收益(%)",
        type: "slider",
        paramKeys: ["ytdReturnsStart", "ytdReturnsEnd"],
        range: [0, 100],
      },
      {
        label: "近一年收益(%)",
        type: "slider",
        paramKeys: ["yearlyReturnsStart", "yearlyReturnsEnd"],
        range: [0, 100],
      },
      {
        label: "近三年收益(%)",
        type: "slider",
        paramKeys: ["threeYearReturnsStart", "threeYearReturnsEnd"],
        range: [0, 100],
      },
      {
        label: "近五年收益(%)",
        type: "slider",
        paramKeys: ["fiveYearReturnsStart", "fiveYearReturnsEnd"],
        range: [0, 100],
      },
    ],
  },
  {
    label: "ESG",
    value: "esg",
    type: "slider",
    children: [
      {
        label: "ESG评分",
        type: "slider",
        paramKeys: ["esgScoreStart", "esgScoreEnd"],
        range: [0, 100],
      },
    ],
  },
  {
    label: "资金流",
    value: "FundFlows",
    type: "slider",
    children: [
      {
        label: "近 1 周净流入额(元)",
        type: "slider",
        paramKeys: ["weeklyNetInflowsStart", "weeklyNetInflowsEnd"],
        range: [-100000, 999999999],
      },
      {
        label: "近 1 月净流入额(元)",
        type: "slider",
        paramKeys: ["monthlyNetInflowsStart", "monthlyNetInflowsEnd"],
        range: [-1000000, 999999999],
      },
      {
        label: "今年以来净流入额(元)",
        type: "slider",
        paramKeys: ["ytdNetInflowsStart", "ytdNetInflowsEnd"],
        range: [-1000000, 999999999],
      },
      {
        label: "近 1 年净流入额(元)",
        type: "slider",
        paramKeys: ["yearlyNetInflowsStart", "yearlyNetInflowsEnd"],
        range: [-10000000, 999999999],
      },
      {
        label: "近 3 年净流入额(元)",
        type: "slider",
        paramKeys: ["threeYearNetInflowsStart", "threeYearNetInflowsEnd"],
        range: [-100000000, 999999999],
      },
      {
        label: "近 5 年净流入额(元)",
        type: "slider",
        paramKeys: ["fiveYearNetInflowsStart", "fiveYearNetInflowsEnd"],
        range: [-1000000000, 999999999999],
      },
    ],
  },
  {
    label: "风险度量",
    value: "RiskMetrics",
    type: "slider",
    children: [
      {
        label: "收益标准差(%)",
        type: "slider",
        paramKeys: ["std52WeekStart", "std52WeekEnd"],
        range: [0, 100],
      },
      {
        label: "Beta值",
        type: "slider",
        paramKeys: ["beta52WeekStart", "beta52WeekEnd"],
        range: [0, 10],
      },
      {
        label: "5日波动率(%)",
        type: "slider",
        paramKeys: ["volatility5DayStart", "volatility5DayEnd"],
        range: [0, 100],
      },
      {
        label: "20日波动率(%)",
        type: "slider",
        paramKeys: ["volatility20DayStart", "volatility20DayEnd"],
        range: [0, 100],
      },
      {
        label: "50日波动率(%)",
        type: "slider",
        paramKeys: ["volatility50DayStart", "volatility50DayEnd"],
        range: [0, 100],
      },
      {
        label: "200日波动率(%)",
        type: "slider",
        paramKeys: ["volatility200DayStart", "volatility200DayEnd"],
        range: [0, 100],
      },
    ],
  },
  {
    label: "持仓",
    value: "Holdings",
    type: "slider",
    children: [
      {
        label: "持股数量(只)",
        type: "slider",
        paramKeys: ["stockHoldingsStart", "stockHoldingsEnd"],
        range: [0, 1000000],
      },
      {
        label: "前十大持仓占比(%)",
        type: "slider",
        paramKeys: ["top10ConcentrationStart", "top10ConcentrationEnd"],
        range: [0, 100],
      },
      {
        label: "前十五大持仓占比(%)",
        type: "slider",
        paramKeys: ["top15ConcentrationStart", "top15ConcentrationEnd"],
        range: [0, 100],
      },
      {
        label: "前五十大持仓占比(%)",
        type: "slider",
        paramKeys: ["top50ConcentrationStart", "top50ConcentrationEnd"],
        range: [0, 100],
      },
    ],
  },
];

// 修改接口定义
interface ClassificationItem {
  label: string;
  value: string;
  children: LeafFilterItem[];
}

interface NormalFilterItem extends BaseFilterItem {
  children?: (NormalFilterItem | LeafFilterItem)[];
  classification?: ClassificationItem[];
}

// 修改 getFilterTable 函数中的类型处理
function getFilterTable() {
  filterData.forEach((item) => {
    if (item.value === "assetClass") {
      item.children?.forEach((child) => {
        if ("classification" in child) {
          child.classification?.forEach((classification) => {
            getTypeByCategoryApi(classification.value, child.value).then(
              (res: unknown) => {
                if (Array.isArray(res)) {
                  const items = res.map((item: ApiResponseItem) => ({
                    fundType: item.fundType,
                    id: item.id,
                    count: item.count,
                    label: item.label || item.fundType,
                    value: item.value || item.id,
                    codes: item.codes || [],
                  }));
                  (classification as ClassificationItem).children =
                    items as LeafFilterItem[];
                }
              }
            );
          });
        }
      });
    } else if (item.type === "checkIssuer") {
      const params = item.value === "issuer" ? "fundMgrs" : "investType";
      getTypeByCategoryApi(params).then((res: unknown) => {
        if (Array.isArray(res)) {
          const items = res.map((item: ApiResponseItem) => ({
            fundType: item.fundType,
            id: item.id,
            count: item.count,
            label: item.label || item.fundType,
            value: item.value || item.id,
            type: item.type || "checkIssuer",
            paramKeys: item.paramKeys || [],
            range: item.range,
            date: item.date,
            codes: item.codes || [],
          }));
          (item as RangeFilterItem).children = items as RangeChildItem[];
        }
      });
    }
  });
}

// 组件挂载时初始化
onMounted(() => {
  initSliderValues();
  getFilterTable();
});

// 重置所有筛选条件
function resetFilters() {
  activeNames.value = "";
  chidActiveName.value = "";
  selectedChild.value = "";
  selectedItems.value = [];
  sliderValues.value = {};
  dateValues.value = {};
  checkedArr.value = [];
  emit("update:selectedItems", []);
  emit("update:selectedChild", "");
  emit("update:sliderItems", {});
  // 重新初始化滑块值
  initSliderValues();
}

const checkedArr = ref<string[][]>([]);

defineExpose({ resetFilters });

// 处理复选框变化事件
function handleCheckboxChange(value: string, checked: boolean) {
  // 查找对应的选项数据
  const findItem = (items: any[]): any => {
    for (const item of items) {
      if (item.id === value) {
        return item;
      }
      if (item.children) {
        const found = findItem(item.children);
        if (found) return found;
      }
      if (item.classification) {
        for (const classification of item.classification) {
          const found = findItem(classification.children);
          if (found) return found;
        }
      }
    }
    return null;
  };

  const item = findItem(filterData);
  if (checked) {
    // 使用 id 作为选中状态的标识
    selectedItems.value.push(value);
    // 如果有 codes 数组，则传递 codes 到父组件
    if (item?.codes && item.codes.length > 0) {
      checkedArr.value.push(item.codes);
    }
  } else {
    if (item?.codes && item.codes.length > 0) {
      const index = checkedArr.value.findIndex(
        (selectedItem) => selectedItem.toString() === item.codes.toString()
      );
      if (index > -1) {
        checkedArr.value.splice(index, 1);
      }
    }
    const index = selectedItems.value.indexOf(value);
    if (index > -1) {
      selectedItems.value.splice(index, 1);
    }
  }
  emit("update:selectedItems", checkedArr.value.flat());
}

// 处理单选框变化事件
function handleRadioChange(value: string) {
  selectedChild.value = value;
  selectedItems.value = [];
  checkedArr.value = [];
  emit("update:selectedChild", value);
  emit("update:selectedItems", []);
}

// 修改滑块值处理函数
function handleRangeChange(
  value: number[],
  filterValue: string,
  paramKeys: string[]
) {
  const key = `${filterValue}_${paramKeys[0]}`;
  if (!sliderValues.value[key]) {
    sliderValues.value[key] = [0, 0];
  }
  sliderValues.value[key] = [value[0], value[1]] as [number, number];
  emit("update:sliderItems", {
    [paramKeys[0]]: value[0],
    [paramKeys[1]]: value[1],
  });
}

// 修改日期处理函数
function handleSingleDateChange(
  val: string,
  filterValue: string,
  paramKeys: string[],
  pos: 0 | 1
) {
  const key = `${filterValue}_${paramKeys[0]}`;
  if (!dateValues.value[key]) {
    dateValues.value[key] = ["", ""];
  }
  dateValues.value[key][pos] = val;
  emit("update:sliderItems", {
    [paramKeys[0]]: dateValues.value[key][0] || "",
    [paramKeys[1]]: dateValues.value[key][1] || "",
  });
}

// 修改范围输入处理函数
function handleRangeInputChange(
  value: string,
  filterValue: string,
  paramKeys: string[],
  position: 0 | 1
) {
  const key = `${filterValue}_${paramKeys[0]}`;
  if (!sliderValues.value[key]) {
    sliderValues.value[key] = [0, 0];
  }
  const numValue = Number(value);
  if (!isNaN(numValue)) {
    sliderValues.value[key][position] = numValue;
    emit("update:sliderItems", {
      [paramKeys[position]]: numValue,
    });
  }
}
</script>

<template>
  <div class="filters">
    <!-- 筛选器头部 -->
    <div class="filters-header">
      <h2>过滤器</h2>
      <button class="reset-btn" @click="resetFilters">重置</button>
    </div>
    <!-- 主折叠面板 -->
    <van-collapse v-model="activeNames" accordion class="main-collapse">
      <!-- 资产类别 -->
      <van-collapse-item
        v-for="filter in filterData"
        :key="filter.value"
        :name="filter.value"
        :title="filter.label"
      >
        <template v-if="!filter.type">
          <van-collapse v-model="chidActiveName" accordion>
            <van-collapse-item
              v-for="child in filter.children"
              :key="(child as NormalFilterItem).value"
              :name="(child as NormalFilterItem).value"
              :title="child.label"
              :is-link="false"
              class="child-collapse-item"
            >
              <template #title>
                <van-radio-group
                  v-model="selectedChild"
                  @change="handleRadioChange"
                >
                  <van-radio :name="(child as NormalFilterItem).value">{{
                    child.label
                  }}</van-radio>
                </van-radio-group>
              </template>
              <div class="children-list alt-list">
                <div
                  v-for="classification in (child as NormalFilterItem ).classification"
                  :key="classification.value"
                  class="alt-classification"
                >
                  <p class="alt-title">{{ classification.label }}</p>
                  <div
                    v-for="subChild in classification.children"
                    :key="subChild.value"
                    class="alt-item"
                  >
                    <van-checkbox
                      :model-value="selectedItems.includes(subChild.id || '')"
                      @update:model-value="
                        (checked) =>
                          handleCheckboxChange(subChild.id || '', checked)
                      "
                      shape="square"
                      icon-size="14px"
                    >
                      {{ subChild.fundType }}
                    </van-checkbox>
                    <span
                      class="alt-count"
                      :class="{
                        'alt-count-zero': subChild.count === 0,
                      }"
                    >
                      {{ subChild.count }}
                    </span>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </template>
        <template v-if="filter.type === 'checkIssuer'">
          <div class="range-list">
            <div
              v-for="item in (filter.children as unknown as ApiResponseItem[])"
              :key="item.id"
              class="range-item"
              style="display: flex; justify-content: space-between"
            >
              <van-checkbox
                :model-value="selectedItems.includes(item.id)"
                @update:model-value="
                  (checked) => handleCheckboxChange(item.id, checked)
                "
                shape="square"
                icon-size="14px"
              >
                {{ item.fundType }}
              </van-checkbox>
              <span
                class="alt-count"
                :class="{
                  'alt-count-zero': item.count === 0,
                }"
              >
                {{ item.count }}
              </span>
            </div>
          </div>
        </template>

        <template v-if="filter.type === 'slider'">
          <div class="range-list">
            <div
              v-for="(item, index) in filter.children"
              :key="index"
              class="range-item"
            >
              <!-- 数字范围滑块 -->
              <template v-if="item.type === 'slider'">
                <div class="range-label">{{ item.label }}</div>
                <el-slider
                  v-model="sliderValues[`${filter.value}_${item.paramKeys[0]}`]"
                  :min="item.range?.[0] || 0"
                  :max="item.range?.[1] || 100"
                  range
                  @change="(val: number[] | number) => handleRangeChange(Array.isArray(val) ? val : [val, val], filter.value, item.paramKeys)"
                />
                <div class="range-inputs">
                  <el-input
                    v-model="
                      sliderValues[`${filter.value}_${item.paramKeys[0]}`][0]
                    "
                    size="small"
                    @change="
                      (val) =>
                        handleRangeInputChange(
                          val,
                          filter.value,
                          item.paramKeys,
                          0
                        )
                    "
                  />
                  <span class="range-separator">-</span>
                  <el-input
                    v-model="
                      sliderValues[`${filter.value}_${item.paramKeys[0]}`][1]
                    "
                    size="small"
                    @change="
                      (val) =>
                        handleRangeInputChange(
                          val,
                          filter.value,
                          item.paramKeys,
                          1
                        )
                    "
                  />
                </div>
              </template>

              <!-- 日期范围选择器（移动端友好版） -->
              <template v-if="item.type === 'date'">
                <div class="range-label">{{ item.label }}</div>
                <div class="date-range-inputs">
                  <el-date-picker
                    v-model="
                      dateValues[`${filter.value}_${item.paramKeys[0]}`][0]
                    "
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="开始日期"
                    style="width: 43%; margin-right: 10px"
                    @change="(val: string) => handleSingleDateChange(val, filter.value, item.paramKeys, 0)"
                  />
                  <span class="range-separator">至</span>
                  <el-date-picker
                    v-model="
                      dateValues[`${filter.value}_${item.paramKeys[0]}`][1]
                    "
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder="结束日期"
                    style="width: 43%; margin-left: 10px"
                    @change="(val: string) => handleSingleDateChange(val, filter.value, item.paramKeys, 1)"
                  />
                </div>
              </template>
            </div>
          </div>
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<style scoped lang="scss">
// 筛选器容器样式
.filters {
  width: 320px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  min-width: 260px;
  padding: 0;
  overflow: hidden;

  // 头部样式
  .filters-header {
    padding: 18px 16px 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      font-size: 20px;
      margin: 0;
      font-weight: 600;
    }
    // 重置按钮样式
    .reset-btn {
      background: #f5f5f5;
      border: 1px solid #ddd;
      color: #888;
      cursor: pointer;
      font-size: 14px;
      padding: 4px 12px;
      border-radius: 5px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 4px;
      &:hover {
        background: #e6e6e6;
        color: #409eff;
        border-color: #409eff;
      }
    }
  }

  // 子折叠面板样式
  .child-collapse-item {
    :deep(.van-collapse-item__title) {
      background: none;
    }
  }

  // 子项列表样式
  .children-list {
    padding: 8px 16px;
  }
  .alt-list {
    padding: 8px 16px;
    .alt-classification {
      margin-bottom: 8px;
      .alt-title {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 4px;
        color: #333;
      }
      .alt-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 0;
        .van-checkbox {
          flex: 1;
          font-size: 14px;
          color: #222;
        }
      }
    }
  }
  .alt-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 18px;
    padding: 0 6px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    background-color: #80b600;
    color: #fff;
    margin-left: 8px;
    transition: background 0.2s;
  }
  .alt-count-zero {
    background-color: #d9534f;
    color: #fff;
  }
  // 折叠面板样式
  :deep(.van-collapse) {
    background: #fff;
    border-radius: 8px;
    border: none;
    margin: 0;
  }

  // 折叠面板项样式
  :deep(.van-collapse-item) {
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
      border-bottom: none;
    }
  }

  // 折叠面板标题样式
  :deep(.van-collapse-item__title) {
    background: #f5f5f5;
    border-radius: 0;
    font-weight: 500;
    font-size: 15px;
    color: #222;
    border-bottom: 1px solid #e0e0e0;
    padding: 0 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  // 折叠面板内容样式
  :deep(.van-collapse-item__content) {
    background: #fff;
    padding: 0 0 8px 0;
  }

  .range-list {
    padding: 16px;

    .range-item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .range-label {
      margin-bottom: 8px;
      color: #333;
      font-size: 14px;
    }

    .range-inputs {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;

      .el-input {
        width: 100px;
      }

      .range-separator {
        color: #999;
      }
    }
  }
  :deep(.el-slider__bar) {
    background-color: var(--theme-purple);
  }
  :deep(.el-slider__button) {
    border-color: var(--theme-purple);
  }
}

@media (max-width: 768px) {
  .filters {
    width: 100vw !important;
    min-width: 0 !important;
    border-radius: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }
}
</style>
