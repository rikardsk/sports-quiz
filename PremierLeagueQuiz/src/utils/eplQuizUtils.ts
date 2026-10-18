import { PremierLeagueClub, PREMIER_LEAGUE_CLUBS } from '../data/premierLeagueTeamsData';

export type QuestionType =
  | 'identify-stadium'
  | 'identify-club'
  | 'identify-nickname'
  | 'identify-region'
  | 'map-locate';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  targetClub: PremierLeagueClub;
  options: string[];
  correctAnswer: string;
}

export interface QuizRank {
  title: string;
  badge: string;
  minScore: number;
}

export const QUIZ_RANKS: QuizRank[] = [
  { title: 'Premier League Legend', badge: '👑', minScore: 90 },
  { title: 'World Class Manager', badge: '🏆', minScore: 75 },
  { title: 'Top Four Contender', badge: '⭐', minScore: 60 },
  { title: 'Premier League Regular', badge: '⚽', minScore: 40 },
  { title: 'Academy Prospect', badge: '🌱', minScore: 0 },
];

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateStadiumQuestion(target: PremierLeagueClub, others: PremierLeagueClub[]): QuizQuestion {
  const distractors = others.slice(0, 3).map((c) => c.name);
  const options = shuffleArray([target.name, ...distractors]);
  return {
    id: `stadium-${target.id}-${Date.now()}`,
    type: 'identify-stadium',
    prompt: `Which Premier League club plays their home matches at ${target.stadium}?`,
    targetClub: target,
    options,
    correctAnswer: target.name,
  };
}

function generateNicknameQuestion(target: PremierLeagueClub, others: PremierLeagueClub[]): QuizQuestion {
  const distractors = others.slice(0, 3).map((c) => c.name);
  const options = shuffleArray([target.name, ...distractors]);
  return {
    id: `nickname-${target.id}-${Date.now()}`,
    type: 'identify-nickname',
    prompt: `Which club is famously known by the nickname "${target.nickname}"?`,
    targetClub: target,
    options,
    correctAnswer: target.name,
  };
}

function generateRegionQuestion(target: PremierLeagueClub, others: PremierLeagueClub[]): QuizQuestion {
  const otherRegions = Array.from(new Set(others.map((c) => c.region))).filter((r) => r !== target.region);
  const distractors = shuffleArray(otherRegions).slice(0, 3);
  const options = shuffleArray([target.region, ...distractors]);
  return {
    id: `region-${target.id}-${Date.now()}`,
    type: 'identify-region',
    prompt: `In which English region is ${target.name} based?`,
    targetClub: target,
    options,
    correctAnswer: target.region,
  };
}

function generateMapQuestion(target: PremierLeagueClub): QuizQuestion {
  return {
    id: `map-${target.id}-${Date.now()}`,
    type: 'map-locate',
    prompt: `Locate ${target.name} (${target.stadium}) on the UK map!`,
    targetClub: target,
    options: [],
    correctAnswer: target.id,
  };
}

export function generateQuestion(excludeIds: Set<string> = new Set()): QuizQuestion {
  const available = PREMIER_LEAGUE_CLUBS.filter((c) => !excludeIds.has(c.id));
  const pool = available.length > 0 ? available : PREMIER_LEAGUE_CLUBS;
  const target = pool[Math.floor(Math.random() * pool.length)];
  const others = shuffleArray(PREMIER_LEAGUE_CLUBS.filter((c) => c.id !== target.id));

  const types: QuestionType[] = ['identify-stadium', 'identify-nickname', 'identify-region', 'map-locate'];
  const chosenType = types[Math.floor(Math.random() * types.length)];

  if (chosenType === 'identify-stadium') return generateStadiumQuestion(target, others);
  if (chosenType === 'identify-nickname') return generateNicknameQuestion(target, others);
  if (chosenType === 'identify-region') return generateRegionQuestion(target, others);
  return generateMapQuestion(target);
}

export function evaluateAnswer(question: QuizQuestion, answer: string): boolean {
  if (!question || !answer) return false;
  return question.correctAnswer.toLowerCase().trim() === answer.toLowerCase().trim();
}

export function calculateQuizRank(scorePercentage: number): QuizRank {
  for (const rank of QUIZ_RANKS) {
    if (scorePercentage >= rank.minScore) return rank;
  }
  return QUIZ_RANKS[QUIZ_RANKS.length - 1];
}
