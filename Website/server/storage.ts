import { 
  type Player, type InsertPlayer,
  type Game, type InsertGame,
  type Score, type InsertScore,
  type PlayerData, type PlayersData
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Player operations
  getPlayers(): Promise<Player[]>;
  getPlayer(id: number): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: number, data: Partial<Omit<Player, "id">>): Promise<Player | undefined>;
  deletePlayer(id: number): Promise<boolean>;
  
  // Game operations
  getGames(): Promise<Game[]>;
  getGame(id: number): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
  updateGame(id: number, data: Partial<Omit<Game, "id">>): Promise<Game | undefined>;
  deleteGame(id: number): Promise<boolean>;
  getRecentGames(limit: number): Promise<Game[]>;
  getPlayerGames(playerId: number): Promise<Game[]>;
  
  // Score operations
  getScores(gameId: number): Promise<Score[]>;
  getPlayerScores(playerId: number): Promise<Score[]>;
  createScore(score: InsertScore): Promise<Score>;
  deleteScore(id: number): Promise<boolean>;
  getHighScores(limit: number): Promise<{player: Player, score: Score}[]>;
}

export class MemStorage implements IStorage {
  private players: Map<number, Player>;
  private games: Map<number, Game>;
  private scores: Map<number, Score>;
  private playerId: number;
  private gameId: number;
  private scoreId: number;

  constructor() {
    this.players = new Map();
    this.games = new Map();
    this.scores = new Map();
    this.playerId = 1;
    this.gameId = 1;
    this.scoreId = 1;
  }

  // Player operations
  async getPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }

  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async createPlayer(player: InsertPlayer): Promise<Player> {
    const id = this.playerId++;
    const newPlayer: Player = {
      id,
      name: player.name,
      gamesPlayed: 0,
      wins: 0,
      highestScore: 0,
      created: new Date()
    };
    this.players.set(id, newPlayer);
    return newPlayer;
  }

  async updatePlayer(id: number, data: Partial<Omit<Player, "id">>): Promise<Player | undefined> {
    const player = this.players.get(id);
    if (!player) return undefined;
    
    const updatedPlayer = { ...player, ...data };
    this.players.set(id, updatedPlayer);
    return updatedPlayer;
  }

  async deletePlayer(id: number): Promise<boolean> {
    return this.players.delete(id);
  }

  // Game operations
  async getGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async createGame(game: InsertGame): Promise<Game> {
    const id = this.gameId++;
    const newGame: Game = {
      id,
      gameType: game.gameType,
      playersData: game.playersData,
      winner: null,
      date: new Date(),
      completed: false
    };
    this.games.set(id, newGame);
    
    // Update gamesPlayed for all players
    const playerIds = (newGame.playersData as PlayersData).map(p => p.playerId);
    for (const playerId of playerIds) {
      const player = await this.getPlayer(playerId);
      if (player) {
        await this.updatePlayer(playerId, {
          gamesPlayed: player.gamesPlayed + 1
        });
      }
    }
    
    return newGame;
  }

  async updateGame(id: number, data: Partial<Omit<Game, "id">>): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    
    const updatedGame = { ...game, ...data };
    this.games.set(id, updatedGame);
    
    // If game is completed and has a winner, update player stats
    if (data.completed && data.winner) {
      const winnerPlayer = await this.getPlayer(data.winner);
      if (winnerPlayer) {
        await this.updatePlayer(data.winner, {
          wins: winnerPlayer.wins + 1
        });
      }
    }
    
    return updatedGame;
  }

  async deleteGame(id: number): Promise<boolean> {
    return this.games.delete(id);
  }

  async getRecentGames(limit: number): Promise<Game[]> {
    return Array.from(this.games.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  async getPlayerGames(playerId: number): Promise<Game[]> {
    return Array.from(this.games.values())
      .filter(game => {
        const playerIds = (game.playersData as PlayersData).map(p => p.playerId);
        return playerIds.includes(playerId);
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Score operations
  async getScores(gameId: number): Promise<Score[]> {
    return Array.from(this.scores.values())
      .filter(score => score.gameId === gameId)
      .sort((a, b) => a.round - b.round);
  }

  async getPlayerScores(playerId: number): Promise<Score[]> {
    return Array.from(this.scores.values())
      .filter(score => score.playerId === playerId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createScore(score: InsertScore): Promise<Score> {
    const id = this.scoreId++;
    const newScore: Score = {
      id,
      gameId: score.gameId,
      playerId: score.playerId,
      score: score.score,
      round: score.round,
      date: new Date()
    };
    this.scores.set(id, newScore);
    
    // Update player's highest score if needed
    const player = await this.getPlayer(score.playerId);
    if (player && score.score > player.highestScore) {
      await this.updatePlayer(score.playerId, {
        highestScore: score.score
      });
    }
    
    return newScore;
  }

  async deleteScore(id: number): Promise<boolean> {
    return this.scores.delete(id);
  }

  async getHighScores(limit: number): Promise<{player: Player, score: Score}[]> {
    const allScores = Array.from(this.scores.values());
    const playerHighScores: Map<number, Score> = new Map();
    
    // Find highest score for each player
    for (const score of allScores) {
      const currentHighest = playerHighScores.get(score.playerId);
      if (!currentHighest || score.score > currentHighest.score) {
        playerHighScores.set(score.playerId, score);
      }
    }
    
    // Create result array with player and score pairs
    const result: {player: Player, score: Score}[] = [];
    for (const [playerId, score] of playerHighScores) {
      const player = await this.getPlayer(playerId);
      if (player) {
        result.push({ player, score });
      }
    }
    
    // Sort by score and limit
    return result
      .sort((a, b) => b.score.score - a.score.score)
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
