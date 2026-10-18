import { PremierLeagueClub, PREMIER_LEAGUE_CLUBS } from '../data/premierLeagueTeamsData';

export function getClubById(id: string): PremierLeagueClub | undefined {
  if (!id) return undefined;
  const upper = id.toUpperCase();
  return PREMIER_LEAGUE_CLUBS.find((c) => c.id === upper);
}

export function getClubByName(name: string): PremierLeagueClub | undefined {
  if (!name) return undefined;
  const q = name.toLowerCase().trim();
  return PREMIER_LEAGUE_CLUBS.find(
    (c) =>
      c.name.toLowerCase() === q ||
      c.shortName.toLowerCase() === q ||
      c.nickname.toLowerCase() === q
  );
}

export function searchClubs(query: string): PremierLeagueClub[] {
  if (!query) return PREMIER_LEAGUE_CLUBS;
  const q = query.toLowerCase().trim();
  if (q.length === 0) return PREMIER_LEAGUE_CLUBS;

  return PREMIER_LEAGUE_CLUBS.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.nickname.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.stadium.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q)
    );
  });
}

export function filterClubsByRegion(region: string): PremierLeagueClub[] {
  if (!region || region === 'All') return PREMIER_LEAGUE_CLUBS;
  return PREMIER_LEAGUE_CLUBS.filter((c) => c.region === region);
}

export function getClubsByCity(city: string): PremierLeagueClub[] {
  if (!city) return [];
  const q = city.toLowerCase().trim();
  return PREMIER_LEAGUE_CLUBS.filter((c) => c.city.toLowerCase() === q);
}
