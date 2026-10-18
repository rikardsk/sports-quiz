export type SwedenRegion = 'Götaland' | 'Svealand' | 'Norrland';

export interface AllsvenskanClub {
  id: string;
  name: string;
  city: string;
  county: string;
  region: SwedenRegion;
  stadium: string;
  coordinates: { x: number; y: number };
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  founded: number;
  capacity: number;
  titles: number;
  trivia: string;
  // Backward compatibility fields
  conference: SwedenRegion;
  division: SwedenRegion;
  state: string;
}

// Aliases for compatibility
export type MLSTeam = AllsvenskanClub;
export type NBATeam = AllsvenskanClub;
export type Conference = SwedenRegion;
export type FullDivision = SwedenRegion;

export const REGION_THEMES: Record<
  SwedenRegion,
  { primary: string; light: string; border: string; badge: string; text: string }
> = {
  Götaland: {
    primary: '#0284c7',
    light: '#f0f9ff',
    border: '#7dd3fc',
    badge: 'bg-sky-100 text-sky-800 border-sky-300',
    text: 'text-sky-700',
  },
  Svealand: {
    primary: '#d97706',
    light: '#fffbeb',
    border: '#fcd34d',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    text: 'text-amber-700',
  },
  Norrland: {
    primary: '#16a34a',
    light: '#f0fdf4',
    border: '#86efac',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    text: 'text-emerald-700',
  },
};

export const REGION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Götaland: { bg: '#e0f2fe', text: '#0284c7', border: '#7dd3fc' },
  Svealand: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
  Norrland: { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
  All: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
};

export const DIVISION_COLORS = REGION_COLORS;

export const STATE_CONFERENCE_MAP: Record<string, SwedenRegion | 'Both' | 'None'> = {
  AB: 'Svealand', // Stockholm
  C: 'Svealand',  // Uppsala
  D: 'Svealand',  // Södermanland
  E: 'Götaland',  // Östergötland
  F: 'Götaland',  // Jönköping
  G: 'Götaland',  // Kronoberg
  H: 'Götaland',  // Kalmar
  I: 'Götaland',  // Gotland
  K: 'Götaland',  // Blekinge
  M: 'Götaland',  // Skåne
  N: 'Götaland',  // Halland
  O: 'Götaland',  // Västra Götaland
  S: 'Svealand',  // Värmland
  T: 'Svealand',  // Örebro
  U: 'Svealand',  // Västmanland
  W: 'Svealand',  // Dalarna
  X: 'Norrland',  // Gävleborg
  Y: 'Norrland',  // Västernorrland
  Z: 'Norrland',  // Jämtland
  AC: 'Norrland', // Västerbotten
  BD: 'Norrland', // Norrbotten
};

export const STATE_DIVISION_MAP: Record<string, FullDivision[]> = {
  AB: ['Svealand'],
  C: ['Svealand'],
  D: ['Svealand'],
  E: ['Götaland'],
  F: ['Götaland'],
  G: ['Götaland'],
  H: ['Götaland'],
  I: ['Götaland'],
  K: ['Götaland'],
  M: ['Götaland'],
  N: ['Götaland'],
  O: ['Götaland'],
  S: ['Svealand'],
  T: ['Svealand'],
  U: ['Svealand'],
  W: ['Svealand'],
  X: ['Norrland'],
  Y: ['Norrland'],
  Z: ['Norrland'],
  AC: ['Norrland'],
  BD: ['Norrland'],
};

