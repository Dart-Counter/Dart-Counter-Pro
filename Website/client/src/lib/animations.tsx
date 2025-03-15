import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// Fade in animation
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = ""
}: { 
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in animation
export const SlideIn = ({ 
  children, 
  delay = 0, 
  direction = "up",
  duration = 0.5,
  className = ""
}: { 
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}) => {
  const directionMap = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale animation
export const ScaleIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = ""
}: { 
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Achievement notification animation
export const AchievementNotification = ({ 
  isVisible, 
  onClose, 
  title, 
  message 
}: { 
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, x: 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 right-4 z-50 p-4 rounded-lg bg-panel border-2 border-accent max-w-sm"
        onAnimationComplete={() => {
          setTimeout(onClose, 5000);
        }}
      >
        <div className="flex items-center">
          <div className="h-12 w-12 bg-success rounded-full flex items-center justify-center text-background mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-orbitron text-accent">{title}</h3>
            <p className="text-muted-foreground">{message}</p>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Highlight score animation
export const HighlightScore = ({ 
  score, 
  animate = false 
}: { 
  score: number | string;
  animate?: boolean;
}) => (
  <motion.span
    animate={animate ? {
      scale: [1, 1.1, 1],
      color: ["hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--primary))"]
    } : {}}
    transition={{ duration: 0.5 }}
    className="font-mono text-2xl font-bold"
  >
    {score}
  </motion.span>
);

// Pulse animation
export const PulseAnimation = ({ 
  children, 
  className = ""
}: { 
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    animate={{
      boxShadow: [
        "0 0 0 0 rgba(0, 229, 255, 0.4)",
        "0 0 0 8px rgba(0, 229, 255, 0)",
        "0 0 0 0 rgba(0, 229, 255, 0.4)"
      ]
    }}
    transition={{ duration: 2, repeat: Infinity }}
    className={className}
  >
    {children}
  </motion.div>
);

// Win celebration animation
export const WinCelebration = ({ 
  isVisible, 
  playerName 
}: { 
  isVisible: boolean;
  playerName: string;
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={() => {}}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="bg-panel border-2 border-accent p-8 rounded-lg text-center max-w-md"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 1, repeat: 1 }}
            className="text-5xl mb-4"
          >
            🎯
          </motion.div>
          <h2 className="text-2xl font-orbitron text-accent mb-2">Winner!</h2>
          <p className="text-xl mb-6">{playerName} has won the game!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-background px-6 py-2 rounded-lg"
          >
            New Game
          </motion.button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
