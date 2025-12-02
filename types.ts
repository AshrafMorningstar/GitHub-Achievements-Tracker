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