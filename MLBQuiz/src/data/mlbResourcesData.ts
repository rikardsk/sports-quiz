export type ResourceCategory =
  | 'All'
  | 'Official'
  | 'Stats & Analytics'
  | 'Contracts & Payroll'
  | 'Prospects & Draft'
  | 'News & Coverage';

export interface MLBResource {
  id: string;
  name: string;
  category: Exclude<ResourceCategory, 'All'>;
  url: string;
  domain: string;
  description: string;
  popular?: boolean;
}

// Backwards compatibility aliases
export type NBAResource = MLBResource;
export type NFLResource = MLBResource;

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'All',
  'Official',
  'Stats & Analytics',
  'Contracts & Payroll',
  'Prospects & Draft',
  'News & Coverage',
];

export const CATEGORY_BADGES: Record<Exclude<ResourceCategory, 'All'>, string> = {
  Official: 'bg-blue-50 text-blue-700 border-blue-200/80',
  'Stats & Analytics': 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  'Contracts & Payroll': 'bg-amber-50 text-amber-700 border-amber-200/80',
  'Prospects & Draft': 'bg-purple-50 text-purple-700 border-purple-200/80',
  'News & Coverage': 'bg-rose-50 text-rose-700 border-rose-200/80',
};

export const MLB_STANDINGS_URL = 'https://www.mlb.com/standings';
// Backwards compatibility aliases
export const NBA_STANDINGS_URL = MLB_STANDINGS_URL;
export const NFL_STANDINGS_URL = MLB_STANDINGS_URL;

