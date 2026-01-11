import React from 'react';
import { calculateVariance } from '../../utils/calculations';

export const GrandTotalRow = React.memo(function GrandTotalRow({ grandTotal, originalGrandTotal }) {
  const variance = calculateVariance(grandTotal, originalGrandTotal);
  const varianceNum = parseFloat(variance);
  
  const varianceColorClass = 
    varianceNum > 0 ? 'text-emerald-600' : 
    varianceNum < 0 ? 'text-red-600' : 
    'text-white';

  return (
    <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white font-bold">
      <td className="py-4 px-6">Grand Total</td>
      <td className="py-4 px-6">{grandTotal.toFixed(2)}</td>
      <td className="py-4 px-6"></td>
      <td className="py-4 px-6"></td>
      <td className="py-4 px-6"></td>
      <td className="py-4 px-6">
        <span className={varianceColorClass}>
          {variance}
        </span>
      </td>
    </tr>
  );
});

GrandTotalRow.displayName = 'GrandTotalRow';

