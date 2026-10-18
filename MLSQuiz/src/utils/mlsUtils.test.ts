import { describe, it, expect } from 'vitest';
import {
  getTeamById,
  getTeamByName,
  searchTeams,
  filterTeamsByConference,
  filterTeamsByDivision,
  getTeamsByState,
} from './mlsUtils';
import { MLS_TEAMS } from '../data/mlsTeamsData';

describe('mlsUtils', () => {
  it('contains exactly 30 MLS teams', () => {
    expect(MLS_TEAMS.length).toBe(30);
  });

  it('contains exactly 15 Eastern and 15 Western teams', () => {
    const east = MLS_TEAMS.filter((t) => t.conference === 'Eastern');
    const west = MLS_TEAMS.filter((t) => t.conference === 'Western');
    expect(east.length).toBe(15);
    expect(west.length).toBe(15);
  });

  it('retrieves team by ID case-insensitively', () => {
    const la = getTeamById('la');
    expect(la).toBeDefined();
    expect(la?.name).toBe('LA Galaxy');
  });

  it('retrieves team by franchise or full name', () => {
    const sounders = getTeamByName('Sounders');
    expect(sounders?.id).toBe('SEA');
    const interMiami = getTeamByName('Inter Miami CF');
    expect(interMiami?.id).toBe('MIA');
  });

  it('searches teams by city, state, stadium, or conference', () => {
    const results = searchTeams('Mercedes-Benz Stadium');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('ATL');

    const caTeams = searchTeams('California');
    expect(caTeams.length).toBe(4); // LA Galaxy, LAFC, San Jose Earthquakes, San Diego FC
  });

  it('filters teams by conference and division', () => {
    const eastTeams = filterTeamsByConference('Eastern');
    expect(eastTeams.length).toBe(15);

    const canadaTeams = filterTeamsByDivision('Canada');
    expect(canadaTeams.length).toBe(3);
    const ids = canadaTeams.map((t) => t.id).sort();
    expect(ids).toEqual(['MTL', 'TOR', 'VAN'].sort());
  });

  it('gets teams by state code', () => {
    const caTeams = getTeamsByState('CA');
    expect(caTeams.length).toBe(4); // LA Galaxy, LAFC, San Jose Earthquakes, San Diego FC
    const txTeams = getTeamsByState('TX');
    expect(txTeams.length).toBe(3); // Austin FC, FC Dallas, Houston Dynamo FC
    const flTeams = getTeamsByState('FL');
    expect(flTeams.length).toBe(2); // Inter Miami CF, Orlando City SC
  });

  it('ensures all 30 teams have a valid logoUrl on ESPN CDN', () => {
    MLS_TEAMS.forEach((team) => {
      expect(team.logoUrl).toBeDefined();
      expect(team.logoUrl).toContain('https://a.espncdn.com/i/teamlogos/soccer/500/');
      expect(team.logoUrl.endsWith('.png')).toBe(true);
    });
  });

  it('ensures team coordinates are placed within their respective geographic regions', () => {
    const min = getTeamById('MIN');
    expect(min?.coordinates).toEqual({ x: 515, y: 138 });

    const col = getTeamById('COL');
    expect(col?.coordinates).toEqual({ x: 328, y: 258 });

    const hou = getTeamById('HOU');
    expect(hou?.coordinates).toEqual({ x: 490, y: 492 });

    const chi = getTeamById('CHI');
    expect(chi?.coordinates).toEqual({ x: 615, y: 218 });

    const sea = getTeamById('SEA');
    expect(sea?.coordinates).toEqual({ x: 82, y: 34 });

    const van = getTeamById('VAN');
    expect(van?.coordinates).toEqual({ x: 90, y: 1 });

    const tor = getTeamById('TOR');
    expect(tor?.coordinates).toEqual({ x: 744, y: 157 });

    const mtl = getTeamById('MTL');
    expect(mtl?.coordinates).toEqual({ x: 825, y: 98 });

    const atl = getTeamById('ATL');
    expect(atl?.coordinates).toEqual({ x: 698, y: 412 });

    const clt = getTeamById('CLT');
    expect(clt?.coordinates).toEqual({ x: 754, y: 346 });

    const dc = getTeamById('DC');
    expect(dc?.coordinates).toEqual({ x: 802, y: 252 });

    const phi = getTeamById('PHI');
    expect(phi?.coordinates).toEqual({ x: 816, y: 228 });

    const nyc = getTeamById('NYC');
    expect(nyc?.coordinates).toEqual({ x: 844, y: 196 });
  });
});
