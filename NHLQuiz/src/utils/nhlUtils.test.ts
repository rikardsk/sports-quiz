import { describe, it, expect } from 'vitest';
import {
  getTeamById,
  getTeamByName,
  searchTeams,
  filterTeamsByConference,
  filterTeamsByDivision,
  getTeamsByState,
} from './nhlUtils';
import { NHL_TEAMS } from '../data/nhlTeamsData';

describe('nhlUtils', () => {
  it('contains exactly 32 NHL teams', () => {
    expect(NHL_TEAMS.length).toBe(32);
  });

  it('contains exactly 16 Eastern and 16 Western teams', () => {
    const east = NHL_TEAMS.filter((t) => t.conference === 'Eastern');
    const west = NHL_TEAMS.filter((t) => t.conference === 'Western');
    expect(east.length).toBe(16);
    expect(west.length).toBe(16);
  });

  it('contains exactly 8 teams in each of the 4 divisions', () => {
    const atlantic = filterTeamsByDivision('Atlantic');
    const metro = filterTeamsByDivision('Metropolitan');
    const central = filterTeamsByDivision('Central');
    const pacific = filterTeamsByDivision('Pacific');

    expect(atlantic.length).toBe(8);
    expect(metro.length).toBe(8);
    expect(central.length).toBe(8);
    expect(pacific.length).toBe(8);
  });

  it('contains 7 Canadian teams and 25 US teams', () => {
    const canadianProvinces = ['ON', 'QC', 'BC', 'AB', 'MB'];
    const canadianTeams = NHL_TEAMS.filter((t) => canadianProvinces.includes(t.state));
    expect(canadianTeams.length).toBe(7);
  });

  it('retrieves team by ID case-insensitively', () => {
    const tor = getTeamById('tor');
    expect(tor).toBeDefined();
    expect(tor?.name).toBe('Toronto Maple Leafs');

    const mtl = getTeamById('MTL');
    expect(mtl?.franchise).toBe('Canadiens');
  });

  it('retrieves team by franchise or full name', () => {
    const bruins = getTeamByName('Bruins');
    expect(bruins?.id).toBe('BOS');
    const oilers = getTeamByName('Edmonton Oilers');
    expect(oilers?.id).toBe('EDM');
  });

  it('searches teams by city, arena, state, or division', () => {
    const results = searchTeams('Bell Centre');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('MTL');

    const caTeams = searchTeams('California');
    expect(caTeams.length).toBe(3); // Ducks, Kings, Sharks
  });

  it('filters teams by conference and division', () => {
    const eastTeams = filterTeamsByConference('Eastern');
    expect(eastTeams.length).toBe(16);

    const pacific = filterTeamsByDivision('Pacific');
    expect(pacific.length).toBe(8);
    const ids = pacific.map((t) => t.id).sort();
    expect(ids).toEqual(['ANA', 'CGY', 'EDM', 'LAK', 'SEA', 'SJS', 'VAN', 'VGK'].sort());
  });

  it('gets teams by state/province code', () => {
    const caTeams = getTeamsByState('CA');
    expect(caTeams.length).toBe(3); // Ducks, Kings, Sharks
    const onTeams = getTeamsByState('ON');
    expect(onTeams.length).toBe(2); // Maple Leafs, Senators
    const abTeams = getTeamsByState('AB');
    expect(abTeams.length).toBe(2); // Flames, Oilers
  });

  it('ensures all 32 teams have a valid logoUrl from official NHL SVG CDN', () => {
    NHL_TEAMS.forEach((team) => {
      expect(team.logoUrl).toBeDefined();
      expect(team.logoUrl).toContain('https://assets.nhle.com/logos/nhl/svg/');
      expect(team.logoUrl.endsWith('_light.svg')).toBe(true);
    });
  });

  it('ensures Original Six teams are correctly represented with their Stanley Cup titles', () => {
    const mtl = getTeamById('MTL');
    expect(mtl?.stanleyCups).toBe(24);
    expect(mtl?.established).toBe(1909);

    const tor = getTeamById('TOR');
    expect(tor?.stanleyCups).toBe(13);

    const det = getTeamById('DET');
    expect(det?.stanleyCups).toBe(11);

    const bos = getTeamById('BOS');
    expect(bos?.stanleyCups).toBe(6);

    const chi = getTeamById('CHI');
    expect(chi?.stanleyCups).toBe(6);

    const nyr = getTeamById('NYR');
    expect(nyr?.stanleyCups).toBe(4);
  });
});
