import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DATA_PRIVACY } from "@/constants";

interface DataPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataPrivacyModal = ({ isOpen, onClose }: DataPrivacyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-panel border-2 border-primary sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-['Orbitron'] text-primary text-xl">
            Data Privacy
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-80 overflow-y-auto">
          <div className="text-muted-foreground">
            {DATA_PRIVACY.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-primary font-medium mb-2">{section.title}</h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
