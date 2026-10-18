import {
  ALLSVENSKAN_CLUBS,
  AllsvenskanClub,
  SwedenRegion,
} from '../data/allsvenskanTeamsData';

export function getClubByName(name: string): AllsvenskanClub | undefined {
  if (!name) return undefined;
  const q = name.trim().toLowerCase();
  return ALLSVENSKAN_CLUBS.find(
    (c) => c.name.toLowerCase() === q || c.id.toLowerCase() === q
  );
}

export function searchClubs(
  query: string,
  clubs: AllsvenskanClub[] = ALLSVENSKAN_CLUBS
): AllsvenskanClub[] {
  if (!query || !query.trim()) return clubs;
  const q = query.trim().toLowerCase();
  return clubs.filter((c) => {
    return (
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.stadium.toLowerCase().includes(q) ||
      c.county.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q)
    );
  });
}

export function filterClubsByRegion(
  region: string,
  clubs: AllsvenskanClub[] = ALLSVENSKAN_CLUBS
): AllsvenskanClub[] {
  if (!region || region === 'All') return clubs;
  return clubs.filter((c) => c.region === region);
}

export function filterClubsByConference(
  conference: string,
  clubs: AllsvenskanClub[] = ALLSVENSKAN_CLUBS
): AllsvenskanClub[] {
  return filterClubsByRegion(conference, clubs);
}

export function filterClubsByDivision(
  division: string,
  clubs: AllsvenskanClub[] = ALLSVENSKAN_CLUBS
): AllsvenskanClub[] {
  return filterClubsByRegion(division, clubs);
}

export function formatCapacity(capacity: number): string {
  if (!capacity || capacity <= 0) return 'N/A';
  return capacity.toLocaleString('sv-SE');
}

export function getRegionClubCount(
  region: SwedenRegion,
  clubs: AllsvenskanClub[] = ALLSVENSKAN_CLUBS
): number {
  return clubs.filter((c) => c.region === region).length;
}

// Compatibility aliases
export const getTeamByName = getClubByName;
export const searchTeams = searchClubs;
export const filterTeamsByConference = filterClubsByConference;
export const filterTeamsByDivision = filterClubsByDivision;
