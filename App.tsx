import React, { useState, useMemo, useEffect } from 'react';
import { ACHIEVEMENTS } from './constants';
import { BadgeStatus, UserStats } from './types';
import BadgeCard from './components/BadgeCard';
import BadgeDetailView from './components/BadgeDetailModal'; // Kept filename for diff simplicity
import GuideWidget from './components/GeminiAdvisor'; // Kept filename
import StatsVisualizer from './components/StatsVisualizer';
import ProfileStats from './components/ProfileStats';
import { fetchUserStats } from './services/githubService';
import { Github, Search, Filter, User, Loader2, ArrowRight, Sun, Moon, Trophy, Lock, SlidersHorizontal, LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  // Theme (Dark Mode Default for Premium Feel)
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // State
  const [headerSearch, setHeaderSearch] = useState('');
  const [filterOwned, setFilterOwned] = useState<'all' | 'owned' | 'unowned'>('all');
  const [sortOption, setSortOption] = useState<'name' | 'status' | 'rarity'>('rarity');
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  
  // User Data
  const [usernameInput, setUsernameInput] = useState('');
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userError, setUserError] = useState('');
  
  // Manual Collection
  const [manualOwnedIds, setManualOwnedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('manualOwnedIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('manualOwnedIds', JSON.stringify(Array.from(manualOwnedIds)));
  }, [manualOwnedIds]);

  const isBadgeOwned = (id: string) => {
    if (manualOwnedIds.has(id)) return true;
    if (userStats) {
      if (id === 'pull-shark' && userStats.mergedPRs >= 2) return true;
      if (id === 'starstruck' && userStats.totalStars >= 16) return true;
    }
    return false;
  };

  const toggleManualOwn = (id: string) => {
    setManualOwnedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const processedAchievements = useMemo(() => {
    let result = ACHIEVEMENTS.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(headerSearch.toLowerCase()) || 
                            a.description.toLowerCase().includes(headerSearch.toLowerCase());
      const owned = isBadgeOwned(a.id);
      const matchesOwned = filterOwned === 'all' || 
                           (filterOwned === 'owned' && owned) || 
                           (filterOwned === 'unowned' && !owned);
      return matchesSearch && matchesOwned;
    });

    result.sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'status') return a.status.localeCompare(b.status);
      if (sortOption === 'rarity') {
         const getScore = (status: BadgeStatus) => {
             if (status === BadgeStatus.PROFILE_HIGHLIGHT) return 3;
             if (status === BadgeStatus.ACTIVE) return 2;
             return 1;
         };
         return getScore(b.status) - getScore(a.status) || a.name.localeCompare(b.name);
      }
      return 0;
    });
    return result;
  }, [headerSearch, filterOwned, sortOption, manualOwnedIds, userStats]);

  const earnableAchievements = processedAchievements.filter(a => a.status !== BadgeStatus.RETIRED);
  const retiredAchievements = processedAchievements.filter(a => a.status === BadgeStatus.RETIRED);
  const selectedBadge = ACHIEVEMENTS.find(a => a.id === selectedBadgeId);

  const handleUserSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    setIsLoadingUser(true);
    setUserError('');
    try {
      const stats = await fetchUserStats(usernameInput.trim());
      if (stats) {
        setUserStats(stats);
        setUsernameInput('');
      } else {
        setUserError('User not found.');
      }
    } catch (err) {
      setUserError('Failed to fetch user data.');
    } finally {
      setIsLoadingUser(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 font-sans text-github-text relative overflow-x-hidden selection:bg-github-accent/30 selection:text-white">
      
      {/* --- Premium Animated Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-github-dark">
         {/* Moving Gradient Orbs */}
         <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] animate-blob mix-blend-screen"></div>
         <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] animate-blob mix-blend-screen" style={{ animationDelay: '2s' }}></div>
         <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] animate-blob mix-blend-screen" style={{ animationDelay: '4s' }}></div>
         {/* Noise Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] brightness-100 contrast-150"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-github-border/30 bg-[#030014]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setSelectedBadgeId(null)}>
            <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
               <Github size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">GitHub Achievements</h1>
              <p className="text-[10px] text-github-muted uppercase tracking-widest font-semibold">Premium Tracker</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 w-full md:w-auto max-w-md relative group">
             <Search className="absolute left-4 top-3 text-github-muted w-4 h-4 transition-colors group-focus-within:text-github-accent" />
             <input 
               type="text" 
               placeholder="Search database..." 
               value={headerSearch}
               onChange={(e) => setHeaderSearch(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-github-muted/50 focus:outline-none focus:border-github-accent/50 focus:bg-white/10 transition-all shadow-inner"
             />
          </div>

          <a href="#" className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-github-muted hover:text-white border border-white/5 hover:border-white/20 transition-all bg-white/5 hover:bg-white/10">
            <Github size={14} /> Contribute
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar */}
          <aside className={`lg:col-span-3 space-y-8 transition-opacity duration-500 ${selectedBadgeId ? 'hidden lg:block lg:opacity-50 lg:pointer-events-none' : 'block'}`}>
            {!userStats ? (
              <div className="glass-panel rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-github-accent/10 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none"></div>
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <User size={16} className="text-github-accent" /> Connect Profile
                </h3>
                <form onSubmit={handleUserSearch} className="relative">
                  <input 
                    type="text" 
                    placeholder="username" 
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-github-accent transition-all font-mono"
                  />
                  <button 
                    type="submit" 
                    disabled={isLoadingUser || !usernameInput}
                    className="absolute right-2 top-2 p-1.5 text-github-muted hover:text-white rounded-lg transition-colors"
                  >
                    {isLoadingUser ? <Loader2 size={14} className="animate-spin"/> : <ArrowRight size={14} />}
                  </button>
                </form>
              </div>
            ) : (
              <ProfileStats stats={userStats} onClear={() => setUserStats(null)} />
            )}
            <StatsVisualizer achievements={ACHIEVEMENTS} />
          </aside>

          {/* Content Area */}
          <section className="lg:col-span-9 min-h-[80vh]">
            
            {selectedBadgeId && selectedBadge ? (
              // --- DETAIL VIEW ---
              <BadgeDetailView 
                achievement={selectedBadge}
                userStats={userStats}
                isOwned={isBadgeOwned(selectedBadgeId)}
                onBack={() => setSelectedBadgeId(null)}
                onToggleOwn={() => toggleManualOwn(selectedBadgeId)}
                onSelectRelated={(id) => setSelectedBadgeId(id)}
              />
            ) : (
              // --- GALLERY GRID ---
              <div className="space-y-10 animate-fade-in">
                {/* Controls */}
                <div className="flex flex-wrap items-center gap-4 justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white tracking-tight">Gallery</h2>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <select 
                        value={filterOwned} 
                        onChange={(e) => setFilterOwned(e.target.value as any)}
                        className="appearance-none bg-white/5 border border-white/10 text-github-muted text-xs font-bold uppercase tracking-wider rounded-lg pl-4 pr-8 py-2.5 hover:bg-white/10 cursor-pointer focus:outline-none"
                      >
                        <option value="all">View All</option>
                        <option value="owned">Collected</option>
                        <option value="unowned">Missing</option>
                      </select>
                      <Filter size={12} className="absolute right-3 top-3 text-github-muted pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select 
                        value={sortOption} 
                        onChange={(e) => setSortOption(e.target.value as any)}
                        className="appearance-none bg-white/5 border border-white/10 text-github-muted text-xs font-bold uppercase tracking-wider rounded-lg pl-4 pr-8 py-2.5 hover:bg-white/10 cursor-pointer focus:outline-none"
                      >
                        <option value="rarity">Rarity</option>
                        <option value="name">Name</option>
                        <option value="status">Status</option>
                      </select>
                      <LayoutGrid size={12} className="absolute right-3 top-3 text-github-muted pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Grid */}
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {earnableAchievements.map((achievement, idx) => (
                      <div key={achievement.id} style={{ animationDelay: `${idx * 0.05}s` }} className="animate-slide-up">
                        <BadgeCard 
                          achievement={achievement} 
                          userStats={userStats}
                          isOwned={isBadgeOwned(achievement.id)}
                          onClick={() => setSelectedBadgeId(achievement.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {retiredAchievements.length > 0 && (
                    <div className="pt-12 border-t border-white/5">
                      <div className="flex items-center gap-3 mb-8 opacity-60">
                         <Lock size={18} />
                         <h3 className="text-xl font-bold">Legacy Archive</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                        {retiredAchievements.map((achievement) => (
                          <BadgeCard 
                            key={achievement.id}
                            achievement={achievement} 
                            userStats={userStats}
                            isOwned={isBadgeOwned(achievement.id)}
                            onClick={() => setSelectedBadgeId(achievement.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <GuideWidget />
    </div>
  );
};

export default App;