export type ResourceCategory =
  | 'All'
  | 'Official'
  | 'Stats & Analytics'
  | 'Cap & Rosters'
  | 'Draft & Scouting'
  | 'News & Coverage';

export interface NHLResource {
  id: string;
  name: string;
  category: Exclude<ResourceCategory, 'All'>;
  url: string;
  domain: string;
  description: string;
  popular?: boolean;
}

// Backwards compatibility aliases
export type NBAResource = NHLResource;
export type NFLResource = NHLResource;

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

export const NHL_STANDINGS_URL = 'https://www.nhl.com/standings';
// Backwards compatibility aliases
export const NBA_STANDINGS_URL = NHL_STANDINGS_URL;
export const NFL_STANDINGS_URL = NHL_STANDINGS_URL;

export const NHL_RESOURCES: NHLResource[] = [
  {
    id: 'nhl-standings',
    name: 'NHL Standings',
    category: 'Official',
    url: NHL_STANDINGS_URL,
    domain: 'nhl.com/standings',
    description: 'Official current NHL league standings, division rankings, wild card races, and playoff matchups.',
    popular: true,
  },
  {
    id: 'nhl-official',
    name: 'NHL.com',
    category: 'Official',
    url: 'https://www.nhl.com',
    domain: 'nhl.com',
    description: 'Official home of the National Hockey League featuring live scores, game highlights, video recaps, and breaking news.',
    popular: true,
  },
  {
    id: 'hhof',
    name: 'Hockey Hall of Fame',
    category: 'Official',
    url: 'https://www.hhof.com',
    domain: 'hhof.com',
    description: 'The official museum and historical sanctuary honoring hockey legends and home of the authentic Stanley Cup in Toronto.',
    popular: true,
  },
  {
    id: 'nhl-rulebook',
    name: 'NHL Situation Room & Video Rulebook',
    category: 'Official',
    url: 'https://www.nhl.com/info/video-rulebook',
    domain: 'nhl.com/info',
    description: 'Official NHL rulebook interpretations, video review situational breakdowns, and Department of Player Safety rulings.',
  },
  {
    id: 'nhl-shop',
    name: 'NHL Shop',
    category: 'Official',
    url: 'https://shop.nhl.com',
    domain: 'shop.nhl.com',
    description: 'Official licensed NHL jerseys, authentic on-ice sweaters, apparel, hats, and collectible hockey gear.',
  },
  {
    id: 'nhl-tv',
    name: 'NHL.tv & ESPN+ Streaming',
    category: 'Official',
    url: 'https://www.nhl.com/subscribe',
    domain: 'nhl.com/subscribe',
    description: 'Stream live out-of-market NHL games, condensed 10-minute game replays, and full broadcast archives.',
  },
  {
    id: 'hockey-ref',
    name: 'Hockey-Reference',
    category: 'Stats & Analytics',
    url: 'https://www.hockey-reference.com',
    domain: 'hockey-reference.com',
    description: 'Comprehensive historical encyclopedia covering all-time player stats, goalie records, box scores, and Stanley Cup history.',
    popular: true,
  },
  {
    id: 'natural-stat-trick',
    name: 'Natural Stat Trick',
    category: 'Stats & Analytics',
    url: 'https://www.naturalstattrick.com',
    domain: 'naturalstattrick.com',
    description: 'Industry-standard advanced hockey analytics featuring 5v5 metrics, expected goals (xG), Corsi, Fenwick, and high-danger chances.',
    popular: true,
  },
  {
    id: 'moneypuck',
    name: 'MoneyPuck',
    category: 'Stats & Analytics',
    url: 'https://moneypuck.com',
    domain: 'moneypuck.com',
    description: 'Live in-game win probabilities, goalie save percentage above expected, shot maps, and playoff projection models.',
  },
  {
    id: 'quanthockey',
    name: 'QuantHockey',
    category: 'Stats & Analytics',
    url: 'https://www.quanthockey.com',
    domain: 'quanthockey.com',
    description: 'World hockey statistics hub covering historical point leaderboards, nationality distributions, and era-adjusted metrics.',
  },
  {
    id: 'puckpedia',
    name: 'PuckPedia',
    category: 'Cap & Rosters',
    url: 'https://puckpedia.com',
    domain: 'puckpedia.com',
    description: 'The definitive NHL salary cap tracker featuring team cap spaces, contract details, buyout calculators, and trade analysis.',
    popular: true,
  },
  {
    id: 'elite-prospects',
    name: 'Elite Prospects',
    category: 'Cap & Rosters',
    url: 'https://www.eliteprospects.com',
    domain: 'eliteprospects.com',
    description: 'The premier global hockey database tracking rosters, contracts, player career statistics, and international tournaments.',
    popular: true,
  },
  {
    id: 'daily-faceoff',
    name: 'Daily Faceoff',
    category: 'Cap & Rosters',
    url: 'https://www.dailyfaceoff.com',
    domain: 'dailyfaceoff.com',
    description: 'Real-time confirmed starting goalies, projected line combinations, power-play units, and player injury updates.',
  },
  {
    id: 'nhl-central-scouting',
    name: 'NHL Central Scouting',
    category: 'Draft & Scouting',
    url: 'https://www.nhl.com/info/nhl-central-scouting',
    domain: 'nhl.com/info',
    description: 'Official preliminary, mid-term, and final scouting rankings for North American and European prospects eligible for the NHL Entry Draft.',
    popular: true,
  },
  {
    id: 'tankathon-nhl',
    name: 'Tankathon NHL Draft Simulator',
    category: 'Draft & Scouting',
    url: 'https://www.tankathon.com/nhl',
    domain: 'tankathon.com/nhl',
    description: 'Interactive draft lottery odds simulator, draft power rankings, and prospect consensus big boards.',
  },
  {
    id: 'the-hockey-news',
    name: 'The Hockey News',
    category: 'News & Coverage',
    url: 'https://thehockeynews.com',
    domain: 'thehockeynews.com',
    description: 'The historic "Bible of Hockey" delivering authoritative journalism, deep team analysis, prospect rankings, and features since 1947.',
  },
  {
    id: 'the-athletic-nhl',
    name: 'The Athletic NHL',
    category: 'News & Coverage',
    url: 'https://theathletic.com/nhl',
    domain: 'theathletic.com/nhl',
    description: 'In-depth investigative hockey reporting, beat writer team access, prospect evaluations, and analytics-driven feature stories.',
    popular: true,
  },
  {
    id: 'sportsnet',
    name: 'Sportsnet Hockey Central',
    category: 'News & Coverage',
    url: 'https://www.sportsnet.ca/hockey/nhl',
    domain: 'sportsnet.ca/hockey',
    description: 'Canada\'s primary national NHL broadcaster with Elliotte Friedman\'s "32 Thoughts", highlights, and insider trade rumors.',
    popular: true,
  },
  {
    id: 'tsn-hockey',
    name: 'TSN Hockey (Bobcast & Insiders)',
    category: 'News & Coverage',
    url: 'https://www.tsn.ca/nhl',
    domain: 'tsn.ca/nhl',
    description: 'Canada\'s Sports Leader featuring the acclaimed TSN Hockey Insiders, TradeCentre, and world junior championship coverage.',
  },
  {
    id: 'espn-nhl',
    name: 'ESPN NHL',
    category: 'News & Coverage',
    url: 'https://www.espn.com/nhl',
    domain: 'espn.com/nhl',
    description: 'Scores, power rankings, broadcast schedules, and analyst features from ESPN\'s national hockey desk.',
  },
];

// Backwards compatibility aliases
export const NBA_RESOURCES = NHL_RESOURCES;
export const NFL_RESOURCES = NHL_RESOURCES;
