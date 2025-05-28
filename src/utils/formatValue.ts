export const formatValue = (value: any) => {
  if (value === null || value === undefined || value === 'NaN' || Number.isNaN(value)) {
    return '';
  }
  // 如果是数字，保留2位小数
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  return value;
}

export const getMonthAgoDate = (num: number): string => {
  const today = new Date(); // 获取当前日期
  const oneMonthAgo = new Date(today); // 复制当前日期对象
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - num); // 减去个月

  const year = oneMonthAgo.getFullYear(); // 获取年份
  const month = String(oneMonthAgo.getMonth() + 1).padStart(2, '0'); // 获取月份并补零
  const day = String(oneMonthAgo.getDate()).padStart(2, '0'); // 获取日期并补零

  return `${year}-${month}-${day}`;
}

export const getYearAgoDate = (num: number): string => {
  const today = new Date(); // 获取当前日期
  const oneYearAgo = new Date(today); // 复制当前日期对象
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - num); // 减去一年

  const year = oneYearAgo.getFullYear(); // 获取年份
  const month = String(oneYearAgo.getMonth() + 1).padStart(2, '0'); // 获取月份并补零
  const day = String(oneYearAgo.getDate()).padStart(2, '0'); // 获取日期并补零

  return `${year}-${month}-${day}`;
}