import React from "react";

const Home = ({ score, canvasRef, isPaused, isGameOver }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated background circles - matching GameOver */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Game container */}
      <div className="relative z-10">
        {/* Score display */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl px-10 py-5 mb-2 shadow-xl">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-slate-400 text-sm font-medium mb-1">SCORE</p>
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
          className="bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700 rounded-2xl shadow-2xl"
        />

        {/* --- NEW PAUSE OVERLAY --- */}
        {/* Only show if Paused AND NOT Game Over */}
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl">
            <div className="text-center">
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
                PAUSED
              </p>
              <p className="text-slate-400 mt-2">Press SPACE to resume</p>
            </div>
          </div>
        )}

        {/* Controls hint */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Use arrow keys to move 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
