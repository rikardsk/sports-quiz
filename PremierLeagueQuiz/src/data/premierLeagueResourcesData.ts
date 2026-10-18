export type ResourceCategory =
  | 'All'
  | 'Official'
  | 'Stats & Analytics'
  | 'News & Media'
  | 'Fantasy & Market';

export interface PremierLeagueResource {
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
  'News & Media',
  'Fantasy & Market',
];

export const CATEGORY_BADGES: Record<Exclude<ResourceCategory, 'All'>, string> = {
  Official: 'bg-purple-50 text-purple-700 border-purple-200/80',
  'Stats & Analytics': 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  'News & Media': 'bg-blue-50 text-blue-700 border-blue-200/80',
  'Fantasy & Market': 'bg-amber-50 text-amber-700 border-amber-200/80',
};

export const PREMIER_LEAGUE_TABLES_URL = 'https://www.premierleague.com/tables';

export const PREMIER_LEAGUE_RESOURCES: PremierLeagueResource[] = [
  {
    id: 'pl-tables',
    name: 'Premier League Tables & Standings',
    category: 'Official',
    url: PREMIER_LEAGUE_TABLES_URL,
    domain: 'premierleague.com/tables',
    description: 'Official current Premier League league table, live form, goal differences, and European spots.',
    popular: true,
  },
  {
    id: 'pl-official',
    name: 'PremierLeague.com',
    category: 'Official',
    url: 'https://www.premierleague.com',
    domain: 'premierleague.com',
    description: 'The official website of the Premier League with live match fixtures, results, and video highlights.',
    popular: true,
  },
  {
    id: 'fpl',
    name: 'Fantasy Premier League (FPL)',
    category: 'Fantasy & Market',
    url: 'https://fantasy.premierleague.com',
    domain: 'fantasy.premierleague.com',
    description: 'The official Fantasy Premier League game played by over 11 million managers worldwide.',
    popular: true,
  },
  {
    id: 'the-fa',
    name: 'The Football Association (The FA)',
    category: 'Official',
    url: 'https://www.thefa.com',
    domain: 'thefa.com',
    description: 'Governing body of English football, overseeing the FA Cup, grassroots, and national teams.',
  },
  {
    id: 'bbc-sport',
    name: 'BBC Sport Football',
    category: 'News & Media',
    url: 'https://www.bbc.com/sport/football/premier-league',
    domain: 'bbc.com/sport/football',
    description: 'Breaking football news, live text commentaries, and Match of the Day analysis.',
    popular: true,
  },
  {
    id: 'sky-sports',
    name: 'Sky Sports Premier League',
    category: 'News & Media',
    url: 'https://www.skysports.com/premier-league',
    domain: 'skysports.com',
    description: 'Live broadcast reports, Super Sunday breakdowns, and transfer news center.',
    popular: true,
  },
  {
    id: 'the-athletic',
    name: 'The Athletic Football',
    category: 'News & Media',
    url: 'https://theathletic.com/football/premier-league/',
    domain: 'theathletic.com',
    description: 'Deep investigative reporting, tactics breakdowns, and insider club analysis.',
  },
  {
    id: 'transfermarkt',
    name: 'Transfermarkt',
    category: 'Fantasy & Market',
    url: 'https://www.transfermarkt.com/premier-league/startseite/wettbewerb/GB1',
    domain: 'transfermarkt.com',
    description: 'Comprehensive player market values, transfer rumors, contract lengths, and club squad depth.',
    popular: true,
  },
  {
    id: 'fbref',
    name: 'FBref Premier League Stats',
    category: 'Stats & Analytics',
    url: 'https://fbref.com/en/comps/9/Premier-League-Stats',
    domain: 'fbref.com',
    description: 'Detailed Opta-powered expected goals (xG), shot-creating actions, progressive passes, and scouting reports.',
    popular: true,
  },
  {
    id: 'whoscored',
    name: 'WhoScored Premier League',
    category: 'Stats & Analytics',
    url: 'https://www.whoscored.com/Regions/252/Tournaments/2/England-Premier-League',
    domain: 'whoscored.com',
    description: 'Algorithmic player ratings, detailed statistical strengths and weaknesses, and match previews.',
  },
  {
    id: 'understat',
    name: 'Understat xG Analytics',
    category: 'Stats & Analytics',
    url: 'https://understat.com/league/EPL',
    domain: 'understat.com',
    description: 'Interactive expected goals shot maps, team timeline charts, and xG points tables.',
  },
];
