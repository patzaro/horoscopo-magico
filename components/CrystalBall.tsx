
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface CrystalBallProps {
  isLoading: boolean;
  horoscope: string;
  error: string | null;
  initialMessage: string;
}

const CrystalBall: React.FC<CrystalBallProps> = ({ isLoading, horoscope, error, initialMessage }) => {
  const hasContent = horoscope || error;
  const hasResult = horoscope && !error;

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto mt-8 flex items-center justify-center">
      {/* Glossy overlay */}
      <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white/20 rounded-full blur-lg -rotate-45 z-20"></div>
      
      {/* Main ball */}
      <div className="w-full h-full bg-black/30 backdrop-blur-md rounded-full border-4 border-purple-400/50 shadow-2xl shadow-purple-500/30 flex items-center justify-center p-8 text-center overflow-hidden">
        <div className="relative z-10 transition-opacity duration-700 ease-in-out max-h-full overflow-y-auto custom-scrollbar">
          {isLoading && <LoadingSpinner />}
          {!isLoading && error && (
            <p className="font-cinzel text-lg sm:text-xl text-red-400">
                {error}
            </p>
          )}
          {!isLoading && hasResult && (
             <p className="font-cinzel text-lg sm:text-xl text-yellow-100 animate-[fade-in_1s_ease-in-out]">
                {horoscope}
             </p>
          )}
           {!isLoading && !hasContent && (
             <p className="font-cinzel text-lg sm:text-xl text-purple-200/70 animate-pulse">
                {initialMessage}
             </p>
           )}
        </div>
      </div>

      {/* Stand */}
      <div className="absolute bottom-[-20px] w-48 h-16 bg-gradient-to-t from-gray-800 to-gray-700 rounded-t-lg border-x-4 border-t-4 border-yellow-600/50 shadow-lg"></div>
    </div>
  );
};

export default CrystalBall;
