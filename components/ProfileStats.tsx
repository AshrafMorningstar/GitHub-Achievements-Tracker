import React from 'react';
import { UserStats } from '../types';
import { Users, Book, GitPullRequest, Star, X } from 'lucide-react';

interface ProfileStatsProps {
  stats: UserStats;
  onClear: () => void;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats, onClear }) => {
  return (
    <div className="bg-github-card border border-github-border rounded-lg p-4 mb-6 relative animate-in fade-in slide-in-from-top-2">
      <button 
        onClick={onClear} 
        className="absolute top-2 right-2 text-github-muted hover:text-red-400 p-1 rounded-full transition-colors"
        title="Clear Profile"
      >
        <X size={16} />
      </button>

      <div className="flex flex-col items-center mb-4">
        <img 
          src={stats.avatarUrl} 
          alt={stats.username} 
          className="w-20 h-20 rounded-full border-2 border-github-border mb-3"
        />
        <h3 className="text-lg font-bold text-github-text text-center">{stats.name}</h3>
        <a 
          href={`https://github.com/${stats.username}`} 
          target="_blank" 
          rel="noreferrer"
          className="text-sm text-github-accent hover:underline"
        >
          @{stats.username}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-github-darker p-2 rounded border border-github-border flex flex-col items-center justify-center">
           <GitPullRequest size={16} className="text-github-green mb-1" />
           <span className="text-xl font-bold text-github-text">{stats.mergedPRs}</span>
           <span className="text-[10px] text-github-muted uppercase tracking-wider">Merged PRs</span>
        </div>
        <div className="bg-github-darker p-2 rounded border border-github-border flex flex-col items-center justify-center">
           <Star size={16} className="text-yellow-500 mb-1" />
           <span className="text-xl font-bold text-github-text">{stats.totalStars}</span>
           <span className="text-[10px] text-github-muted uppercase tracking-wider">Stars Earned</span>
        </div>
        <div className="bg-github-darker p-2 rounded border border-github-border flex flex-col items-center justify-center">
           <Book size={16} className="text-blue-400 mb-1" />
           <span className="text-xl font-bold text-github-text">{stats.publicRepos}</span>
           <span className="text-[10px] text-github-muted uppercase tracking-wider">Repos</span>
        </div>
        <div className="bg-github-darker p-2 rounded border border-github-border flex flex-col items-center justify-center">
           <Users size={16} className="text-purple-400 mb-1" />
           <span className="text-xl font-bold text-github-text">{stats.followers}</span>
           <span className="text-[10px] text-github-muted uppercase tracking-wider">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
