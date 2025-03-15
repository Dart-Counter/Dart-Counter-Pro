import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Player, InsertPlayer } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface PlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (player: InsertPlayer) => void;
  player?: Player;
}

const PlayerForm = ({ isOpen, onClose, onSave, player }: PlayerFormProps) => {
  const [name, setName] = useState(player?.name || "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a player name",
        variant: "destructive",
      });
      return;
    }
    
    onSave({ name });
    setName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-panel border-2 border-primary sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-['Orbitron'] text-primary">
            {player ? "Edit Player" : "Add New Player"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="playerName" className="text-muted-foreground mb-2">
              Player Name
            </Label>
            <Input
              id="playerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-panel border border-primary text-foreground focus:border-primary"
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-primary text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {player ? "Update Player" : "Save Player"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerForm;
