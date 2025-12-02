import React, { useState } from 'react';
import { Achievement, BadgeStatus, UserStats } from '../types';
import { ChevronDown, ChevronUp, BookOpen, Lock, CheckCircle, Trophy } from 'lucide-react';

interface BadgeCardProps {
  achievement: Achievement;
  userStats: UserStats | null;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ achievement, userStats }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to determine progress based on badge ID and user stats
  const getProgress = () => {
    if (!userStats) return null;

    let current = 0;
    if (achievement.id === 'pull-shark') {
      current = userStats.mergedPRs;
    } else if (achievement.id === 'starstruck') {
      current = userStats.totalStars;
    } else {
      return null; // Not trackable via this simple API logic
    }

    // Find next tier
    const nextTier = achievement.tiers?.find(t => (t.threshold || 0) > current);
    const maxTier = achievement.tiers?.[achievement.tiers.length - 1];
    
    // If no next tier and we have tiers, we might be maxed out
    const isMaxed = !nextTier && maxTier && current >= (maxTier.threshold || 0);
    const target = nextTier ? nextTier.threshold || 1 : (maxTier?.threshold || 1);
    
    // Calculate percentage
    const percent = Math.min(100, Math.round((current / target) * 100));

    return {
      current,
      target,
      percent,
      nextTierName: nextTier?.name || 'Max Level',
      isMaxed
    };
  };

  const progress = getProgress();

  const getStatusColor = (status: BadgeStatus) => {
    switch (status) {
      case BadgeStatus.ACTIVE:
        return 'text-github-green border-github-green';
      case BadgeStatus.RETIRED:
        return 'text-red-400 border-red-400';
      case BadgeStatus.PROFILE_HIGHLIGHT:
        return 'text-purple-400 border-purple-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="bg-github-card border border-github-border rounded-lg p-4 mb-4 hover:border-github-muted transition-colors duration-200">
      <div className="flex items-start justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-4">
          <div className="text-4xl w-12 h-12 flex items-center justify-center bg-github-darker rounded-full border border-github-border relative">
            {achievement.emoji}
            {progress?.isMaxed && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 text-github-darker rounded-full p-0.5 border border-github-darker" title="Max Level Achieved!">
                <Trophy size={10} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-github-text flex items-center gap-2">
              {achievement.name}
              <span className={`text-xs px-2 py-0.5 border rounded-full ${getStatusColor(achievement.status)}`}>
                {achievement.status}
              </span>
            </h3>
            <p className="text-github-muted text-sm mt-1">{achievement.description}</p>
            
            {/* Progress Bar in Header (Collapsed View) */}
            {progress && (
              <div className="mt-2 w-full max-w-xs">
                <div className="flex justify-between text-xs text-github-muted mb-1">
                  <span>{progress.current} / {progress.isMaxed ? 'Max' : progress.target}</span>
                  <span>{progress.isMaxed ? 'Completed' : `${progress.percent}% to ${progress.nextTierName}`}</span>
                </div>
                <div className="w-full bg-github-darker rounded-full h-1.5 border border-github-border">
                  <div 
                    className={`h-1.5 rounded-full ${progress.isMaxed ? 'bg-yellow-500' : 'bg-github-green'}`} 
                    style={{ width: `${progress.percent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button className="text-github-muted hover:text-github-accent transition-colors self-center">
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-github-border animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Col: Tiers & How To */}
            <div>
              <h4 className="text-sm font-semibold text-github-text uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle size={16} /> How to Earn
              </h4>
              <p className="text-sm text-github-muted mb-4">{achievement.howToEarn}</p>
              
              {achievement.tiers && achievement.tiers.length > 0 && (
                <div className="mb-4">
                   <h4 className="text-sm font-semibold text-github-text uppercase tracking-wider mb-2">Tiers</h4>
                   <div className="space-y-2">
                     {achievement.tiers.map((tier) => {
                       const isUnlocked = progress ? progress.current >= (tier.threshold || 0) : false;
                       return (
                         <div key={tier.name} className={`flex items-center justify-between text-sm p-2 rounded border transition-colors ${isUnlocked ? 'bg-github-hover border-github-green/50' : 'bg-github-darker border-github-border'}`}>
                           <div className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: tier.color }}></span>
                              <span className={`font-medium ${isUnlocked ? 'text-white' : 'text-github-text'}`}>{tier.name}</span>
                              {isUnlocked && <CheckCircle size={12} className="text-github-green" />}
                           </div>
                           <span className="text-github-muted">{tier.criteria}</span>
                         </div>
                       );
                     })}
                   </div>
                </div>
              )}
            </div>

            {/* Right Col: Guide */}
            <div className="bg-github-darker p-4 rounded-lg border border-github-border">
               <h4 className="text-sm font-semibold text-github-accent uppercase tracking-wider mb-3 flex items-center gap-2">
                 <BookOpen size={16} /> Strategy Guide
               </h4>
               <ol className="list-decimal list-inside space-y-2 text-sm text-github-text">
                 {achievement.guideSteps.map((step, idx) => (
                   <li key={idx} className="pl-1 leading-relaxed">
                     <span className="text-github-muted">{step}</span>
                   </li>
                 ))}
               </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;
