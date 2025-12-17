export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  FEEDBACK = 'FEEDBACK',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY',
  STUDY = 'STUDY',
  LEVEL_TRANSITION = 'LEVEL_TRANSITION'
}

export interface Question {
  id: number;
  text: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  monsterName: string;
  monsterEmoji: string;
  questions: Question[];
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  score: number;
  streak: number;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  date: string; // ISO string
  avatarColor?: string;
}