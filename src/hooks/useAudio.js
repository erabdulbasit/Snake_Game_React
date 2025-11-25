import { useRef, useEffect } from "react";
import { AUDIO_CONFIG } from "../constants/gameConfig";

export const useAudio = (isGameStarted, isGameOver, isPaused) => {
  const eatingSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);
  const backgroundMusicRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    eatingSoundRef.current = new Audio(AUDIO_CONFIG.EATING_SOUND);
    eatingSoundRef.current.volume = AUDIO_CONFIG.VOLUMES.eating;

    gameOverSoundRef.current = new Audio(AUDIO_CONFIG.GAME_OVER_SOUND);
    gameOverSoundRef.current.volume = AUDIO_CONFIG.VOLUMES.gameOver;

    backgroundMusicRef.current = new Audio(AUDIO_CONFIG.BACKGROUND_MUSIC);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = AUDIO_CONFIG.VOLUMES.background;
  }, []);

  // Control background music
  useEffect(() => {
    if (isGameStarted && !isGameOver && !isPaused) {
      backgroundMusicRef.current
        .play()
        .catch((err) => console.warn("Music play failed:", err));
    } else {
      backgroundMusicRef.current.pause();
    }
  }, [isGameStarted, isGameOver, isPaused]);

  const playEatingSound = () => {
    eatingSoundRef.current.currentTime = 0;
    eatingSoundRef.current.play();
  };

  const playGameOverSound = () => {
    gameOverSoundRef.current.currentTime = 0;
    backgroundMusicRef.current.pause();
    gameOverSoundRef.current.play();
  };

  return { playEatingSound, playGameOverSound };
};
