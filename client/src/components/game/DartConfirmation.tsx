import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ThrowType } from '@/types';
import { SlideIn } from '@/lib/animations';

interface DartConfirmationProps {
  throwType: ThrowType;
  value: number;
  calculatedValue: number;
  onConfirm: () => void;
  onCancel: () => void;
  isBust?: boolean;
  isInvalidFinish?: boolean;
  remainingScore?: number;
}

const DartConfirmation = ({
  throwType,
  value,
  calculatedValue,
  onConfirm,
  onCancel,
  isBust = false,
  isInvalidFinish = false,
  remainingScore
}: DartConfirmationProps) => {
  // Format the throw type for display
  const getThrowTypeDisplay = (type: ThrowType): string => {
    switch (type) {
      case 'single': return 'Single';
      case 'double': return 'Double';
      case 'triple': return 'Triple';
      case 'bullseye': return 'Bullseye';
      case 'outerBull': return 'Outer Bull';
      case 'miss': return 'Miss';
      default: return type;
    }
  };

  return (
    <SlideIn direction="up">
      <Card className="bg-panel border-2 border-primary shadow-lg">
        <CardContent className="p-4">
          <h3 className="font-['Orbitron'] text-primary text-lg text-center mb-3">
            Confirm Your Throw
          </h3>

          {isBust ? (
            <div className="bg-destructive/20 p-3 rounded-md mb-4">
              <p className="text-destructive font-bold text-center">BUST!</p>
              <p className="text-center text-sm">
                Your score would go below 0. Your turn is over.
              </p>
            </div>
          ) : isInvalidFinish ? (
            <div className="bg-amber-500/20 p-3 rounded-md mb-4">
              <p className="text-amber-500 font-bold text-center">INVALID FINISH!</p>
              <p className="text-center text-sm">
                You can only finish on a double or bullseye. Your turn is over.
              </p>
            </div>
          ) : (
            <div className="text-center mb-4">
              <p className="mb-1">
                <span className="text-primary font-medium">{getThrowTypeDisplay(throwType)}</span>
                {value > 0 && <span> {value}</span>}
              </p>
              <p className="text-2xl font-bold">{calculatedValue} points</p>
              {remainingScore !== undefined && remainingScore > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Remaining: {remainingScore}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between gap-3">
            <Button
              variant="outline"
              className="w-1/2 border-destructive text-destructive hover:bg-destructive/20"
              onClick={onCancel}
            >
              <X className="mr-1 h-4 w-4" /> Cancel
            </Button>
            <Button
              variant="outline"
              className="w-1/2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={onConfirm}
            >
              <Check className="mr-1 h-4 w-4" /> Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </SlideIn>
  );
};

export default DartConfirmation;