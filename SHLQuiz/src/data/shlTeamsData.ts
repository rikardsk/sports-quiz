export type SwedenRegion = 'Götaland' | 'Svealand' | 'Norrland';

export interface SHLClub {
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
export type AllsvenskanClub = SHLClub;
export type MLSTeam = SHLClub;
export type NBATeam = SHLClub;
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

export const SHL_CLUBS: SHLClub[] = [
  {
    id: 'brynas-if',
    name: 'Brynäs IF',
    city: 'Gävle',
    county: 'Gävleborg',
    region: 'Norrland',
    stadium: 'Monitor ERP Arena',
    coordinates: { x: 232, y: 590 },
    primaryColor: '#000000',
    secondaryColor: '#FFCC00',
    logo: 'https://sportality.cdn.s8y.se/team-logos/bif1_bif.svg',
    founded: 1912,
    capacity: 7909,
    titles: 13,
    trivia: 'Klassikerklubb från Gävle med 13 SM-guld. Känd för sin stolta tradition och historiska matcher på Gavlerinken.',
    conference: 'Norrland',
    division: 'Norrland',
    state: 'X',
  },
  {
    id: 'frolunda-hc',
    name: 'Frölunda HC',
    city: 'Göteborg',
    county: 'Västra Götaland',
    region: 'Götaland',
    stadium: 'Scandinavium',
    coordinates: { x: 52, y: 765 },
    primaryColor: '#005538',
    secondaryColor: '#E31B23',
    logo: 'https://sportality.cdn.s8y.se/team-logos/fhc1_fhc.svg',
    founded: 1944,
    capacity: 12044,
    titles: 5,
    trivia: 'Göteborgs hockeyjätte med fem SM-guld och hela fyra Champions Hockey League-titlar, med hemmaplan i anrika Scandinavium.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'O',
  },
  {
    id: 'farjestad-bk',
    name: 'Färjestad BK',
    city: 'Karlstad',
    county: 'Värmland',
    region: 'Svealand',
    stadium: 'Löfbergs Arena',
    coordinates: { x: 108, y: 665 },
    primaryColor: '#004526',
    secondaryColor: '#DAA520',
    logo: 'https://sportality.cdn.s8y.se/team-logos/fbk1_fbk.svg',
    founded: 1932,
    capacity: 8250,
    titles: 10,
    trivia: 'En av svensk hockeys absoluta giganter med 10 SM-titlar och 21 SM-finaler, beläget vid Klarälven i Karlstad.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'S',
  },
  {
    id: 'hv71',
    name: 'HV71',
    city: 'Jönköping',
    county: 'Jönköping',
    region: 'Götaland',
    stadium: 'Husqvarna Garden',
    coordinates: { x: 112, y: 756 },
    primaryColor: '#002D62',
    secondaryColor: '#FDB813',
    logo: 'https://sportality.cdn.s8y.se/team-logos/hv711_hv71.svg',
    founded: 1971,
    capacity: 7000,
    titles: 5,
    trivia: 'Bildades 1971 genom sammanslagning av Husqvarna IF och Vätterstads IK. Har vunnit fem bejublade SM-guld.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'F',
  },
  {
    id: 'leksands-if',
    name: 'Leksands IF',
    city: 'Leksand',
    county: 'Dalarna',
    region: 'Svealand',
    stadium: 'Tegera Arena',
    coordinates: { x: 165, y: 585 },
    primaryColor: '#002B7F',
    secondaryColor: '#FFFFFF',
    logo: 'https://sportality.cdn.s8y.se/team-logos/lif1_lif.svg',
    founded: 1919,
    capacity: 7650,
    titles: 4,
    trivia: 'Kultförklarat lag från Siljansbygden med fyra SM-guld och ett av Sveriges mest hängivna supporterskaror (Leksand Superstars).',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'W',
  },
  {
    id: 'linkoping-hc',
    name: 'Linköping HC',
    city: 'Linköping',
    county: 'Östergötland',
    region: 'Götaland',
    stadium: 'Saab Arena',
    coordinates: { x: 185, y: 722 },
    primaryColor: '#002855',
    secondaryColor: '#D00000',
    logo: 'https://sportality.cdn.s8y.se/team-logos/lhc1_lhc.svg',
    founded: 1976,
    capacity: 8500,
    titles: 0,
    trivia: '"Cluben" från Östergötland har spelat i högsta serien sedan 2001 och bjuder på stämning intill Stångån i Saab Arena.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'E',
  },
  {
    id: 'lulea-hf',
    name: 'Luleå HF',
    city: 'Luleå',
    county: 'Norrbotten',
    region: 'Norrland',
    stadium: 'Coop Norrbotten Arena',
    coordinates: { x: 345, y: 245 },
    primaryColor: '#E31B23',
    secondaryColor: '#FFCC00',
    logo: 'https://sportality.cdn.s8y.se/team-logos/lhf1_lhf.svg',
    founded: 1977,
    capacity: 6150,
    titles: 1,
    trivia: 'Högsta seriens nordligaste fäste, kända för sin stålhårda vinnarattityd, SM-guld 1996 och två CHL-titlar.',
    conference: 'Norrland',
    division: 'Norrland',
    state: 'BD',
  },
  {
    id: 'malmo-redhawks',
    name: 'Malmö Redhawks',
    city: 'Malmö',
    county: 'Skåne',
    region: 'Götaland',
    stadium: 'Malmö Arena',
    coordinates: { x: 95, y: 860 },
    primaryColor: '#D21034',
    secondaryColor: '#000000',
    logo: 'https://sportality.cdn.s8y.se/team-logos/mif1_mif.svg',
    founded: 1972,
    capacity: 12600,
    titles: 2,
    trivia: 'Percy Nilssons mästarbygge som dominerade under tidigt 90-tal med SM-guld 1992 och 1994, med hemmaarena i Hyllie.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'M',
  },
  {
    id: 'modo-hockey',
    name: 'MoDo Hockey',
    city: 'Örnsköldsvik',
    county: 'Västernorrland',
    region: 'Norrland',
    stadium: 'Hägglunds Arena',
    coordinates: { x: 275, y: 425 },
    primaryColor: '#C8102E',
    secondaryColor: '#007A3D',
    logo: 'https://sportality.cdn.s8y.se/team-logos/modo1_modo.svg',
    founded: 1921,
    capacity: 7115,
    titles: 2,
    trivia: 'Världsberömd talangfabrik som fostrat Peter Forsberg, Markus Näslund, Victor Hedman och bröderna Sedin.',
    conference: 'Norrland',
    division: 'Norrland',
    state: 'Y',
  },
  {
    id: 'rogle-bk',
    name: 'Rögle BK',
    city: 'Ängelholm',
    county: 'Skåne',
    region: 'Götaland',
    stadium: 'Catena Arena',
    coordinates: { x: 78, y: 832 },
    primaryColor: '#006837',
    secondaryColor: '#FFFFFF',
    logo: 'https://sportality.cdn.s8y.se/team-logos/rbk1_rbk.svg',
    founded: 1932,
    capacity: 6310,
    titles: 0,
    trivia: 'Grönvita stoltheten från Ängelholm som vann Champions Hockey League 2022 och nådde SM-final både 2021 och 2024.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'M',
  },
  {
    id: 'skelleftea-aik',
    name: 'Skellefteå AIK',
    city: 'Skellefteå',
    county: 'Västerbotten',
    region: 'Norrland',
    stadium: 'Skellefteå Kraft Arena',
    coordinates: { x: 312, y: 320 },
    primaryColor: '#000000',
    secondaryColor: '#FFD100',
    logo: 'https://sportality.cdn.s8y.se/team-logos/saik1_saik.svg',
    founded: 1921,
    capacity: 5801,
    titles: 4,
    trivia: 'Svenska mästare 2024 med totalt fyra SM-guld (1978, 2013, 2014, 2024) och en enastående framgångsrik juniorverksamhet.',
    conference: 'Norrland',
    division: 'Norrland',
    state: 'AC',
  },
  {
    id: 'timra-ik',
    name: 'Timrå IK',
    city: 'Timrå',
    county: 'Västernorrland',
    region: 'Norrland',
    stadium: 'SCA Arena',
    coordinates: { x: 242, y: 495 },
    primaryColor: '#D50032',
    secondaryColor: '#FFFFFF',
    logo: 'https://sportality.cdn.s8y.se/team-logos/tik1_tik.svg',
    founded: 1938,
    capacity: 6000,
    titles: 0,
    trivia: '"Tikarna" från Medelpad med fantastiskt publikstöd i SCA Arena och ursprungsklubb för stjärnor som Henrik Zetterberg.',
    conference: 'Norrland',
    division: 'Norrland',
    state: 'Y',
  },
  {
    id: 'vaxjo-lakers',
    name: 'Växjö Lakers',
    city: 'Växjö',
    county: 'Kronoberg',
    region: 'Götaland',
    stadium: 'Vida Arena',
    coordinates: { x: 130, y: 802 },
    primaryColor: '#002F6C',
    secondaryColor: '#E35205',
    logo: 'https://sportality.cdn.s8y.se/team-logos/vlh1_vlh.svg',
    founded: 1997,
    capacity: 5750,
    titles: 4,
    trivia: 'Sensationell framgångssaga: grundades 1997 och vann fyra SM-guld mellan 2015 och 2023 under ledning av Sam Hallam.',
    conference: 'Götaland',
    division: 'Götaland',
    state: 'G',
  },
  {
    id: 'orebro-hk',
    name: 'Örebro HK',
    city: 'Örebro',
    county: 'Örebro',
    region: 'Svealand',
    stadium: 'Behrn Arena',
    coordinates: { x: 168, y: 662 },
    primaryColor: '#D52B1E',
    secondaryColor: '#000000',
    logo: 'https://sportality.cdn.s8y.se/team-logos/ohk1_ohk.svg',
    founded: 1990,
    capacity: 5500,
    titles: 0,
    trivia: 'Tog steget upp till SHL 2013 och har etablerat sig i toppen med kokande stämning och rött hav i Behrn Arena.',
    conference: 'Svealand',
    division: 'Svealand',
    state: 'T',
  },
];

export const ALLSVENSKAN_CLUBS = SHL_CLUBS;
export const MLS_TEAMS = SHL_CLUBS;
export const NBA_TEAMS = SHL_CLUBS;