export const MLB_RESOURCES: MLBResource[] = [
  {
    id: 'mlb-standings',
    name: 'MLB Standings',
    category: 'Official',
    url: MLB_STANDINGS_URL,
    domain: 'mlb.com/standings',
    description: 'Official current MLB division standings, wild card races, magic numbers, and postseason brackets.',
    popular: true,
  },
  {
    id: 'mlb-official',
    name: 'MLB.com',
    category: 'Official',
    url: 'https://www.mlb.com',
    domain: 'mlb.com',
    description: 'Official portal of Major League Baseball with live game feeds, video highlights, breaking news, and schedules.',
    popular: true,
  },
  {
    id: 'bbhof',
    name: 'National Baseball Hall of Fame',
    category: 'Official',
    url: 'https://baseballhall.org',
    domain: 'baseballhall.org',
    description: 'The historic sanctuary honoring legendary players, managers, and pioneers in Cooperstown, New York.',
    popular: true,
  },
  {
    id: 'mlb-rulebook',
    name: 'MLB Official Rules & Glossary',
    category: 'Official',
    url: 'https://www.mlb.com/glossary/rules',
    domain: 'mlb.com/glossary',
    description: 'Official Major League Baseball rules, pitch timer explanations, shift restrictions, and replay review regulations.',
  },
  {
    id: 'mlb-shop',
    name: 'MLB Shop',
    category: 'Official',
    url: 'https://www.mlbshop.com',
    domain: 'mlbshop.com',
    description: 'Official licensed MLB jerseys, authentic on-field caps, apparel, memorabilia, and collectibles.',
  },
  {
    id: 'mlb-tv',
    name: 'MLB.TV Live Streaming',
    category: 'Official',
    url: 'https://www.mlb.com/live-stream-games/subscribe',
    domain: 'mlb.com/tv',
    description: 'Stream live out-of-market games in HD, listen to home and away radio broadcasts, and watch archived games.',
  },
  {
    id: 'baseball-reference',
    name: 'Baseball-Reference',
    category: 'Stats & Analytics',
    url: 'https://www.baseball-reference.com',
    domain: 'baseball-reference.com',
    description: 'The definitive baseball encyclopedia featuring historical box scores, bWAR, award histories, and player careers.',
    popular: true,
  },
  {
    id: 'fangraphs',
    name: 'FanGraphs',
    category: 'Stats & Analytics',
    url: 'https://www.fangraphs.com',
    domain: 'fangraphs.com',
    description: 'Advanced sabermetrics hub tracking fWAR, wRC+, wOBA, Stuff+, playoff odds, and analytical breakdowns.',
    popular: true,
  },
  {
    id: 'statcast',
    name: 'Baseball Savant (Statcast)',
    category: 'Stats & Analytics',
    url: 'https://baseballsavant.mlb.com',
    domain: 'baseballsavant.mlb.com',
    description: 'High-resolution Statcast data featuring exit velocities, launch angles, pitch tracking, barrel rates, and arm strength.',
    popular: true,
  },
  {
    id: 'brooks-baseball',
    name: 'Brooks Baseball',
    category: 'Stats & Analytics',
    url: 'https://www.brooksbaseball.net',
    domain: 'brooksbaseball.net',
    description: 'Detailed pitch-by-pitch trajectory breakdowns, pitch movement charts, release points, and velocity trends.',
  },
  {
    id: 'spotrac-mlb',
    name: 'Spotrac MLB Payrolls',
    category: 'Contracts & Payroll',
    url: 'https://www.spotrac.com/mlb',
    domain: 'spotrac.com/mlb',
    description: 'Complete MLB salary database tracking active contracts, luxury tax payrolls, luxury tax thresholds, and free agency classes.',
    popular: true,
  },
  {
    id: 'roster-resource',
    name: 'RosterResource (FanGraphs)',
    category: 'Contracts & Payroll',
    url: 'https://www.fangraphs.com/roster-resource',
    domain: 'fangraphs.com/roster-resource',
    description: 'Depth charts, 26-man and 40-man roster tracking, luxury tax payrolls, options status, and injury reports.',
    popular: true,
  },
  {
    id: 'cots-baseball',
    name: 'Cot\'s Baseball Contracts',
    category: 'Contracts & Payroll',
    url: 'https://legacy.baseballprospectus.com/compensation/cots',
    domain: 'baseballprospectus.com/cots',
    description: 'Detailed contract clauses, vesting options, deferrals, and salary commitments maintained by Baseball Prospectus.',
  },
  {
    id: 'mlb-pipeline',
    name: 'MLB Pipeline',
    category: 'Prospects & Draft',
    url: 'https://www.mlb.com/pipeline',
    domain: 'mlb.com/pipeline',
    description: 'Official top 100 prospect lists, organization top 30 rankings, scouting grades (20-80 scale), and MLB Draft coverage.',
    popular: true,
  },
  {
    id: 'baseball-america',
    name: 'Baseball America',
    category: 'Prospects & Draft',
    url: 'https://www.baseballamerica.com',
    domain: 'baseballamerica.com',
    description: 'The premier authority on prospect scouting, minor league player development, international signings, and college baseball.',
    popular: true,
  },
  {
    id: 'mlb-trade-rumors',
    name: 'MLB Trade Rumors',
    category: 'News & Coverage',
    url: 'https://www.mlbtraderumors.com',
    domain: 'mlbtraderumors.com',
    description: 'Up-to-the-minute trade rumors, free agent signings, arbitration projections, and roster transaction analysis.',
    popular: true,
  },
  {
    id: 'the-athletic-mlb',
    name: 'The Athletic MLB',
    category: 'News & Coverage',
    url: 'https://theathletic.com/mlb',
    domain: 'theathletic.com/mlb',
    description: 'Investigative reporting, beat writer team coverage, Ken Rosenthal insider scoops, and long-form features.',
    popular: true,
  },
  {
    id: 'sabr',
    name: 'SABR (Society for American Baseball Research)',
    category: 'News & Coverage',
    url: 'https://sabr.org',
    domain: 'sabr.org',
    description: 'Dedicated to preserving baseball history, conducting cutting-edge research, and publishing authoritative biographies.',
  },
  {
    id: 'espn-mlb',
    name: 'ESPN MLB',
    category: 'News & Coverage',
    url: 'https://www.espn.com/mlb',
    domain: 'espn.com/mlb',
    description: 'Live scores, expert power rankings, Sunday Night Baseball broadcasts, and columnist insights.',
  },
];

// Backwards compatibility aliases
export const NBA_RESOURCES = MLB_RESOURCES;
export const NFL_RESOURCES = MLB_RESOURCES;
