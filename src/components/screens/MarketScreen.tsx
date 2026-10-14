import React, { useState } from 'react';
import { ScreenId, MarketItem, UserStats } from '../../types';
import { MARKET_ITEMS } from '../../data/mockData';

interface MarketScreenProps {
  user: UserStats;
  onNavigate: (screen: ScreenId) => void;
  onRedeemReward?: (item: MarketItem) => void;
}

export const MarketScreen: React.FC<MarketScreenProps> = ({ onNavigate, onRedeemReward }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'pet' | 'caps' | 'glass' | 'metal'>('all');
  const [claimedModal, setClaimedModal] = useState<MarketItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Tous' },
    { id: 'pet', label: 'Plastique PET' },
    { id: 'caps', label: 'Bouchons' },
    { id: 'glass', label: 'Verre' },
    { id: 'metal', label: 'Métal' },
  ] as const;

  const filteredItems = MARKET_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClaim = (e: React.MouseEvent, item: MarketItem) => {
    e.stopPropagation();
    setClaimedModal(item);
    if (onRedeemReward) {
      onRedeemReward(item);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-4 space-y-3 pb-28 pt-2 select-none">
      {/* Barre de recherche */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 flex items-center space-x-2">
        <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
          placeholder="Rechercher matière ou produit..."
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-slate-400 text-xs">
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      {/* Filtres horizontaux */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1 text-xs">
        {filterTabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1 rounded-full font-medium shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grille des produits recyclables */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                if (item.targetScreen) {
                  onNavigate(item.targetScreen);
                }
              }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 cursor-pointer hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all active:scale-[0.98] group flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden mb-2 h-24 bg-slate-950">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.imageUrl}
                  />
                  <span className="absolute top-1 right-1 bg-black/60 backdrop-blur-xs text-yellow-400 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    ★ {item.rating}
                  </span>
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{item.name}</div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 truncate">
                    {item.weightKg ? `${item.weightKg.toFixed(1)} kg` : item.subtitle}
                  </span>
                  <span className="text-emerald-400 font-bold whitespace-nowrap">
                    {item.priceFcfa ? `${item.priceFcfa} FCFA` : `+${item.points} pts`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleClaim(e, item)}
                  className="w-full mt-2 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-[10px] font-semibold py-1 rounded-lg transition-colors flex items-center justify-center space-x-1"
                >
                  <i className="fa-solid fa-cart-shopping text-[9px]"></i>
                  <span>{item.priceFcfa ? 'Acheter' : 'Échanger'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {claimedModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-5 max-w-xs w-full text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 text-xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-sm font-bold text-white">Action confirmée !</h3>
            <p className="text-xs text-slate-300 mt-1">
              Vous avez sélectionné <span className="text-emerald-400 font-semibold">{claimedModal.name}</span>.
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Un bon de retrait a été ajouté à votre espace Éco-Citoyen.
            </p>
            <button
              onClick={() => setClaimedModal(null)}
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl text-xs transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
