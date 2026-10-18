export type ResourceCategory = 'All' | 'Officiell' | 'Media' | 'Statistik' | 'Sändning';

export interface AllsvenskanResource {
  id: string;
  name: string;
  category: 'Officiell' | 'Media' | 'Statistik' | 'Sändning';
  url: string;
  description: string;
}

export type MLSResource = AllsvenskanResource;
export type NBAResource = AllsvenskanResource;

export const ALLSVENSKAN_STANDINGS_URL = 'https://allsvenskan.se/tabell';
export const MLS_STANDINGS_URL = ALLSVENSKAN_STANDINGS_URL;
export const NBA_STANDINGS_URL = ALLSVENSKAN_STANDINGS_URL;

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

export const ALLSVENSKAN_RESOURCES: AllsvenskanResource[] = [
  {
    id: 'allsvenskan-official',
    name: 'Allsvenskan.se',
    category: 'Officiell',
    url: 'https://allsvenskan.se',
    description: 'Officiell hemsida för Allsvenskan med spelschema, tabeller, highlights och nyheter.',
  },
  {
    id: 'svff-official',
    name: 'Svenska Fotbollförbundet (SvFF)',
    category: 'Officiell',
    url: 'https://www.svenskfotboll.se',
    description: 'Sveriges fotbollsförbund med officiella tävlingsbestämmelser, cuper och seriespel.',
  },
  {
    id: 'fotbollskanalen',
    name: 'Fotbollskanalen',
    category: 'Media',
    url: 'https://www.fotbollskanalen.se/allsvenskan',
    description: 'Ledande svensk fotbollsjournalistik, analyser, poddar och övergångsrykten.',
  },
  {
    id: 'discovery-max',
    name: 'Max / Discovery+',
    category: 'Sändning',
    url: 'https://www.max.com',
    description: 'Officiell sändningspartner med direktsändningar från alla allsvenska omgångar.',
  },
  {
    id: 'transfermarkt-allsvenskan',
    name: 'Transfermarkt Allsvenskan',
    category: 'Statistik',
    url: 'https://www.transfermarkt.com/allsvenskan/startseite/wettbewerb/SE1',
    description: 'Spelarmarknadsvärden, övergångshistorik, truppdata och kontraktslängder.',
  },
  {
    id: 'svenskafans',
    name: 'SvenskaFans Allsvenskan',
    category: 'Media',
    url: 'https://www.svenskafans.com/fotboll/allsvenskan',
    description: 'Supporterdrivna klubbsidor, forum, krönikor och supporterkultur i svensk fotboll.',
  },
];

export const MLS_RESOURCES = ALLSVENSKAN_RESOURCES;
export const NBA_RESOURCES = ALLSVENSKAN_RESOURCES;
