import { Card, CardContent } from "@/components/ui/card";
import { APP_GUIDE } from "@/constants";
import { ScaleIn } from "@/lib/animations";

const AppGuide = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-primary mb-2">App Usage</h3>
      
      <ScaleIn>
        <Card className="bg-panel border border-primary rounded-lg">
          <CardContent className="p-4">
            <h4 className="font-['Orbitron'] text-primary mb-2">Quick Guide</h4>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              {APP_GUIDE.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </ScaleIn>
    </div>
  );
};

export default AppGuide;
