import { useState, useRef, useEffect } from "react";
import GameOver from "./components/GameOver";
import Home from "./components/Home";
import { renderSnake, drawBait } from "./utils/canvas";
import { useAudio } from "./hooks/useAudio";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useGameLogic } from "./hooks/useGameLogic";
import { GAME_CONFIG } from "./constants/gameConfig";

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

  const canvasRef = useRef(null);

  // Custom hooks
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
    <GameOver score={score} highScore={highScore} />
  ) : (
    <Home
      score={score}
      canvasRef={canvasRef}
      isPaused={isPaused}
      isGameOver={isGameOver}
    />
  );
}

export default App;
