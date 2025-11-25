import { useEffect } from "react";
import { GAME_CONFIG, FOOD_ITEMS } from "../constants/gameConfig";
import { randomCoordinateOfBait } from "../utils/canvas";

export const useGameLogic = (
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
) => {
  useEffect(() => {
    if (!isGameStarted || isGameOver || isPaused) return;

    const intervalId = setInterval(() => {
      setSnakeCoordinatesArr((prevSnake) => {
        let newSnake = [...prevSnake];
        let head = newSnake[0];
        let newHead = { x: head.x, y: head.y };

        // Move snake
        if (currentDirection === "RIGHT") newHead.x += GAME_CONFIG.GRID_SIZE;
        else if (currentDirection === "LEFT")
          newHead.x -= GAME_CONFIG.GRID_SIZE;
        else if (currentDirection === "UP") newHead.y -= GAME_CONFIG.GRID_SIZE;
        else if (currentDirection === "DOWN")
          newHead.y += GAME_CONFIG.GRID_SIZE;

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GAME_CONFIG.CANVAS_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GAME_CONFIG.CANVAS_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (
          newSnake.some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          )
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(newHead);

        // Check if bait eaten
        if (newHead.x === baitPosition.x && newHead.y === baitPosition.y) {
          playEatingSound();
          setBaitPosition(randomCoordinateOfBait(newSnake));

          const randomFruit =
            FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
          setCurrentFruit(randomFruit);

          setScore((prev) => prev + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, GAME_CONFIG.GAME_SPEED);

    return () => clearInterval(intervalId);
  }, [
    currentDirection,
    isGameOver,
    isPaused,
    isGameStarted,
    baitPosition,
    setSnakeCoordinatesArr,
    setIsGameOver,
    setBaitPosition,
    setCurrentFruit,
    setScore,
    playEatingSound,
  ]);
};
