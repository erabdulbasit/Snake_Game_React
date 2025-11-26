import { GAME_CONFIG } from "../constants/gameConfig";

const useTouchControls = (
  setTouchStart,
  setCurrentDirection,
  currentDirection,
  touchStart,
  isGameStarted,
  isPaused,
  isGameOver
) => {
  const handleTouchStart = (e) => {
    //console.log("touch start detected");
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e) => {
    //console.log("touch end detected");
    if (!touchStart) return;

    const touch = e.changedTouches[0];

    const currentTouchEnd = { x: touch.clientX, y: touch.clientY };
    //
    const diffX = touchStart.x - currentTouchEnd.x;
    const diffY = touchStart.y - currentTouchEnd.y;

    // Check if the ABSOLUTE distance is smaller than the threshold
    if (
      Math.abs(diffX) < GAME_CONFIG.THRESHOLD_SWIPE &&
      Math.abs(diffY) < GAME_CONFIG.THRESHOLD_SWIPE
    ) {
      console.log("Swipe too short, ignoring.");
      return;
    }
    // If Math.abs(diffX) is bigger, it was a horizontal swipe.
    // If Math.abs(diffY) is bigger, it was a vertical swipe.

    if (Math.abs(diffX) >= Math.abs(diffY)) {
      //If positive, it means the start X was bigger than end X, so it's a LEFT swipe. If negative, it's RIGHT.
      if (diffX > 0 && currentDirection !== "RIGHT") {
        setCurrentDirection("LEFT");
      } else if (diffX < 0 && currentDirection !== "LEFT") {
        setCurrentDirection("RIGHT");
      }
    } else {
      //Positive is UP, negative is DOWN
      if (diffY > 0 && currentDirection !== "DOWN") {
        setCurrentDirection("UP");
      } else if (diffY < 0 && currentDirection !== "UP") {
        setCurrentDirection("DOWN");
      }
    }
    setTouchStart(null);
  };
  return { handleTouchStart, handleTouchEnd };
};

export default useTouchControls;
