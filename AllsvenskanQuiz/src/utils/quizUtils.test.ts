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
import { ALLSVENSKAN_CLUBS } from '../data/allsvenskanTeamsData';

describe('quizUtils', () => {
  it('correctly calculates performance tiers for Swedish football', () => {
    expect(PERFORMANCE_TIERS.length).toBe(5);
    expect(calculateQuizRank(16, 16).grade).toBe('S');
    expect(calculateQuizRank(16, 16).title).toContain('Svenska Mästare');
    expect(calculateQuizRank(14, 16).grade).toBe('A');
    expect(calculateQuizRank(12, 16).grade).toBe('B');
    expect(calculateQuizRank(9, 16).grade).toBe('C');
    expect(calculateQuizRank(5, 16).grade).toBe('D');
    expect(calculateQuizRank(0, 0).grade).toBe('D');
  });

  it('evaluates answers correctly case-insensitively', () => {
    expect(evaluateAnswer('malmo-ff', 'MALMO-FF')).toBe(true);
    expect(evaluateAnswer('aik', 'hammarby-if')).toBe(false);
    expect(evaluateAnswer('', 'aik')).toBe(false);
  });

  it('updates streak properly', () => {
    expect(calculateNewStreak(3, true)).toBe(4);
    expect(calculateNewStreak(5, false)).toBe(0);
  });

  it('generates questions with valid target team and Swedish prompt', () => {
    const q = generateQuestion('team-name');
    expect(q.targetTeam).toBeDefined();
    expect(q.prompt).toBe(`Hitta ${q.targetTeam.name} på kartan`);
    expect(q.questionType).toBe('team-name');

    const stadiumQ = generateQuestion('stadium');
    expect(stadiumQ.prompt).toContain('Vilken klubb spelar på');
  });

  it('generates questions excluding answered IDs', () => {
    const exclude = ALLSVENSKAN_CLUBS.slice(0, 15).map((t) => t.id);
    const q = generateQuestion('team-name', exclude);
    expect(q.targetTeam.id).toBe(ALLSVENSKAN_CLUBS[15].id);
  });

  it('provides helpful hint text in Swedish for Swedish clubs', () => {
    const mff = ALLSVENSKAN_CLUBS.find((t) => t.id === 'malmo-ff')!;
    const hint = getHintText(mff);
    expect(hint).toContain('Ledtråd:');
    expect(hint).toContain('Götaland');
    expect(hint).toContain('Malmö');
  });

  it('calculates quiz progress percentages for 16 clubs', () => {
    const progress = calculateQuizProgress(8, 0, 16);
    expect(progress.identifiedCount).toBe(8);
    expect(progress.remainingCount).toBe(8);
    expect(progress.percentage).toBe(50);
  });
});
