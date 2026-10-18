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
import { MLS_TEAMS } from '../data/mlsTeamsData';

describe('quizUtils', () => {
  it('correctly calculates performance tiers', () => {
    expect(PERFORMANCE_TIERS.length).toBe(5);
    expect(calculateQuizRank(30, 30).grade).toBe('S');
    expect(calculateQuizRank(26, 30).grade).toBe('A');
    expect(calculateQuizRank(22, 30).grade).toBe('B');
    expect(calculateQuizRank(16, 30).grade).toBe('C');
    expect(calculateQuizRank(10, 30).grade).toBe('D');
    expect(calculateQuizRank(0, 0).grade).toBe('D');
  });

  it('evaluates answers correctly', () => {
    expect(evaluateAnswer('LA', 'la')).toBe(true);
    expect(evaluateAnswer('ATL', 'MIA')).toBe(false);
    expect(evaluateAnswer('', 'SEA')).toBe(false);
  });

  it('updates streak properly', () => {
    expect(calculateNewStreak(3, true)).toBe(4);
    expect(calculateNewStreak(5, false)).toBe(0);
  });

  it('generates questions with valid target team and prompt', () => {
    const q = generateQuestion('team-name');
    expect(q.targetTeam).toBeDefined();
    expect(q.prompt).toContain(q.targetTeam.name);
    expect(q.questionType).toBe('team-name');
  });

  it('generates questions excluding answered IDs', () => {
    const exclude = MLS_TEAMS.slice(0, 29).map((t) => t.id);
    const q = generateQuestion('team-name', exclude);
    expect(q.targetTeam.id).toBe(MLS_TEAMS[29].id);
  });

  it('provides helpful hint text', () => {
    const galaxy = MLS_TEAMS.find((t) => t.id === 'LA')!;
    const hint = getHintText(galaxy);
    expect(hint).toContain('Western');
    expect(hint).toContain('California');
  });

  it('calculates quiz progress percentages', () => {
    const progress = calculateQuizProgress(15, 0, 30);
    expect(progress.identifiedCount).toBe(15);
    expect(progress.remainingCount).toBe(15);
    expect(progress.percentage).toBe(50);
  });
});
