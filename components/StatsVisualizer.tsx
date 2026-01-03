/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Achievement, BadgeStatus } from '../types';

interface StatsVisualizerProps {
  achievements: Achievement[];
}

// Neon Palette for Dark Mode
const COLORS = ['#10b981', '#f43f5e', '#a855f7', '#94a3b8']; // Green, Red, Purple, Gray

const StatsVisualizer: React.FC<StatsVisualizerProps> = ({ achievements }) => {
  const data = [
    { name: 'Active', value: achievements.filter(a => a.status === BadgeStatus.ACTIVE).length },
    { name: 'Retired', value: achievements.filter(a => a.status === BadgeStatus.RETIRED).length },
    { name: 'Highlight', value: achievements.filter(a => a.status === BadgeStatus.PROFILE_HIGHLIGHT).length },
    { name: 'Unreleased', value: achievements.filter(a => a.status === BadgeStatus.UNRELEASED).length },
  ].filter(d => d.value > 0);

  return (
    <div className="glass-panel rounded-2xl p-6 mb-6 transition-all duration-300 hover:border-github-border/80">
      <h3 className="text-sm font-bold text-github-text mb-4 uppercase tracking-wider opacity-80">Badge Distribution</h3>
      <div className="h-48 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={6}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="outline-none"
                  style={{ filter: `drop-shadow(0px 0px 4px ${COLORS[index % COLORS.length]}80)` }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderColor: 'rgba(51, 65, 85, 0.5)', 
                borderRadius: '12px',
                color: '#f8fafc',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              itemStyle={{ color: '#f8fafc', fontWeight: 500, fontSize: '12px' }}
              cursor={{fill: 'transparent'}}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              formatter={(value) => <span className="text-xs text-github-muted ml-1">{value}</span>} 
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
           <span className="text-2xl font-bold text-github-text/50">{achievements.length}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsVisualizer;