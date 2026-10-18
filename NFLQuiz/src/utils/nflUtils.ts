import { NFL_TEAMS, NFLTeam, Conference, FullDivision } from '../data/nflTeamsData';

export function getTeamById(id: string, teams: NFLTeam[] = NFL_TEAMS): NFLTeam | undefined {
  if (!id) return undefined;
  const upper = id.toUpperCase();
  return teams.find((t) => t.id.toUpperCase() === upper);
}

export function getTeamByName(name: string, teams: NFLTeam[] = NFL_TEAMS): NFLTeam | undefined {
  if (!name) return undefined;
  const lower = name.trim().toLowerCase();
  return teams.find(
    (t) =>
      t.name.toLowerCase() === lower ||
      t.franchise.toLowerCase() === lower ||
      t.id.toLowerCase() === lower
  );
}

export function searchTeams(query: string, teams: NFLTeam[] = NFL_TEAMS): NFLTeam[] {
  if (!query || !query.trim()) return teams;
  const q = query.trim().toLowerCase();

  return teams.filter((t) => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.franchise.toLowerCase().includes(q) ||
      t.city.toLowerCase().includes(q) ||
      t.stadium.toLowerCase().includes(q) ||
      t.state.toLowerCase().includes(q) ||
      t.stateName.toLowerCase().includes(q) ||
      t.division.toLowerCase().includes(q) ||
      t.conference.toLowerCase().includes(q)
    );
  });
}

export function filterTeamsByConference(
  conference: Conference | 'All',
  teams: NFLTeam[] = NFL_TEAMS
): NFLTeam[] {
  if (conference === 'All') return teams;
  return teams.filter((t) => t.conference === conference);
}

export function filterTeamsByDivision(
  division: FullDivision | 'All',
  teams: NFLTeam[] = NFL_TEAMS
): NFLTeam[] {
  if (division === 'All') return teams;
  return teams.filter((t) => t.division === division);
}

export function getTeamsByState(stateCode: string, teams: NFLTeam[] = NFL_TEAMS): NFLTeam[] {
  if (!stateCode) return [];
  const upper = stateCode.toUpperCase();
  return teams.filter((t) => t.state.toUpperCase() === upper);
}
