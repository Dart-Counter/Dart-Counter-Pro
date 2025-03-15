import { 
  Player, Game, Score, GameType, 
  PlayerData, PlayersData 
} from "@shared/schema";

// Re-export types from schema
export type { 
  Player, Game, Score, GameType, 
  PlayerData, PlayersData 
};

// Local type extensions
export interface GameWithPlayers extends Game {
  players: Player[];
}

export interface PlayerWithStats extends Player {
  averageScore?: number;
}

export interface ScoreWithDetails extends Score {
  player: Player;
  game: Game;
}

export interface HighScoreEntry {
  player: Player;
  score: Score;
}

export type ThrowType = "single" | "double" | "triple" | "outerBull" | "bullseye" | "miss";

export interface ThrowScore {
  type: ThrowType;
  value: number;
  calculatedValue: number;
}

export interface GameState {
  id?: number;
  gameType: GameType;
  players: PlayerData[];
  currentPlayerIndex: number;
  currentRound: number;
  currentThrow: number; // 0, 1, or 2 for the three throws per turn
  throws: ThrowScore[];
  completed: boolean;
  winner?: number;
}

export interface SettingsState {
  soundEffects: boolean;
  animations: boolean;
}
