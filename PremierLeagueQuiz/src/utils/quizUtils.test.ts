import { describe, it, expect } from 'vitest';
import {
  calculateQuizRank,
  generateQuestion,
  evaluateAnswer,
  calculateNewStreak,
  getHintText,
  calculateQuizProgress,
  PERFORMANCE_TIERS,
} from './quizUtils';
import { PREMIER_LEAGUE_CLUBS } from '../data/premierLeagueTeamsData';

describe('quizUtils', () => {
  it('correctly calculates performance tiers', () => {
    expect(PERFORMANCE_TIERS.length).toBe(5);
    expect(calculateQuizRank(20, 20).grade).toBe('S');
    expect(calculateQuizRank(18, 20).grade).toBe('A');
    expect(calculateQuizRank(15, 20).grade).toBe('B');
    expect(calculateQuizRank(12, 20).grade).toBe('C');
    expect(calculateQuizRank(6, 20).grade).toBe('D');
    expect(calculateQuizRank(0, 0).grade).toBe('D');
  });

  it('evaluates answers correctly', () => {
    expect(evaluateAnswer('ARS', 'ars')).toBe(true);
    expect(evaluateAnswer('LIV', 'MUN')).toBe(false);
    expect(evaluateAnswer('', 'MCI')).toBe(false);
  });

  it('updates streak properly', () => {
    expect(calculateNewStreak(3, true)).toBe(4);
    expect(calculateNewStreak(5, false)).toBe(0);
  });

  it('generates questions with valid target team and prompt', () => {
    const q = generateQuestion('team-name');
    expect(q?.targetTeam).toBeDefined();
    expect(q?.prompt).toContain(q?.targetTeam.name);
    expect(q?.questionType).toBe('team-name');
  });

  it('generates questions excluding answered IDs', () => {
    const exclude = PREMIER_LEAGUE_CLUBS.slice(0, 19).map((c) => c.id);
    const q = generateQuestion('team-name', exclude);
    expect(q?.targetTeam.id).toBe(PREMIER_LEAGUE_CLUBS[19].id);
  });

  it('provides helpful hint text', () => {
    const arsenal = PREMIER_LEAGUE_CLUBS.find((c) => c.id === 'ARS')!;
    const hint = getHintText(arsenal);
    expect(hint).toContain('Greater London');
    expect(hint).toContain('Emirates Stadium');
  });

  it('calculates quiz progress percentages', () => {
    const progress = calculateQuizProgress(10, 0, 20);
    expect(progress.identifiedCount).toBe(10);
    expect(progress.remainingCount).toBe(10);
    expect(progress.percentage).toBe(50);
  });
});
