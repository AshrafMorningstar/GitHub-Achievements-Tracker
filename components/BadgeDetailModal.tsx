/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useEffect, useState } from 'react';
import { Achievement, UserStats, BadgeStatus } from '../types';
import { ACHIEVEMENTS } from '../constants';
import { X, CheckCircle, Trophy, BookOpen, Star, ArrowLeft, Layers, Zap } from 'lucide-react';
import BadgeCard from './BadgeCard';

interface BadgeDetailViewProps {
  achievement: Achievement;
  userStats: UserStats | null;
  isOwned: boolean;
  onBack: () => void;
  onToggleOwn: () => void;
  onSelectRelated: (id: string) => void;
}

const BadgeDetailView: React.FC<BadgeDetailViewProps> = ({ 
  achievement, 
  userStats, 
  isOwned, 
  onBack, 
  onToggleOwn,
  onSelectRelated
}) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => setAnimateIn(false);
  }, [achievement.id]);

  // Find Related Badges (same status or random logic)
  const relatedBadges = ACHIEVEMENTS
    .filter(a => a.id !== achievement.id && a.status === achievement.status)
    .slice(0, 3);

  return (
    <div className={`w-full min-h-screen relative transition-all duration-700 ease-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Top Navigation */}
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-bold text-github-muted hover:text-white backdrop-blur-md"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Return to Gallery
        </button>
      </div>

      {/* Main Hero Card - BIGGER & REFINED */}
      <div className="glass-panel rounded-[3rem] p-10 md:p-16 mb-16 relative overflow-hidden border border-white/10 shadow-[0_0_80px_-20px_rgba(0,0,0,0.6)]">
        
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-github-accent/10 to-transparent rounded-full blur-[150px] -mr-60 -mt-60 pointer-events-none mix-blend-screen opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[130px] -ml-40 -mb-40 pointer-events-none mix-blend-screen opacity-50"></div>

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-16 items-center">
           
           {/* SUPER PREMIUM HERO CIRCLE - REACTOR DESIGN */}
           <div className="relative flex justify-center xl:justify-start">
              <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
                 
                 {/* 1. Deep Glow Background */}
                 <div className="absolute inset-0 bg-github-accent/20 rounded-full blur-[60px] animate-pulse-glow"></div>
                 
                 {/* 2. Outer Rotating Reactor Ring */}
                 <div className="reactor-ring"></div>
                 
                 {/* 3. Inner Reverse Rotating Ring */}
                 <div className="reactor-ring-reverse"></div>
                 
                 {/* 4. Main Circle Container */}
                 <div className="absolute inset-4 bg-[#0a0a0f] rounded-full border border-white/5 shadow-2xl flex items-center justify-center z-10">
                    <span className="text-9xl md:text-[10rem] relative z-20 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:scale-110 transition-transform duration-700 cursor-default select-none">
                       {achievement.emoji}
                    </span>
                 </div>

                 {/* 5. Ownership Indicator (Floating Orbit) */}
                 {isOwned && (
                   <div className="absolute -bottom-2 -right-2 z-30 bg-gradient-to-br from-github-success to-emerald-600 text-white rounded-full p-4 shadow-[0_0_20px_rgba(16,185,129,0.4)] border-4 border-[#0a0a0f] animate-bounce" style={{ animationDuration: '3s' }}>
                     <CheckCircle size={32} strokeWidth={3} />
                   </div>
                 )}
              </div>
           </div>

           {/* Hero Content */}
           <div className="flex-1 space-y-8 text-center xl:text-left">
              <div className="flex items-center justify-center xl:justify-start gap-4 flex-wrap">
                 <span className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border shadow-lg ${achievement.status === BadgeStatus.ACTIVE ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-900/20' : 'bg-white/5 border-white/10 text-github-muted'}`}>
                   {achievement.status}
                 </span>
                 {achievement.tiers && (
                    <span className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-github-text flex items-center gap-2">
                      <Layers size={12} /> Ranked Progression
                    </span>
                 )}
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none drop-shadow-lg">
                {achievement.name}
              </h1>
              
              <p className="text-2xl md:text-3xl text-github-muted/80 font-light leading-relaxed max-w-3xl mx-auto xl:mx-0">
                {achievement.description}
              </p>

              <div className="pt-8 flex flex-wrap justify-center xl:justify-start gap-5">
                 <button 
                   onClick={onToggleOwn}
                   className={`
                     px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all transform active:scale-95 shadow-2xl
                     ${isOwned 
                       ? 'bg-github-darker border border-github-border text-github-muted hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30' 
                       : 'bg-github-accent hover:bg-indigo-500 text-white shadow-indigo-500/40 ring-1 ring-white/20'}
                   `}
                 >
                   {isOwned ? <><X size={24} /> Revoke Ownership</> : <><Trophy size={24} /> Claim Achievement</>}
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-20">
        
        {/* Strategy Column */}
        <div className="xl:col-span-2 space-y-10">
           <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-github-accent/5 rounded-full blur-[80px] -mr-20 -mt-20"></div>
              
              <div className="flex items-center gap-5 mb-10 relative z-10">
                 <div className="p-4 bg-github-accent/10 rounded-2xl text-github-accent border border-github-accent/20">
                   <BookOpen size={28} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-bold text-white">Execution Strategy</h2>
                    <p className="text-sm text-github-muted font-mono mt-1">OPTIMIZED PATH</p>
                 </div>
              </div>
              
              <div className="space-y-8 pl-6 border-l-2 border-white/5 relative z-10">
                 {achievement.guideSteps.map((step, i) => (
                   <div key={i} className="relative pl-10 group">
                      <span className="absolute left-[-11px] top-2 w-5 h-5 rounded-full bg-[#0a0a0f] border-[3px] border-github-muted/30 group-hover:border-github-accent group-hover:scale-110 transition-all"></span>
                      <p className="text-xl text-github-muted group-hover:text-white transition-colors leading-relaxed font-light">
                        {step}
                      </p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Requirement Block */}
           <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xs font-bold text-github-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                 <Zap size={14} /> Official Requirement
              </h3>
              <p className="text-2xl font-medium text-white leading-relaxed">{achievement.howToEarn}</p>
           </div>
        </div>

        {/* Tiers Column */}
        <div className="space-y-10">
           {achievement.tiers && (
             <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 h-full">
                <div className="flex items-center gap-5 mb-10">
                   <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500 border border-yellow-500/20">
                     <Layers size={28} />
                   </div>
                   <div>
                      <h2 className="text-3xl font-bold text-white">Tiers</h2>
                      <p className="text-sm text-github-muted font-mono mt-1">LEVEL BREAKDOWN</p>
                   </div>
                </div>

                <div className="space-y-4">
                  {achievement.tiers.map((tier, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                       <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-lg text-white group-hover:text-github-accent transition-colors">{tier.name}</span>
                          {tier.threshold && <span className="text-xs font-mono bg-black/40 px-3 py-1.5 rounded-lg text-github-muted border border-white/5">{tier.threshold}x</span>}
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: tier.color, backgroundColor: tier.color }}></div>
                          <p className="text-sm text-github-muted font-medium">{tier.criteria}</p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Related Badges */}
      {relatedBadges.length > 0 && (
        <div className="mb-20">
           <div className="flex items-center gap-4 mb-10 px-4">
             <div className="h-10 w-1 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
             <h3 className="text-3xl font-bold text-white">Similar Achievements</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBadges.map(b => (
                 <BadgeCard 
                   key={b.id} 
                   achievement={b} 
                   userStats={userStats} 
                   isOwned={isOwned} 
                   onClick={() => onSelectRelated(b.id)} 
                 />
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default BadgeDetailView;