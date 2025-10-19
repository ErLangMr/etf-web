import { get, post } from "@/utils/request";

// 定义浏览量计数器响应类型
interface CounterResponse {
  counter: {
    value: number;
  };
}

export const getLeftChartDataApi = () => {
  return get("/api/funds/getAllETFScales");
};

export const getRightChartDataApi = () => {
  return get("/api/funds/get300ETFScales");
};

export const getTop3PopularIndicesApi = () => {
  return get("/api/funds/getTop3PopularIndices");
};

export const getCountApi = () => {
  return get<CounterResponse>("/api/count/value");
};

export const setCountApi = () => {
  return post("/api/count/increment");
};
