import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  addOriginalValues, 
  updateParentValues, 
  distributeToChildren, 
  updateRowById 
} from '../utils/dataTransformations';
import { calculateChildrenSum } from '../utils/calculations';

export const useHierarchicalData = (initialData) => {
  const [data, setData] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (initialData?.rows) {
      setData(addOriginalValues(initialData.rows));
    }
  }, [initialData]);

  const memoizedCalculateChildrenSum = useCallback(calculateChildrenSum, []);

  const memoizedUpdateParentValues = useCallback((rows) => {
    return updateParentValues(rows, memoizedCalculateChildrenSum);
  }, [memoizedCalculateChildrenSum]);

  const memoizedDistributeToChildren = useCallback((parentRow, newParentValue) => {
    return distributeToChildren(parentRow, newParentValue, memoizedCalculateChildrenSum);
  }, [memoizedCalculateChildrenSum]);

  const handlePercentageAllocation = useCallback((rowId) => {
    const inputValue = inputValues[rowId];
    if (!inputValue) return;

    const percentage = parseFloat(inputValue);
    if (isNaN(percentage)) return;

    setData(prevData => {
      const updatedData = updateRowById(prevData, rowId, (row) => {
        const newValue = row.value * (1 + percentage / 100);
        
        if (row.children && row.children.length > 0) {
          return memoizedDistributeToChildren(row, newValue);
        }
        
        return { ...row, value: newValue };
      });

      return memoizedUpdateParentValues(updatedData);
    });

    setInputValues(prev => ({ ...prev, [rowId]: '' }));
  }, [inputValues, memoizedDistributeToChildren, memoizedUpdateParentValues]);

  const handleValueAllocation = useCallback((rowId) => {
    const inputValue = inputValues[rowId];
    if (!inputValue) return;

    const newValue = parseFloat(inputValue);
    if (isNaN(newValue)) return;

    setData(prevData => {
      const updatedData = updateRowById(prevData, rowId, (row) => {
        if (row.children && row.children.length > 0) {
          return memoizedDistributeToChildren(row, newValue);
        }
        
        return { ...row, value: newValue };
      });

      return memoizedUpdateParentValues(updatedData);
    });

    setInputValues(prev => ({ ...prev, [rowId]: '' }));
  }, [inputValues, memoizedDistributeToChildren, memoizedUpdateParentValues]);

  const handleInputChange = useCallback((rowId, value) => {
    setInputValues(prev => ({ ...prev, [rowId]: value }));
  }, []);

  const grandTotal = useMemo(() => {
    return data.reduce((sum, row) => sum + row.value, 0);
  }, [data]);

  const originalGrandTotal = useMemo(() => {
    return data.reduce((sum, row) => sum + row.originalValue, 0);
  }, [data]);

  return {
    data,
    inputValues,
    grandTotal,
    originalGrandTotal,
    handlePercentageAllocation,
    handleValueAllocation,
    handleInputChange
  };
};

