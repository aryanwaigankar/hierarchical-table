import React from 'react';

export const TableHeader = React.memo(function TableHeader() {
  return (
    <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
      <tr>
        <th className="py-4 px-6 text-left font-semibold">Label</th>
        <th className="py-4 px-6 text-left font-semibold">Value</th>
        <th className="py-4 px-6 text-left font-semibold">Input</th>
        <th className="py-4 px-6 text-left font-semibold">Allocation %</th>
        <th className="py-4 px-6 text-left font-semibold">Allocation Val</th>
        <th className="py-4 px-6 text-left font-semibold">Variance %</th>
      </tr>
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

