import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import { GameState, Player } from "@/types";
import { getPlayerScoreDisplay } from "@/lib/gameLogic";
import { HighlightScore } from "@/lib/animations";
import { useState, useEffect } from "react";

interface ScoreboardProps {
  gameState: GameState;
  players: Player[];
  onRestartGame: () => void;
  onNewGame: () => void;
  recentHighScore?: boolean;
}

const Scoreboard = ({ 
  gameState, 
  players, 
  onRestartGame, 
  onNewGame,
  recentHighScore = false
}: ScoreboardProps) => {
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);
  
  // Find the current active player for highlighting
  const currentPlayerIndex = gameState.currentPlayerIndex;
  
  useEffect(() => {
    if (recentHighScore) {
      setAnimateIndex(currentPlayerIndex);
      const timer = setTimeout(() => {
        setAnimateIndex(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [recentHighScore, currentPlayerIndex]);

  // Calculate average for each player
  const calculateAverage = (playerId: number) => {
    const playerData = gameState.players.find(p => p.playerId === playerId);
    if (!playerData || !playerData.throws || playerData.throws.length === 0) {
      return 0;
    }
    
    const sum = playerData.throws.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / playerData.throws.length);
  };

  // Get player's last three throws
  const getLastThrows = (playerId: number) => {
    const playerData = gameState.players.find(p => p.playerId === playerId);
    if (!playerData || !playerData.throws) {
      return ['-', '-', '-'];
    }
    
    const throws = [...playerData.throws];
    while (throws.length < 3) {
      throws.unshift(0);
    }
    
    return throws.slice(-3).map(t => t === 0 ? '-' : t.toString());
  };

  // Get player name by ID
  const getPlayerName = (playerId: number) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Unknown';
  };

  // Get player initial for avatar
  const getPlayerInitial = (playerId: number) => {
    const name = getPlayerName(playerId);
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card className="bg-panel border-2 border-primary">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="font-['Orbitron'] text-primary text-lg sm:text-xl">
            Active Game: <span className="text-foreground">{gameState.gameType}</span>
          </h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={onRestartGame}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={onNewGame}
            >
              <Plus className="h-4 w-4 mr-1" /> New Game
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-center text-sm sm:text-base">
            <thead>
              <tr className="border-b border-primary">
                <th className="p-1 sm:p-2 text-primary">Player</th>
                <th className="p-1 sm:p-2 text-primary">Score</th>
                <th className="p-1 sm:p-2 text-primary">Last 3</th>
                <th className="p-1 sm:p-2 text-primary">Avg</th>
                <th className="p-1 sm:p-2 text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gameState.players.map((playerData, index) => {
                const playerId = playerData.playerId;
                const isActive = index === currentPlayerIndex;
                const lastThrows = getLastThrows(playerId);
                
                return (
                  <tr 
                    key={playerId} 
                    className={`border-b border-gray-700 ${
                      isActive ? "bg-primary bg-opacity-5" : ""
                    }`}
                  >
                    <td className="p-1 sm:p-2">
                      <div className="flex items-center justify-center">
                        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-1 sm:mr-2 text-xs sm:text-sm">
                          {getPlayerInitial(playerId)}
                        </div>
                        <span>{getPlayerName(playerId)}</span>
                      </div>
                    </td>
                    <td className="p-1 sm:p-2">
                      <HighlightScore 
                        score={getPlayerScoreDisplay(gameState, index)}
                        animate={animateIndex === index}
                      />
                    </td>
                    <td className="p-1 sm:p-2">
                      <div className="flex justify-center space-x-1 sm:space-x-2">
                        {lastThrows.map((throwVal, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-panel border border-muted-foreground flex items-center justify-center text-xs sm:text-sm"
                          >
                            {throwVal}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-1 sm:p-2">
                      <span>{calculateAverage(playerId)}</span>
                    </td>
                    <td className="p-1 sm:p-2">
                      <Button 
                        variant="ghost" 
                        className="text-destructive hover:text-destructive/80 h-7 w-7 p-0"
                        size="sm"
                      >
                        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Scoreboard;
