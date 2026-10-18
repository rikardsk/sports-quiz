import { describe, it, expect } from 'vitest';
import {
  getTeamById,
  getTeamByName,
  searchTeams,
  filterTeamsByConference,
  filterTeamsByDivision,
  getTeamsByState,
} from './nflUtils';
import { NFL_TEAMS } from '../data/nflTeamsData';

describe('nflUtils', () => {
  it('contains exactly 32 NFL teams', () => {
    expect(NFL_TEAMS.length).toBe(32);
  });

  it('contains exactly 16 AFC and 16 NFC teams', () => {
    const afc = NFL_TEAMS.filter((t) => t.conference === 'AFC');
    const nfc = NFL_TEAMS.filter((t) => t.conference === 'NFC');
    expect(afc.length).toBe(16);
    expect(nfc.length).toBe(16);
  });

  it('retrieves team by ID case-insensitively', () => {
    const kc = getTeamById('kc');
    expect(kc).toBeDefined();
    expect(kc?.name).toBe('Kansas City Chiefs');
  });

  it('retrieves team by franchise or full name', () => {
    const packers = getTeamByName('Packers');
    expect(packers?.id).toBe('GB');
    const elligible = getTeamByName('Buffalo Bills');
    expect(elligible?.id).toBe('BUF');
  });

  it('searches teams by city, state, or stadium', () => {
    const results = searchTeams('Lambeau');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('GB');

    const floridaTeams = searchTeams('Florida');
    expect(floridaTeams.length).toBe(3); // Dolphins, Jaguars, Buccaneers
  });

  it('filters teams by conference and division', () => {
    const afcTeams = filterTeamsByConference('AFC');
    expect(afcTeams.length).toBe(16);

    const afcWest = filterTeamsByDivision('AFC West');
    expect(afcWest.length).toBe(4);
    const ids = afcWest.map((t) => t.id).sort();
    expect(ids).toEqual(['DEN', 'KC', 'LAC', 'LV'].sort());
  });

  it('gets teams by state code', () => {
    const caTeams = getTeamsByState('CA');
    expect(caTeams.length).toBe(3); // 49ers, Rams, Chargers
    const txTeams = getTeamsByState('TX');
    expect(txTeams.length).toBe(2); // Cowboys, Texans
  });

  it('ensures all 32 teams have a valid logoUrl on ESPN CDN', () => {
    NFL_TEAMS.forEach((team) => {
      expect(team.logoUrl).toBeDefined();
      expect(team.logoUrl).toContain('https://a.espncdn.com/i/teamlogos/nfl/500/');
      expect(team.logoUrl.endsWith('.png')).toBe(true);
    });
  });
});
