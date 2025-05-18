<template>
  <div class="stock-profile-price">
    <div class="stock-profile-price-container">
      <!-- 第一行 -->
      <div class="row">
        <div class="block">
          <div class="section-title">Vitals</div>
          <div class="info-list">
            <div class="info-row">
              <span>Issuer</span
              ><span class="linkStyle" @click.stop="router.push('/proshares')"
                >BNY Mellon</span
              >
            </div>
            <div class="info-row">
              <span>Brand</span
              ><span class="linkStyle" @click.stop="router.push('/proshares')"
                >BNY Mellon</span
              >
            </div>
            <div class="info-row"><span>Structure</span><span>ETF</span></div>
            <div class="info-row">
              <span>Expense Ratio</span><span>0.00%</span>
            </div>
            <div class="info-row">
              <span>ETF Home Page</span><span class="link">Home page</span>
            </div>
            <div class="info-row">
              <span>Inception</span><span>Apr 09, 2020</span>
            </div>
            <div class="info-row">
              <span>Index Tracked</span><span>Solactive GBS United ...</span>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="section-title analyst-title-row">
            <span>Analyst Report</span>
            <button class="fa-report-btn">FA Report PDF</button>
          </div>
          <div class="analyst-content">
            The BNY Mellon US Large Cap Core Equity ETF (BKLC) tracks an index
            of large cap U.S. equities... and does it for free. That's right:
            BKLC's management fee is zero. BKLC is part of a lineup of ETFs
            introduced by BNY Mellon in April 2020. As a latecomer to a crowded
            market, BNY Mellon is betting that its fee-free and ultra-low-cost
            funds will help win over investors.
            <span class="see-more">See more</span>
          </div>
        </div>
      </div>
      <!-- 第二行 -->
      <div class="row">
        <div class="block">
          <div class="section-title">ETF Database Themes</div>
          <div class="info-list">
            <div class="info-row">
              <span>Category</span
              ><span class="link" @click="router.push('/equities')">Large Cap Growth Eq...</span>
            </div>
            <div class="info-row">
              <span>Asset Class</span><span class="link" @click="router.push('/etfs-list')">Equity</span>
            </div>
            <div class="info-row">
              <span>Asset Class Size</span><span class="link" @click="router.push('/etfs-list')">Large-Cap</span>
            </div>
            <div class="info-row">
              <span>Asset Class Style</span><span class="link" @click="router.push('/etfs-list')">Blend</span>
            </div>
            <div class="info-row">
              <span>Region (General)</span
              ><span class="link" @click="router.push('/etfs-list')">North America</span>
            </div>
            <div class="info-row">
              <span>Region (Specific)</span><span class="link" @click="router.push('/etfs-list')">U.S.</span>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="section-title">FactSet Classifications</div>
          <div class="info-list">
            <div class="info-row">
              <span>Segment</span><span>Equity: U.S. - Large Cap</span>
            </div>
            <div class="info-row">
              <span>Category</span><span>Size and Style</span>
            </div>
            <div class="info-row"><span>Focus</span><span>Large Cap</span></div>
            <div class="info-row">
              <span>Niche</span><span>Broad-based</span>
            </div>
            <div class="info-row">
              <span>Strategy</span><span>Vanilla</span>
            </div>
            <div class="info-row">
              <span>Weighting Scheme</span><span>Market Cap</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 第三行 -->
      <div class="row">
        <div class="block">
          <div class="section-title">Trading Data</div>
          <div class="info-list">
            <div class="info-row"><span>Open</span><span>$113.20</span></div>
            <div class="info-row"><span>Volume</span><span>75,200</span></div>
            <div class="info-row"><span>Day Lo</span><span>$113.76</span></div>
            <div class="info-row"><span>Day Hi</span><span>$113.76</span></div>
            <div class="info-row">
              <span>52 Week Lo</span><span>$91.90</span>
            </div>
            <div class="info-row">
              <span>52 Week Hi</span><span>$117.13</span>
            </div>
            <div class="info-row"><span>AUM</span><span>$2,698.9 M</span></div>
            <div class="info-row"><span>Shares</span><span>24.0 M</span></div>
          </div>
        </div>
        <div class="block">
          <div class="section-title">Historical Trading Data</div>
          <div class="info-list">
            <div class="info-row">
              <span>1 Month Avg. Volume</span><span>142,382</span>
            </div>
            <div class="info-row">
              <span>3 Month Avg. Volume</span><span>241,087</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 第四行：ETF Database Large Cap Growth Equities Category -->
      <div class="">
        <div class="block">
          <EtfCompareTable
            title="Alternative ETFs in the ETF Database Large Cap Growth Equities Category"
            :columns="columns"
            :data="table1"
          />
        </div>
        <div class="block"></div>
      </div>
      <!-- 第五行：FactSet Equity: U.S. - Large Cap Segment -->
      <div class="">
        <div class="block">
          <EtfCompareTable
            title="Alternative ETFs in the FactSet Equity: U.S. - Large Cap Segment"
            :columns="columns"
            :data="table2"
          />
        </div>
        <div class="block"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EtfCompareTable from "@/components/EtfCompareTable.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const columns = [
  { key: "type", label: "Type" },
  { key: "symbol", label: "Symbol", isLink: true, onClick: (symbol: string) => {
    router.push(`/details?symbol=${symbol}`);
  } },
  { key: "expenseRatio", label: "Expense Ratio" },
  { key: "assets", label: "Assets" },
  { key: "avgDailyVol", label: "Avg. Daily Vol" },
  { key: "ytdReturn", label: "YTD Return" },
];

