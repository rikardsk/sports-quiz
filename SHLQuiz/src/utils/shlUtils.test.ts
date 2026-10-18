import { describe, it, expect } from 'vitest';
import {
  getClubByName,
  searchClubs,
  filterClubsByRegion,
  formatCapacity,
  getRegionClubCount,
} from './shlUtils';
import { SHL_CLUBS } from '../data/shlTeamsData';

describe('shlUtils', () => {
  it('contains exactly 14 SHL clubs', () => {
    expect(SHL_CLUBS.length).toBe(14);
  });

  it('contains clubs divided across Norrland, Svealand, and Götaland', () => {
    const norrland = SHL_CLUBS.filter((t) => t.region === 'Norrland');
    const svealand = SHL_CLUBS.filter((t) => t.region === 'Svealand');
    const gotaland = SHL_CLUBS.filter((t) => t.region === 'Götaland');
    expect(norrland.length).toBe(5);
    expect(svealand.length).toBe(3);
    expect(gotaland.length).toBe(6);
  });

  it('retrieves club by name or ID case-insensitively', () => {
    const bif = getClubByName('brynas-if');
    expect(bif).toBeDefined();
    expect(bif?.name).toBe('Brynäs IF');

    const fhc = getClubByName('Frölunda HC');
    expect(fhc).toBeDefined();
    expect(fhc?.city).toBe('Göteborg');
  });

  it('searches clubs by city, stadium, county, or region', () => {
    const arenaResults = searchClubs('Scandinavium');
    expect(arenaResults.length).toBe(1);
    expect(arenaResults[0].id).toBe('frolunda-hc');

    const karlstadClubs = searchClubs('Karlstad');
    expect(karlstadClubs.length).toBe(1);
    expect(karlstadClubs[0].id).toBe('farjestad-bk');
  });

  it('filters clubs by region', () => {
    const norrlandClubs = filterClubsByRegion('Norrland');
    expect(norrlandClubs.length).toBe(5);

    const svealandClubs = filterClubsByRegion('Svealand');
    expect(svealandClubs.length).toBe(3);

    const gotalandClubs = filterClubsByRegion('Götaland');
    expect(gotalandClubs.length).toBe(6);
  });

  it('ensures all 14 clubs have valid Sportality CDN logo URLs', () => {
    SHL_CLUBS.forEach((club) => {
      expect(club.logo).toBeDefined();
      expect(club.logo).toContain('https://sportality.cdn.s8y.se/team-logos/');
      expect(club.logo.endsWith('.svg')).toBe(true);
    });
  });

  it('ensures all club coordinates fit inside the Sweden viewBox (0 0 500 900)', () => {
    SHL_CLUBS.forEach((club) => {
      expect(club.coordinates.x).toBeGreaterThanOrEqual(20);
      expect(club.coordinates.x).toBeLessThanOrEqual(480);
      expect(club.coordinates.y).toBeGreaterThanOrEqual(100);
      expect(club.coordinates.y).toBeLessThanOrEqual(880);
    });
  });

  it('formats capacity correctly with Swedish locale', () => {
    expect(formatCapacity(12044)).toBe('12\u00A0044');
    expect(formatCapacity(0)).toBe('N/A');
  });

  it('counts clubs per region accurately', () => {
    expect(getRegionClubCount('Norrland')).toBe(5);
    expect(getRegionClubCount('Svealand')).toBe(3);
    expect(getRegionClubCount('Götaland')).toBe(6);
  });
});
