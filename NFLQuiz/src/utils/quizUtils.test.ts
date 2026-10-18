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
import { NFL_TEAMS } from '../data/nflTeamsData';

describe('quizUtils', () => {
  it('correctly calculates performance tiers', () => {
    expect(PERFORMANCE_TIERS.length).toBe(5);
    expect(calculateQuizRank(32, 32).grade).toBe('S');
    expect(calculateQuizRank(28, 32).grade).toBe('A');
    expect(calculateQuizRank(24, 32).grade).toBe('B');
    expect(calculateQuizRank(18, 32).grade).toBe('C');
    expect(calculateQuizRank(10, 32).grade).toBe('D');
    expect(calculateQuizRank(0, 0).grade).toBe('D');
  });

  it('evaluates answers correctly', () => {
    expect(evaluateAnswer('KC', 'kc')).toBe(true);
    expect(evaluateAnswer('GB', 'CHI')).toBe(false);
    expect(evaluateAnswer('', 'SF')).toBe(false);
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
    const exclude = NFL_TEAMS.slice(0, 31).map((t) => t.id);
    const q = generateQuestion('team-name', exclude);
    expect(q.targetTeam.id).toBe(NFL_TEAMS[31].id);
  });

  it('provides helpful hint text', () => {
    const chiefs = NFL_TEAMS.find((t) => t.id === 'KC')!;
    const hint = getHintText(chiefs);
    expect(hint).toContain('AFC West');
    expect(hint).toContain('Missouri');
  });

  it('calculates quiz progress percentages', () => {
    const progress = calculateQuizProgress(16, 0, 32);
    expect(progress.identifiedCount).toBe(16);
    expect(progress.remainingCount).toBe(16);
    expect(progress.percentage).toBe(50);
  });
});
