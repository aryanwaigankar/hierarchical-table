import React, { useMemo } from 'react';
import { useHierarchicalData } from '../../hooks/useHierarchicalData';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { GrandTotalRow } from './GrandTotalRow';

export const HierarchicalTable = ({ initialData }) => {
  const {
    data,
    inputValues,
    grandTotal,
    originalGrandTotal,
    handlePercentageAllocation,
    handleValueAllocation,
    handleInputChange
  } = useHierarchicalData(initialData);

  const renderedRows = useMemo(() => {
    return data.map(row => (
      <TableRow
        key={row.id}
        row={row}
        level={0}
        inputValues={inputValues}
        onInputChange={handleInputChange}
        onPercentageAllocation={handlePercentageAllocation}
        onValueAllocation={handleValueAllocation}
      />
    ));
  }, [data, inputValues, handleInputChange, handlePercentageAllocation, handleValueAllocation]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader />
          <tbody>
            {renderedRows}
            <GrandTotalRow 
              grandTotal={grandTotal} 
              originalGrandTotal={originalGrandTotal} 
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

