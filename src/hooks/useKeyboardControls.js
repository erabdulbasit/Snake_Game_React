import { useEffect } from "react";

export const useKeyboardControls = (
  isGameStarted,
  isPaused,
  isGameOver,
  currentDirection,
  setIsGameStarted,
  setIsPaused,
  setCurrentDirection
) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      // Start game on first keypress
      if (!isGameStarted) {
        console.log("▶️ Game started");
        setIsGameStarted(true);
        setIsPaused(false);
        setCurrentDirection("UP");
        return;
      }

      // Toggle pause with spacebar
      if (key === " ") {
        event.preventDefault();
        setIsPaused((prev) => !prev);
        return;
      }

      // Direction changes (only if not paused)
      if (!isPaused) {
        if (key === "ArrowUp" && currentDirection !== "DOWN") {
          setCurrentDirection("UP");
        } else if (key === "ArrowDown" && currentDirection !== "UP") {
          setCurrentDirection("DOWN");
        } else if (key === "ArrowLeft" && currentDirection !== "RIGHT") {
          setCurrentDirection("LEFT");
        } else if (key === "ArrowRight" && currentDirection !== "LEFT") {
          setCurrentDirection("RIGHT");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentDirection,
    isPaused,
    isGameOver,
    isGameStarted,
    setIsGameStarted,
    setIsPaused,
    setCurrentDirection,
  ]);
};
