import { PREMIER_LEAGUE_CLUBS, PremierLeagueClub } from '../data/premierLeagueTeamsData';

export type QuestionType = 'team-name' | 'stadium' | 'division' | 'city' | 'multiple-choice';

export interface QuizQuestion {
  targetTeam: PremierLeagueClub;
  questionType: QuestionType;
  prompt: string;
  choices?: PremierLeagueClub[];
}

export interface PerformanceTier {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  minAccuracy: number;
  thresholdLabel: string;
  title: string;
  description: string;
  color: string;
  badgeEmoji: string;
}

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    grade: 'S',
    minAccuracy: 95,
    thresholdLabel: '95% – 100%',
    title: 'The Invincibles',
    description: 'Immortal glory! Complete tactical mastery of Premier League geography.',
    color: '#38003c',
    badgeEmoji: '🏆',
  },
  {
    grade: 'A',
    minAccuracy: 85,
    thresholdLabel: '85% – 94%',
    title: 'Champions League Winner',
    description: 'European elite! Exceptional knowledge of English football grounds & clubs.',
    color: '#059669',
    badgeEmoji: '🥇',
  },
  {
    grade: 'B',
    minAccuracy: 70,
    thresholdLabel: '70% – 84%',
    title: 'Top 4 Finish',
    description: 'Continental qualifier! Strong grasp of Premier League stadiums and cities.',
    color: '#2563eb',
    badgeEmoji: '⭐',
  },
  {
    grade: 'C',
    minAccuracy: 50,
    thresholdLabel: '50% – 69%',
    title: 'Mid-Table Safety',
    description: 'Comfortable top-flight finish. Keep training to recognize all 20 clubs.',
    color: '#d97706',
    badgeEmoji: '⚽',
  },
  {
    grade: 'D',
    minAccuracy: 0,
    thresholdLabel: '< 50%',
    title: 'Relegation Battle',
    description: 'Hit the tactical board! More training needed to survive in the top flight.',
    color: '#64748b',
    badgeEmoji: '📋',
  },
];

export function calculateQuizRank(score: number, totalAnswered: number): PerformanceTier {
  const fallback = PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];
  if (totalAnswered <= 0) return fallback;

  const accuracy = Math.round((score / totalAnswered) * 100);
  const found = PERFORMANCE_TIERS.find((t) => accuracy >= t.minAccuracy);
  return found || fallback;
}

export function generateMultipleChoiceOptions(
  targetClub: PremierLeagueClub,
  clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS
): PremierLeagueClub[] {
  const sameRegion = clubs.filter(
    (c) => c.id !== targetClub.id && c.region === targetClub.region
  );
  const otherRegion = clubs.filter(
    (c) => c.id !== targetClub.id && c.region !== targetClub.region
  );

  const shuffledSame = [...sameRegion].sort(() => Math.random() - 0.5);
  const shuffledOther = [...otherRegion].sort(() => Math.random() - 0.5);
  const distractors = [...shuffledSame, ...shuffledOther].slice(0, 3);

  return [targetClub, ...distractors].sort(() => Math.random() - 0.5);
}

function pickQuestionType(mode: 'mixed' | QuestionType): QuestionType {
  if (mode !== 'mixed') return mode;
  const types: QuestionType[] = ['team-name', 'stadium', 'division', 'city', 'multiple-choice'];
  return types[Math.floor(Math.random() * types.length)];
}

export function generateQuestion(
  mode: 'mixed' | QuestionType = 'mixed',
  excludedClubIds: string[] = [],
  clubs: PremierLeagueClub[] = PREMIER_LEAGUE_CLUBS
): QuizQuestion | null {
  const available = clubs.filter((c) => !excludedClubIds.includes(c.id));
  if (available.length === 0) return null;

  const targetClub = available[Math.floor(Math.random() * available.length)];
  const qType = pickQuestionType(mode);

  let prompt = '';
  let choices: PremierLeagueClub[] | undefined;

  switch (qType) {
    case 'stadium':
      prompt = `Which Premier League club plays their home matches at ${targetClub.stadium}?`;
      break;
    case 'division':
      prompt = `Identify the club based in the ${targetClub.region} region (${targetClub.city}).`;
      break;
    case 'city':
      prompt = `Which Premier League club calls ${targetClub.city} home (known as "${targetClub.nickname}")?`;
      break;
    case 'multiple-choice': {
      choices = generateMultipleChoiceOptions(targetClub, clubs);
      prompt = `Select the club that plays at ${targetClub.stadium} in ${targetClub.city}:`;
      break;
    }
    case 'team-name':
    default:
      prompt = `Click on the map pin for ${targetClub.name} (${targetClub.stadium})`;
      break;
  }

  return {
    targetTeam: targetClub,
    questionType: qType,
    prompt,
    choices,
  };
}

export function evaluateAnswer(selectedClubId: string, targetClubId: string): boolean {
  if (!selectedClubId || !targetClubId) return false;
  return selectedClubId.toUpperCase() === targetClubId.toUpperCase();
}

export function calculateNewStreak(currentStreak: number, isCorrect: boolean): number {
  return isCorrect ? currentStreak + 1 : 0;
}

export function getHintText(club: PremierLeagueClub): string {
  if (!club) return '';
  return `Hint: This club is located in ${club.region} (${club.city}) and plays at ${club.stadium}.`;
}

export function calculateQuizProgress(
  solvedCount: number,
  revealedCount: number,
  totalClubs: number = PREMIER_LEAGUE_CLUBS.length
): { identifiedCount: number; remainingCount: number; percentage: number } {
  const identifiedCount = Math.min(totalClubs, Math.max(0, solvedCount + revealedCount));
  const remainingCount = Math.max(0, totalClubs - identifiedCount);
  const percentage = totalClubs > 0 ? Math.round((identifiedCount / totalClubs) * 100) : 0;
  return { identifiedCount, remainingCount, percentage };
}
