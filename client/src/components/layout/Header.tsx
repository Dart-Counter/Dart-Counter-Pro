import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface HeaderProps {
  onToggleMobileNav: () => void;
  onOpenSettings: () => void;
}

const Header = ({ onToggleMobileNav, onOpenSettings }: HeaderProps) => {
  const [location] = useLocation();

  return (
    <header className="bg-panel border-b-2 border-primary p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="text-primary mr-4 text-2xl md:hidden" 
          onClick={onToggleMobileNav}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <h1 className="font-['Orbitron'] text-2xl font-bold text-primary">
          DartCounter <span className="text-foreground">Pro</span>
        </h1>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <Link href="/">
          <Button 
            variant={location === "/" ? "secondary" : "ghost"} 
            className={location === "/" ? "text-secondary-foreground" : "text-primary hover:text-primary/80"}
          >
            Game
          </Button>
        </Link>
        <Link href="/players">
          <Button 
            variant={location === "/players" ? "secondary" : "ghost"} 
            className={location === "/players" ? "text-secondary-foreground" : "text-primary hover:text-primary/80"}
          >
            Players
          </Button>
        </Link>
        <Link href="/stats">
          <Button 
            variant={location === "/stats" ? "secondary" : "ghost"} 
            className={location === "/stats" ? "text-secondary-foreground" : "text-primary hover:text-primary/80"}
          >
            Statistics
          </Button>
        </Link>
        <Link href="/help">
          <Button 
            variant={location === "/help" ? "secondary" : "ghost"} 
            className={location === "/help" ? "text-secondary-foreground" : "text-primary hover:text-primary/80"}
          >
            Help
          </Button>
        </Link>
      </div>
      
      <Button variant="ghost" className="text-primary text-xl" onClick={onOpenSettings}>
        <Settings />
      </Button>
    </header>
  );
};

export default Header;
