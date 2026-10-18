import { MLB_TEAMS, MLBTeam, Conference, FullDivision } from '../data/mlbTeamsData';

export function getTeamById(id: string, teams: MLBTeam[] = MLB_TEAMS): MLBTeam | undefined {
  if (!id) return undefined;
  const upper = id.toUpperCase();
  // Support both ATH and OAK, CWS and CHW
  return teams.find(
    (t) =>
      t.id.toUpperCase() === upper ||
      (upper === 'OAK' && t.id === 'ATH') ||
      (upper === 'CHW' && t.id === 'CWS')
  );
}

export function getTeamByName(name: string, teams: MLBTeam[] = MLB_TEAMS): MLBTeam | undefined {
  if (!name) return undefined;
  const lower = name.trim().toLowerCase();
  return teams.find(
    (t) =>
      t.name.toLowerCase() === lower ||
      t.franchise.toLowerCase() === lower ||
      t.id.toLowerCase() === lower ||
      (lower === 'oakland athletics' && t.id === 'ATH')
  );
}

export function searchTeams(query: string, teams: MLBTeam[] = MLB_TEAMS): MLBTeam[] {
  if (!query || !query.trim()) return teams;
  const q = query.trim().toLowerCase();

  return teams.filter((t) => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.franchise.toLowerCase().includes(q) ||
      t.city.toLowerCase().includes(q) ||
      t.ballpark.toLowerCase().includes(q) ||
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
  teams: MLBTeam[] = MLB_TEAMS
): MLBTeam[] {
  if (conference === 'All') return teams;
  return teams.filter((t) => t.conference === conference);
}

export function filterTeamsByDivision(
  division: FullDivision | 'All',
  teams: MLBTeam[] = MLB_TEAMS
): MLBTeam[] {
  if (division === 'All') return teams;
  return teams.filter((t) => t.division === division);
}

export function getTeamsByState(stateCode: string, teams: MLBTeam[] = MLB_TEAMS): MLBTeam[] {
  if (!stateCode) return [];
  const upper = stateCode.toUpperCase();
  return teams.filter((t) => t.state.toUpperCase() === upper);
}
