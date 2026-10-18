import { MLS_TEAMS, MLSTeam, Conference, FullDivision } from '../data/mlsTeamsData';
export { MLS_TEAMS, type MLSTeam, type Conference, type FullDivision };

export function getTeamById(id: string, teams: MLSTeam[] = MLS_TEAMS): MLSTeam | undefined {
  if (!id) return undefined;
  const upper = id.toUpperCase();
  return teams.find((t) => t.id.toUpperCase() === upper);
}

export function getTeamByName(name: string, teams: MLSTeam[] = MLS_TEAMS): MLSTeam | undefined {
  if (!name) return undefined;
  const lower = name.trim().toLowerCase();
  return teams.find(
    (t) =>
      t.name.toLowerCase() === lower ||
      t.franchise.toLowerCase() === lower ||
      t.id.toLowerCase() === lower
  );
}

export function searchTeams(query: string, teams: MLSTeam[] = MLS_TEAMS): MLSTeam[] {
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
  teams: MLSTeam[] = MLS_TEAMS
): MLSTeam[] {
  if (conference === 'All') return teams;
  return teams.filter((t) => t.conference === conference);
}

export function filterTeamsByDivision(
  division: FullDivision | 'All',
  teams: MLSTeam[] = MLS_TEAMS
): MLSTeam[] {
  if (division === 'All') return teams;
  if (division === 'Canada') {
    return teams.filter((t) => t.state === 'ON' || t.state === 'QC' || t.state === 'BC');
  }
  return teams.filter((t) => t.division === division);
}

export function getTeamsByState(stateCode: string, teams: MLSTeam[] = MLS_TEAMS): MLSTeam[] {
  if (!stateCode) return [];
  const upper = stateCode.toUpperCase();
  return teams.filter((t) => t.state.toUpperCase() === upper);
}
