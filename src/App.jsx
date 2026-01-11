import React from 'react';
import { HierarchicalTable } from './components/HierarchicalTable';
import './index.css';

const initialData = {
  rows: [
    {
      id: 'electronics',
      label: 'Electronics',
      value: 1500.00,
      children: [
        {
          id: 'phones',
          label: 'Phones',
          value: 800.00
        },
        {
          id: 'laptops',
          label: 'Laptops',
          value: 700.00
        }
      ]
    },
    {
      id: 'furniture',
      label: 'Furniture',
      value: 1000.00,
      children: [
        {
          id: 'tables',
          label: 'Tables',
          value: 300.00
        },
        {
          id: 'chairs',
          label: 'Chairs',
          value: 700.00
        }
      ]
    }
  ]
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Hierarchical Table
          </h1>
        </div>
        <HierarchicalTable initialData={initialData} />
      </div>
    </div>
  );
}

export default App;

