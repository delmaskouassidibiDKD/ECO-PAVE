import React from 'react';
import { ScreenId } from '../../types';

interface OnboardingScreen2Props {
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({ onNavigate }) => {
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

      {/* Illustration Recyclage */}
      <div className="flex flex-col items-center my-auto">
        <div className="w-44 h-44 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-7xl text-emerald-400 mb-6 shadow-inner">
          <i className="fa-solid fa-people-carry-box"></i>
        </div>
        <h2 className="text-2xl font-black text-white">
          Comment <span className="text-emerald-400">recycler ?</span>
        </h2>
        <p className="text-xs text-slate-300 mt-3 max-w-xs leading-relaxed">
          Collectez, triez vos bouteilles et bouchons plastiques, déposez-les dans nos bornes automatiques Éco Pavé et
          accumulez des points convertibles en récompenses !
        </p>

        {/* Pagination Dots */}
        <div className="flex space-x-2 justify-center mt-6">
          <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
          <span className="w-6 h-1.5 bg-emerald-500 rounded-full"></span>
        </div>
      </div>

      {/* Bouton Démarrer */}
      <button
        onClick={() => onNavigate('screen-home')}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
      >
        <span>Accéder à l'application</span>
        <i className="fa-solid fa-check text-xs"></i>
      </button>
    </div>
  );
};
