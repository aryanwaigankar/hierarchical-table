import React from 'react';
import { calculateVariance } from '../../utils/calculations';

export const TableRow = React.memo(function TableRow({ 
  row, 
  level = 0, 
  inputValues, 
  onInputChange, 
  onPercentageAllocation, 
  onValueAllocation 
}) {
  const inputValue = inputValues?.[row.id] || '';
  const variance = calculateVariance(row.value, row.originalValue);
  const varianceNum = parseFloat(variance);
  
  const varianceColorClass = 
    varianceNum > 0 ? 'text-emerald-600' : 
    varianceNum < 0 ? 'text-red-600' : 
    'text-slate-600';

  const rowBgClass = level === 0 ? 'bg-white' : 'bg-slate-50';
  const labelClass = level === 0 
    ? 'font-semibold text-slate-800' 
    : 'text-slate-700';

  const handleInputChange = (e) => {
    e.stopPropagation();
    onInputChange(row.id, e.target.value);
  };

  return (
    <>
      <tr className={`${rowBgClass} border-b border-slate-200 hover:bg-slate-100 transition-colors`}>
        <td className="py-4 px-6">
          <div className="flex items-center">
            {level > 0 && (
              <span 
                className="text-slate-400 mr-2" 
                style={{ marginLeft: `${level * 20}px` }}
              >
                └─
              </span>
            )}
            <span className={labelClass}>
              {row.label}
            </span>
          </div>
        </td>

        <td className="py-4 px-6 font-semibold text-slate-800">
          {row.value.toFixed(2)}
        </td>

        <td className="py-4 px-6">
          <input
            id={`input-${row.id}`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter value"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </td>

        <td className="py-4 px-6">
          <button
            onClick={() => onPercentageAllocation(row.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            aria-label={`Allocate percentage for ${row.label}`}
          >
            Allocation %
          </button>
        </td>

        <td className="py-4 px-6">
          <button
            onClick={() => onValueAllocation(row.id)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
            aria-label={`Allocate value for ${row.label}`}
          >
            Allocation Val
          </button>
        </td>

        <td className="py-4 px-6">
          <span className={`font-semibold ${varianceColorClass}`}>
            {variance}
          </span>
        </td>
      </tr>

      {row.children && row.children.length > 0 && (
        <>
          {row.children.map(child => (
            <TableRow
              key={child.id}
              row={child}
              level={level + 1}
              inputValues={inputValues}
              onInputChange={onInputChange}
              onPercentageAllocation={onPercentageAllocation}
              onValueAllocation={onValueAllocation}
            />
          ))}
        </>
      )}
    </>
  );
});

TableRow.displayName = 'TableRow';

