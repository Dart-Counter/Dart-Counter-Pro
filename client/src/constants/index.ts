import { GameType } from "@/types";

export const GAME_MODES: { type: GameType; label: string; description: string }[] = [
  { 
    type: "501", 
    label: "501", 
    description: "Classic 501 - Start with 501 points and try to reach exactly zero."
  },
  { 
    type: "301", 
    label: "301", 
    description: "301 - Start with 301 points and try to reach exactly zero."
  },
  { 
    type: "101", 
    label: "101", 
    description: "101 - Start with 101 points and try to reach exactly zero."
  },
  { 
    type: "around-the-world", 
    label: "Around the World", 
    description: "Hit numbers from 1 to 20, then bull and bullseye in sequence."
  },
  { 
    type: "west-to-east", 
    label: "West to East", 
    description: "Hit double, single, triple, single, bull, bullseye, bull, single, triple, single, double in sequence."
  },
  { 
    type: "north-to-south", 
    label: "North to South", 
    description: "Hit the dartboard in a vertical sequence from top to bottom."
  }
];

export const SEGMENT_TYPES = [
  { type: "single", label: "Single", multiplier: 1 },
  { type: "double", label: "Double", multiplier: 2 },
  { type: "triple", label: "Triple", multiplier: 3 }
];

export const SPECIAL_SEGMENTS = [
  { type: "outerBull", label: "Outer Bull", value: 25 },
  { type: "bullseye", label: "Bull's Eye", value: 50 }
];

export const DART_NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

export const HIGH_SCORE_THRESHOLD = 80;

export const PLAYER_COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-emerald-500"
];

export const RULES = {
  "501": {
    title: "501 Game",
    rules: [
      "Players start with 501 points and take turns throwing three darts per round.",
      "The goal is to reduce your score to exactly zero, with the final dart landing in a double or the bullseye.",
      "If a player reduces their score to 1 or below zero (without reaching exactly zero), the turn ends and the score reverts to what it was at the beginning of the turn."
    ]
  },
  "301": {
    title: "301 Game",
    rules: [
      "Players start with 301 points and take turns throwing three darts per round.",
      "The goal is to reduce your score to exactly zero, with the final dart landing in a double or the bullseye.",
      "If a player reduces their score to 1 or below zero (without reaching exactly zero), the turn ends and the score reverts to what it was at the beginning of the turn."
    ]
  },
  "101": {
    title: "101 Game",
    rules: [
      "Players start with 101 points and take turns throwing three darts per round.",
      "The goal is to reduce your score to exactly zero, with the final dart landing in a double or the bullseye.",
      "If a player reduces their score to 1 or below zero (without reaching exactly zero), the turn ends and the score reverts to what it was at the beginning of the turn."
    ]
  },
  "around-the-world": {
    title: "Around the World",
    rules: [
      "Players take turns throwing three darts per round, aiming to hit every number from 1 to 20 and finish with the bullseye.",
      "Each number must be hit in sequence before moving to the next.",
      "The first player to complete the sequence wins."
    ]
  },
  "west-to-east": {
    title: "West to East",
    rules: [
      "Players must hit a sequence across the dartboard: double, single, triple, single, bull, bullseye, bull, single, triple, single, double.",
      "The first player to complete the full sequence wins."
    ]
  },
  "north-to-south": {
    title: "North to South",
    rules: [
      "Similar to West to East, but the sequence runs vertically on the dartboard.",
      "The first player to complete the full sequence wins."
    ]
  }
};

export const TIPS = {
  beginner: [
    "Focus on consistency rather than high scores initially",
    "Practice your stance and grip before focusing on accuracy",
    "Aim for the center of the board (bullseye) to develop accuracy",
    "Learn the basic math for X01 games to plan your checkouts",
    "Start with 301 games before moving to 501"
  ],
  advanced: [
    "Practice common checkout combinations (e.g., 170, 167, 164)",
    "Learn to count down efficiently in X01 games",
    "Develop strategies for different game modes",
    "Practice specific segments for consistent scoring",
    "Use the app's statistics to identify areas for improvement"
  ]
};

export const APP_GUIDE = [
  "Select a game mode from the Game Mode panel",
  "Add players from the Players section",
  "Start the game - the first player will be prompted",
  "Enter scores using the score input panel",
  "The app will automatically calculate remaining points and switch players",
  "View game statistics and history in the Stats section",
  "Access legal information and privacy details from the menu"
];

export const TERMS_OF_SERVICE = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using DartCounter Pro, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application."
  },
  {
    title: "2. Use of the Application",
    content: "DartCounter Pro is designed for personal use to track dart games and scores. The application should not be used for any commercial purposes without explicit permission."
  },
  {
    title: "3. User Accounts",
    content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
  },
  {
    title: "4. Intellectual Property",
    content: "All content included in DartCounter Pro, including but not limited to text, graphics, logos, icons, and software, is the property of DartCounter Pro or its content suppliers and is protected by international copyright laws."
  },
  {
    title: "5. Limitation of Liability",
    content: "DartCounter Pro shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the application."
  }
];

export const PRIVACY_POLICY = [
  {
    title: "1. Information We Collect",
    content: "DartCounter Pro collects information that you provide directly, such as when you create an account, set up your profile, or input game data. This may include your name, email address, and game statistics."
  },
  {
    title: "2. How We Use Your Information",
    content: "We use the information collected to provide, maintain, and improve DartCounter Pro, as well as to communicate with you about updates, new features, or customer support."
  },
  {
    title: "3. Data Storage",
    content: "Your data is primarily stored on your local device. If you choose to use cloud synchronization features, your data will be stored securely on our servers."
  },
  {
    title: "4. Data Sharing",
    content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law."
  },
  {
    title: "5. Your Rights",
    content: "You have the right to access, correct, or delete your personal information. You may also request a copy of the personal data we hold about you."
  }
];

export const DATA_PRIVACY = [
  {
    title: "1. Data Collection Practices",
    content: "DartCounter Pro collects only the necessary data to provide its core functionality. This includes game scores, player profiles, and settings preferences."
  },
  {
    title: "2. Data Protection Measures",
    content: "We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction."
  },
  {
    title: "3. Local Storage",
    content: "Most game data is stored locally on your device. We use secure encryption methods to protect sensitive information."
  },
  {
    title: "4. Analytics",
    content: "We may use anonymous analytics data to improve the application's performance and user experience. This data cannot be used to identify individual users."
  },
  {
    title: "5. Data Retention",
    content: "We retain your data only as long as necessary to provide the service or as required by law. You can request deletion of your account and associated data at any time."
  }
];
