import { useState, useRef, useEffect } from "react";
import GameOver from "./components/GameOver";
import Home from "./components/Home";
import { renderSnake, drawBait } from "./utils/canvas";
import { useAudio } from "./hooks/useAudio";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useGameLogic } from "./hooks/useGameLogic";
import { GAME_CONFIG } from "./constants/gameConfig";
import useTouchControls from "./hooks/useTouchControls";

function App() {
  const [baitPosition, setBaitPosition] = useState(
    GAME_CONFIG.INITIAL_BAIT_POSITION
  );
  const [snakeCoordinatesArr, setSnakeCoordinatesArr] = useState([
    GAME_CONFIG.INITIAL_SNAKE_POSITION,
  ]);
  const [currentDirection, setCurrentDirection] = useState(
    GAME_CONFIG.INITIAL_DIRECTION
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("snakeGameHighScore")) || 0
  );
  const [currentFruit, setCurrentFruit] = useState("🍎");
  const [isPaused, setIsPaused] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  //this is for touch
  const [touchStart, setTouchStart] = useState(null);

  const canvasRef = useRef(null);

  // Custom hooks
  const { handleTouchStart, handleTouchEnd } = useTouchControls(
    setTouchStart,
    setCurrentDirection,
    currentDirection,
    touchStart,
    isGameStarted,
    isPaused,
    isGameOver
  );

  // Helper function to start the game (can be called by Key or Touch)
  const triggerGameStart = () => {
    // Only run if game hasn't started yet
    if (isGameStarted) return;

    setIsGameStarted(true);
    setIsPaused(false);

    // Important: Ensure snake has a direction immediately
    if (!currentDirection) {
      setCurrentDirection("LEFT");
    }
  };

  const resetGame = () => {
    // 1. Reset positions
    setSnakeCoordinatesArr([{ x: 400, y: 400 }]); // Your starting coordinates
    setBaitPosition({ x: 100, y: 100 }); // Your starting bait

    // 2. Reset game status flags
    setCurrentDirection(null);
    setScore(0);
    setCurrentFruit("🍎");
    setIsPaused(false);
    setIsGameStarted(false); // Wait for keypress again

    // 3. Reset audio (optional but good practice)
    // backgroundMusicRef.current.currentTime = 0;

    // 4. CRITICAL FINAL STEP: Un-end the game
    setIsGameOver(false);
  };

  const { playEatingSound, playGameOverSound } = useAudio(
    isGameStarted,
    isGameOver,
    isPaused
  );

  useKeyboardControls(
    isGameStarted,
    isPaused,
    isGameOver,
    currentDirection,
    setIsGameStarted,
    setIsPaused,
    setCurrentDirection
  );

  useGameLogic(
    isGameStarted,
    isGameOver,
    isPaused,
    currentDirection,
    baitPosition,
    setSnakeCoordinatesArr,
    setIsGameOver,
    setBaitPosition,
    setCurrentFruit,
    setScore,
    playEatingSound
  );

  // Handle game over
  useEffect(() => {
    if (isGameOver) {
      playGameOverSound();
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("snakeGameHighScore", score.toString());
      }
    }
  }, [isGameOver, score, highScore, playGameOverSound]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBait(ctx, currentFruit, baitPosition);
    renderSnake(snakeCoordinatesArr, ctx);
  }, [snakeCoordinatesArr, currentFruit, baitPosition]);

  return isGameOver ? (
    <GameOver
      // PASS THE RESET FUNCTION HERE
      onRestart={resetGame}
      score={score}
      highScore={highScore}
    />
  ) : (
    <Home
      score={score}
      canvasRef={canvasRef}
      isPaused={isPaused}
      isGameOver={isGameOver}
      // 3. PASS THE HANDLERS DOWN TO HOME
      handleTouchStart={handleTouchStart}
      handleTouchEnd={handleTouchEnd}
      // ADD THIS NEW PROP:
      onCanvasClick={triggerGameStart}
    />
  );
}

export default App;
