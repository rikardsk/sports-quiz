export type ResourceCategory =
  | 'All'
  | 'Official'
  | 'Stats & Analytics'
  | 'Cap & Rosters'
  | 'Draft & Scouting'
  | 'News & Coverage';

export interface NBAResource {
  id: string;
  name: string;
  category: Exclude<ResourceCategory, 'All'>;
  url: string;
  domain: string;
  description: string;
  popular?: boolean;
}

// Backwards compatibility alias
export type NFLResource = NBAResource;

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'All',
  'Official',
  'Stats & Analytics',
  'Cap & Rosters',
  'Draft & Scouting',
  'News & Coverage',
];

export const CATEGORY_BADGES: Record<Exclude<ResourceCategory, 'All'>, string> = {
  Official: 'bg-blue-50 text-blue-700 border-blue-200/80',
  'Stats & Analytics': 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  'Cap & Rosters': 'bg-amber-50 text-amber-700 border-amber-200/80',
  'Draft & Scouting': 'bg-purple-50 text-purple-700 border-purple-200/80',
  'News & Coverage': 'bg-rose-50 text-rose-700 border-rose-200/80',
};

export const NBA_STANDINGS_URL = 'https://www.nba.com/standings';
// Backwards compatibility alias
export const NFL_STANDINGS_URL = NBA_STANDINGS_URL;

export const NBA_RESOURCES: NBAResource[] = [
  {
    id: 'nba-standings',
    name: 'NBA Standings',
    category: 'Official',
    url: NBA_STANDINGS_URL,
    domain: 'nba.com/standings',
    description: 'Official current NBA league standings, conference rankings, and play-in tournament picture.',
    popular: true,
  },
  {
    id: 'nba-official',
    name: 'NBA.com',
    category: 'Official',
    url: 'https://www.nba.com',
    domain: 'nba.com',
    description: 'Official home of the National Basketball Association with live scores, highlights, and game updates.',
    popular: true,
  },
  {
    id: 'hof',
    name: 'Naismith Basketball Hall of Fame',
    category: 'Official',
    url: 'https://www.hoophall.com',
    domain: 'hoophall.com',
    description: 'The official museum and history hub honoring the greatest legends in Springfield, Massachusetts.',
    popular: true,
  },
  {
    id: 'nba-official-ops',
    name: 'NBA Official (Referee & Ops)',
    category: 'Official',
    url: 'https://official.nba.com',
    domain: 'official.nba.com',
    description: 'Official NBA rulebook, referee assignments, replay center explanations, and Last Two Minute (L2M) reports.',
  },
  {
    id: 'nba-store',
    name: 'NBA Store',
    category: 'Official',
    url: 'https://store.nba.com',
    domain: 'store.nba.com',
    description: 'Official licensed NBA jerseys, apparel, headwear, City Edition gear, and collectibles.',
  },
  {
    id: 'nba-league-pass',
    name: 'NBA League Pass',
    category: 'Official',
    url: 'https://www.nba.com/watch/league-pass-stream',
    domain: 'nba.com/watch',
    description: 'Stream live out-of-market games, condensed replays, classic matchups, and multiple camera angles.',
  },
  {
    id: 'bball-ref',
    name: 'Basketball-Reference',
    category: 'Stats & Analytics',
    url: 'https://www.basketball-reference.com',
    domain: 'basketball-reference.com',
    description: 'The premier historical basketball database featuring career statistics, advanced box scores, BPM, and VORP.',
    popular: true,
  },
  {
    id: 'nba-stats',
    name: 'NBA Official Stats',
    category: 'Stats & Analytics',
    url: 'https://www.nba.com/stats',
    domain: 'nba.com/stats',
    description: 'Comprehensive player tracking metrics, shot charts, lineup net ratings, and clutch performance data.',
    popular: true,
  },
  {
    id: 'espn-nba',
    name: 'ESPN NBA Hub',
    category: 'Stats & Analytics',
    url: 'https://www.espn.com/nba',
    domain: 'espn.com/nba',
    description: 'Real-time scores, standings, league statistics, power rankings, and injury reports.',
  },
  {
    id: 'cleaning-the-glass',
    name: 'Cleaning the Glass',
    category: 'Stats & Analytics',
    url: 'https://cleaningtheglass.com',
    domain: 'cleaningtheglass.com',
    description: 'Advanced efficiency ratings, lineup combinations, and garbage-time-filtered basketball analytics by Ben Falk.',
  },
  {
    id: 'spotrac-nba',
    name: 'Spotrac NBA',
    category: 'Cap & Rosters',
    url: 'https://www.spotrac.com/nba',
    domain: 'spotrac.com/nba',
    description: 'Financial salary cap breakdowns, luxury tax aprons, player contract details, and trade exceptions.',
    popular: true,
  },
  {
    id: 'hoopshype',
    name: 'HoopsHype Salaries',
    category: 'Cap & Rosters',
    url: 'https://hoopshype.com/salaries',
    domain: 'hoopshype.com/salaries',
    description: 'Comprehensive team payrolls, individual player salaries, and contract clause breakdowns.',
  },
  {
    id: 'realgm',
    name: 'RealGM Basketball',
    category: 'Cap & Rosters',
    url: 'https://basketball.realgm.com',
    domain: 'basketball.realgm.com',
    description: 'In-depth transaction logs, future traded draft picks ledger, rosters, and international scouting.',
  },
  {
    id: 'tankathon',
    name: 'Tankathon NBA',
    category: 'Draft & Scouting',
    url: 'https://www.tankathon.com',
    domain: 'tankathon.com',
    description: 'Live NBA draft lottery odds simulator, reverse standings, power rankings, and mock draft boards.',
    popular: true,
  },
  {
    id: 'ringer-draft',
    name: 'The Ringer NBA Draft Guide',
    category: 'Draft & Scouting',
    url: 'https://nbadraft.theringer.com',
    domain: 'nbadraft.theringer.com',
    description: 'Detailed prospect scouting reports, video breakdowns, player comparisons, and draft rankings by Kevin O’Connor.',
    popular: true,
  },
  {
    id: 'nba-draft-official',
    name: 'NBA Draft Central',
    category: 'Draft & Scouting',
    url: 'https://www.nba.com/draft',
    domain: 'nba.com/draft',
    description: 'Official draft prospect profiles, combine measurement stats, official draft order, and news.',
  },
  {
    id: 'the-athletic-nba',
    name: 'The Athletic NBA',
    category: 'News & Coverage',
    url: 'https://theathletic.com/nba',
    domain: 'theathletic.com/nba',
    description: 'In-depth investigative journalism, beat writing for all 30 teams, and trade scoop coverage.',
    popular: true,
  },
  {
    id: 'hoops-rumors',
    name: 'Hoops Rumors',
    category: 'News & Coverage',
    url: 'https://www.hoopsrumors.com',
    domain: 'hoopsrumors.com',
    description: 'Fast-moving reports on NBA trades, free agent negotiations, 10-day signings, and waiver wire transactions.',
  },
  {
    id: 'bleacher-report-nba',
    name: 'Bleacher Report NBA',
    category: 'News & Coverage',
    url: 'https://bleacherreport.com/nba',
    domain: 'bleacherreport.com/nba',
    description: 'Viral highlights, culture, power rankings, and breaking news alerts across the association.',
  },
];

// Backwards compatibility alias
export const NFL_RESOURCES = NBA_RESOURCES;
