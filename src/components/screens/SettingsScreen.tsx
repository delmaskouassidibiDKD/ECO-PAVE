import React, { useState } from 'react';
import { ScreenId, UserStats } from '../../types';
import { HOTLINK_IMAGES } from '../../data/mockData';

interface SettingsScreenProps {
  user: UserStats;
  onNavigate: (screen: ScreenId) => void;
  onUpdateUser: (updated: Partial<UserStats>) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onNavigate, onUpdateUser }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddSpotModal, setShowAddSpotModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editCommune, setEditCommune] = useState(user.commune);
  const [spotName, setSpotName] = useState('');
  const [spotCommune, setSpotCommune] = useState('Cocody');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name: editName, commune: editCommune });
    setShowEditModal(false);
  };

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Votre proposition "${spotName}" à ${spotCommune} a été transmise à l'équipe Éco Pavé pour homologation.`);
    setSpotName('');
    setShowAddSpotModal(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-4 space-y-4 pb-28 pt-2 bg-slate-900 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate('screen-home')}
          aria-label="Retour accueil"
          className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-chevron-left text-xs"></i>
        </button>
        <h2 className="text-base font-bold text-white">Paramètres</h2>
        <div className="w-9"></div>
      </div>

      {/* Profil sommaire */}
      <div className="bg-slate-800/80 rounded-2xl p-3 flex items-center space-x-3 border border-slate-700/60 shadow-md">
        <img
          alt="Avatar Alex"
          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
          src={user.avatarUrl || HOTLINK_IMAGES.avatar}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white truncate">{user.name} Kouassi</h3>
          <p className="text-xs text-slate-400 truncate">{user.email}</p>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
            {user.rank} • {user.points} Pts
          </span>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="text-xs text-emerald-400 hover:underline p-1 cursor-pointer"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>

      {/* Liste des Options Paramètres */}
      <div className="space-y-2 text-xs">
        {/* Item 1 - Modifier Profil */}
        <div
          onClick={() => setShowEditModal(true)}
          className="bg-slate-800/60 hover:bg-slate-800 rounded-2xl p-3.5 flex items-center justify-between border border-slate-700/50 cursor-pointer transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <i className="fa-solid fa-user"></i>
            </span>
            <span className="font-medium text-slate-200">Modifier le profil</span>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-500 text-[10px]"></i>
        </div>

        {/* Item 2 - Ajouter un commerce */}
        <div
          onClick={() => setShowAddSpotModal(true)}
          className="bg-slate-800/60 hover:bg-slate-800 rounded-2xl p-3.5 flex items-center justify-between border border-slate-700/50 cursor-pointer transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <i className="fa-solid fa-store"></i>
            </span>
            <span className="font-medium text-slate-200">Ajouter un commerce / point de collecte</span>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-500 text-[10px]"></i>
        </div>

        {/* Item 3 - FAQ & Onboarding */}
        <div
          onClick={() => onNavigate('screen-onboard1')}
          className="bg-slate-800/60 hover:bg-slate-800 rounded-2xl p-3.5 flex items-center justify-between border border-slate-700/50 cursor-pointer transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <i className="fa-solid fa-circle-question"></i>
            </span>
            <span className="font-medium text-slate-200">Foire aux questions & Onboarding</span>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-500 text-[10px]"></i>
        </div>

        {/* Item 4 - Centre d'aide */}
        <div
          onClick={() => onNavigate('screen-chat')}
          className="bg-slate-800/60 hover:bg-slate-800 rounded-2xl p-3.5 flex items-center justify-between border border-slate-700/50 cursor-pointer transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <i className="fa-solid fa-headset"></i>
            </span>
            <span className="font-medium text-slate-200">Centre d'aide & Support</span>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-500 text-[10px]"></i>
        </div>

        {/* Item 5 - Confidentialité */}
        <div
          onClick={() => alert("Vos données personnelles sont protégées sous la réglementation ivoirienne de protection des données (ARTCI).")}
          className="bg-slate-800/60 hover:bg-slate-800 rounded-2xl p-3.5 flex items-center justify-between border border-slate-700/50 cursor-pointer transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <i className="fa-solid fa-lock"></i>
            </span>
            <span className="font-medium text-slate-200">Confidentialité & Sécurité</span>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-500 text-[10px]"></i>
        </div>

        {/* Item 6 - Déconnexion */}
        <div
          onClick={() => {
            alert('Session déconnectée avec succès.');
            onNavigate('screen-onboard1');
          }}
          className="bg-rose-500/10 hover:bg-rose-500/20 rounded-2xl p-3.5 flex items-center justify-between border border-rose-500/30 cursor-pointer transition-colors active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
            <span className="font-bold text-rose-400">Déconnexion</span>
          </div>
          <i className="fa-solid fa-chevron-right text-rose-400 text-[10px]"></i>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-500 pt-2 font-mono">
        Éco Pavé Côte d'Ivoire • Version 2.2.0.1
      </div>

      {/* Modal Modification Profil */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-xs w-full shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-3">Modifier le profil</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Prénom</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Commune</label>
                <select
                  value={editCommune}
                  onChange={(e) => setEditCommune(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Cocody">Cocody</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Riviera">Riviera</option>
                  <option value="Marcory">Marcory</option>
                  <option value="Yopougon">Yopougon</option>
                  <option value="Treichville">Treichville</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-slate-800 text-slate-300 py-2 rounded-xl text-xs hover:bg-slate-700 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 text-slate-950 font-bold py-2 rounded-xl text-xs hover:bg-emerald-600"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ajouter un point */}
      {showAddSpotModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-xs w-full shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-2">Proposer un point de collecte</h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Faites certifier votre commerce de proximité pour devenir point partenaire Éco Pavé.
            </p>
            <form onSubmit={handleAddSpot} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Nom du commerce</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Superette Cocody Riviera"
                  value={spotName}
                  onChange={(e) => setSpotName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Commune</label>
                <select
                  value={spotCommune}
                  onChange={(e) => setSpotCommune(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Cocody">Cocody</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Riviera">Riviera</option>
                  <option value="Marcory">Marcory</option>
                  <option value="Yopougon">Yopougon</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSpotModal(false)}
                  className="flex-1 bg-slate-800 text-slate-300 py-2 rounded-xl text-xs hover:bg-slate-700 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 text-slate-950 font-bold py-2 rounded-xl text-xs hover:bg-emerald-600"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
