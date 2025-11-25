import { GAME_CONFIG } from "../constants/gameConfig";

export const renderSnake = (snakeCoordinatesArr, ctx) => {
  snakeCoordinatesArr.forEach((coordinate) => {
    const segmentX = coordinate.x + 1;
    const segmentY = coordinate.y + 1;
    const segmentSize = 18;

    const gradient = ctx.createLinearGradient(
      segmentX,
      segmentY,
      segmentX + segmentSize,
      segmentY
    );

    gradient.addColorStop(0, "#22d3ee");
    gradient.addColorStop(1, "#3b82f6");

    ctx.fillStyle = gradient;
    ctx.shadowColor = "#3b82f6";
    ctx.shadowBlur = 5;

    ctx.fillRect(segmentX, segmentY, segmentSize, segmentSize);
  });

  ctx.shadowBlur = 0;
};

export const randomCoordinateOfBait = (currSnake) => {
  let newPosition;
  let isOnSnake;

  do {
    const x = Math.floor(Math.random() * 25) * GAME_CONFIG.GRID_SIZE;
    const y = Math.floor(Math.random() * 25) * GAME_CONFIG.GRID_SIZE;
    newPosition = { x, y };
    isOnSnake = currSnake.some((segment) => segment.x === x && segment.y === y);
  } while (isOnSnake);

  return newPosition;
};

export const drawBait = (ctx, currentFruit, baitPosition) => {
  ctx.font = "22px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "#ff0000";
  ctx.fillText(currentFruit, baitPosition.x + 10, baitPosition.y + 10);
  ctx.shadowBlur = 0;
};
