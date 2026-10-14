import React from 'react';
import { ScreenId } from '../../types';
import { HOTLINK_IMAGES } from '../../data/mockData';

interface OnboardingScreen1Props {
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-900 overflow-y-auto no-scrollbar p-6 justify-between pb-10 text-center select-none">
      {/* Top Passer */}
      <div className="flex justify-end w-full pt-1">
        <button
          onClick={() => onNavigate('screen-home')}
          className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          Passer
        </button>
      </div>

      {/* Illustration Éco Pavé */}
      <div className="flex flex-col items-center my-auto">
        <div className="w-48 h-48 rounded-full border-2 border-dashed border-emerald-500/40 p-4 flex items-center justify-center relative mb-6 shadow-inner">
          <div className="w-40 h-40 rounded-3xl bg-slate-950 flex items-center justify-center overflow-hidden shadow-2xl border border-emerald-500/30">
            <img
              alt="Logo Éco Pavé"
              className="w-full h-full object-cover"
              src={HOTLINK_IMAGES.logoEcoPave}
            />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white">
          Pourquoi <span className="text-emerald-400">recycler ?</span>
        </h2>
        <p className="text-xs text-slate-300 mt-3 max-w-xs leading-relaxed">
          Le recyclage préserve les ressources naturelles, élimine la pollution plastique dans nos villes ivoiriennes et
          crée de véritables pavés écologiques pour nos routes.
        </p>

        {/* Pagination Dots */}
        <div className="flex space-x-2 justify-center mt-6">
          <span className="w-6 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
        </div>
      </div>

      {/* Bouton Continuer */}
      <button
        onClick={() => onNavigate('screen-onboard2')}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
      >
        <span>Continuer</span>
        <i className="fa-solid fa-arrow-right text-xs"></i>
      </button>
    </div>
  );
};
