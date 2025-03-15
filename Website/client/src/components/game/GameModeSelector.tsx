import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GAME_MODES } from "@/constants";
import { GameType } from "@/types";
import { FadeIn } from "@/lib/animations";

interface GameModeSelectorProps {
  selectedMode: GameType;
  onModeSelect: (mode: GameType) => void;
}

const GameModeSelector = ({ selectedMode, onModeSelect }: GameModeSelectorProps) => {
  return (
    <Card className="bg-panel border-2 border-primary mb-6">
      <CardContent className="p-4">
        <h2 className="font-['Orbitron'] text-primary text-xl mb-4">Game Mode</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GAME_MODES.map((mode, index) => (
            <FadeIn key={mode.type} delay={index * 0.1}>
              <Button
                variant={selectedMode === mode.type ? "default" : "outline"}
                className={`w-full h-16 font-['Orbitron'] border-primary transition-all ${
                  selectedMode === mode.type 
                    ? "bg-primary text-primary-foreground border-2" 
                    : "bg-panel hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => onModeSelect(mode.type)}
              >
                {mode.label}
              </Button>
            </FadeIn>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameModeSelector;
