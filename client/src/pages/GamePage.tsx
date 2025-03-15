import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import GameModeSelector from "@/components/game/GameModeSelector";
import Scoreboard from "@/components/game/Scoreboard";
import ScoreInput from "@/components/game/ScoreInput";
import Achievement from "@/components/ui/achievement";
import { WinCelebration } from "@/lib/animations";
import { GameState, Player, ThrowType, GameType, PlayersData } from "@/types";
import { initializeGame, processThrow, calculateThrowScore } from "@/lib/gameLogic";
import { GAME_MODES, HIGH_SCORE_THRESHOLD } from "@/constants";

const GamePage = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState({ title: "", message: "" });
  const [showWinCelebration, setShowWinCelebration] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [recentHighScore, setRecentHighScore] = useState(false);
  
  const { toast } = useToast();
  
  // Fetch players
  const { data: players = [] } = useQuery<Player[]>({
    queryKey: ["/api/players"],
  });
  
  // Fetch recent games
  const { data: recentGames = [] } = useQuery({
    queryKey: ["/api/games/recent"],
  });
  
  // Create new game mutation
  const createGameMutation = useMutation({
    mutationFn: async (gameData: { gameType: string; playersData: PlayersData }) => {
      const response = await apiRequest("POST", "/api/games", gameData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/games/recent"] });
    },
  });
  
  // Update game mutation
  const updateGameMutation = useMutation({
    mutationFn: async (gameData: { id: number; data: Partial<GameState> }) => {
      const response = await apiRequest("PUT", `/api/games/${gameData.id}`, gameData.data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/games/recent"] });
    },
  });
  
  // Create score mutation
  const createScoreMutation = useMutation({
    mutationFn: async (scoreData: { gameId: number; playerId: number; score: number; round: number }) => {
      const response = await apiRequest("POST", "/api/scores", scoreData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scores/high"] });
    },
  });
  
  useEffect(() => {
    // Initialize a game if none exists and we have players
    if (!gameState && players.length > 0) {
      startNewGame("501", players.slice(0, 2).map(p => p.id));
    }
  }, [players]);
  
  // Initialize a new game
  const startNewGame = (gameType: GameType, playerIds: number[]) => {
    if (playerIds.length === 0) {
      toast({
        title: "Cannot start game",
        description: "Please add at least one player first",
        variant: "destructive",
      });
      return;
    }
    
    const newState = initializeGame(gameType, playerIds);
    setGameState(newState);
    
    // Create game in the database
    createGameMutation.mutate({
      gameType: newState.gameType,
      playersData: newState.players,
    }, {
      onSuccess: (game) => {
        setGameState(prev => prev ? { ...prev, id: game.id } : prev);
      }
    });
  };
  
  // Handle game mode selection
  const handleGameModeSelect = (mode: GameType) => {
    if (players.length === 0) {
      toast({
        title: "Cannot start game",
        description: "Please add at least one player first",
        variant: "destructive",
      });
      return;
    }
    
    // Use currently active players or default to first 2
    const playerIds = gameState?.players.map(p => p.playerId) || players.slice(0, 2).map(p => p.id);
    startNewGame(mode, playerIds);
  };
  
  // Handle score submission
  const handleScoreSubmit = (throwType: ThrowType, value: number) => {
    if (!gameState) return;
    
    const scoreValue = calculateThrowScore(throwType, value);
    const currentPlayerId = gameState.players[gameState.currentPlayerIndex].playerId;
    
    // Process the throw in the game state
    const newState = processThrow(gameState, throwType, value);
    setGameState(newState);
    
    // Check if high score
    if (scoreValue >= HIGH_SCORE_THRESHOLD) {
      setAchievementMessage({
        title: "High Score!",
        message: `You hit ${scoreValue}! Impressive!`
      });
      setShowAchievement(true);
      setRecentHighScore(true);
      setTimeout(() => setRecentHighScore(false), 3000);
    }
    
    // Record the score
    if (gameState.id) {
      createScoreMutation.mutate({
        gameId: gameState.id,
        playerId: currentPlayerId,
        score: scoreValue,
        round: gameState.currentRound,
      });
    }
    
    // Check for win condition
    if (newState.completed && newState.winner) {
      const winner = players.find(p => p.id === newState.winner);
      if (winner) {
        setWinnerName(winner.name);
        setShowWinCelebration(true);
        
        // Update game in the database
        if (gameState.id) {
          updateGameMutation.mutate({
            id: gameState.id,
            data: {
              completed: true,
              winner: newState.winner,
              playersData: newState.players,
            }
          });
        }
      }
    }
  };
  
  // Handle miss
  const handleMiss = () => {
    if (!gameState) return;
    handleScoreSubmit("miss", 0);
  };
  
  // Handle undo
  const handleUndo = () => {
    // This would need access to previous state
    toast({
      title: "Undo not implemented",
      description: "This feature is coming soon",
    });
  };
  
  // Restart current game
  const handleRestartGame = () => {
    if (!gameState) return;
    const gameType = gameState.gameType;
    const playerIds = gameState.players.map(p => p.playerId);
    startNewGame(gameType, playerIds);
  };
  
  // Start a new game (different from current)
  const handleNewGame = () => {
    // For now, same as restart but could show a dialog
    if (!gameState) return;
    handleRestartGame();
  };
  
  // Close achievement notification
  const handleCloseAchievement = () => {
    setShowAchievement(false);
  };
  
  if (players.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-['Orbitron'] text-primary mb-4">Welcome to DartCounter Pro</h2>
        <p className="text-muted-foreground mb-6">Please add players in the Players section before starting a game.</p>
      </div>
    );
  }
  
  return (
    <>
      <GameModeSelector 
        selectedMode={gameState?.gameType || "501"} 
        onModeSelect={handleGameModeSelect} 
      />
      
      {gameState && (
        <>
          <Scoreboard 
            gameState={gameState}
            players={players}
            onRestartGame={handleRestartGame}
            onNewGame={handleNewGame}
            recentHighScore={recentHighScore}
          />
          
          <ScoreInput 
            gameState={gameState}
            players={players}
            onScoreSubmit={handleScoreSubmit}
            onMiss={handleMiss}
            onUndo={handleUndo}
          />
        </>
      )}
      
      {/* Achievement notification */}
      <Achievement 
        title={achievementMessage.title}
        message={achievementMessage.message}
        isVisible={showAchievement}
        onClose={handleCloseAchievement}
      />
      
      {/* Win celebration */}
      <WinCelebration 
        isVisible={showWinCelebration}
        playerName={winnerName}
      />
    </>
  );
};

export default GamePage;
