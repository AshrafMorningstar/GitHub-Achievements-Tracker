/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { ACHIEVEMENTS } from "../constants";

// This service is now strictly local logic. No AI involvement.
// It searches the predefined constants to provide helpful guide information.

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  // Simulate a brief "processing" delay for natural UI feel
  await new Promise(resolve => setTimeout(resolve, 600));

  const lowerPrompt = userPrompt.toLowerCase();

  // 1. Keyword Matching Strategy
  const foundAchievement = ACHIEVEMENTS.find(a => 
    lowerPrompt.includes(a.name.toLowerCase()) || 
    lowerPrompt.includes(a.id.toLowerCase())
  );

  if (foundAchievement) {
    return `
### **${foundAchievement.emoji} ${foundAchievement.name} Strategy**

${foundAchievement.description}

**Official Requirements:**
${foundAchievement.howToEarn}

**Step-by-Step Guide:**
${foundAchievement.guideSteps.map(step => `- ${step}`).join('\n')}

${foundAchievement.tiers ? `**Tiers:**\n${foundAchievement.tiers.map(t => `- **${t.name}**: ${t.criteria}`).join('\n')}` : ''}
    `;
  }

  // 2. General Help Matching
  if (lowerPrompt.includes('stat') || lowerPrompt.includes('track') || lowerPrompt.includes('connect')) {
    return `
### **Tracking Your Stats**
You can connect your real GitHub profile by entering your username in the sidebar input field. 
This will automatically check your eligibility for badges like **Pull Shark** and **Starstruck** based on real data.
    `;
  }

  // 3. Fallback
  return `
### **How can I help?**
I am your interactive Profile Guide. I can help you with:

- **Specific Badges**: Ask about "YOLO", "Pull Shark", or "Quickdraw".
- **Strategies**: Ask "How to get stars?" or "How to merge PRs?".
- **Profile Tips**: Ask how to improve your GitHub presence.

*Type the name of a badge to see its detailed guide.*
  `;
};