import React, { useState } from 'react';
import { Achievement, BadgeStatus } from '../types';
import { ChevronDown, ChevronUp, BookOpen, Lock, CheckCircle } from 'lucide-react';

interface BadgeCardProps {
  achievement: Achievement;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ achievement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div className="text-4xl w-12 h-12 flex items-center justify-center bg-github-darker rounded-full border border-github-border">
            {achievement.emoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-github-text flex items-center gap-2">
              {achievement.name}
              <span className={`text-xs px-2 py-0.5 border rounded-full ${getStatusColor(achievement.status)}`}>
                {achievement.status}
              </span>
            </h3>
            <p className="text-github-muted text-sm mt-1">{achievement.description}</p>
          </div>
        </div>
        <button className="text-github-muted hover:text-github-accent transition-colors">
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
                     {achievement.tiers.map((tier) => (
                       <div key={tier.name} className="flex items-center justify-between text-sm bg-github-darker p-2 rounded border border-github-border">
                         <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }}></span>
                            <span className="font-medium text-github-text">{tier.name}</span>
                         </div>
                         <span className="text-github-muted">{tier.criteria}</span>
                       </div>
                     ))}
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