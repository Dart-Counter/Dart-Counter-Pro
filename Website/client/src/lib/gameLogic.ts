import { ThrowScore, GameState, PlayerData, GameType } from "@/types";
import { GAME_MODES } from "@/constants";

// Initialize game state based on game type and players
export const initializeGame = (gameType: GameType, playerIds: number[]): GameState => {
  let initialScore = 0;
  
  // Set initial score based on game type
  if (gameType === "501") initialScore = 501;
  else if (gameType === "301") initialScore = 301;
  else if (gameType === "101") initialScore = 101;
  else initialScore = 0; // For sequence-based games
  
  // Create player data array with initial scores
  const players = playerIds.map(id => ({
    playerId: id,
    initialScore,
    currentScore: initialScore,
    position: gameType === "around-the-world" ? 1 : 0, // Starting position for Around the World
    throws: []
  }));
  
  return {
    gameType,
    players,
    currentPlayerIndex: 0,
    currentRound: 1,
    currentThrow: 0,
    throws: [],
    completed: false
  };
};

// Calculate score based on throw type and value
export const calculateThrowScore = (throwType: string, value: number): number => {
  switch (throwType) {
    case "single":
      return value;
    case "double":
      return value * 2;
    case "triple":
      return value * 3;
    case "outerBull":
      return 25;
    case "bullseye":
      return 50;
    case "miss":
    default:
      return 0;
  }
};

// Process a throw for X01 games
export const processX01Throw = (
  gameState: GameState,
  throwScore: ThrowScore
): GameState => {
  const { currentPlayerIndex, players, currentThrow } = gameState;
  const player = players[currentPlayerIndex];
  const throwValue = throwScore.calculatedValue;
  
  let newScore = player.currentScore - throwValue;
  let turnComplete = false;
  let isWinner = false;
  let isBust = false;
  let isInvalidFinish = false;
  
  // Add throw to tracking array
  const updatedThrows = [...(player.throws || []), throwValue];
  
  // Check for bust (going below 0)
  if (newScore < 0) {
    isBust = true;
    newScore = player.currentScore; // Bust - revert score
    turnComplete = true;
  } 
  // Check if trying to finish with 1 remaining (impossible)
  else if (newScore === 1) {
    isBust = true;
    newScore = player.currentScore; // Bust - revert score
    turnComplete = true;
  }
  // Check for invalid finish (not using a double or bullseye)
  else if (newScore === 0 && !(throwScore.type === "double" || throwScore.type === "bullseye")) {
    isInvalidFinish = true;
    newScore = player.currentScore; // Invalid finish - revert score
    turnComplete = true;
  }
  // Check for win (exactly 0 with double or bullseye)
  else if (newScore === 0 && (throwScore.type === "double" || throwScore.type === "bullseye")) {
    isWinner = true;
    turnComplete = true;
  }
  // Check if this is the third throw in the turn
  else if (currentThrow === 2) {
    turnComplete = true;
  }
  
  // Update player data
  const updatedPlayers = [...players];
  updatedPlayers[currentPlayerIndex] = {
    ...player,
    currentScore: newScore,
    throws: updatedThrows,
    bust: isBust,
    invalidFinish: isInvalidFinish
  };
  
  // Determine next state
  const nextState: GameState = {
    ...gameState,
    players: updatedPlayers,
    currentThrow: turnComplete ? 0 : currentThrow + 1,
    currentPlayerIndex: turnComplete 
      ? (currentPlayerIndex + 1) % players.length 
      : currentPlayerIndex,
    currentRound: turnComplete && currentPlayerIndex === players.length - 1 
      ? gameState.currentRound + 1 
      : gameState.currentRound,
    throws: [...gameState.throws, throwScore],
    completed: isWinner,
    winner: isWinner ? player.playerId : undefined
  };
  
  return nextState;
};

