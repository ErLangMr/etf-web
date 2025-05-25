<template>
  <div class="etf-list-container">
    <div class="etf-list-header">
      <h1 class="etf-list-title">Alternatives ETF List</h1>
      <p class="etf-list-desc">
        Alternatives ETFs offer exposure to the alternatives asset class. There are various alternative classifications, including hedge fund, long/short, managed futures and a few others. Alternatives, or "alts" for short, refers to investments that fall outside of the conventional asset class buckets, which are stocks, bonds, and cash. These types of investments are usually difficult to access for retail investors because they are more complex to understand, typically require some sort of minimum investment, have nuanced fee structures, are less liquid, and are generally seen as "riskier" by non-professionals. Some of the most popular types of alternatives are:
      </p>
    </div>
    <div class="list-container">
      <h2>ETF Overview</h2>
      <div class="list-box">
        <ScreenerTable
          class="table-area"
          :table-data="etfList"
          :hasTableFilter="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScreenerTable from '@/components/ScreenerTable.vue';
import { ref } from 'vue';

const description = 'This is a list of all Alternatives ETFs traded in the USA which are currently tagged by ETF Database. Please note that the list may not contain newly issued ETFs. If you’re looking for a more simplified way to browse and compare ETFs, you may want to visit our ETF Database Categories, which categorize every ETF in a single “best fit” category.Assets and Average Volume as of 2025-05-09 1:00 EDT'
const etfList = ref([
  { symbol: 'FTLS', name: 'First Trust Long/Short Equity ETF', asset: 'Alternatives', total: '$1,951', ytd: '-2.91%', volume: '162,536', price: '$63.75' },
  { symbol: 'DBMF', name: 'iMGP DBi Managed Futures Strategy ETF', asset: 'Alternatives', total: '$1,191', ytd: '-2.58%', volume: '778,684', price: '$25.31' },
  { symbol: 'CTA', name: 'Simplify Managed Futures Strategy ETF', asset: 'Alternatives', total: '$1,034', ytd: '-0.25%', volume: '638,084', price: '$27.71' },
  { symbol: 'QAI', name: 'NYLI Hedge Multi-Strategy Tracker ETF', asset: 'Alternatives', total: '$692', ytd: '0.25%', volume: '69,002', price: '$31.49' },
  { symbol: 'RLY', name: 'SPDR SSgA Multi-Asset Real Return ETF', asset: 'Alternatives', total: '$477', ytd: '4.52%', volume: '84,514', price: '$28.24' },
  { symbol: 'BTAL', name: 'AGF U.S. Market Neutral Anti-Beta Fund', asset: 'Alternatives', total: '$389', ytd: '6.11%', volume: '945,519', price: '$19.61' },
  { symbol: 'FLSP', name: 'Franklin Systematic Style Premia ETF', asset: 'Alternatives', total: '$337', ytd: '0.84%', volume: '55,541', price: '$24.11' },
  { symbol: 'MNA', name: 'NYLI Merger Arbitrage ETF', asset: 'Alternatives', total: '$234', ytd: '5.43%', volume: '39,944', price: '$34.75' },
  { symbol: 'KMLM', name: 'KFA Mount Lucas Managed Futures Index Strategy ETF', asset: 'Alternatives', total: '$194', ytd: '-6.37%', volume: '164,363', price: '$26.31' },
  { symbol: 'CLSE', name: 'Convergence Long/Short Equity ETF', asset: 'Alternatives', total: '$172', ytd: '-3.71%', volume: '116,822', price: '$22.06' },
  { symbol: 'WTMF', name: 'WisdomTree Managed Futures Strategy Fund', asset: 'Alternatives', total: '$158', ytd: '-1.23%', volume: '27,181', price: '$34.50' },
  { symbol: 'FMF', name: 'First Trust Managed Futures Strategy Fund', asset: 'Alternatives', total: '$151', ytd: '-4.02%', volume: '25,977', price: '$45.43' },
])

</script>

<style scoped lang="scss">
.etf-list-container{
  width: 100%;
  height: 100%;
  padding: 20px;
}
.etf-list-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.etf-list-desc {
  font-size: 1.08rem;
  color: #222;
  margin-bottom: 1.1rem;
  line-height: 1.7;
}
.list-container{
  .list-box{
  //  border: 1px solid #ccc;
   border-radius: 5px;
  }
}
</style>

