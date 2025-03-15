import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameState, ThrowType, Player } from "@/types";
import { DART_NUMBERS, SEGMENT_TYPES, SPECIAL_SEGMENTS } from "@/constants";
import { getCurrentTarget } from "@/lib/gameLogic";
import { useState } from "react";
import { SlideIn } from "@/lib/animations";

interface ScoreInputProps {
  gameState: GameState;
  players: Player[];
  onScoreSubmit: (throwType: ThrowType, value: number) => void;
  onMiss: () => void;
  onUndo: () => void;
}

const ScoreInput = ({ 
  gameState, 
  players, 
  onScoreSubmit, 
  onMiss, 
  onUndo 
}: ScoreInputProps) => {
  const [selectedSegment, setSelectedSegment] = useState<ThrowType>("single");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  
  const currentPlayerIndex = gameState.currentPlayerIndex;
  const currentPlayerId = gameState.players[currentPlayerIndex]?.playerId;
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  
  const handleSegmentSelect = (segmentType: ThrowType) => {
    setSelectedSegment(segmentType);
  };
  
  const handleNumberSelect = (number: number) => {
    if (selectedSegment && number) {
      onScoreSubmit(selectedSegment, number);
      setSelectedNumber(null);
    } else {
      setSelectedNumber(number);
    }
  };
  
  const handleSpecialSegmentSelect = (segmentType: ThrowType, value: number) => {
    onScoreSubmit(segmentType, value);
  };

  // Get target text based on game type
  const getCurrentTargetText = () => {
    if (["101", "301", "501"].includes(gameState.gameType)) {
      return "";
    }
    return getCurrentTarget(gameState, currentPlayerIndex);
  };
  
  const targetText = getCurrentTargetText();

  return (
    <Card className="bg-panel border-2 border-primary">
      <CardContent className="p-4">
        <h2 className="font-['Orbitron'] text-primary text-xl mb-2">
          Enter Score: <span className="text-foreground">{currentPlayer?.name}'s turn</span>
        </h2>
        
        {targetText && (
          <p className="text-muted-foreground mb-4">
            Target: <span className="text-primary font-medium">{targetText}</span>
          </p>
        )}
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          {SEGMENT_TYPES.map((segment, index) => (
            <SlideIn key={segment.type} delay={index * 0.1} direction="up">
              <Button
                variant={selectedSegment === segment.type ? "default" : "outline"}
                className={`w-full h-14 sm:h-16 flex flex-col items-center justify-center ${
                  selectedSegment === segment.type 
                    ? "bg-primary text-primary-foreground"
                    : "border-primary hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => handleSegmentSelect(segment.type as ThrowType)}
              >
                <span className="text-xs block text-inherit opacity-80">{segment.label}</span>
                <span className="text-lg font-bold">
                  {selectedNumber ? selectedNumber * segment.multiplier : segment.label}
                </span>
              </Button>
            </SlideIn>
          ))}
        </div>
        
        <div className="grid grid-cols-5 md:grid-cols-10 gap-1 sm:gap-2 mb-3">
          {DART_NUMBERS.slice(0, 10).map(num => (
            <Button
              key={num}
              variant="outline"
              size="sm"
              className={`h-10 sm:h-12 font-mono border-primary hover:bg-primary hover:text-primary-foreground ${
                selectedNumber === num 
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => handleNumberSelect(num)}
            >
              {num}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-5 md:grid-cols-10 gap-1 sm:gap-2 mb-4">
          {DART_NUMBERS.slice(10, 20).map(num => (
            <Button
              key={num}
              variant="outline"
              size="sm"
              className={`h-10 sm:h-12 font-mono border-primary hover:bg-primary hover:text-primary-foreground ${
                selectedNumber === num 
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
              onClick={() => handleNumberSelect(num)}
            >
              {num}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-5">
          {SPECIAL_SEGMENTS.map((segment, index) => (
            <SlideIn key={segment.type} delay={index * 0.1} direction="up">
              <Button
                variant="outline"
                className="w-full h-14 sm:h-16 flex flex-col items-center justify-center border-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSpecialSegmentSelect(segment.type as ThrowType, segment.value)}
              >
                <span className="text-xs block opacity-80">{segment.label}</span>
                <span className="text-lg font-bold">{segment.value}</span>
              </Button>
            </SlideIn>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <Button
            variant="destructive"
            className="bg-destructive/20 hover:bg-destructive/40 text-destructive border border-destructive"
            onClick={onMiss}
          >
            <span className="text-lg font-bold">Miss</span>
          </Button>
          <Button
            variant="outline"
            className="bg-amber-500/20 hover:bg-amber-500/40 text-amber-500 border border-amber-500"
            onClick={onUndo}
          >
            <span className="text-lg font-bold">Undo</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreInput;
