import React, { useState, useMemo } from 'react';
import { ACHIEVEMENTS } from './constants';
import { BadgeStatus } from './types';
import BadgeCard from './components/BadgeCard';
import GeminiAdvisor from './components/GeminiAdvisor';
import StatsVisualizer from './components/StatsVisualizer';
import { Github, AlertTriangle, Book, Search, Filter } from 'lucide-react';

const App: React.FC = () => {
  const [filter, setFilter] = useState<BadgeStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter(a => {
      const matchesFilter = filter === 'ALL' || a.status === filter;
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || 
                            a.description.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="min-h-screen bg-github-dark pb-20">
      {/* Header */}
      <header className="bg-github-card border-b border-github-border py-4 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Github className="text-github-text w-8 h-8" />
            <h1 className="text-xl font-bold text-github-text tracking-tight">GitHub Achievements Tracker</h1>
          </div>
          <a href="https://github.com/drknzz/GitHub-Achievements" target="_blank" rel="noreferrer" className="text-sm text-github-accent hover:underline hidden md:block">
            Contribution Source
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar / Controls */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-github-card border border-github-border rounded-lg p-4 sticky top-24">
            <div className="mb-6">
              <label className="text-xs font-semibold text-github-muted uppercase tracking-wider mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-github-muted w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Find a badge..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-github-darker border border-github-border rounded-md pl-9 pr-3 py-2 text-sm text-github-text focus:outline-none focus:border-github-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-github-muted uppercase tracking-wider mb-2 block flex items-center gap-2">
                <Filter size={12} /> Filter by Status
              </label>
              <div className="space-y-1">
                <button 
                  onClick={() => setFilter('ALL')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filter === 'ALL' ? 'bg-github-accent text-white' : 'text-github-muted hover:text-github-text hover:bg-github-hover'}`}
                >
                  All Badges
                </button>
                <button 
                  onClick={() => setFilter(BadgeStatus.ACTIVE)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filter === BadgeStatus.ACTIVE ? 'bg-github-accent text-white' : 'text-github-muted hover:text-github-text hover:bg-github-hover'}`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setFilter(BadgeStatus.PROFILE_HIGHLIGHT)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filter === BadgeStatus.PROFILE_HIGHLIGHT ? 'bg-github-accent text-white' : 'text-github-muted hover:text-github-text hover:bg-github-hover'}`}
                >
                  Highlights
                </button>
                <button 
                  onClick={() => setFilter(BadgeStatus.RETIRED)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filter === BadgeStatus.RETIRED ? 'bg-github-accent text-white' : 'text-github-muted hover:text-github-text hover:bg-github-hover'}`}
                >
                  Retired
                </button>
              </div>
            </div>
          </div>
          
          <StatsVisualizer achievements={ACHIEVEMENTS} />
        </aside>

        {/* Main Content */}
        <section className="lg:col-span-9">
          
          {/* Intro Card */}
          <div className="bg-gradient-to-r from-github-card to-github-darker border border-github-border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-github-text mb-2">Unlock Your Potential</h2>
            <p className="text-github-muted leading-relaxed">
              GitHub Achievements are digital badges displayed on your profile that celebrate milestones, contributions, and engagement. 
              Use this guide to track, understand, and unlock every available badge.
            </p>
          </div>

          {/* List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
               <h3 className="text-lg font-semibold text-github-text">
                 {filter === 'ALL' ? 'All Badges' : `${filter} Badges`}
               </h3>
               <span className="text-sm text-github-muted">{filteredAchievements.length} results</span>
            </div>

            {filteredAchievements.length > 0 ? (
              filteredAchievements.map(achievement => (
                <BadgeCard key={achievement.id} achievement={achievement} />
              ))
            ) : (
              <div className="text-center py-12 border border-github-border border-dashed rounded-lg">
                <p className="text-github-muted">No badges found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Troubleshooting Section */}
          <div className="mt-12 bg-github-card border border-github-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-github-text mb-4 flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" /> Troubleshooting
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-github-text text-sm">Why isn't my badge showing?</h4>
                <ul className="list-disc list-inside text-sm text-github-muted space-y-1">
                  <li>Processing can take up to 24 hours.</li>
                  <li>Check "Show private contributions" settings.</li>
                  <li>Forked repo work must be merged upstream.</li>
                  <li>Ensure your commit email matches your account.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-github-text text-sm">Common Issues</h4>
                <ul className="list-disc list-inside text-sm text-github-muted space-y-1">
                  <li>Changes not on the default branch.</li>
                  <li>One-time achievements (Quickdraw) already claimed.</li>
                  <li>Browser cache (try hard refreshing).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contribution */}
          <div className="mt-8 p-4 bg-github-darker border border-github-border rounded-lg flex items-center gap-4">
             <Book className="text-github-accent flex-shrink-0" />
             <div>
               <h4 className="font-bold text-github-text text-sm">Contribute to this Guide</h4>
               <p className="text-xs text-github-muted mt-1">
                 This resource is community-maintained. Found a new badge? 
                 Submit an issue or PR to the repository.
               </p>
             </div>
          </div>
        </section>
      </main>

      <GeminiAdvisor />
    </div>
  );
};

export default App;