import { LeaderboardEntry } from '../types';

const STORAGE_KEY = 'sweet_cake_adventure_leaderboard';

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Emma (Group 1)',
    score: 980,
    stars: 5,
    avatar: '🌟',
    date: 'Today',
    badges: ['Cake Master', 'Straight Walker', 'Phonics Star']
  },
  {
    id: '2',
    name: 'Lucas (Group 2)',
    score: 920,
    stars: 5,
    avatar: '🦁',
    date: 'Today',
    badges: ['Blonde Stylist', 'Moustache King']
  },
  {
    id: '3',
    name: 'Lily (Group 3)',
    score: 870,
    stars: 4,
    avatar: '🐰',
    date: 'Today',
    badges: ['Lake Explorer']
  },
  {
    id: '4',
    name: 'Jack (Group 4)',
    score: 830,
    stars: 4,
    avatar: '🚀',
    date: 'Today',
    badges: ['Field Runner']
  },
  {
    id: '5',
    name: 'Teacher Demo',
    score: 790,
    stars: 3,
    avatar: '👩‍🏫',
    date: 'Today',
    badges: ['Great Effort']
  }
];

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
      return DEFAULT_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.sort((a, b) => b.score - a.score);
    }
    return DEFAULT_LEADERBOARD;
  } catch (err) {
    console.error('Failed to read leaderboard:', err);
    return DEFAULT_LEADERBOARD;
  }
}

export function saveLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry[] {
  const current = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const updated = [...current, newEntry].sort((a, b) => b.score - a.score).slice(0, 15);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save score:', err);
  }
  return updated;
}

export function resetLeaderboard(): LeaderboardEntry[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
  } catch (err) {
    console.error('Failed to reset leaderboard:', err);
  }
  return DEFAULT_LEADERBOARD;
}
