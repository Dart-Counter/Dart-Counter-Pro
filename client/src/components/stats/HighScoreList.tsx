import { Card, CardContent } from "@/components/ui/card";
import { Player, Score } from "@/types";
import { formatGameDate } from "@/lib/gameLogic";
import { SlideIn } from "@/lib/animations";

interface HighScoreListProps {
  highScores: { player: Player; score: Score }[];
}

const HighScoreList = ({ highScores }: HighScoreListProps) => {
  return (
    <Card className="bg-panel border border-primary rounded-lg p-4">
      <h3 className="text-lg font-['Orbitron'] text-primary mb-3">High Scores</h3>
      {highScores.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No high scores yet</p>
      ) : (
        <ul className="space-y-3">
          {highScores.map(({ player, score }, index) => (
            <SlideIn key={score.id} delay={index * 0.1} direction="up">
              <li className="border-b border-gray-700 pb-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2 font-bold text-sm">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div>{player.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {formatGameDate(score.date)}
                    </div>
                  </div>
                </div>
                <div className="font-mono font-bold text-xl text-primary">
                  {score.score}
                </div>
              </li>
            </SlideIn>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default HighScoreList;
