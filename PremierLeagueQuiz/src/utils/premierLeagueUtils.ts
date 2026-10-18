import { PREMIER_LEAGUE_CLUBS, PremierLeagueClub } from '../data/premierLeagueTeamsData';

export function getTeamById(id: string, clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS): PremierLeagueClub | undefined {
  if (!id) return undefined;
  const upper = id.toUpperCase();
  return clubs.find((c) => c.id.toUpperCase() === upper);
}

export function getClubById(id: string, clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS): PremierLeagueClub | undefined {
  return getTeamById(id, clubs);
}

export function getTeamByName(name: string, clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS): PremierLeagueClub | undefined {
  if (!name) return undefined;
  const lower = name.trim().toLowerCase();
  return clubs.find(
    (c) =>
      c.name.toLowerCase() === lower ||
      c.shortName.toLowerCase() === lower ||
      c.nickname.toLowerCase() === lower ||
      c.id.toLowerCase() === lower
  );
}

export function getClubByName(name: string, clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS): PremierLeagueClub | undefined {
  return getTeamByName(name, clubs);
}

export function searchTeams(query: string, clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS): PremierLeagueClub[] {
  if (!query || !query.trim()) return clubs;
  const q = query.trim().toLowerCase();

  return clubs.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.nickname.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.stadium.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  });
}

export function searchClubs(query: string, clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS): PremierLeagueClub[] {
  return searchTeams(query, clubs);
}

export function filterTeamsByRegion(
  region: string,
  clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS
): PremierLeagueClub[] {
  if (!region || region === 'All') return clubs;
  return clubs.filter((c) => c.region === region);
}

export function filterTeamsByDivision(
  division: string,
  clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS
): PremierLeagueClub[] {
  return filterTeamsByRegion(division, clubs);
}

export function filterTeamsByConference(
  conference: string,
  clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS
): PremierLeagueClub[] {
  return filterTeamsByRegion(conference, clubs);
}

export function getTeamsByCity(city: string, clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS): PremierLeagueClub[] {
  if (!city) return [];
  const lower = city.toLowerCase().trim();
  return clubs.filter((c) => c.city.toLowerCase() === lower);
}
