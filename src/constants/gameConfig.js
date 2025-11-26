export const GAME_CONFIG = {
  CANVAS_SIZE: 500,
  GRID_SIZE: 20,
  GAME_SPEED: 150,
  INITIAL_SNAKE_POSITION: { x: 400, y: 400 },
  INITIAL_BAIT_POSITION: { x: 100, y: 100 },
  INITIAL_DIRECTION: "LEFT",
  THRESHOLD_SWIPE: 40,
};

export const FOOD_ITEMS = [
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍉",
  "🍇",
  "🍓",
  "🍒",
  "🍑",
  "🍍",
  "🥥",
  "🥝",
];

export const AUDIO_CONFIG = {
  EATING_SOUND: "/food.mp3",
  GAME_OVER_SOUND: "/gameover.mp3",
  BACKGROUND_MUSIC: "/move.mp3",
  VOLUMES: {
    eating: 0.4,
    gameOver: 0.4,
    background: 0.3,
  },
};
