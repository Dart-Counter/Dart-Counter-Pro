import { Card, CardContent } from "@/components/ui/card";
import { Game, Player } from "@/types";
import { formatGameDate, getGameName } from "@/lib/gameLogic";
import { SlideIn } from "@/lib/animations";

interface GameHistoryListProps {
  games: Game[];
  players: Player[];
}

const GameHistoryList = ({ games, players }: GameHistoryListProps) => {
  // Helper function to find player by ID
  const getPlayerName = (playerId: number | null) => {
    if (!playerId) return "Unknown";
    const player = players.find(p => p.id === playerId);
    return player ? player.name : "Unknown";
  };

  // Helper to extract player IDs from playersData
  const getGamePlayers = (playersData: any) => {
    if (!playersData || !Array.isArray(playersData)) return [];
    return playersData.map((p: any) => p.playerId);
  };

  return (
    <Card className="bg-panel border border-primary rounded-lg p-4">
      <h3 className="text-lg font-['Orbitron'] text-primary mb-3">Recent Games</h3>
      {games.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No games played yet</p>
      ) : (
        <ul className="space-y-3">
          {games.map((game, index) => {
            const playerIds = getGamePlayers(game.playersData);
            const playerNames = playerIds.map(id => getPlayerName(id)).join(", ");
            
            return (
              <SlideIn key={game.id} delay={index * 0.1} direction="right">
                <li className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-primary">{getGameName(game.gameType as any)}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        {formatGameDate(game.date)}
                      </span>
                    </div>
                    {game.winner && (
                      <span className="text-emerald-500">
                        {getPlayerName(game.winner)} Won
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1">
                    Players: {playerNames}
                  </div>
                </li>
              </SlideIn>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

export default GameHistoryList;
