import React from 'react';
import { ScreenId, UserStats } from '../../types';
import { HOTLINK_IMAGES } from '../../data/mockData';

interface HomeScreenProps {
  user: UserStats;
  onNavigate: (screen: ScreenId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onNavigate }) => {
  return (
    <div className="flex flex-col w-full min-h-screen p-4 space-y-4 pb-28 pt-2">
      {/* Profil Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => onNavigate('screen-settings')}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              alt="Avatar"
              className="w-full h-full object-cover"
              src={user.avatarUrl || HOTLINK_IMAGES.avatar}
            />
          </div>
          <div>
            <div className="flex items-center space-x-1 text-xs text-emerald-400">
              <i className="fa-solid fa-location-dot"></i>
              <span className="text-slate-300">{user.city}, {user.commune}</span>
            </div>
            <h2 className="text-base font-bold text-white flex items-center space-x-1">
              <span>Bonjour, {user.name}</span> <span className="animate-pulse">👋</span>
            </h2>
          </div>
        </div>

        <button
          onClick={() => onNavigate('screen-chat')}
          aria-label="Notifications et assistance"
          className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors relative cursor-pointer"
        >
          <i className="fa-regular fa-bell"></i>
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>
      </div>

      {/* Grande Carte Impact Vert */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-15 text-9xl text-white pointer-events-none select-none">
          <i className="fa-solid fa-recycle"></i>
        </div>
        <div className="flex justify-between items-center mb-3 relative z-10">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5">
            <i className="fa-solid fa-leaf text-emerald-200"></i>
            <span>IMPACT ÉCOLOGIQUE</span>
          </span>
          <span className="text-xs bg-emerald-900/60 border border-emerald-500/30 px-2 py-0.5 rounded-full text-emerald-200 font-medium">
            +{user.todayPoints} pts ajd
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-2 relative z-10">
          <div>
            <span className="text-3xl font-extrabold tracking-tight tabular-nums">{user.kgRecycled.toFixed(1)}</span>
            <span className="text-xs text-emerald-100 block">kg recyclés</span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold tracking-tight text-white tabular-nums">{user.points}</span>
            <span className="text-xs text-emerald-100 block">Points gagnés</span>
          </div>
        </div>

        <div className="mt-3 relative z-10">
          <div className="flex justify-between text-[11px] mb-1 font-medium text-emerald-100">
            <span>{user.rank}</span>
            <span>{user.rankProgressPercent}% vers Or</span>
          </div>
          <div className="w-full bg-emerald-950/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-yellow-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${user.rankProgressPercent}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('screen-report')}
          className="w-full mt-4 bg-white text-emerald-800 hover:bg-emerald-50 font-bold py-2.5 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <i className="fa-solid fa-qrcode text-emerald-600"></i>
          <span>Scanner ou Signaler un déchet</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </div>

      {/* 4 Actions Rapides */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        <button
          type="button"
          onClick={() => onNavigate('screen-report')}
          className="flex flex-col items-center p-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 cursor-pointer transition-all active:scale-95 text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg mb-1">
            <i className="fa-solid fa-camera"></i>
          </div>
          <span className="text-[11px] font-medium text-slate-300">Scanner</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('screen-map')}
          className="flex flex-col items-center p-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-800/80 cursor-pointer transition-all active:scale-95 text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 text-lg mb-1">
            <i className="fa-solid fa-trash-can"></i>
          </div>
          <span className="text-[11px] font-medium text-slate-300">Déposer</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('screen-waste-detail')}
          className="flex flex-col items-center p-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 cursor-pointer transition-all active:scale-95 text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-lg mb-1">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <span className="text-[11px] font-medium text-slate-300">Historique</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('screen-market')}
          className="flex flex-col items-center p-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80 cursor-pointer transition-all active:scale-95 text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg mb-1">
            <i className="fa-solid fa-gift"></i>
          </div>
          <span className="text-[11px] font-medium text-slate-300">Cadeaux</span>
        </button>
      </div>

      {/* Borne la plus proche */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold text-white">Borne la plus proche</h3>
          <button
            onClick={() => onNavigate('screen-map')}
            className="text-xs text-emerald-400 font-semibold cursor-pointer hover:underline flex items-center"
          >
            350 m <i className="fa-solid fa-location-arrow ml-1 text-[10px]"></i>
          </button>
        </div>
        <div
          onClick={() => onNavigate('screen-map')}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center space-x-3 cursor-pointer hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all active:scale-[0.99]"
        >
          <img
            alt="Borne RVM"
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-800"
            src={HOTLINK_IMAGES.borne}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white truncate">Borne RVM - Plateau Cocody</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-medium shrink-0">
                Ouvert
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">Accepte : Bouteilles PET, Bouchons</p>
            <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-1">
              <span><i className="fa-regular fa-clock mr-1 text-slate-500"></i>Jusqu'à 21h00</span>
              <span><i className="fa-solid fa-person-walking mr-1 text-emerald-400"></i>4 min à pied</span>
            </div>
          </div>
        </div>
      </div>

      {/* Déchets valorisés du jour */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold text-white">Déchets valorisés du jour</h3>
          <button
            onClick={() => onNavigate('screen-waste-detail')}
            className="text-xs text-emerald-400 font-medium cursor-pointer hover:underline"
          >
            Voir barème
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1 - Bouteilles PET */}
          <div
            onClick={() => onNavigate('screen-waste-detail')}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 cursor-pointer hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all active:scale-[0.98] group"
          >
            <div className="relative rounded-xl overflow-hidden mb-2 h-24 bg-slate-950">
              <img
                alt="Bouteilles PET"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={HOTLINK_IMAGES.petBottles}
              />
              <span className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                ★ 4.9
              </span>
            </div>
            <div className="text-xs font-bold text-white">Bouteilles PET</div>
            <div className="flex justify-between items-center text-[11px] mt-1">
              <span className="text-slate-400 text-[10px]">Transformé en Pavé</span>
              <span className="text-emerald-400 font-bold">+25 pts</span>
            </div>
          </div>

          {/* Card 2 - Bocal Alimentaire */}
          <div
            onClick={() => onNavigate('screen-product-detail')}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 cursor-pointer hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all active:scale-[0.98] group"
          >
            <div className="relative rounded-xl overflow-hidden mb-2 h-24 bg-slate-950">
              <img
                alt="Bocal Alimentaire"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={HOTLINK_IMAGES.breadFittJar}
              />
              <span className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                ★ 4.8
              </span>
            </div>
            <div className="text-xs font-bold text-white">Bocal Alimentaire</div>
            <div className="flex justify-between items-center text-[11px] mt-1">
              <span className="text-slate-400 text-[10px]">Verre recyclé</span>
              <span className="text-emerald-400 font-bold">+15 pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