// Process a throw for Around the World game
export const processAroundTheWorldThrow = (
  gameState: GameState,
  throwScore: ThrowScore
): GameState => {
  const { currentPlayerIndex, players, currentThrow } = gameState;
  const player = players[currentPlayerIndex];
  const currentPosition = player.position || 1;
  let turnComplete = false;
  let isWinner = false;
  let newPosition = currentPosition;
  
  // Check if the throw matches the current target number
  const isCorrectHit = (throwScore.type === "single" && throwScore.value === currentPosition) ||
    // For bullseye as the last target (position 21)
    (currentPosition === 21 && throwScore.type === "bullseye");
  
  // Add throw to tracking array
  const updatedThrows = [...(player.throws || []), throwScore.calculatedValue];
  
  // Update position if correct hit
  if (isCorrectHit) {
    newPosition = currentPosition + 1;
    // Check if player completed the sequence (1-20 + bullseye)
    if (newPosition > 21) {
      isWinner = true;
      turnComplete = true;
    }
  }
  
  // Check if this is the third throw in the turn
  if (currentThrow === 2) {
    turnComplete = true;
  }
  
  // Update player data
  const updatedPlayers = [...players];
  updatedPlayers[currentPlayerIndex] = {
    ...player,
    position: newPosition,
    throws: updatedThrows
  };
  
  // Determine next state
  const nextState: GameState = {
    ...gameState,
    players: updatedPlayers,
    currentThrow: turnComplete ? 0 : currentThrow + 1,
    currentPlayerIndex: turnComplete 
      ? (currentPlayerIndex + 1) % players.length 
      : currentPlayerIndex,
    currentRound: turnComplete && currentPlayerIndex === players.length - 1 
      ? gameState.currentRound + 1 
      : gameState.currentRound,
    throws: [...gameState.throws, throwScore],
    completed: isWinner,
    winner: isWinner ? player.playerId : undefined
  };
  
  return nextState;
};

// Process a throw for West to East or North to South game
export const processSequenceThrow = (
  gameState: GameState,
  throwScore: ThrowScore
): GameState => {
  const { currentPlayerIndex, players, currentThrow, gameType } = gameState;
  const player = players[currentPlayerIndex];
  const currentPosition = player.position || 0;
  let turnComplete = false;
  let isWinner = false;
  let newPosition = currentPosition;
  
  // Define the expected sequence based on game type
  const sequence = gameType === "west-to-east" 
    ? ["double", "single", "triple", "single", "outerBull", "bullseye", "outerBull", "single", "triple", "single", "double"]
    : ["double", "single", "triple", "single", "outerBull", "bullseye", "outerBull", "single", "triple", "single", "double"]; // Similar for north-to-south
  
  // Check if the throw matches the current target in the sequence
  const isCorrectHit = throwScore.type === sequence[currentPosition];
  
  // Add throw to tracking array
  const updatedThrows = [...(player.throws || []), throwScore.calculatedValue];
  
  // Update position if correct hit
  if (isCorrectHit) {
    newPosition = currentPosition + 1;
    // Check if player completed the sequence
    if (newPosition >= sequence.length) {
      isWinner = true;
      turnComplete = true;
    }
  }
  
  // Check if this is the third throw in the turn
  if (currentThrow === 2) {
    turnComplete = true;
  }
  
  // Update player data
  const updatedPlayers = [...players];
  updatedPlayers[currentPlayerIndex] = {
    ...player,
    position: newPosition,
    throws: updatedThrows
  };
  
  // Determine next state
  const nextState: GameState = {
    ...gameState,
    players: updatedPlayers,
    currentThrow: turnComplete ? 0 : currentThrow + 1,
    currentPlayerIndex: turnComplete 
      ? (currentPlayerIndex + 1) % players.length 
      : currentPlayerIndex,
    currentRound: turnComplete && currentPlayerIndex === players.length - 1 
      ? gameState.currentRound + 1 
      : gameState.currentRound,
    throws: [...gameState.throws, throwScore],
    completed: isWinner,
    winner: isWinner ? player.playerId : undefined
  };
  
  return nextState;
};

