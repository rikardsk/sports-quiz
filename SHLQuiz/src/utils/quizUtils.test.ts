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
import { SHL_CLUBS } from '../data/shlTeamsData';

describe('quizUtils', () => {
  it('correctly calculates performance tiers for Swedish hockey', () => {
    expect(PERFORMANCE_TIERS.length).toBe(5);
    expect(calculateQuizRank(14, 14).grade).toBe('S');
    expect(calculateQuizRank(14, 14).title).toContain('Svenska Mästare');
    expect(calculateQuizRank(14, 14).title).toContain('Le Mat');
    expect(calculateQuizRank(12, 14).grade).toBe('A');
    expect(calculateQuizRank(10, 14).grade).toBe('B');
    expect(calculateQuizRank(8, 14).grade).toBe('C');
    expect(calculateQuizRank(4, 14).grade).toBe('D');
    expect(calculateQuizRank(0, 0).grade).toBe('D');
  });

  it('evaluates answers correctly case-insensitively', () => {
    expect(evaluateAnswer('frolunda-hc', 'FROLUNDA-HC')).toBe(true);
    expect(evaluateAnswer('brynas-if', 'farjestad-bk')).toBe(false);
    expect(evaluateAnswer('', 'hv71')).toBe(false);
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
    expect(stadiumQ.prompt).toContain('Vilken klubb har');
    expect(stadiumQ.prompt).toContain('som hemmaarena?');
  });

  it('generates questions excluding answered IDs', () => {
    const exclude = SHL_CLUBS.slice(0, 13).map((t) => t.id);
    const q = generateQuestion('team-name', exclude);
    expect(q.targetTeam.id).toBe(SHL_CLUBS[13].id);
  });

  it('provides helpful hint text in Swedish for SHL clubs', () => {
    const fhc = SHL_CLUBS.find((t) => t.id === 'frolunda-hc')!;
    const hint = getHintText(fhc);
    expect(hint).toContain('Ledtråd:');
    expect(hint).toContain('Götaland');
    expect(hint).toContain('Göteborg');
  });

  it('calculates quiz progress percentages for 14 clubs', () => {
    const progress = calculateQuizProgress(7, 0, 14);
    expect(progress.identifiedCount).toBe(7);
    expect(progress.remainingCount).toBe(7);
    expect(progress.percentage).toBe(50);
  });
});
