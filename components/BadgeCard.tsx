/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { Achievement, BadgeStatus, UserStats } from '../types';
import { CheckCircle, ArrowUpRight, Lock, Sparkles } from 'lucide-react';

interface BadgeCardProps {
  achievement: Achievement;
  userStats: UserStats | null;
  isOwned: boolean;
  onClick: () => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ achievement, userStats, isOwned, onClick }) => {
  
  // Logic
  const getProgress = () => {
    if (!userStats) return null;
    let current = 0;
    if (achievement.id === 'pull-shark') current = userStats.mergedPRs;
    else if (achievement.id === 'starstruck') current = userStats.totalStars;
    else return null;

    const nextTier = achievement.tiers?.find(t => (t.threshold || 0) > current);
    const maxTier = achievement.tiers?.[achievement.tiers.length - 1];
    const isMaxed = !nextTier && maxTier && current >= (maxTier.threshold || 0);
    const target = nextTier ? nextTier.threshold || 1 : (maxTier?.threshold || 1);
    const percent = Math.min(100, Math.round((current / target) * 100));

    return { percent, isMaxed };
  };

  const progress = getProgress();

  return (
    <div 
      onClick={onClick}
      className={`
        group glass-panel rounded-[2rem] p-8 cursor-pointer relative overflow-visible flex flex-col h-full
        transition-all duration-500 ease-out transform
        hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]
        border border-white/5 hover:border-white/20
      `}
    >
      {/* Premium Hover Tooltip */}
      <div className="premium-tooltip">
        <div className="flex items-center gap-2 mb-1 text-github-accent font-bold uppercase text-[10px] tracking-widest">
          <Sparkles size={10} /> How to Earn
        </div>
        <p className="font-medium text-white/90">{achievement.howToEarn}</p>
      </div>

      {/* Dynamic Hover Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-github-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />

      {/* Top Section: Hero Circle & Status */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        
        {/* NEW BIGGER CIRCLE UI */}
        <div className="relative group-hover:scale-105 transition-transform duration-500">
           {/* Outer Glow */}
           <div className={`absolute inset-0 rounded-full blur-2xl opacity-40 transition-opacity duration-700 ${isOwned ? 'bg-github-success/30' : 'bg-github-accent/20 group-hover:opacity-60'}`}></div>
           
           {/* The Ring Container */}
           <div className={`w-20 h-20 rounded-full flex items-center justify-center relative ${isOwned ? 'chromatic-ring' : 'bg-white/5 border border-white/10 shadow-inner'}`}>
              <div className="w-full h-full rounded-full bg-github-darker flex items-center justify-center text-4xl relative z-10 drop-shadow-2xl">
                 {achievement.emoji}
              </div>
              
              {/* Ownership Badge */}
              {isOwned && (
                <div className="absolute -bottom-1 -right-1 bg-github-success text-github-darker rounded-full p-1.5 border-[3px] border-github-darker z-20 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <CheckCircle size={14} strokeWidth={4} />
                </div>
              )}
           </div>
        </div>

        {/* Status Pill */}
        <div className="flex flex-col items-end gap-2">
           {achievement.status === BadgeStatus.RETIRED && (
             <span className="text-[10px] font-bold tracking-widest text-github-muted/50 uppercase flex items-center gap-1">
               <Lock size={10} /> Archived
             </span>
           )}
           <div className={`
             px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md transition-colors
             ${isOwned 
               ? 'bg-github-success/10 text-github-success border-github-success/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
               : 'bg-white/5 text-github-muted border-white/10 group-hover:bg-white/10 group-hover:text-white'}
           `}>
             {isOwned ? 'Collected' : 'Available'}
           </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="flex-1 relative z-10">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-github-accent transition-colors duration-300 flex items-center gap-2 tracking-tight">
          {achievement.name}
          <ArrowUpRight size={18} className="opacity-0 -translate-x-4 text-github-muted group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </h3>
        <p className="text-sm text-github-muted leading-relaxed line-clamp-3 group-hover:text-github-text transition-colors">
          {achievement.description}
        </p>
      </div>

      {/* Progress Bar (if applicable) */}
      {progress && (
        <div className="mt-8 relative z-10 pt-4 border-t border-white/5">
          <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-github-muted mb-2">
            <span className="flex items-center gap-1">Progress</span>
            <span className={progress.isMaxed ? 'text-yellow-400 drop-shadow-md' : ''}>
              {progress.percent}%
            </span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
             <div 
               className={`h-full rounded-full transition-all duration-1000 ease-out relative ${progress.isMaxed ? 'bg-gradient-to-r from-yellow-500 to-amber-300 shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'bg-gradient-to-r from-github-accent to-purple-500'}`} 
               style={{ width: `${progress.percent}%` }}
             >
               <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;