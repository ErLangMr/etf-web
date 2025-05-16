// 筛选器组件 - 用于ETF筛选的过滤器组件
<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 范围类型子项接口
interface RangeItem {
  start: number
  end: number
}

// 基础筛选项接口
interface BaseFilterItem {
  label: string
  value: string
  type?: string
}

// 叶子节点接口
interface LeafFilterItem extends BaseFilterItem {
  cont?: number
}

// 普通筛选项接口
interface NormalFilterItem extends BaseFilterItem {
  children?: (NormalFilterItem | LeafFilterItem)[]
}

// 范围筛选项接口
interface RangeFilterItem extends BaseFilterItem {
  type: 'slider'
  children: RangeItem[]
}

// 筛选项联合类型
export type FilterItem = NormalFilterItem | RangeFilterItem

// 类型守卫函数
function isRangeFilterItem(item: FilterItem): item is RangeFilterItem {
  return item.type === 'slider'
}

function isLeafFilterItem(item: any): item is LeafFilterItem {
  return 'cont' in item
}

function isNormalFilterItem(item: any): item is NormalFilterItem {
  return 'children' in item && !isRangeFilterItem(item)
}

// 组件属性接口定义
const props = defineProps<{ filterData: FilterItem[] }>()
// 定义组件事件
const emit = defineEmits(['update:selectedItems', 'update:selectedChild'])

// 当前激活的折叠面板
const activeNames = ref('assetClass')
// 子折叠面板激活项
const chidActiveName = ref('')
// 选中的子项
const selectedChild = ref('')
// 选中的项目列表
const selectedItems = ref<string[]>([])
const sliderValues = ref<Record<string, [number, number]>>({})

// 初始化滑块值
function initSliderValues() {
  props.filterData.forEach(item => {
    if (item.type === 'slider' && item.children) {
      item.children.forEach((range,index) => {
        if ('start' in range && 'end' in range) {
          console.log(sliderValues.value, range, 'range')
          sliderValues.value[index] = [range.start, range.end]
        }
      })
    }
  })
}

// 组件挂载时初始化
onMounted(() => {
  initSliderValues()
})

// 重置所有筛选条件
function resetFilters() {
  activeNames.value = ''
  chidActiveName.value = ''
  selectedChild.value = ''
  selectedItems.value = []
  emit('update:selectedItems', [])
  emit('update:selectedChild', '')
}

// 处理复选框变化事件
function handleCheckboxChange(value: string, checked: boolean) {
  if (checked) {
    selectedItems.value.push(value)
  } else {
    const index = selectedItems.value.indexOf(value)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    }
  }
  emit('update:selectedItems', selectedItems.value)
}

// 处理单选框变化事件
function handleRadioChange(value: string) {
  selectedChild.value = value
  selectedItems.value = []
  emit('update:selectedChild', value)
  emit('update:selectedItems', [])
}

function onChange(value: number | number[], index: number) {
  sliderValues.value[index] = value as [number, number]
}
</script>

<template>
  <div class="filters">
    <!-- 筛选器头部 -->
    <div class="filters-header">
      <h2>Filters</h2>
      <button class="reset-btn" @click="resetFilters">Reset</button>
    </div>
    <!-- 主折叠面板 -->
    <van-collapse v-model="activeNames" accordion class="main-collapse">
      <van-collapse-item
        v-for="item in filterData"
        :key="item.value"
        :name="item.value"
        :title="item.label">
        <!-- 资产类别特殊处理 -->
        <template v-if="item.value === 'assetClass' && isNormalFilterItem(item)">
          <van-collapse v-model="chidActiveName" accordion>
            <van-collapse-item
              v-for="child in item.children"
              :key="child.value"
              :name="child.value"
              :title="child.label"
              :is-link="false"
              class="child-collapse-item">
              <template #title>
                <van-radio-group v-model="selectedChild" @change="handleRadioChange">
                  <van-radio :name="child.value">{{ child.label }}</van-radio>
                </van-radio-group>
              </template>
              <div class="children-list">
                <div v-for="subChild in isNormalFilterItem(child) ? child.children : []" :key="subChild.value" class="child-item">
                  <van-checkbox
                    :model-value="selectedItems.includes(subChild.value)"
                    @update:model-value="(checked) => handleCheckboxChange(subChild.value, checked)"
                    shape="square"
                    icon-size="14px"
                  >
                    {{ subChild.label }}
                  </van-checkbox>
                  <span
                    class="cont"
                    :class="{
                      'cont-error': isLeafFilterItem(subChild) && subChild.cont === 0,
                      'cont-success': isLeafFilterItem(subChild) && subChild.cont && subChild.cont > 0
                    }"
                  >
                    {{ isLeafFilterItem(subChild) ? subChild.cont : 0 }}
                  </span>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </template>
        <!-- 费用范围处理 -->
        <template v-else-if="isRangeFilterItem(item)">
          <div class="range-list">
            <div v-for="(range, index) in item.children" :key="index" class="range-item">
              <el-slider
                :model-value="sliderValues[index] || [range.start, range.end]"
                @update:model-value="(val) => onChange(val, index)"
                :min="range.start"
                :max="range.end"
                range
              />
              <div style="display: flex; align-items: center; gap: 10px;">
                <el-input v-model="sliderValues[index][0]" />
                <el-input v-model="sliderValues[index][1]" />
              </div>
            </div>
          </div>
        </template>
        <!-- 其他筛选项处理 -->
        <template v-else-if="isNormalFilterItem(item)">
          <div class="children-list">
            <div v-for="subChild in isNormalFilterItem(item) ? item.children : []" :key="subChild.value" class="child-item">
              <van-checkbox
                :model-value="selectedItems.includes(subChild.value)"
                @update:model-value="(checked) => handleCheckboxChange(subChild.value, checked)"
                shape="square"
                icon-size="14px"
              >
                {{ subChild.label }}
              </van-checkbox>
              <span
                class="cont"
                :class="{
                  'cont-error': isLeafFilterItem(subChild) && subChild.cont === 0,
                  'cont-success': isLeafFilterItem(subChild) && subChild.cont && subChild.cont > 0
                }"
              >
                {{ isLeafFilterItem(subChild) ? subChild.cont : 0 }}
              </span>
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
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
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
    .child-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      // 数量标签样式
      .cont {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        padding: 0 6px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 500;
        margin-left: 8px;
        // 错误状态样式
        &.cont-error {
          background-color: #ee0a24;
          color: #fff;
        }
        // 成功状态样式
        &.cont-success {
          background-color: #07c160;
          color: #fff;
        }
      }
    }
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
    padding: 8px 16px;
    .range-item {
      padding: 8px 0;
      color: #666;
    }
  }
}
</style>
