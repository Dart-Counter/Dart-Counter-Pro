import { pgTable, text, serial, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Player schema
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gamesPlayed: integer("games_played").notNull().default(0),
  wins: integer("wins").notNull().default(0),
  highestScore: integer("highest_score").notNull().default(0),
  created: timestamp("created").notNull().defaultNow(),
});

export const insertPlayerSchema = createInsertSchema(players).pick({
  name: true,
});

// Game schema
export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  gameType: text("game_type").notNull(), // 101, 301, 501, around-the-world, west-to-east, north-to-south
  playersData: jsonb("players_data").notNull(), // Array of player IDs and their final scores
  winner: integer("winner"), // Player ID of the winner
  date: timestamp("date").notNull().defaultNow(),
  completed: boolean("completed").notNull().default(false),
});

export const insertGameSchema = createInsertSchema(games).pick({
  gameType: true,
  playersData: true,
});

// Score schema
export const scores = pgTable("scores", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull(),
  playerId: integer("player_id").notNull(),
  score: integer("score").notNull(),
  round: integer("round").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const insertScoreSchema = createInsertSchema(scores).pick({
  gameId: true,
  playerId: true,
  score: true,
  round: true,
});

// Types
export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;

export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;

export type Score = typeof scores.$inferSelect;
export type InsertScore = z.infer<typeof insertScoreSchema>;

// Game types
export const gameTypes = [
  "101", "301", "501",
  "around-the-world", 
  "west-to-east", 
  "north-to-south"
] as const;

export const GameTypeSchema = z.enum(gameTypes);
export type GameType = z.infer<typeof GameTypeSchema>;

// Player data in game
export const PlayerDataSchema = z.object({
  playerId: z.number(),
  initialScore: z.number(),
  currentScore: z.number(),
  position: z.number().optional(), // For sequence games
  throws: z.array(z.number()).optional(),
  bust: z.boolean().optional(), // For X01 games when going below 0
  invalidFinish: z.boolean().optional(), // For X01 games when not finishing on a double
});

export type PlayerData = z.infer<typeof PlayerDataSchema>;

export const PlayersDataSchema = z.array(PlayerDataSchema);
export type PlayersData = z.infer<typeof PlayersDataSchema>;
