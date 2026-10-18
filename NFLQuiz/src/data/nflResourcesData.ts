export type ResourceCategory =
  | 'All'
  | 'Official'
  | 'Stats & Analytics'
  | 'Cap & Rosters'
  | 'Draft & Scouting'
  | 'News & Weather';

export interface NFLResource {
  id: string;
  name: string;
  category: Exclude<ResourceCategory, 'All'>;
  url: string;
  domain: string;
  description: string;
  popular?: boolean;
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'All',
  'Official',
  'Stats & Analytics',
  'Cap & Rosters',
  'Draft & Scouting',
  'News & Weather',
];

export const CATEGORY_BADGES: Record<Exclude<ResourceCategory, 'All'>, string> = {
  Official: 'bg-blue-50 text-blue-700 border-blue-200/80',
  'Stats & Analytics': 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  'Cap & Rosters': 'bg-amber-50 text-amber-700 border-amber-200/80',
  'Draft & Scouting': 'bg-purple-50 text-purple-700 border-purple-200/80',
  'News & Weather': 'bg-rose-50 text-rose-700 border-rose-200/80',
};

export const NFL_STANDINGS_URL = 'https://www.nfl.com/standings';

export const NFL_RESOURCES: NFLResource[] = [
  {
    id: 'nfl-standings',
    name: 'NFL Standings',
    category: 'Official',
    url: NFL_STANDINGS_URL,
    domain: 'nfl.com/standings',
    description: 'Official current NFL league standings, division rankings, and playoff picture.',
    popular: true,
  },
  {
    id: 'nfl-official',
    name: 'NFL.com',
    category: 'Official',
    url: 'https://www.nfl.com',
    domain: 'nfl.com',
    description: 'Official home of the National Football League with live scores, schedules, and league updates.',
    popular: true,
  },
  {
    id: 'hof',
    name: 'Pro Football Hall of Fame',
    category: 'Official',
    url: 'https://www.profootballhof.com',
    domain: 'profootballhof.com',
    description: 'The official museum and history hub honoring the greatest legends in Canton, Ohio.',
    popular: true,
  },
  {
    id: 'nfl-operations',
    name: 'NFL Football Operations',
    category: 'Official',
    url: 'https://operations.nfl.com',
    domain: 'operations.nfl.com',
    description: 'Official NFL rulebook, policy manuals, game administration, and officiating mechanics.',
  },
  {
    id: 'nfl-shop',
    name: 'NFL Shop',
    category: 'Official',
    url: 'https://www.nflshop.com',
    domain: 'nflshop.com',
    description: 'Official league gear, licensed jerseys, headwear, and authentic game apparel.',
  },
  {
    id: 'nfl-plus',
    name: 'NFL+ / Game Pass',
    category: 'Official',
    url: 'https://www.nfl.com/plus',
    domain: 'nfl.com/plus',
    description: 'Live local and primetime games, full game replays, and All-22 Coaches Film.',
  },
  {
    id: 'pfr',
    name: 'Pro-Football-Reference',
    category: 'Stats & Analytics',
    url: 'https://www.pro-football-reference.com',
    domain: 'pro-football-reference.com',
    description: 'The premier historical database with comprehensive player statistics, box scores, and leaderboards.',
    popular: true,
  },
  {
    id: 'nextgenstats',
    name: 'Next Gen Stats',
    category: 'Stats & Analytics',
    url: 'https://nextgenstats.nfl.com',
    domain: 'nextgenstats.nfl.com',
    description: 'Advanced player tracking metrics including pass rush separation, top speed, and expected yards.',
    popular: true,
  },
  {
    id: 'espn-nfl',
    name: 'ESPN NFL Central',
    category: 'Stats & Analytics',
    url: 'https://www.espn.com/nfl',
    domain: 'espn.com/nfl',
    description: 'Real-time scores, standings, league statistics, power rankings, and injury reports.',
  },
  {
    id: 'ftn-dvoa',
    name: 'FTN Fantasy & DVOA',
    category: 'Stats & Analytics',
    url: 'https://www.ftnfantasy.com/nfl',
    domain: 'ftnfantasy.com',
    description: 'Advanced opponent-adjusted efficiency metrics, DVOA team ratings, and situational football data.',
  },
  {
    id: 'overthecap',
    name: 'Over The Cap',
    category: 'Cap & Rosters',
    url: 'https://overthecap.com',
    domain: 'overthecap.com',
    description: 'Authoritative salary cap figures, team cap space, player contracts, and dead money breakdowns.',
    popular: true,
  },
  {
    id: 'spotrac-nfl',
    name: 'Spotrac NFL',
    category: 'Cap & Rosters',
    url: 'https://www.spotrac.com/nfl',
    domain: 'spotrac.com/nfl',
    description: 'Financial database covering player compensation, contract clauses, and free agency lists.',
  },
  {
    id: 'ourlads',
    name: 'Ourlads NFL Depth Charts',
    category: 'Cap & Rosters',
    url: 'https://www.ourlads.com/nfldepthcharts',
    domain: 'ourlads.com',
    description: 'Highly regarded, regularly updated unofficial 3-deep depth charts for all 32 franchises.',
  },
  {
    id: 'nfl-draft',
    name: 'NFL Draft Central',
    category: 'Draft & Scouting',
    url: 'https://www.nfl.com/draft',
    domain: 'nfl.com/draft',
    description: 'Official draft prospect tracker, combine results, measurables, and draft order.',
    popular: true,
  },
  {
    id: 'tankathon',
    name: 'Tankathon NFL',
    category: 'Draft & Scouting',
    url: 'https://www.tankathon.com/nfl',
    domain: 'tankathon.com/nfl',
    description: 'Live draft order simulation, strength-of-schedule tracking, and projected draft boards.',
  },
  {
    id: 'draft-network',
    name: 'The Draft Network',
    category: 'Draft & Scouting',
    url: 'https://thedraftnetwork.com',
    domain: 'thedraftnetwork.com',
    description: 'In-depth film breakdowns, scouting reports, mock draft machine, and big boards.',
  },
  {
    id: 'pft',
    name: 'ProFootballTalk (NBC)',
    category: 'News & Weather',
    url: 'https://www.nbcsports.com/nfl/profootballtalk',
    domain: 'nbcsports.com',
    description: 'Fast-moving breaking news, rumors, transaction scoops, and rule debates by Mike Florio.',
    popular: true,
  },
  {
    id: 'the-athletic',
    name: 'The Athletic NFL',
    category: 'News & Weather',
    url: 'https://theathletic.com/nfl',
    domain: 'theathletic.com/nfl',
    description: 'Deep-dive analytical reporting, beat writing, and insider analysis across every team.',
  },
  {
    id: 'nfl-weather',
    name: 'NFL Weather',
    category: 'News & Weather',
    url: 'https://www.nflweather.com',
    domain: 'nflweather.com',
    description: 'Real-time forecasts, wind speeds, and precipitation conditions for all outdoor stadiums.',
  },
];
