import {
  SHL_CLUBS,
  SHLClub,
  SwedenRegion,
} from '../data/shlTeamsData';

export function getClubByName(name: string): SHLClub | undefined {
  if (!name) return undefined;
  const q = name.trim().toLowerCase();
  return SHL_CLUBS.find(
    (c) => c.name.toLowerCase() === q || c.id.toLowerCase() === q
  );
}

export function searchClubs(
  query: string,
  clubs: SHLClub[] = SHL_CLUBS
): SHLClub[] {
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
  clubs: SHLClub[] = SHL_CLUBS
): SHLClub[] {
  if (!region || region === 'All') return clubs;
  return clubs.filter((c) => c.region === region);
}

export function filterClubsByConference(
  conference: string,
  clubs: SHLClub[] = SHL_CLUBS
): SHLClub[] {
  return filterClubsByRegion(conference, clubs);
}

export function filterClubsByDivision(
  division: string,
  clubs: SHLClub[] = SHL_CLUBS
): SHLClub[] {
  return filterClubsByRegion(division, clubs);
}

export function formatCapacity(capacity: number): string {
  if (!capacity || capacity <= 0) return 'N/A';
  return capacity.toLocaleString('sv-SE');
}

export function getRegionClubCount(
  region: SwedenRegion,
  clubs: SHLClub[] = SHL_CLUBS
): number {
  return clubs.filter((c) => c.region === region).length;
}

// Compatibility aliases
export const getTeamByName = getClubByName;
export const searchTeams = searchClubs;
export const filterTeamsByConference = filterClubsByConference;
export const filterTeamsByDivision = filterClubsByDivision;