const table1 = [
  {
    type: "Cheapest",
    symbol: "BKLC",
    expenseRatio: "0.00%",
    assets: "$2.7 B",
    avgDailyVol: "241,087",
    ytdReturn: "1.06%",
  },
  {
    type: "Largest (AUM)",
    symbol: "VOO",
    expenseRatio: "0.03%",
    assets: "$650.2 B",
    avgDailyVol: "9 M",
    ytdReturn: "1.08%",
  },
  {
    type: "Most Liquid (Volume)",
    symbol: "QQQ",
    expenseRatio: "0.20%",
    assets: "$328.0 B",
    avgDailyVol: "50 M",
    ytdReturn: "1.72%",
  },
  {
    type: "Top YTD Performer",
    symbol: "HERO",
    expenseRatio: "0.50%",
    assets: "$135.4 M",
    avgDailyVol: "51,732",
    ytdReturn: "22.57%",
  },
];

const table2 = [
  {
    type: "Cheapest",
    symbol: "BKLC",
    expenseRatio: "0.00%",
    assets: "$2.7 B",
    avgDailyVol: "241,087",
    ytdReturn: "1.06%",
  },
  {
    type: "Largest (AUM)",
    symbol: "VOO",
    expenseRatio: "0.03%",
    assets: "$650.2 B",
    avgDailyVol: "9 M",
    ytdReturn: "1.08%",
  },
  {
    type: "Most Liquid (Volume)",
    symbol: "QQQ",
    expenseRatio: "0.20%",
    assets: "$328.0 B",
    avgDailyVol: "50 M",
    ytdReturn: "1.72%",
  },
  {
    type: "Top YTD Performer",
    symbol: "SPD",
    expenseRatio: "0.53%",
    assets: "$88.6 M",
    avgDailyVol: "62,519",
    ytdReturn: "11.14%",
  },
];
</script>

<style scoped lang="scss">
.stock-profile-price {
  background: #fff;
  color: #222;
  font-size: 14px;
}
.stock-profile-price-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.row {
  display: flex;
  gap: 32px;
}
.block {
  flex: 1;
  min-width: 0;
}
.section-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.analyst-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info-list {
  border-radius: 0;
  border: none;
  background: none;
  padding: 0;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid #ececec;
  font-size: 14px;
}
.info-row:last-child {
  border-bottom: none;
}
.info-row span:first-child {
  color: #333;
}
.info-row .link {
  color: var(--theme-purple);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.fa-report-btn {
  background: var(--theme-purple);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 18px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 10px;
}
.fa-report-btn:hover {
  background: var(--theme-purple);
}
.analyst-content {
  color: #444;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 4px;
}
.see-more {
  color: var(--theme-purple);
  cursor: pointer;
  margin-left: 6px;
  font-size: 14px;
}
@media (max-width: 768px) {
  .row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
