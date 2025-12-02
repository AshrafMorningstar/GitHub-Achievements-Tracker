import { Achievement, BadgeStatus } from './types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'pull-shark',
    name: 'Pull Shark',
    emoji: '🦈',
    description: 'Opened pull requests that have been merged.',
    howToEarn: 'Open a Pull Request and have it merged.',
    status: BadgeStatus.ACTIVE,
    tiers: [
      { name: 'Bronze', color: '#cd7f32', criteria: '2 Merged PRs', threshold: 2 },
      { name: 'Silver', color: '#c0c0c0', criteria: '16 Merged PRs', threshold: 16 },
      { name: 'Gold', color: '#ffd700', criteria: '128 Merged PRs', threshold: 128 },
    ],
    guideSteps: [
      'Fork a repository you want to contribute to.',
      'Make a change in a new branch.',
      'Open a Pull Request (PR) to the original repository.',
      'Wait for the maintainer to merge your PR.',
      'Alternatively, create a repo, make a branch, change a file, and merge your own PR.'
    ]
  },
  {
    id: 'yolo',
    name: 'YOLO',
    emoji: '🚀',
    description: 'Merged a pull request without code review.',
    howToEarn: 'Merge a Pull Request without any reviews.',
    status: BadgeStatus.ACTIVE,
    tiers: [
      { name: 'Base', color: '#58a6ff', criteria: '1 Merged PR without review', threshold: 1 }
    ],
    guideSteps: [
      'Create a new repository.',
      'Create a new branch and modify a file (e.g., README.md).',
      'Open a Pull Request.',
      'Immediately merge the Pull Request yourself without requesting a review.',
      'Note: This is easiest to do on your own personal repositories.'
    ]
  },
  {
    id: 'quickdraw',
    name: 'Quickdraw',
    emoji: '🤠',
    description: 'Closed an issue or pull request within 5 minutes of opening.',
    howToEarn: 'Close an issue or PR you opened within 5 minutes.',
    status: BadgeStatus.ACTIVE,
    tiers: [
      { name: 'Base', color: '#58a6ff', criteria: 'Close within 5 mins', threshold: 1 }
    ],
    guideSteps: [
      'Go to one of your repositories.',
      'Create a new Issue.',
      'Wait a few seconds (but less than 5 minutes).',
      'Click "Close Issue".',
      'Alternatively, open a PR and close it immediately.'
    ]
  },
  {
    id: 'pair-extraordinaire',
    name: 'Pair Extraordinaire',
    emoji: '👯',
    description: 'Co-authored commits on merged pull requests.',
    howToEarn: 'Co-author a commit that gets merged.',
    status: BadgeStatus.ACTIVE,
    tiers: [
      { name: 'Bronze', color: '#cd7f32', criteria: '1 Co-authored commit', threshold: 1 },
      { name: 'Silver', color: '#c0c0c0', criteria: '10 Co-authored commits', threshold: 10 },
      { name: 'Gold', color: '#ffd700', criteria: '24 Co-authored commits', threshold: 24 },
    ],
    guideSteps: [
      'Find a friend to collaborate with.',
      'When committing via CLI, add "Co-authored-by: Name <email>" in the commit message footer.',
      'Push the commit and open a PR.',
      'Once merged, both authors receive credit.'
    ]
  },
  {
    id: 'starstruck',
    name: 'Starstruck',
    emoji: '🌟',
    description: 'Created a repository that has many stars.',
    howToEarn: 'Receive stars on your repositories.',
    status: BadgeStatus.ACTIVE,
    tiers: [
      { name: 'Bronze', color: '#cd7f32', criteria: '16 Stars', threshold: 16 },
      { name: 'Silver', color: '#c0c0c0', criteria: '128 Stars', threshold: 128 },
      { name: 'Gold', color: '#ffd700', criteria: '512 Stars', threshold: 512 },
    ],
    guideSteps: [
      'Create a useful open-source project or resource.',
      'Share it on social media, Reddit, or Hacker News.',
      'Maintain the project and engage with the community to gain stars.'
    ]
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    emoji: '🧠',
    description: 'Answered discussions.',
    howToEarn: 'Have your answer marked as correct in a GitHub Discussion.',
    status: BadgeStatus.ACTIVE,
    tiers: [
      { name: 'Bronze', color: '#cd7f32', criteria: '2 Accepted Answers', threshold: 2 },
      { name: 'Silver', color: '#c0c0c0', criteria: '8 Accepted Answers', threshold: 8 },
      { name: 'Gold', color: '#ffd700', criteria: '16 Accepted Answers', threshold: 16 },
    ],
    guideSteps: [
      'Find repositories that use GitHub Discussions.',
      'Look for "Q&A" categories.',
      'Provide helpful answers to user questions.',
      'The original poster must mark your reply as the "Answer".'
    ]
  },
  {
    id: 'arctic-code-vault',
    name: 'Arctic Code Vault',
    emoji: '❄️',
    description: 'Contributed code to repositories archived in the Arctic Code Vault.',
    howToEarn: 'Snapshot taken on 02/02/2020.',
    status: BadgeStatus.RETIRED,
    guideSteps: [
      'This badge is no longer earnable.',
      'It was awarded to users who contributed to qualified public repos before the 2020 snapshot.'
    ]
  },
  {
    id: 'mars-2020',
    name: 'Mars 2020 Contributor',
    emoji: '🚁',
    description: 'Contributed to repositories used in the Mars 2020 Helicopter mission.',
    howToEarn: 'Contributed to specific open source libraries used by NASA.',
    status: BadgeStatus.RETIRED,
    guideSteps: [
      'This badge is no longer earnable.',
      ' awarded to contributors of specific projects (like React, connect, etc.) used in the Ingenuity drone software.'
    ]
  },
  {
    id: 'public-sponsor',
    name: 'Public Sponsor',
    emoji: '💖',
    description: 'Sponsoring open source work via GitHub Sponsors.',
    howToEarn: 'Sponsor a developer or organization.',
    status: BadgeStatus.PROFILE_HIGHLIGHT,
    guideSteps: [
      'Navigate to a user profile or repo.',
      'Click the "Sponsor" button.',
      'Select a tier and complete payment.',
      'Ensure your sponsorship is not private.'
    ]
  },
  {
    id: 'developer-program',
    name: 'Developer Program',
    emoji: '🛠️',
    description: 'Member of the GitHub Developer Program.',
    howToEarn: 'Register for the program.',
    status: BadgeStatus.PROFILE_HIGHLIGHT,
    guideSteps: [
      'Ensure you have 2FA enabled.',
      'Go to developer.github.com/program.',
      'Sign up/Enroll with your account.'
    ]
  },
  {
    id: 'pro',
    name: 'GitHub Pro',
    emoji: '🏆',
    description: 'Subscriber to GitHub Pro.',
    howToEarn: 'Pay for GitHub Pro subscription.',
    status: BadgeStatus.PROFILE_HIGHLIGHT,
    guideSteps: [
      'Go to Settings > Billing.',
      'Upgrade your plan to Pro.'
    ]
  }
];