// Process a throw based on game type
export const processThrow = (
  gameState: GameState,
  throwType: string,
  value: number
): GameState => {
  const throwScore: ThrowScore = {
    type: throwType as any,
    value,
    calculatedValue: calculateThrowScore(throwType, value)
  };
  
  // Route to appropriate processing function based on game type
  if (["501", "301", "101"].includes(gameState.gameType)) {
    return processX01Throw(gameState, throwScore);
  } else if (gameState.gameType === "around-the-world") {
    return processAroundTheWorldThrow(gameState, throwScore);
  } else {
    // West to East or North to South
    return processSequenceThrow(gameState, throwScore);
  }
};

// Calculate average score for a player in X01 games
export const calculateAverageScore = (throws: number[] | undefined): number => {
  if (!throws || throws.length === 0) return 0;
  
  const sum = throws.reduce((acc, val) => acc + val, 0);
  return Math.round((sum / throws.length) * 100) / 100;
};

// Get the current target for a player in a sequence game
export const getCurrentTarget = (gameState: GameState, playerIndex: number): string => {
  const { gameType, players } = gameState;
  const player = players[playerIndex];
  
  if (gameType === "around-the-world") {
    const position = player.position || 1;
    if (position <= 20) return `Hit number ${position}`;
    return position === 21 ? "Hit Bullseye" : "Complete!";
  }
  
  // For West to East and North to South
  const sequence = gameType === "west-to-east" 
    ? ["Double", "Single", "Triple", "Single", "Outer Bull", "Bullseye", "Outer Bull", "Single", "Triple", "Single", "Double"]
    : ["Double", "Single", "Triple", "Single", "Outer Bull", "Bullseye", "Outer Bull", "Single", "Triple", "Single", "Double"];
  
  const position = player.position || 0;
  return position < sequence.length ? `Hit ${sequence[position]}` : "Complete!";
};

// Check if a throw is valid for a specific game state
export const isValidThrow = (
  gameState: GameState,
  throwType: string,
  value: number
): boolean => {
  const { gameType, players, currentPlayerIndex } = gameState;
  const player = players[currentPlayerIndex];
  
  // For X01 games, check if the throw would cause a bust
  if (["501", "301", "101"].includes(gameType)) {
    const throwValue = calculateThrowScore(throwType, value);
    const newScore = player.currentScore - throwValue;
    
    // Can't bust if this wouldn't reach zero
    if (newScore > 1) return true;
    
    // If exactly 0, must be a double or bullseye
    if (newScore === 0) {
      return throwType === "double" || throwType === "bullseye";
    }
    
    // Busting (below 0 or exactly 1) is allowed but will reset the score
    return true;
  }
  
  // For Around the World, check if trying to hit correct target
  if (gameType === "around-the-world") {
    const position = player.position || 1;
    
    // For positions 1-20, must hit the corresponding single
    if (position <= 20) {
      return throwType === "single" && value === position;
    }
    
    // For position 21, must hit bullseye
    if (position === 21) {
      return throwType === "bullseye";
    }
  }
  
  // For sequence games, any throw is allowed (will check if it matches in the processor)
  return true;
};

// Get display text for a player's score based on game type
export const getPlayerScoreDisplay = (gameState: GameState, playerIndex: number): string => {
  const { gameType, players } = gameState;
  const player = players[playerIndex];
  
  if (["501", "301", "101"].includes(gameType)) {
    return `${player.currentScore}`;
  }
  
  if (gameType === "around-the-world") {
    const position = player.position || 1;
    return `${position > 21 ? "Complete!" : position}/21`;
  }
  
  // West to East or North to South
  const position = player.position || 0;
  const total = 11; // Length of sequence
  return `${position > total ? "Complete!" : position}/${total}`;
};

// Get the name of a current game from its type
export const getGameName = (type: GameType): string => {
  const game = GAME_MODES.find(g => g.type === type);
  return game?.label || type;
};

// Format date for display
export const formatGameDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
