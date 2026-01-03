/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { UserStats } from '../types';
import { Users, Book, GitPullRequest, Star, X, ExternalLink } from 'lucide-react';

interface ProfileStatsProps {
  stats: UserStats;
  onClear: () => void;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats, onClear }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 mb-6 relative animate-fade-in group hover:border-github-accent/40 transition-colors">
      <button 
        onClick={onClear} 
        className="absolute top-3 right-3 text-github-muted hover:text-red-400 p-1.5 rounded-full hover:bg-github-darker transition-all opacity-0 group-hover:opacity-100"
        title="Remove Profile"
      >
        <X size={16} />
      </button>

      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-3">
          <div className="absolute inset-0 bg-github-accent blur-xl opacity-20 rounded-full"></div>
          <img 
            src={stats.avatarUrl} 
            alt={stats.username} 
            className="w-20 h-20 rounded-full border-2 border-github-border relative z-10 shadow-lg"
          />
        </div>
        <h3 className="text-lg font-bold text-github-text text-center leading-none">{stats.name}</h3>
        <a 
          href={`https://github.com/${stats.username}`} 
          target="_blank" 
          rel="noreferrer"
          className="text-sm text-github-accent hover:text-blue-400 hover:underline mt-1 flex items-center gap-1"
        >
          @{stats.username} <ExternalLink size={10} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile 
          icon={<GitPullRequest size={16} className="text-github-success" />}
          value={stats.mergedPRs}
          label="Merged PRs"
        />
        <StatTile 
          icon={<Star size={16} className="text-yellow-500" />}
          value={stats.totalStars}
          label="Stars Earned"
        />
        <StatTile 
          icon={<Book size={16} className="text-blue-400" />}
          value={stats.publicRepos}
          label="Repos"
        />
        <StatTile 
          icon={<Users size={16} className="text-purple-400" />}
          value={stats.followers}
          label="Followers"
        />
      </div>
    </div>
  );
};

const StatTile = ({ icon, value, label }: { icon: React.ReactNode, value: number, label: string }) => (
  <div className="bg-github-darker/40 hover:bg-github-darker/80 p-3 rounded-xl border border-github-border/50 flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02]">
    <div className="mb-1 opacity-90">{icon}</div>
    <span className="text-lg font-bold text-github-text tabular-nums">{value.toLocaleString()}</span>
    <span className="text-[10px] text-github-muted uppercase tracking-wider font-medium">{label}</span>
  </div>
);

export default ProfileStats;