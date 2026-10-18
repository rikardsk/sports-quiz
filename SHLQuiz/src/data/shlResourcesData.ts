export type ResourceCategory = 'All' | 'Officiell' | 'Media' | 'Statistik' | 'Sändning';

export interface SHLResource {
  id: string;
  name: string;
  category: 'Officiell' | 'Media' | 'Statistik' | 'Sändning';
  url: string;
  description: string;
}

export type AllsvenskanResource = SHLResource;
export type MLSResource = SHLResource;
export type NBAResource = SHLResource;

export const SHL_STANDINGS_URL = 'https://www.shl.se/game-stats/standings/standings';
export const ALLSVENSKAN_STANDINGS_URL = SHL_STANDINGS_URL;
export const MLS_STANDINGS_URL = SHL_STANDINGS_URL;
export const NBA_STANDINGS_URL = SHL_STANDINGS_URL;

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'All',
  'Officiell',
  'Media',
  'Statistik',
  'Sändning',
];

export const CATEGORY_BADGES: Record<string, string> = {
  Officiell: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Media: 'bg-sky-100 text-sky-800 border-sky-200',
  Statistik: 'bg-purple-100 text-purple-800 border-purple-200',
  Sändning: 'bg-rose-100 text-rose-800 border-rose-200',
};

export const SHL_RESOURCES: SHLResource[] = [
  {
    id: 'shl-official',
    name: 'SHL.se',
    category: 'Officiell',
    url: 'https://www.shl.se',
    description: 'Officiell hemsida för Svenska Hockeyligan med spelschema, tabeller, highlights och nyheter.',
  },
  {
    id: 'swehockey-official',
    name: 'Svenska Ishockeyförbundet (Swehockey)',
    category: 'Officiell',
    url: 'https://www.swehockey.se',
    description: 'Sveriges Ishockeyförbund med officiella tävlingsbestämmelser, cuper och svensk hockeyutveckling.',
  },
  {
    id: 'tv4-play-shl',
    name: 'TV4 Play SHL',
    category: 'Sändning',
    url: 'https://www.tv4play.se/kategorier/shl',
    description: 'Officiell sändningspartner med direktsändningar från samtliga matcher i grundserien och SM-slutspelet.',
  },
  {
    id: 'elite-prospects-shl',
    name: 'Elite Prospects SHL',
    category: 'Statistik',
    url: 'https://www.eliteprospects.com/league/shl',
    description: 'Världsledande hockeydatabas med statistik, trupper, draftade talanger, övergångar och historik.',
  },
  {
    id: 'flashscore-shl',
    name: 'Flashscore SHL',
    category: 'Statistik',
    url: 'https://www.flashscore.se/ishockey/sverige/shl/',
    description: 'Realtidsresultat, live tabell, formtabeller och djupgående matchstatistik för SHL.',
  },
  {
    id: 'svenskafans-shl',
    name: 'SvenskaFans SHL',
    category: 'Media',
    url: 'https://www.svenskafans.com/hockeyzon/shl',
    description: 'Supporterdrivna klubbsidor, forum, artiklar och intensiv supporterkultur kring svensk ishockey.',
  },
];

export const ALLSVENSKAN_RESOURCES = SHL_RESOURCES;
export const MLS_RESOURCES = SHL_RESOURCES;
export const NBA_RESOURCES = SHL_RESOURCES;