export const ALLSVENSKAN_CLUBS: AllsvenskanClub[] = [
  {
    id: 'malmo-ff',
    name: 'Malmö FF',
    city: 'Malmö',
    county: 'Skåne',
    region: 'Götaland',
    stadium: 'Eleda Stadion',
    coordinates: { x: 95, y: 860 },
    primaryColor: '#56A0D3',
    secondaryColor: '#FFFFFF',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/2720.png',
    founded: 1910,
    capacity: 22500,
    titles: 24,
    trivia: "Sweden's most successful club with 24 championships and 1979 European Cup finalists, birthplace of Zlatan Ibrahimović.",
    conference: 'Götaland',
    division: 'Götaland',
    state: 'M',
  },
  {
    id: 'hammarby-if',
    name: 'Hammarby IF',
    city: 'Stockholm',
    county: 'Stockholm',
    region: 'Svealand',
    stadium: 'Tele2 Arena',
    coordinates: { x: 272, y: 680 },
    primaryColor: '#008037',
    secondaryColor: '#FFFFFF',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/2495.png',
    founded: 1897,
    capacity: 30000,
    titles: 1,
    trivia: 'Iconic Södermalm club "Bajen" boasting some of the largest, loudest home attendances in Scandinavia.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'AB',
  },
  {
    id: 'aik',
    name: 'AIK',
    city: 'Stockholm',
    county: 'Stockholm',
    region: 'Svealand',
    stadium: 'Strawberry Arena',
    coordinates: { x: 256, y: 652 },
    primaryColor: '#1A1A1A',
    secondaryColor: '#FFD700',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/994.png',
    founded: 1891,
    capacity: 50000,
    titles: 12,
    trivia: 'Founded on Biblioteksgatan in Stockholm in 1891, "Gnaget" is one of Sweden\'s most storied multisport clubs.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'AB',
  },
  {
    id: 'djurgardens-if',
    name: 'Djurgårdens IF',
    city: 'Stockholm',
    county: 'Stockholm',
    region: 'Svealand',
    stadium: 'Tele2 Arena',
    coordinates: { x: 282, y: 662 },
    primaryColor: '#002D62',
    secondaryColor: '#4682B4',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/2339.png',
    founded: 1891,
    capacity: 30000,
    titles: 12,
    trivia: 'Formed in 1891 on the island of Djurgården, "Blåränderna" have captured 12 Swedish league crowns.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'AB',
  },
  {
    id: 'mjallby-aif',
    name: 'Mjällby AIF',
    city: 'Hällevik',
    county: 'Blekinge',
    region: 'Götaland',
    stadium: 'Strandvallen',
    coordinates: { x: 150, y: 840 },
    primaryColor: '#FFD200',
    secondaryColor: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/20301.png',
    founded: 1939,
    capacity: 7500,
    titles: 0,
    trivia: 'Based in the tiny fishing village of Hällevik, their seaside stadium Strandvallen is an Allsvenskan fortress.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'K',
  },
  {
    id: 'gais',
    name: 'GAIS',
    city: 'Göteborg',
    county: 'Västra Götaland',
    region: 'Götaland',
    stadium: 'Gamla Ullevi',
    coordinates: { x: 52, y: 764 },
    primaryColor: '#005C29',
    secondaryColor: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/8222.png',
    founded: 1894,
    capacity: 18416,
    titles: 4,
    trivia: 'Nicknamed "Makrillarna" (The Mackerels) for their distinctive green-and-black vertical stripes.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'O',
  },
  {
    id: 'if-elfsborg',
    name: 'IF Elfsborg',
    city: 'Borås',
    county: 'Västra Götaland',
    region: 'Götaland',
    stadium: 'Borås Arena',
    coordinates: { x: 93, y: 752 },
    primaryColor: '#E5A823',
    secondaryColor: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/529.png',
    founded: 1904,
    capacity: 16200,
    titles: 6,
    trivia: 'Six-time Swedish champions hailing from the textile hub of Borås, famed for fast-paced attacking soccer.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'O',
  },
  {
    id: 'bk-hacken',
    name: 'BK Häcken',
    city: 'Göteborg',
    county: 'Västra Götaland',
    region: 'Götaland',
    stadium: 'Bravida Arena',
    coordinates: { x: 44, y: 744 },
    primaryColor: '#F4C300',
    secondaryColor: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/7834.png',
    founded: 1940,
    capacity: 6500,
    titles: 1,
    trivia: 'Won their maiden Swedish championship in 2022 and organizes the world-famous Gothia Cup.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'O',
  },
  {
    id: 'ik-sirius',
    name: 'IK Sirius',
    city: 'Uppsala',
    county: 'Uppsala',
    region: 'Svealand',
    stadium: 'Studenternas IP',
    coordinates: { x: 253, y: 636 },
    primaryColor: '#00205B',
    secondaryColor: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/8547.png',
    founded: 1907,
    capacity: 10500,
    titles: 0,
    trivia: 'Proud representatives of Sweden\'s historic university city Uppsala, playing in distinctive blue and black stripes.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'C',
  },
  {
    id: 'if-brommapojkarna',
    name: 'IF Brommapojkarna',
    city: 'Stockholm',
    county: 'Stockholm',
    region: 'Svealand',
    stadium: 'Grimsta IP',
    coordinates: { x: 240, y: 664 },
    primaryColor: '#C8102E',
    secondaryColor: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/8221.png',
    founded: 1942,
    capacity: 5000,
    titles: 0,
    trivia: 'Largest youth soccer academy in Europe by active player count, having nurtured dozens of international stars.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'AB',
  },
  {
    id: 'ifk-goteborg',
    name: 'IFK Göteborg',
    city: 'Göteborg',
    county: 'Västra Götaland',
    region: 'Götaland',
    stadium: 'Gamla Ullevi',
    coordinates: { x: 68, y: 752 },
    primaryColor: '#003B7B',
    secondaryColor: '#FFFFFF',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/2556.png',
    founded: 1904,
    capacity: 18416,
    titles: 18,
    trivia: '"Blåvitt" are the only Nordic side to win European continental trophies, conquering the UEFA Cup in 1982 and 1987.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'O',
  },
  {
    id: 'halmstads-bk',
    name: 'Halmstads BK',
    city: 'Halmstad',
    county: 'Halland',
    region: 'Götaland',
    stadium: 'Örjans Vall',
    coordinates: { x: 90, y: 806 },
    primaryColor: '#0055A5',
    secondaryColor: '#000000',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/3017.png',
    founded: 1914,
    capacity: 10873,
    titles: 4,
    trivia: 'Four-time Swedish champions famously managed by Roy Hodgson in the 1970s and Tom Prahl in the 1990s.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'N',
  },
  {
    id: 'ifk-norrkoping',
    name: 'IFK Norrköping',
    city: 'Norrköping',
    county: 'Östergötland',
    region: 'Götaland',
    stadium: 'PlatinumCars Arena',
    coordinates: { x: 203, y: 706 },
    primaryColor: '#003882',
    secondaryColor: '#FFFFFF',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/2722.png',
    founded: 1897,
    capacity: 16000,
    titles: 13,
    trivia: '"Snoka" dominated Swedish football in the mid-20th century with Gunnar Nordahl and won their 13th title in 2015.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'E',
  },
  {
    id: 'ifk-varnamo',
    name: 'IFK Värnamo',
    city: 'Värnamo',
    county: 'Jönköping',
    region: 'Götaland',
    stadium: 'Finnvedsvallen',
    coordinates: { x: 128, y: 784 },
    primaryColor: '#0047AB',
    secondaryColor: '#FFFFFF',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/21382.png',
    founded: 1912,
    capacity: 5000,
    titles: 0,
    trivia: 'Smallest municipality represented in the modern top flight, renowned for exceptional player development.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'F',
  },
  {
    id: 'kalmar-ff',
    name: 'Kalmar FF',
    city: 'Kalmar',
    county: 'Kalmar',
    region: 'Götaland',
    stadium: 'Guldfågeln Arena',
    coordinates: { x: 210, y: 807 },
    primaryColor: '#D31145',
    secondaryColor: '#FFFFFF',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/3052.png',
    founded: 1910,
    capacity: 12182,
    titles: 1,
    trivia: '"Röda bröder" captured the Allsvenskan championship in 2008 powered by the Elm brothers (Rasmus, Viktor, David).',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'H',
  },
  {
    id: 'vasteras-sk',
    name: 'Västerås SK',
    city: 'Västerås',
    county: 'Västmanland',
    region: 'Svealand',
    stadium: 'Hitachi Energy Arena',
    coordinates: { x: 216, y: 650 },
    primaryColor: '#006837',
    secondaryColor: '#FFFFFF',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/22163.png',
    founded: 1904,
    capacity: 7000,
    titles: 0,
    trivia: 'Celebrated their return to Allsvenskan in 2024 after a 26-year absence; home club of Sweden captain Victor Lindelöf.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'U',
  },
];

export const ALLSVENSKAN_TEAMS = ALLSVENSKAN_CLUBS;
export const MLS_TEAMS = ALLSVENSKAN_CLUBS;
export const NBA_TEAMS = ALLSVENSKAN_CLUBS;
