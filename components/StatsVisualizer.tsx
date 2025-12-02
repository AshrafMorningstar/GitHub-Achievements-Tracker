import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Achievement, BadgeStatus } from '../types';

interface StatsVisualizerProps {
  achievements: Achievement[];
}

const COLORS = ['#238636', '#da3633', '#8957e5', '#8b949e'];

const StatsVisualizer: React.FC<StatsVisualizerProps> = ({ achievements }) => {
  const data = [
    { name: 'Active', value: achievements.filter(a => a.status === BadgeStatus.ACTIVE).length },
    { name: 'Retired', value: achievements.filter(a => a.status === BadgeStatus.RETIRED).length },
    { name: 'Highlight', value: achievements.filter(a => a.status === BadgeStatus.PROFILE_HIGHLIGHT).length },
    { name: 'Unreleased', value: achievements.filter(a => a.status === BadgeStatus.UNRELEASED).length },
  ].filter(d => d.value > 0);

  return (
    <div className="bg-github-card border border-github-border rounded-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-github-text mb-4">Badge Distribution</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '6px' }}
              itemStyle={{ color: '#c9d1d9' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsVisualizer;