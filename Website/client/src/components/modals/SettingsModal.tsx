import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const { toast } = useToast();

  const handleResetData = () => {
    // Confirmation before resetting
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      // Reset logic would go here
      toast({
        title: "Data Reset",
        description: "All application data has been reset",
      });
      
      onClose();
    }
  };

  const handleSaveSettings = () => {
    // Save settings logic would go here
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-panel border-2 border-primary sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-['Orbitron'] text-primary text-xl">
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-primary font-medium mb-2">Sound Effects</h3>
            <div className="flex items-center">
              <Checkbox
                id="soundEffects"
                checked={soundEffects}
                onCheckedChange={(checked) => setSoundEffects(checked as boolean)}
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor="soundEffects" className="ml-2 text-muted-foreground">
                Enable sound effects
              </Label>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary font-medium mb-2">Animations</h3>
            <div className="flex items-center">
              <Checkbox
                id="animations"
                checked={animations}
                onCheckedChange={(checked) => setAnimations(checked as boolean)}
                className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <Label htmlFor="animations" className="ml-2 text-muted-foreground">
                Enable animations
              </Label>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary font-medium mb-2">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                className="h-10 border-2 border-primary bg-background rounded-lg"
                variant="outline"
              />
              <Button 
                className="h-10 border border-primary bg-[#001E3C] rounded-lg"
                variant="outline"
              />
              <Button 
                className="h-10 border border-primary bg-[#3C0042] rounded-lg"
                variant="outline"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-primary font-medium mb-2">Data Management</h3>
            <Button
              className="bg-destructive/20 hover:bg-destructive/40 text-destructive border border-destructive w-full"
              onClick={handleResetData}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
              Reset All Data
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
