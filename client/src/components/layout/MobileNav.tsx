import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X, Play, Users, BarChart3, HelpCircle, FileText, Shield, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTos: () => void;
  onOpenPrivacy: () => void;
  onOpenDataPrivacy: () => void;
}

const MobileNav = ({ 
  isOpen, 
  onClose, 
  onOpenTos, 
  onOpenPrivacy, 
  onOpenDataPrivacy 
}: MobileNavProps) => {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-background z-40 flex flex-col"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-primary flex justify-between items-center">
              <h2 className="font-['Orbitron'] text-xl text-primary">Menu</h2>
              <Button variant="ghost" className="text-primary text-xl" onClick={onClose}>
                <X />
              </Button>
            </div>
            
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/" onClick={handleLinkClick}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-primary hover:bg-panel hover:text-primary p-3 rounded-lg"
                >
                  <Play className="mr-3 h-5 w-5" />
                  Game
                </Button>
              </Link>
              
              <Link href="/players" onClick={handleLinkClick}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-primary hover:bg-panel hover:text-primary p-3 rounded-lg"
                >
                  <Users className="mr-3 h-5 w-5" />
                  Players
                </Button>
              </Link>
              
              <Link href="/stats" onClick={handleLinkClick}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-primary hover:bg-panel hover:text-primary p-3 rounded-lg"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Statistics
                </Button>
              </Link>
              
              <Link href="/help" onClick={handleLinkClick}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-primary hover:bg-panel hover:text-primary p-3 rounded-lg"
                >
                  <HelpCircle className="mr-3 h-5 w-5" />
                  Help
                </Button>
              </Link>
              
              <div className="border-t border-primary my-4"></div>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:bg-panel p-3 rounded-lg"
                onClick={onOpenTos}
              >
                <FileText className="mr-3 h-5 w-5" />
                Terms of Service
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:bg-panel p-3 rounded-lg"
                onClick={onOpenPrivacy}
              >
                <Shield className="mr-3 h-5 w-5" />
                Privacy Policy
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:bg-panel p-3 rounded-lg"
                onClick={onOpenDataPrivacy}
              >
                <Database className="mr-3 h-5 w-5" />
                Data Privacy
              </Button>
            </div>
            
            <div className="mt-auto p-4 border-t border-primary text-muted-foreground text-sm">
              <p>Support: web.dart.counter@gmail.com</p>
              <p className="mt-1">Version 1.0.0</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
