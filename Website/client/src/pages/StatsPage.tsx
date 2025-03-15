import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Game, Player, HighScoreEntry } from "@/types";
import GameHistoryList from "@/components/stats/GameHistoryList";
import PlayerRankings from "@/components/stats/PlayerRankings";
import HighScoreList from "@/components/stats/HighScoreList";
import { FadeIn } from "@/lib/animations";

const StatsPage = () => {
  // Fetch players
  const { data: players = [], isLoading: playersLoading } = useQuery<Player[]>({
    queryKey: ["/api/players"],
  });

  // Fetch recent games
  const { data: recentGames = [], isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ["/api/games/recent"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${queryKey[0]}?limit=5`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch recent games");
      }
      return response.json();
    },
  });

  // Fetch high scores
  const { data: highScores = [], isLoading: scoresLoading } = useQuery<HighScoreEntry[]>({
    queryKey: ["/api/scores/high"],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`${queryKey[0]}?limit=5`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch high scores");
      }
      return response.json();
    },
  });

  const isLoading = playersLoading || gamesLoading || scoresLoading;
  const hasData = players.length > 0 || recentGames.length > 0 || highScores.length > 0;

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading statistics...</p>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-['Orbitron'] text-primary mb-4">No Statistics Available</h2>
        <p className="text-muted-foreground mb-6">Play some games to start seeing statistics here.</p>
      </div>
    );
  }

  return (
    <FadeIn>
      <Card className="bg-panel border-2 border-primary mb-6">
        <CardContent className="p-4">
          <h2 className="font-['Orbitron'] text-primary text-xl mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Game Stats */}
            <GameHistoryList games={recentGames} players={players} />
            
            {/* Player Rankings */}
            <PlayerRankings players={players} />
            
            {/* High Scores */}
            <HighScoreList highScores={highScores} />
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default StatsPage;
