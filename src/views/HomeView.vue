<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { Setting, Edit, Location, OfficeBuilding } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const cards = [
  {
    title: 'ETF Screener',
    desc: 'Screen ETFs based on asset class, issuer, market cap, expense ratio, and more.',
    icon: Setting,
    path: '/screener'
  },
  {
    title: 'ETFs by Type',
    desc: 'ETFs are tagged by the ETF Database staff with more than one type; e.g. "leveraged", "government bond" and "bond"',
    icon: Edit,
    path: '/etfs'
  },
  {
    title: 'ETFs by Geography',
    desc: 'Looking to add country specific exposure to your portfolio? Use our Country Exposure Tool!',
    icon: Location,
    path: '/tool'
  },
  {
    title: 'ETFs by Issuer',
    desc: 'Use our database tool to find ETFs issued by one of over 70 different issuers quickly and easily.',
    icon: OfficeBuilding,
    path: '/issuers'
  }
]
const router = useRouter()
const handleClick = (path: string) => {
  router.push({
    path: path
  })
}
</script>

<template>
  <div class="card-grid">
    <div class="grid">
      <div v-for="(card, idx) in cards" :key="idx" class="card">
        <div class="icon-bg">
          <el-icon :size="24" color="#3b3b6d">
            <component :is="card.icon" />
          </el-icon>
        </div>
        <div class="content">
          <div class="title" @click="handleClick(card.path)">{{ card.title }}</div>
          <div class="desc">{{ card.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.card-grid {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: #ffffff;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
}
.card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.icon-bg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f3fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.content {
  flex: 1;
}
.title {
  font-weight: 600;
  color: $theme-purple;
  font-size: 16px;
  margin-bottom: 8px;
  position: relative;
  display: inline-block;
}
.title:hover {
  color: #1DA4A8;
}
.title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #3b3b6d;
}
.desc {
  color: #5c5c7b;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .card {
    padding: 16px;
  }
  .card-grid {
    padding: 16px;
  }
  .icon-bg {
    width: 36px;
    height: 36px;
  }
  .title {
    font-size: 15px;
  }
  .desc {
    font-size: 13px;
  }
}
</style>
