
import React from 'react';
import { useState } from 'react';
import { ZODIAC_SIGNS } from './constants';
import { ZodiacSign } from './types';
import { getHoroscope } from './services/geminiService';
import CrystalBall from './components/CrystalBall';

const App: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(ZodiacSign.Aries);
  const [horoscope, setHoroscope] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleHoroscopeRequest = async () => {
    setIsLoading(true);
    setError(null);
    setHoroscope('');
    try {
      const result = await getHoroscope(selectedSign);
      setHoroscope(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ocurrió un error desconocido.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white flex flex-col items-center justify-center p-4 selection:bg-purple-500 selection:text-white">
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <header className="text-center mb-4">
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold text-yellow-300 tracking-wider [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
            Horóscopo Mágico
          </h1>
          <p className="text-purple-200 mt-2 text-lg">con Madame Zazá</p>
        </header>

        <main className="w-full max-w-md mx-auto flex flex-col items-center">
          <div className="w-full bg-black/20 p-6 rounded-xl shadow-lg border border-purple-500/30 backdrop-blur-sm">
            <label htmlFor="zodiac-select" className="block text-center text-lg text-purple-200 mb-3 font-cinzel">
              Elige tu signo zodiacal
            </label>
            <div className="flex space-x-4">
              <select
                id="zodiac-select"
                value={selectedSign}
                onChange={(e) => setSelectedSign(e.target.value as ZodiacSign)}
                disabled={isLoading}
                className="flex-grow bg-indigo-900/50 border border-purple-400 text-white text-lg rounded-lg focus:ring-yellow-400 focus:border-yellow-400 block w-full p-3 disabled:opacity-50 appearance-none text-center cursor-pointer"
              >
                {ZODIAC_SIGNS.map((sign) => (
                  <option key={sign.name} value={sign.name}>
                    {sign.emoji} {sign.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleHoroscopeRequest}
                disabled={isLoading}
                className="font-bold font-cinzel text-lg bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-indigo-900 py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400"
              >
                {isLoading ? 'Viendo...' : 'Destino'}
              </button>
            </div>
          </div>

          <CrystalBall 
              isLoading={isLoading}
              horoscope={horoscope}
              error={error}
              initialMessage="Elige tu signo y descubre tu destino..."
          />
        </main>
      </div>
      <footer className="text-center text-gray-400 text-sm mt-8 absolute bottom-4">
        Potenciado por la magia de Gemini
      </footer>
    </div>
  );
};

export default App;
