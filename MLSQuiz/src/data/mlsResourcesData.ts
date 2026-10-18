export type ResourceCategory =
  | 'All'
  | 'Official'
  | 'Stats & Analytics'
  | 'Cap & Rosters'
  | 'Draft & Scouting'
  | 'News & Coverage';

export interface MLSResource {
  id: string;
  name: string;
  category: Exclude<ResourceCategory, 'All'>;
  url: string;
  domain: string;
  description: string;
  popular?: boolean;
}

// Backwards compatibility aliases
export type NBAResource = MLSResource;
export type NFLResource = MLSResource;

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

export const MLS_STANDINGS_URL = 'https://www.mlssoccer.com/standings/';
export const NBA_STANDINGS_URL = MLS_STANDINGS_URL;
export const NFL_STANDINGS_URL = MLS_STANDINGS_URL;

export const MLS_RESOURCES: MLSResource[] = [
  {
    id: 'mls-standings',
    name: 'MLS Standings',
    category: 'Official',
    url: MLS_STANDINGS_URL,
    domain: 'mlssoccer.com/standings',
    description: 'Official current MLS league standings, conference tables, and Supporters\' Shield race.',
    popular: true,
  },
  {
    id: 'mls-official',
    name: 'MLSSoccer.com',
    category: 'Official',
    url: 'https://www.mlssoccer.com',
    domain: 'mlssoccer.com',
    description: 'The official digital home of Major League Soccer featuring breaking news, match highlights, and video.',
    popular: true,
  },
  {
    id: 'mls-season-pass',
    name: 'MLS Season Pass on Apple TV',
    category: 'Official',
    url: 'https://tv.apple.com/channel/tvs.sbd.7000',
    domain: 'tv.apple.com',
    description: 'Watch every single MLS and Leagues Cup match live with zero local broadcast blackouts.',
    popular: true,
  },
  {
    id: 'soccer-hof',
    name: 'National Soccer Hall of Fame',
    category: 'Official',
    url: 'https://www.nationalsoccerhof.com',
    domain: 'nationalsoccerhof.com',
    description: 'Honoring legends of American soccer, located inside Toyota Stadium in Frisco, Texas.',
    popular: true,
  },
  {
    id: 'mls-store',
    name: 'MLS Store',
    category: 'Official',
    url: 'https://store.mlssoccer.com',
    domain: 'store.mlssoccer.com',
    description: 'Official licensed Major League Soccer jerseys, scarves, headwear, and authentic fan gear.',
  },
  {
    id: 'mls-next-pro',
    name: 'MLS NEXT Pro',
    category: 'Official',
    url: 'https://www.mlsnextpro.com',
    domain: 'mlsnextpro.com',
    description: 'The professional development league bridging elite academy players to MLS first teams.',
  },
  {
    id: 'fbref-mls',
    name: 'FBref MLS Statistics',
    category: 'Stats & Analytics',
    url: 'https://fbref.com/en/squads/competition/MLS/',
    domain: 'fbref.com',
    description: 'Advanced football metrics, expected goals (xG), shot-creating actions, and player profiles.',
    popular: true,
  },
  {
    id: 'asa',
    name: 'American Soccer Analysis',
    category: 'Stats & Analytics',
    url: 'https://www.americansocceranalysis.com',
    domain: 'americansocceranalysis.com',
    description: 'Industry-leading open-source analytics, goals added (g+), and tactical data breakdowns.',
    popular: true,
  },
  {
    id: 'transfermarkt-mls',
    name: 'Transfermarkt MLS',
    category: 'Stats & Analytics',
    url: 'https://www.transfermarkt.us/major-league-soccer/startseite/wettbewerb/MLS1',
    domain: 'transfermarkt.us',
    description: 'Club market valuations, transfer history, player contracts, and international squad stats.',
  },
  {
    id: 'fotmob-mls',
    name: 'FotMob',
    category: 'Stats & Analytics',
    url: 'https://www.fotmob.com/leagues/130/overview/mls',
    domain: 'fotmob.com',
    description: 'Live match tickers, player ratings, tactical lineups, and instant push notification alerts.',
  },
  {
    id: 'mlspa-salaries',
    name: 'MLSPA Salary Guide',
    category: 'Cap & Rosters',
    url: 'https://mlsplayers.org/resources/salary-guide',
    domain: 'mlsplayers.org',
    description: 'Official salary release data directly from the Major League Soccer Players Association.',
    popular: true,
  },
  {
    id: 'mls-roster-rules',
    name: 'MLS Roster Rules & Regulations',
    category: 'Cap & Rosters',
    url: 'https://www.mlssoccer.com/about/roster-rules-and-regulations',
    domain: 'mlssoccer.com/about',
    description: 'Designated Players (DP), GAM, TAM, U22 Initiative slots, and salary budget mechanisms.',
  },
  {
    id: 'capology-mls',
    name: 'Capology MLS Payrolls',
    category: 'Cap & Rosters',
    url: 'https://www.capology.com/us/mls/salaries/',
    domain: 'capology.com',
    description: 'Club payroll totals, weekly wages, and player contract breakdowns across the league.',
  },
  {
    id: 'mls-superdraft',
    name: 'MLS SuperDraft Hub',
    category: 'Draft & Scouting',
    url: 'https://www.mlssoccer.com/superdraft/',
    domain: 'mlssoccer.com/superdraft',
    description: 'Annual draft order, NCAA prospect tracking, mock drafts, and historical selections.',
    popular: true,
  },
  {
    id: 'top-drawer-soccer',
    name: 'TopDrawerSoccer',
    category: 'Draft & Scouting',
    url: 'https://www.topdrawersoccer.com',
    domain: 'topdrawersoccer.com',
    description: 'Premier scouting source for college soccer prospects, academy youth, and national recruiting rankings.',
  },
  {
    id: 'athletic-mls',
    name: 'The Athletic MLS',
    category: 'News & Coverage',
    url: 'https://theathletic.com/football/mls/',
    domain: 'theathletic.com/football/mls',
    description: 'In-depth investigative journalism, trade scoops, tactical breakdowns, and club coverage.',
    popular: true,
  },
  {
    id: 'espn-mls',
    name: 'ESPN Major League Soccer',
    category: 'News & Coverage',
    url: 'https://www.espn.com/soccer/league/_/name/usa.1',
    domain: 'espn.com/soccer',
    description: 'Scores, match recaps, commentary, transfer rumors, and television highlights.',
  },
  {
    id: 'extratime',
    name: 'Extratime Podcast',
    category: 'News & Coverage',
    url: 'https://www.mlssoccer.com/extratime/',
    domain: 'mlssoccer.com/extratime',
    description: 'The premier weekly official audio and video discussion show hosted by MLS personalities.',
  },
];

// Backwards compatibility aliases
export const NBA_RESOURCES = MLS_RESOURCES;
export const NFL_RESOURCES = MLS_RESOURCES;
