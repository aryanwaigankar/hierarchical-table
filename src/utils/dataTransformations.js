export const addOriginalValues = (rows) => {
  return rows.map(row => ({
    ...row,
    originalValue: row.value,
    children: row.children ? addOriginalValues(row.children) : undefined
  }));
};

export const updateParentValues = (rows, calculateChildrenSum) => {
  return rows.map(row => {
    if (row.children && row.children.length > 0) {
      const updatedChildren = updateParentValues(row.children, calculateChildrenSum);
      const newValue = calculateChildrenSum(updatedChildren);
      return {
        ...row,
        value: newValue,
        children: updatedChildren
      };
    }
    return row;
  });
};

export const distributeToChildren = (parentRow, newParentValue, calculateChildrenSum) => {
  if (!parentRow.children || parentRow.children.length === 0) {
    return { ...parentRow, value: newParentValue };
  }

  const currentTotal = calculateChildrenSum(parentRow.children);
  const updatedChildren = parentRow.children.map(child => {
    const proportion = currentTotal > 0 
      ? child.value / currentTotal 
      : 1 / parentRow.children.length;
    const newChildValue = newParentValue * proportion;
    
    if (child.children && child.children.length > 0) {
      return distributeToChildren(child, newChildValue, calculateChildrenSum);
    }
    
    return { ...child, value: newChildValue };
  });

  return {
    ...parentRow,
    value: newParentValue,
    children: updatedChildren
  };
};

export const updateRowById = (rows, id, updateFn) => {
  return rows.map(row => {
    if (row.id === id) {
      return updateFn(row);
    }
    if (row.children) {
      return {
        ...row,
        children: updateRowById(row.children, id, updateFn)
      };
    }
    return row;
  });
};

