/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

export enum BadgeStatus {
  ACTIVE = 'Active',
  RETIRED = 'Retired',
  UNRELEASED = 'Unreleased',
  PROFILE_HIGHLIGHT = 'Profile Highlight'
}

export interface Tier {
  name: string;
  color: string;
  criteria: string;
  threshold?: number; // Numeric threshold for logic
}

export interface Achievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  howToEarn: string;
  tiers?: Tier[];
  status: BadgeStatus;
  guideSteps: string[];
  imageUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface UserStats {
  username: string;
  avatarUrl: string;
  name: string;
  publicRepos: number;
  followers: number;
  mergedPRs: number;
  totalStars: number;
}
