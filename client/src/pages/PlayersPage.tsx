import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";

const PlayersPage = () => {
  const [soloMode, setSoloMode] = useState(false);

  const players = soloMode ? 
    [{ id: 1, name: "Practice Mode" }] : 
    [{ id: 1, name: "Player 1" }, { id: 2, name: "Player 2" }];

  return (
    <FadeIn>
      <Card className="bg-panel border-2 border-primary mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-['Orbitron'] text-primary text-xl">Game Mode</h2>
            <Button
              className={`bg-${soloMode ? 'accent' : 'primary'} hover:bg-${soloMode ? 'accent' : 'primary'}/90 text-primary-foreground`}
              onClick={() => setSoloMode(!soloMode)}
            >
              {soloMode ? "Switch to 2 Players" : "Switch to Practice Mode"}
            </Button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg mb-2">Current Players:</h3>
            {players.map(player => (
              <div key={player.id} className="text-primary-foreground mb-2">
                {player.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default PlayersPage;