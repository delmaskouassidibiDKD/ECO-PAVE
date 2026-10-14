import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { HOTLINK_IMAGES } from '../../data/mockData';

interface ProductDetailScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ onNavigate }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen p-4 space-y-4 pb-28 pt-2 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate('screen-market')}
          aria-label="Retour boutique"
          className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>
        <h2 className="text-base font-bold text-white">Bread Fitt</h2>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          aria-label="Enregistrer le produit"
          className={`w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center transition-colors cursor-pointer ${
            isBookmarked ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <i className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark text-xs`}></i>
        </button>
      </div>

      {/* Photo HD Bocal */}
      <div className="rounded-3xl overflow-hidden shadow-xl h-56 bg-slate-900 border border-slate-800 relative group">
        <img
          alt="Bread Fitt Jar"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={HOTLINK_IMAGES.breadFittJar}
        />
        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-yellow-400 text-xs font-bold px-2 py-1 rounded-lg">
          ★ 4.8 / 5
        </span>
      </div>

      {/* Badges Tags */}
      <div className="flex space-x-2 text-xs">
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold flex items-center">
          <i className="fa-solid fa-rotate mr-1.5 text-[10px]"></i>
          PETE • Plastique Grade 1
        </span>
        <span className="bg-slate-800 border border-slate-700/60 text-slate-400 px-3 py-1 rounded-full font-medium">
          Réf : BF-049
        </span>
      </div>

      {/* Titre & Info */}
      <div>
        <h3 className="text-base font-bold text-white">Bocal alimentaire Bread Fitt recyclable</h3>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          Ce contenant est fabriqué à partir de polymères recyclables de haute pureté. Conçu pour préserver la fraîcheur des aliments tout en réduisant l'impact environnemental.
        </p>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Nettoyez soigneusement le pot avant de le déposer dans un point de collecte agréé pour maximiser le cycle de valorisation de la résine.
        </p>
      </div>

      {/* Taux de recyclage */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm shrink-0">
            <i className="fa-solid fa-box-archive"></i>
          </div>
          <div>
            <div className="text-xs font-bold text-white">Taux de recyclage</div>
            <div className="text-[10px] text-slate-400">100% Recyclable • Éco-responsable</div>
          </div>
        </div>
        <span className="text-emerald-400 font-extrabold text-xs bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
          +15 pts
        </span>
      </div>

      {/* Bouton CTA */}
      <button
        onClick={() => onNavigate('screen-map')}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
      >
        <i className="fa-solid fa-location-dot"></i>
        <span>Trouver un point de collecte</span>
      </button>
    </div>
  );
};
