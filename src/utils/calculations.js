export const calculateChildrenSum = (children) => {
  if (!children || children.length === 0) return 0;
  return children.reduce((sum, child) => sum + child.value, 0);
};

export const calculateVariance = (currentValue, originalValue) => {
  if (originalValue === 0) return '0.00%';
  const variance = ((currentValue - originalValue) / originalValue) * 100;
  return `${variance.toFixed(2)}%`;
};

export const calculateGrandTotal = (rows) => {
  return rows.reduce((sum, row) => sum + row.value, 0);
};

export const calculateOriginalGrandTotal = (rows) => {
  return rows.reduce((sum, row) => sum + row.originalValue, 0);
};

