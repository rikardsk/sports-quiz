import { describe, it, expect } from 'vitest';
import {
  getClubById,
  getClubByName,
  searchClubs,
  filterClubsByRegion,
  getClubsByCity,
} from './eplUtils';
import {
  generateQuestion,
  evaluateAnswer,
  calculateQuizRank,
  QUIZ_RANKS,
} from './eplQuizUtils';
import { PREMIER_LEAGUE_CLUBS } from '../data/premierLeagueTeamsData';

describe('eplUtils', () => {
  it('contains exactly 20 Premier League clubs', () => {
    expect(PREMIER_LEAGUE_CLUBS.length).toBe(20);
  });

  it('retrieves club by ID case-insensitively', () => {
    const ars = getClubById('ars');
    expect(ars).toBeDefined();
    expect(ars?.name).toBe('Arsenal');
    expect(ars?.stadium).toBe('Emirates Stadium');
  });

  it('retrieves club by shortName or full name', () => {
    const liv = getClubByName('Liverpool');
    expect(liv?.id).toBe('LIV');

    const spurs = getClubByName('Spurs');
    expect(spurs?.id).toBe('TOT');
  });

  it('searches clubs by stadium, nickname, or region', () => {
    const anfield = searchClubs('Anfield');
    expect(anfield.length).toBe(1);
    expect(anfield[0].id).toBe('LIV');

    const londonClubs = searchClubs('Greater London');
    expect(londonClubs.length).toBe(7); // Arsenal, Chelsea, Spurs, West Ham, Palace, Fulham, Brentford
  });

  it('filters clubs by region', () => {
    const nw = filterClubsByRegion('North West');
    expect(nw.length).toBe(4); // Liverpool, Everton, Man City, Man United
    const ids = nw.map((c) => c.id).sort();
    expect(ids).toEqual(['EVE', 'LIV', 'MCI', 'MUN']);
  });

  it('gets clubs by city', () => {
    const liverpoolClubs = getClubsByCity('Liverpool');
    expect(liverpoolClubs.length).toBe(2); // Liverpool and Everton
    const manchesterClubs = getClubsByCity('Manchester');
    expect(manchesterClubs.length).toBe(2); // Man City and Man United
  });

  it('ensures all 20 clubs have valid logos on ESPN CDN', () => {
    PREMIER_LEAGUE_CLUBS.forEach((club) => {
      expect(club.logoUrl).toBeDefined();
      expect(club.logoUrl).toContain('https://a.espncdn.com/i/teamlogos/soccer/500/');
      expect(club.logoUrl.endsWith('.png')).toBe(true);
    });
  });

  it('generates a question and evaluates answers correctly', () => {
    const q = generateQuestion();
    expect(q.prompt).toBeTruthy();
    expect(evaluateAnswer(q, q.correctAnswer)).toBe(true);
    expect(evaluateAnswer(q, 'Completely Wrong Answer')).toBe(false);
  });

  it('assigns correct quiz ranks based on percentage', () => {
    expect(calculateQuizRank(95).title).toBe(QUIZ_RANKS[0].title);
    expect(calculateQuizRank(10).title).toBe(QUIZ_RANKS[QUIZ_RANKS.length - 1].title);
  });
});
