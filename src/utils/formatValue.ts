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