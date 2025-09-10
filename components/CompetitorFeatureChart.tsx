import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import type { Competitor } from '../types';

interface CompetitorFeatureChartProps {
  data: Competitor[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 p-3 border border-base-300 rounded-lg shadow-lg">
          <p className="font-bold text-content-primary">{`${label}`}</p>
          <p className="text-brand-primary">{`Feature Score: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

const CompetitorFeatureChart: React.FC<CompetitorFeatureChartProps> = ({ data }) => {
  const chartData = data.map(c => ({
    name: c.name,
    completeness: c.featureCompleteness,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={chartData} 
        margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis 
          type="number" 
          stroke="#94a3b8" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          domain={[0, 100]} 
        />
        <YAxis 
          type="category"
          dataKey="name"
          stroke="#475569" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false}
          width={120}
          tick={{ textAnchor: 'start' }}
          dx={-115}
        />
        <Tooltip 
          content={<CustomTooltip />} 
          cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} 
        />
        <Bar dataKey="completeness" fill="#334155" radius={[0, 4, 4, 0]} barSize={20}>
           <LabelList dataKey="completeness" position="right" style={{ fill: '#334155', fontSize: '12px' }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompetitorFeatureChart;