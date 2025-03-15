import { Card, CardContent } from "@/components/ui/card";
import { Player } from "@/types";
import { SlideIn } from "@/lib/animations";

interface PlayerRankingsProps {
  players: Player[];
}

const PlayerRankings = ({ players }: PlayerRankingsProps) => {
  // Sort players by wins
  const sortedPlayers = [...players]
    .sort((a, b) => b.wins - a.wins || b.highestScore - a.highestScore);

  // Calculate average score (mock calculation as we don't have full score history)
  const getPlayerAverage = (player: Player) => {
    // This would typically be calculated from player's score history
    // For now, we'll use a simplified approach
    if (player.gamesPlayed === 0) return 0;
    const baseAvg = 30 + (player.highestScore / 10);
    return Math.round(baseAvg * 10) / 10;
  };

  return (
    <Card className="bg-panel border border-primary rounded-lg p-4">
      <h3 className="text-lg font-['Orbitron'] text-primary mb-3">Player Rankings</h3>
      {players.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No players yet</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary text-left">
              <th className="p-2 text-primary">Player</th>
              <th className="p-2 text-primary">Wins</th>
              <th className="p-2 text-primary">Avg</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <SlideIn key={player.id} delay={index * 0.1} direction="left">
                <tr className="border-b border-gray-700">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2 text-xs">
                        {player.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{player.name}</span>
                    </div>
                  </td>
                  <td className="p-2">{player.wins}</td>
                  <td className="p-2">{getPlayerAverage(player)}</td>
                </tr>
              </SlideIn>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default PlayerRankings;
