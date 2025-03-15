import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (player: Player) => void;
}

const PlayerCard = ({ player, onEdit, onDelete }: PlayerCardProps) => {
  return (
    <Card className="bg-panel border border-primary rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3 font-bold">
            {player.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-lg font-medium">{player.name}</h3>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
            onClick={() => onEdit(player)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive/80"
            onClick={() => onDelete(player)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-muted-foreground text-sm">
        <p>Games played: {player.gamesPlayed}</p>
        <p>Wins: {player.wins}</p>
        <p>Highest score: {player.highestScore}</p>
      </div>
    </Card>
  );
};

export default PlayerCard;
