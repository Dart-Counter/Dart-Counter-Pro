import { Card, CardContent } from "@/components/ui/card";
import { TIPS } from "@/constants";
import { SlideIn } from "@/lib/animations";

const PlayerTips = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-primary mb-2">Tips for Players</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SlideIn direction="left">
          <Card className="bg-panel border border-primary rounded-lg">
            <CardContent className="p-4">
              <h4 className="font-['Orbitron'] text-primary mb-2">Beginner Tips</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {TIPS.beginner.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </SlideIn>
        
        <SlideIn direction="right">
          <Card className="bg-panel border border-primary rounded-lg">
            <CardContent className="p-4">
              <h4 className="font-['Orbitron'] text-primary mb-2">Advanced Tips</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {TIPS.advanced.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </SlideIn>
      </div>
    </div>
  );
};

export default PlayerTips;
