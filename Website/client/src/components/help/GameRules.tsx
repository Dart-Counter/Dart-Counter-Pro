import { Card, CardContent } from "@/components/ui/card";
import { RULES, GameType } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FadeIn } from "@/lib/animations";

const GameRules = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-primary mb-2">Game Rules</h3>
      
      <div className="space-y-4">
        {Object.entries(RULES).map(([gameType, { title, rules }], index) => (
          <FadeIn key={gameType} delay={index * 0.1}>
            <Card className="bg-panel border border-primary rounded-lg">
              <CardContent className="p-4">
                <h4 className="font-['Orbitron'] text-primary mb-2">{title}</h4>
                <ScrollArea className="h-auto max-h-40">
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default GameRules;
