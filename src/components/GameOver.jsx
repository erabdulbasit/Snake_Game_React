import React from "react";

const GameOver = ({ score, highScore, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main card */}
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 shadow-2xl max-w-md w-full">
        {/* Skull or game over icon area */}
        <div className="flex justify-center mb-2">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">💀</span>
          </div>
        </div>

        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 mb-10 text-center">
          GAME OVER
        </h1>

        <div className="space-y-5 mb-10">
          <div className="flex  bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-slate-400 text-2xl mb-1 mr-2">Your Score :</p>
            <p className="text-2xl font-bold text-cyan-400 ">{score}</p>
          </div>

          <div className="flex bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-slate-400 text-2xl mb-1 mr-2">higest Score :</p>
            <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
          </div>
        </div>

        <button
          onClick={() => onRestart()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1"
        >
          Play Again
        </button>

        {/* <p className="text-slate-500 text-center text-sm mt-6">
          Press SPACE to restart
        </p> */}
      </div>
    </div>
  );
};

export default GameOver;
