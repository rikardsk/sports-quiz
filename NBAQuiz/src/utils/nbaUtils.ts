import { NBA_TEAMS, NBATeam, Conference, FullDivision } from '../data/nbaTeamsData';

export function getTeamById(id: string, teams: NBATeam[] = NBA_TEAMS): NBATeam | undefined {
  if (!id) return undefined;
  const upper = id.toUpperCase();
  return teams.find((t) => t.id.toUpperCase() === upper);
}

export function getTeamByName(name: string, teams: NBATeam[] = NBA_TEAMS): NBATeam | undefined {
  if (!name) return undefined;
  const lower = name.trim().toLowerCase();
  return teams.find(
    (t) =>
      t.name.toLowerCase() === lower ||
      t.franchise.toLowerCase() === lower ||
      t.id.toLowerCase() === lower
  );
}

export function searchTeams(query: string, teams: NBATeam[] = NBA_TEAMS): NBATeam[] {
  if (!query || !query.trim()) return teams;
  const q = query.trim().toLowerCase();

  return teams.filter((t) => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.franchise.toLowerCase().includes(q) ||
      t.city.toLowerCase().includes(q) ||
      t.arena.toLowerCase().includes(q) ||
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
  teams: NBATeam[] = NBA_TEAMS
): NBATeam[] {
  if (conference === 'All') return teams;
  return teams.filter((t) => t.conference === conference);
}

export function filterTeamsByDivision(
  division: FullDivision | 'All',
  teams: NBATeam[] = NBA_TEAMS
): NBATeam[] {
  if (division === 'All') return teams;
  return teams.filter((t) => t.division === division);
}

export function getTeamsByState(stateCode: string, teams: NBATeam[] = NBA_TEAMS): NBATeam[] {
  if (!stateCode) return [];
  const upper = stateCode.toUpperCase();
  return teams.filter((t) => t.state.toUpperCase() === upper);
}
