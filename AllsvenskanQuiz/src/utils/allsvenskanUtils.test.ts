import { describe, it, expect } from 'vitest';
import {
  getClubByName,
  searchClubs,
  filterClubsByRegion,
  formatCapacity,
  getRegionClubCount,
} from './allsvenskanUtils';
import { ALLSVENSKAN_CLUBS } from '../data/allsvenskanTeamsData';

describe('allsvenskanUtils', () => {
  it('contains exactly 16 Allsvenskan clubs', () => {
    expect(ALLSVENSKAN_CLUBS.length).toBe(16);
  });

  it('contains clubs divided between Götaland and Svealand', () => {
    const gotaland = ALLSVENSKAN_CLUBS.filter((t) => t.region === 'Götaland');
    const svealand = ALLSVENSKAN_CLUBS.filter((t) => t.region === 'Svealand');
    expect(gotaland.length).toBe(10);
    expect(svealand.length).toBe(6);
  });

  it('retrieves club by name or ID case-insensitively', () => {
    const mff = getClubByName('malmo-ff');
    expect(mff).toBeDefined();
    expect(mff?.name).toBe('Malmö FF');

    const aik = getClubByName('AIK');
    expect(aik).toBeDefined();
    expect(aik?.city).toBe('Stockholm');
  });

  it('searches clubs by city, stadium, county, or region', () => {
    const arenaResults = searchClubs('Eleda Stadion');
    expect(arenaResults.length).toBe(1);
    expect(arenaResults[0].id).toBe('malmo-ff');

    const gbgClubs = searchClubs('Göteborg');
    expect(gbgClubs.length).toBe(3); // IFK Göteborg, GAIS, BK Häcken
  });

  it('filters clubs by region', () => {
    const gotalandClubs = filterClubsByRegion('Götaland');
    expect(gotalandClubs.length).toBe(10);

    const svealandClubs = filterClubsByRegion('Svealand');
    expect(svealandClubs.length).toBe(6);

    const norrlandClubs = filterClubsByRegion('Norrland');
    expect(norrlandClubs.length).toBe(0);
  });

  it('ensures all 16 clubs have valid ESPN CDN crest URLs', () => {
    ALLSVENSKAN_CLUBS.forEach((club) => {
      expect(club.logo).toBeDefined();
      expect(club.logo).toContain('https://a.espncdn.com/i/teamlogos/soccer/500/');
      expect(club.logo.endsWith('.png')).toBe(true);
    });
  });

  it('ensures all club coordinates fit inside the Sweden viewBox (0 0 500 900)', () => {
    ALLSVENSKAN_CLUBS.forEach((club) => {
      expect(club.coordinates.x).toBeGreaterThanOrEqual(20);
      expect(club.coordinates.x).toBeLessThanOrEqual(480);
      expect(club.coordinates.y).toBeGreaterThanOrEqual(100);
      expect(club.coordinates.y).toBeLessThanOrEqual(880);
    });
  });

  it('formats capacity correctly with Swedish locale', () => {
    expect(formatCapacity(50000)).toBe('50\u00A0000');
    expect(formatCapacity(0)).toBe('N/A');
  });

  it('counts clubs per region accurately', () => {
    expect(getRegionClubCount('Götaland')).toBe(10);
    expect(getRegionClubCount('Svealand')).toBe(6);
    expect(getRegionClubCount('Norrland')).toBe(0);
  });
});
