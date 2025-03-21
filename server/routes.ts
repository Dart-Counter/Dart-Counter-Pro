import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlayerSchema, insertGameSchema, insertScoreSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API router
  const apiRouter = express.Router();
  
  // Error handling middleware
  const handleZodError = (error: unknown, res: express.Response) => {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return res.status(400).json({ message: validationError.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  };

  // Default players route
  apiRouter.get("/players", async (req, res) => {
    const soloMode = req.query.solo === 'true';
    if (soloMode) {
      res.json([{ id: 1, name: "Practice Mode" }]);
    } else {
      res.json([{ id: 1, name: "Player 1" }, { id: 2, name: "Player 2" }]);
    }
  });

  // Game routes
  apiRouter.get("/games", async (req, res) => {
    try {
      const games = await storage.getGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch games" });
    }
  });

  apiRouter.get("/games/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const games = await storage.getRecentGames(limit);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent games" });
    }
  });

  apiRouter.get("/games/player/:playerId", async (req, res) => {
    try {
      const playerId = parseInt(req.params.playerId);
      const games = await storage.getPlayerGames(playerId);
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch player games" });
    }
  });

  apiRouter.get("/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const game = await storage.getGame(id);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch game" });
    }
  });

  apiRouter.post("/games", async (req, res) => {
    try {
      const data = insertGameSchema.parse(req.body);
      const game = await storage.createGame(data);
      res.status(201).json(game);
    } catch (error) {
      handleZodError(error, res);
    }
  });

  apiRouter.put("/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedGame = await storage.updateGame(id, req.body);
      if (!updatedGame) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json(updatedGame);
    } catch (error) {
      res.status(500).json({ message: "Failed to update game" });
    }
  });

  apiRouter.delete("/games/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await storage.deleteGame(id);
      if (!result) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete game" });
    }
  });

  // Score routes
  apiRouter.get("/scores/game/:gameId", async (req, res) => {
    try {
      const gameId = parseInt(req.params.gameId);
      const scores = await storage.getScores(gameId);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scores" });
    }
  });

  apiRouter.get("/scores/player/:playerId", async (req, res) => {
    try {
      const playerId = parseInt(req.params.playerId);
      const scores = await storage.getPlayerScores(playerId);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch player scores" });
    }
  });

  apiRouter.get("/scores/high", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const highScores = await storage.getHighScores(limit);
      res.json(highScores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch high scores" });
    }
  });

  apiRouter.post("/scores", async (req, res) => {
    try {
      const data = insertScoreSchema.parse(req.body);
      const score = await storage.createScore(data);
      res.status(201).json(score);
    } catch (error) {
      handleZodError(error, res);
    }
  });

  apiRouter.delete("/scores/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await storage.deleteScore(id);
      if (!result) {
        return res.status(404).json({ message: "Score not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete score" });
    }
  });

  // Register the API router with the /api prefix
  app.use("/api", apiRouter);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
