import React from "react";

const Home = ({
  score,
  canvasRef,
  isPaused,
  isGameOver,
  handleTouchStart,
  handleTouchEnd,
  onCanvasClick,
}) => {
  return (
    <div
      onClick={onCanvasClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col justify-center items-center h-screen bg-slate-950 relative overflow-hidden touch-none p-2 sm:p-4"
    >
      {/* Animated background circles - matching GameOver */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Game container */}
      <div className="relative z-10 w-full max-w-[500px] flex flex-col justify-center items-center">
        {/* Score display */}
        <div className="bg-slate-900/80 backdrop-blur-xl border   border-slate-700 w-full h-auto  rounded-2xl px-10 py-5 mb-2 shadow-xl">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {score}
              </p>
            </div>
          </div>
        </div>

        {/* Canvas with styled border */}
        <canvas
          ref={canvasRef}
          width="500"
          height="500"
          className="bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700 rounded-2xl shadow-2xl w-full h-auto aspect-square"
        />

        {/* --- NEW PAUSE OVERLAY --- */}
        {/* Only show if Paused AND NOT Game Over */}
        {isPaused && !isGameOver && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl">
            <div className="text-center px-4">
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
                PAUSED
              </p>
              <p className="text-slate-400 mt-2 text-base">
                Press SPACE to resume
              </p>
            </div>
          </div>
        )}

        {/* Controls hint */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">USE ARROW KEYS OR SWIPES</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
