import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { HOTLINK_IMAGES } from '../../data/mockData';

interface WasteDetailScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const WasteDetailScreen: React.FC<WasteDetailScreenProps> = ({ onNavigate }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen p-4 space-y-4 pb-28 pt-2 select-none">
      {/* Header Retour */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate('screen-home')}
          aria-label="Retour accueil"
          className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>
        <h2 className="text-base font-bold text-white">Bouteille en Plastique</h2>
        <button
          onClick={() => onNavigate('screen-report')}
          aria-label="Scanner ce déchet"
          className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 flex items-center justify-center transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-arrows-rotate text-xs"></i>
        </button>
      </div>

      {/* Hero Photo Déchet Réel */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl h-52 bg-slate-900 border border-slate-800">
        <img
          alt="Bouteille Plastique"
          className="w-full h-full object-cover"
          src={HOTLINK_IMAGES.petBottles}
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          aria-label="Ajouter aux favoris"
          className={`absolute top-3 left-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
            isLiked ? 'bg-rose-500 text-white' : 'bg-black/50 text-rose-500'
          }`}
        >
          <i className={`fa-${isLiked ? 'solid' : 'regular'} fa-heart text-sm`}></i>
        </button>
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 flex justify-between items-center shadow-lg">
          <div>
            <h3 className="text-xs font-bold text-white">Bouteille PET (Code 1)</h3>
            <p className="text-[10px] text-emerald-400 font-medium">100% Recyclable • Éco Pavé</p>
          </div>
          <span className="bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-1 rounded-lg">
            ★ 4.8
          </span>
        </div>
      </div>

      {/* Description Éco Pavé */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-1.5">
          <h4 className="text-xs font-bold text-white">Description & Transformation</h4>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
            +25 Pts Éco
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Les bouteilles en plastique PET (polyéthylène téréphtalate) sont 100% recyclables. Chez{' '}
          <strong className="text-emerald-400">Éco Pavé</strong>, elles sont collectées, broyées et transformées en{' '}
          <strong>pavés écologiques ultra-résistants</strong> pour construire des routes et aménager les espaces urbains
          durables en Côte d'Ivoire.
        </p>
      </div>

      {/* 3 Badges d'information */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-emerald-400 block mb-1 text-sm">
            <i className="fa-solid fa-shapes"></i>
          </span>
          <span className="text-[10px] font-bold text-white block">Plastique PET</span>
          <span className="text-[9px] text-slate-400">Code 1</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-emerald-400 block mb-1 text-sm">
            <i className="fa-solid fa-leaf"></i>
          </span>
          <span className="text-[10px] font-bold text-white block">+25 Points</span>
          <span className="text-[9px] text-slate-400">Par kilo</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-emerald-400 block mb-1 text-sm">
            <i className="fa-solid fa-city"></i>
          </span>
          <span className="text-[10px] font-bold text-white block">Pavés Éco</span>
          <span className="text-[9px] text-slate-400">Voirie durable</span>
        </div>
      </div>

      {/* Mini-Carte des Bornes à proximité */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-white">Bornes de collecte à proximité</span>
          <button
            onClick={() => onNavigate('screen-map')}
            className="text-[10px] text-emerald-400 font-semibold cursor-pointer hover:underline"
          >
            3 bornes à Abidjan
          </button>
        </div>
        <div
          onClick={() => onNavigate('screen-map')}
          className="relative h-20 rounded-xl overflow-hidden border border-slate-800 cursor-pointer group"
        >
          <img
            alt="Carte bornes"
            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-300"
            src={HOTLINK_IMAGES.borne}
          />
          <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
            <span className="text-xs font-bold bg-slate-900/90 text-white px-3 py-1 rounded-full border border-emerald-500 shadow-md flex items-center">
              <i className="fa-solid fa-location-dot text-emerald-400 mr-1.5"></i>
              Borne Cocody • 450m
            </span>
          </div>
        </div>
      </div>

      {/* Bouton CTA Déposer */}
      <button
        onClick={() => onNavigate('screen-report')}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
      >
        <i className="fa-solid fa-camera"></i>
        <span>Déposer ce déchet maintenant</span>
      </button>
    </div>
  );
};
