
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";

const PlayersPage = () => {
  const [soloMode, setSoloMode] = useState(() => {
    const stored = localStorage.getItem('practiceMode');
    return stored === 'true';
  });

  const handleModeChange = (newMode: boolean) => {
    setSoloMode(newMode);
    localStorage.setItem('practiceMode', String(newMode));
  };

  const players = soloMode ? 
    [{ id: 1, name: "Practice Mode" }] : 
    [{ id: 1, name: "Player 1" }, { id: 2, name: "Player 2" }];

  return (
    <FadeIn>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="bg-panel border-2 border-primary mb-6">
          <CardContent className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="font-['Orbitron'] text-primary text-2xl md:text-3xl">Game Mode</h2>
              <Button
                className={`w-full md:w-auto ${soloMode ? 'bg-accent' : 'bg-primary'} hover:opacity-90 text-primary-foreground`}
                onClick={() => handleModeChange(!soloMode)}
              >
                {soloMode ? "Switch to 2 Players" : "Switch to Practice Mode"}
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Current Players:</h3>
              <div className="space-y-3">
                {players.map(player => (
                  <div 
                    key={player.id} 
                    className="text-primary-foreground p-4 bg-background/50 rounded-lg border border-primary/20"
                  >
                    {player.name}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
};

export default PlayersPage;
