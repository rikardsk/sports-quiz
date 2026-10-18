import { describe, it, expect } from 'vitest';
import {
  getTeamById,
  getTeamByName,
  searchTeams,
  filterTeamsByConference,
  filterTeamsByDivision,
  getTeamsByState,
} from './mlbUtils';
import { MLB_TEAMS } from '../data/mlbTeamsData';

describe('mlbUtils', () => {
  it('has exactly 30 MLB teams', () => {
    expect(MLB_TEAMS).toHaveLength(30);
  });

  it('gets team by ID (case insensitive)', () => {
    const yankees = getTeamById('nyy');
    expect(yankees).toBeDefined();
    expect(yankees?.name).toBe('New York Yankees');
    expect(yankees?.conference).toBe('AL');
    expect(yankees?.division).toBe('AL East');
  });

  it('gets team by franchise or full name', () => {
    const dodgers = getTeamByName('Los Angeles Dodgers');
    expect(dodgers?.id).toBe('LAD');

    const redSox = getTeamByName('Red Sox');
    expect(redSox?.id).toBe('BOS');
  });

  it('searches teams across ballpark, city, or division', () => {
    const fenway = searchTeams('Fenway');
    expect(fenway).toHaveLength(1);
    expect(fenway[0].id).toBe('BOS');

    const chicago = searchTeams('Chicago');
    expect(chicago).toHaveLength(2); // Cubs and White Sox

    const nlWest = searchTeams('NL West');
    expect(nlWest).toHaveLength(5);
  });

  it('filters teams by American and National League', () => {
    const al = filterTeamsByConference('AL');
    const nl = filterTeamsByConference('NL');
    expect(al).toHaveLength(15);
    expect(nl).toHaveLength(15);
  });

  it('filters teams by division', () => {
    const alEast = filterTeamsByDivision('AL East');
    expect(alEast).toHaveLength(5);

    const nlCentral = filterTeamsByDivision('NL Central');
    expect(nlCentral).toHaveLength(5);
  });

  it('gets teams by state', () => {
    const caTeams = getTeamsByState('CA');
    expect(caTeams).toHaveLength(5); // Dodgers, Giants, Padres, Angels, Athletics

    const nyTeams = getTeamsByState('NY');
    expect(nyTeams).toHaveLength(2); // Yankees, Mets

    const onTeams = getTeamsByState('ON');
    expect(onTeams).toHaveLength(1); // Blue Jays
  });
});
