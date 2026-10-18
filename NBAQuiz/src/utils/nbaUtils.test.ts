import { describe, it, expect } from 'vitest';
import {
  getTeamById,
  getTeamByName,
  searchTeams,
  filterTeamsByConference,
  filterTeamsByDivision,
  getTeamsByState,
} from './nbaUtils';
import { NBA_TEAMS } from '../data/nbaTeamsData';

describe('nbaUtils', () => {
  it('contains exactly 30 NBA teams', () => {
    expect(NBA_TEAMS.length).toBe(30);
  });

  it('contains exactly 15 Eastern and 15 Western teams', () => {
    const east = NBA_TEAMS.filter((t) => t.conference === 'Eastern');
    const west = NBA_TEAMS.filter((t) => t.conference === 'Western');
    expect(east.length).toBe(15);
    expect(west.length).toBe(15);
  });

  it('retrieves team by ID case-insensitively', () => {
    const lal = getTeamById('lal');
    expect(lal).toBeDefined();
    expect(lal?.name).toBe('Los Angeles Lakers');
  });

  it('retrieves team by franchise or full name', () => {
    const celtics = getTeamByName('Celtics');
    expect(celtics?.id).toBe('BOS');
    const lakers = getTeamByName('Los Angeles Lakers');
    expect(lakers?.id).toBe('LAL');
  });

  it('searches teams by city, state, arena, or division', () => {
    const results = searchTeams('TD Garden');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('BOS');

    const caTeams = searchTeams('California');
    expect(caTeams.length).toBe(4); // Warriors, Clippers, Lakers, Kings
  });

  it('filters teams by conference and division', () => {
    const eastTeams = filterTeamsByConference('Eastern');
    expect(eastTeams.length).toBe(15);

    const pacific = filterTeamsByDivision('Pacific');
    expect(pacific.length).toBe(5);
    const ids = pacific.map((t) => t.id).sort();
    expect(ids).toEqual(['GSW', 'LAC', 'LAL', 'PHX', 'SAC'].sort());
  });

  it('gets teams by state code', () => {
    const caTeams = getTeamsByState('CA');
    expect(caTeams.length).toBe(4); // Warriors, Clippers, Lakers, Kings
    const txTeams = getTeamsByState('TX');
    expect(txTeams.length).toBe(3); // Mavericks, Rockets, Spurs
  });

  it('ensures all 30 teams have a valid logoUrl on ESPN CDN', () => {
    NBA_TEAMS.forEach((team) => {
      expect(team.logoUrl).toBeDefined();
      expect(team.logoUrl).toContain('https://a.espncdn.com/i/teamlogos/nba/500/');
      expect(team.logoUrl.endsWith('.png')).toBe(true);
    });
  });

  it('ensures team coordinates are placed within their respective geographic regions', () => {
    const min = getTeamById('MIN');
    expect(min?.coordinates).toEqual({ x: 515, y: 138 });

    const den = getTeamById('DEN');
    expect(den?.coordinates).toEqual({ x: 328, y: 258 });

    const hou = getTeamById('HOU');
    expect(hou?.coordinates).toEqual({ x: 490, y: 492 });

    const chi = getTeamById('CHI');
    expect(chi?.coordinates).toEqual({ x: 615, y: 218 });

    const mil = getTeamById('MIL');
    expect(mil?.coordinates).toEqual({ x: 606, y: 182 });

    const ind = getTeamById('IND');
    expect(ind?.coordinates).toEqual({ x: 645, y: 257 });

    const det = getTeamById('DET');
    expect(det?.coordinates).toEqual({ x: 684, y: 198 });

    const cha = getTeamById('CHA');
    expect(cha?.coordinates).toEqual({ x: 754, y: 346 });

    const was = getTeamById('WAS');
    expect(was?.coordinates).toEqual({ x: 802, y: 252 });

    const phi = getTeamById('PHI');
    expect(phi?.coordinates).toEqual({ x: 816, y: 228 });

    const nyk = getTeamById('NYK');
    expect(nyk?.coordinates).toEqual({ x: 844, y: 196 });

    const bkn = getTeamById('BKN');
    expect(bkn?.coordinates).toEqual({ x: 858, y: 196 });
  });
});

