<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const countries = [
  { name: 'Angola', count: 1 },
  { name: 'Argentina', count: 100 },
  { name: 'Australia', count: 235 },
  { name: 'Austria', count: 148 },
  { name: 'Azerbaijan', count: 14 },
  { name: 'Bahamas', count: 24 },
  { name: 'Bahrain', count: 13 },
  { name: 'Belgium', count: 212 },
  { name: 'Bermuda', count: 2 },
  { name: 'Bolivia', count: 7 },
  { name: 'Brazil', count: 239 },
  { name: 'British Virgin Islands', count: 1 },
  { name: 'Guatemala', count: 2 },
  { name: 'Hong Kong', count: 269 },
  { name: 'Hungary', count: 52 },
  { name: 'India', count: 157 },
  { name: 'Indonesia', count: 111 },
  { name: 'Iraq', count: 4 },
  { name: 'Ireland', count: 473 },
  { name: 'Israel', count: 270 },
  { name: 'Italy', count: 270 },
  { name: 'Jamaica', count: 1 },
  { name: 'Japan', count: 326 },
  { name: 'Jordan', count: 2 },
  { name: 'Oman', count: 6 },
  { name: 'Pakistan', count: 43 },
  { name: 'Panama', count: 86 },
  { name: 'Papua New Guinea', count: 37 },
  { name: 'Paraguay', count: 1 },
  { name: 'Peru', count: 7 },
  { name: 'Philippines', count: 91 },
  { name: 'Poland', count: 90 },
  { name: 'Portugal', count: 127 },
  { name: 'Puerto Rico', count: 84 },
  { name: 'Qatar', count: 54 },
  { name: 'Romania', count: 1 },
];
const handleCountryClick = (name: string) => {
  router.push({
    path: '/exposure',
    query: {
      country: name,
    },
  });
}
</script>

<template>
  <div class="tool-view-container">
    <div class="tool-view-header">
      <h1 class="tool-view-title">ETF Country Exposure Tool</h1>
      <p class="tool-view-desc">
        How It Works: Use either the map tool or drop down box to find the equity ETFs with exposure to a particular country. Once a country is selected, click the icon to see all ETFs with exposure to that country.
      </p>
    </div>
    <div class="tool-content">
      <h2>Country List</h2>
      <div class="country-list">
        <ul class="country-grid">
          <li v-for="c in countries" :key="c.name" @click="handleCountryClick(c.name)">
            {{ c.name }} ({{ c.count }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.tool-view-container {
  width: 100%;
  padding: 20px;
  .tool-view-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .tool-view-desc {
    font-size: 1.08rem;
    color: #222;
    margin-bottom: 1.1rem;
    line-height: 1.7;
  }
}
.country-list {
  width: 100%;
  margin: 0 auto;
  padding: 0 0 24px 0;
}
.country-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 32px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.08rem;
  color: #4B2994;
  line-height: 1.7;
}
.country-grid li {
  margin-bottom: 2px;
  cursor: pointer;
  transition: color 0.2s;
  word-break: keep-all;
  white-space: nowrap;
  &:hover {
    color: #222;
    text-decoration: underline;
  }
}
@media (max-width: 900px) {
  .country-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0 16px;
  }
}
@media (max-width: 600px) {
  .country-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
