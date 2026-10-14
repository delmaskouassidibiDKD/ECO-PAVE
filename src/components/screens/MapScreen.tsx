import React, { useState } from 'react';
import { ScreenId, BorneLocation } from '../../types';
import { BORNES_DATA } from '../../data/mockData';

interface MapScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onNavigate }) => {
  const [selectedBorne, setSelectedBorne] = useState<BorneLocation>(BORNES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'open' | 'near'>('all');

  const filteredBornes = BORNES_DATA.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.commune.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.accepted.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full h-[calc(100vh-5rem)] relative select-none overflow-hidden">
      {/* Recherche Flottante */}
      <div className="absolute top-3 left-4 right-4 z-20 space-y-2">
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 flex items-center space-x-2.5 shadow-xl backdrop-blur-md">
          <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
            placeholder="Rechercher une borne à Abidjan..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white text-xs"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
          <button
            onClick={() => setFilterType(filterType === 'all' ? 'open' : 'all')}
            className={`text-xs font-semibold p-1 rounded transition-colors ${
              filterType !== 'all' ? 'text-emerald-300 bg-emerald-500/20' : 'text-emerald-400'
            }`}
            title="Filtrer"
          >
            <i className="fa-solid fa-sliders"></i>
          </button>
        </div>

        {/* Badges filtres rapides */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] bg-slate-900/90 text-slate-300 border border-slate-700/70 px-2 py-0.5 rounded-full backdrop-blur-md">
            Cocody
          </span>
          <span className="text-[10px] bg-slate-900/90 text-slate-300 border border-slate-700/70 px-2 py-0.5 rounded-full backdrop-blur-md">
            Plateau
          </span>
          <span className="text-[10px] bg-slate-900/90 text-slate-300 border border-slate-700/70 px-2 py-0.5 rounded-full backdrop-blur-md">
            Riviera
          </span>
          <span className="text-[10px] bg-emerald-900/80 text-emerald-300 border border-emerald-600/50 px-2 py-0.5 rounded-full backdrop-blur-md font-medium">
            4 Bornes actives
          </span>
        </div>
      </div>

      {/* Simulation Carte Graphique Dark Map */}
      <div className="w-full h-full bg-[#0a1120] relative flex items-center justify-center overflow-hidden">
        {/* Lignes de routes stylisées & Lagune Ébrié */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Lagune */}
          <path
            d="M -20,240 Q 120,200 220,280 T 440,300 L 440,380 Q 280,360 160,420 T -20,380 Z"
            fill="#0f263d"
            opacity="0.6"
          />
          {/* Ponts et boulevards */}
          <line stroke="#1e293b" strokeWidth="12" x1="60" x2="360" y1="0" y2="720" />
          <line stroke="#334155" strokeWidth="4" x1="0" x2="420" y1="120" y2="400" />
          <line stroke="#334155" strokeWidth="3" x1="0" x2="420" y1="500" y2="280" />
          <line stroke="#24334a" strokeWidth="2" x1="200" x2="200" y1="100" y2="600" />
          {/* Cercles de portée radar */}
          <circle cx="200" cy="270" r="80" stroke="#047857" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.3" />
          <circle cx="200" cy="270" r="150" stroke="#047857" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.25" />
          {/* Labels districts */}
          <text x="175" y="195" fill="#475569" fontSize="10" fontWeight="bold">COCODY</text>
          <text x="70" y="380" fill="#475569" fontSize="10" fontWeight="bold">PLATEAU</text>
          <text x="270" y="150" fill="#475569" fontSize="10" fontWeight="bold">RIVIERA</text>
          <text x="25" y="180" fill="#475569" fontSize="10" fontWeight="bold">YOPOUGON</text>
        </svg>

        {/* Pins des bornes sur la carte */}
        {filteredBornes.map((borne) => {
          const isSelected = selectedBorne.id === borne.id;
          return (
            <div
              key={borne.id}
              onClick={() => setSelectedBorne(borne)}
              style={{
                top: `${borne.yPercent}%`,
                left: `${borne.xPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute flex flex-col items-center cursor-pointer transition-transform duration-200 z-10"
            >
              {isSelected ? (
                <div className="flex flex-col items-center animate-bounce">
                  <div className="bg-slate-900 border border-emerald-500 text-[10px] text-white px-2 py-0.5 rounded-md shadow-xl font-bold mb-1 whitespace-nowrap">
                    {borne.name.replace('Borne RVM - ', '')}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center p-1 shadow-lg shadow-emerald-500/20">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-lg">
                      <i className="fa-solid fa-recycle"></i>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 group-hover:border-emerald-400 group-hover:scale-110 flex items-center justify-center text-xs shadow-md transition-all">
                    <i className="fa-solid fa-recycle"></i>
                  </div>
                  <span className="text-[9px] text-slate-300 bg-slate-900/80 px-1 rounded mt-1 whitespace-nowrap border border-slate-800">
                    {borne.commune} ({borne.distance})
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Sheet Information Borne */}
      <div className="absolute bottom-4 left-3 right-3 bg-slate-900/95 border border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur-md z-30 animate-in fade-in slide-in-from-bottom duration-200">
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-2.5"></div>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-recycle"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white truncate">{selectedBorne.name}</h4>
            <div className="flex items-center space-x-2 text-[10px] mt-0.5 flex-wrap gap-y-1">
              <span className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">
                {selectedBorne.accepted}
              </span>
              <span className="bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded font-medium">
                {selectedBorne.pointsRate}
              </span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
          {selectedBorne.description}
        </p>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 py-1 border-t border-slate-800/80">
          <span><i className="fa-regular fa-clock mr-1 text-slate-500"></i>{selectedBorne.hours}</span>
          <span className="text-emerald-400 font-medium">
            <i className="fa-solid fa-person-walking mr-1"></i>{selectedBorne.walkTime} ({selectedBorne.distance})
          </span>
        </div>

        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => onNavigate('screen-report')}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer active:scale-95"
          >
            <i className="fa-solid fa-camera"></i>
            <span>Déposer ici</span>
          </button>
          <button
            onClick={() => onNavigate('screen-waste-detail')}
            className="px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
            title="Détails du barème"
          >
            <i className="fa-solid fa-circle-info"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
