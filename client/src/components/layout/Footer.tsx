import { Link } from "wouter";
import { Play, Users, BarChart3, HelpCircle } from "lucide-react";

const Footer = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-panel border-t-2 border-primary flex justify-around p-2 z-30">
      <Link href="/">
        <button className="text-primary p-2 flex flex-col items-center">
          <Play className="text-xl h-5 w-5" />
          <span className="text-xs mt-1">Game</span>
        </button>
      </Link>
      
      <Link href="/players">
        <button className="text-primary p-2 flex flex-col items-center">
          <Users className="text-xl h-5 w-5" />
          <span className="text-xs mt-1">Players</span>
        </button>
      </Link>
      
      <Link href="/stats">
        <button className="text-primary p-2 flex flex-col items-center">
          <BarChart3 className="text-xl h-5 w-5" />
          <span className="text-xs mt-1">Stats</span>
        </button>
      </Link>
      
      <Link href="/help">
        <button className="text-primary p-2 flex flex-col items-center">
          <HelpCircle className="text-xl h-5 w-5" />
          <span className="text-xs mt-1">Help</span>
        </button>
      </Link>
    </div>
  );
};

export default Footer;
