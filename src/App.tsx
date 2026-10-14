/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, UserStats, MarketItem } from './types';
import { INITIAL_USER } from './data/mockData';
import { HomeScreen } from './components/screens/HomeScreen';
import { MapScreen } from './components/screens/MapScreen';
import { ReportScreen } from './components/screens/ReportScreen';
import { MarketScreen } from './components/screens/MarketScreen';
import { WasteDetailScreen } from './components/screens/WasteDetailScreen';
import { ProductDetailScreen } from './components/screens/ProductDetailScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { OnboardingScreen1 } from './components/screens/OnboardingScreen1';
import { OnboardingScreen2 } from './components/screens/OnboardingScreen2';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('screen-home');
  const [user, setUser] = useState<UserStats>(INITIAL_USER);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleReportSubmit = (category: string, volume: string, pointsAwarded: number, kgEstimate: number) => {
    setUser((prev) => {
      const newPoints = prev.points + pointsAwarded;
      const newKg = prev.kgRecycled + kgEstimate;
      const newToday = prev.todayPoints + pointsAwarded;
      const newProgress = Math.min(100, Math.round((newPoints / 250) * 100));
      return {
        ...prev,
        points: newPoints,
        kgRecycled: newKg,
        todayPoints: newToday,
        rankProgressPercent: newProgress,
      };
    });
    showToast(`🎉 Signalement validé ! +${pointsAwarded} points (${kgEstimate} kg estimés)`);
  };

  const handleRedeemReward = (item: MarketItem) => {
    showToast(`🎁 Récompense "${item.name}" sélectionnée !`);
  };

  const handleUpdateUser = (updated: Partial<UserStats>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast('Profil mis à jour avec succès.');
  };

  const isOnboarding = currentScreen === 'screen-onboard1' || currentScreen === 'screen-onboard2';

  // Correspondance onglet actif du bas
  const isTabActive = (tab: 'home' | 'map' | 'report' | 'market' | 'settings') => {
    if (tab === 'home' && currentScreen === 'screen-home') return true;
    if (tab === 'map' && currentScreen === 'screen-map') return true;
    if (tab === 'report' && currentScreen === 'screen-report') return true;
    if (
      tab === 'market' &&
      (currentScreen === 'screen-market' ||
        currentScreen === 'screen-waste-detail' ||
        currentScreen === 'screen-product-detail')
    ) {
      return true;
    }
    if (tab === 'settings' && currentScreen === 'screen-settings') return true;
    return false;
  };

  return (
    <div className="bg-[#0c1322] text-slate-100 min-h-screen flex flex-col font-sans select-none overflow-x-hidden relative">
      {/* Toast Notification Flottante */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-2xl font-bold text-xs flex items-center space-x-2 border border-emerald-300 animate-in fade-in slide-in-from-top-4 duration-300 whitespace-nowrap">
          <i className="fa-solid fa-circle-check text-sm"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==============================================================
          CORPS PRINCIPAL DE L'APPLICATION (SANS AUCUN CADRE TÉLÉPHONE)
          ============================================================== */}
      <main className="w-full max-w-xl mx-auto flex-1 flex flex-col relative min-h-screen bg-[#0c1322]">
        {/* Zone de contenu des écrans */}
        <div className="flex-1 w-full relative">
          {currentScreen === 'screen-home' && (
            <HomeScreen user={user} onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'screen-map' && (
            <MapScreen onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'screen-report' && (
            <ReportScreen
              onNavigate={setCurrentScreen}
              onSubmitReport={handleReportSubmit}
            />
          )}

          {currentScreen === 'screen-market' && (
            <MarketScreen
              user={user}
              onNavigate={setCurrentScreen}
              onRedeemReward={handleRedeemReward}
            />
          )}

          {currentScreen === 'screen-waste-detail' && (
            <WasteDetailScreen onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'screen-product-detail' && (
            <ProductDetailScreen onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'screen-chat' && (
            <ChatScreen onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'screen-settings' && (
            <SettingsScreen
              user={user}
              onNavigate={setCurrentScreen}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {currentScreen === 'screen-onboard1' && (
            <OnboardingScreen1 onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'screen-onboard2' && (
            <OnboardingScreen2 onNavigate={setCurrentScreen} />
          )}
        </div>
      </main>

      {/* ==============================================================
          BARRE DE NAVIGATION INFÉRIEURE PERSISTANTE (5 Onglets)
          Ancrée directement en bas de l'application
          ============================================================== */}
      {!isOnboarding && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <nav
            aria-label="Navigation principale"
            className="w-full max-w-xl h-20 bg-[#0c1322]/95 border-t border-slate-800/80 backdrop-blur-lg flex items-center justify-around px-2 pointer-events-auto shadow-2xl"
          >
            {/* 1. Accueil */}
            <button
              onClick={() => setCurrentScreen('screen-home')}
              className={`flex flex-col items-center justify-center w-14 transition-colors cursor-pointer ${
                isTabActive('home') ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <i className="fa-solid fa-house text-lg mb-1"></i>
              <span className="text-[10px]">Accueil</span>
            </button>

            {/* 2. Carte */}
            <button
              onClick={() => setCurrentScreen('screen-map')}
              className={`flex flex-col items-center justify-center w-14 transition-colors cursor-pointer ${
                isTabActive('map') ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <i className="fa-solid fa-map-location-dot text-lg mb-1"></i>
              <span className="text-[10px]">Carte</span>
            </button>

            {/* 3. Bouton Central Flottant BLANC avec Symbole Vert (Signaler) */}
            <button
              onClick={() => setCurrentScreen('screen-report')}
              aria-label="Scanner ou signaler un déchet"
              className="relative -top-2 flex flex-col items-center justify-center w-14 cursor-pointer group"
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full bg-white text-emerald-600 shadow-xl border-4 border-[#0c1322] group-hover:scale-105 group-active:scale-95 transition-transform ${
                  isTabActive('report') ? 'ring-2 ring-emerald-400' : ''
                }`}
              >
                <i className="fa-solid fa-recycle text-xl"></i>
              </div>
              <span
                className={`text-[10px] mt-1 transition-colors ${
                  isTabActive('report')
                    ? 'text-emerald-400 font-bold'
                    : 'text-slate-400 group-hover:text-emerald-400'
                }`}
              >
                Signaler
              </span>
            </button>

            {/* 4. Marketplace / Boutique */}
            <button
              onClick={() => setCurrentScreen('screen-market')}
              className={`flex flex-col items-center justify-center w-14 transition-colors cursor-pointer ${
                isTabActive('market') ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <i className="fa-solid fa-store text-lg mb-1"></i>
              <span className="text-[10px]">Boutique</span>
            </button>

            {/* 5. Réglages */}
            <button
              onClick={() => setCurrentScreen('screen-settings')}
              className={`flex flex-col items-center justify-center w-14 transition-colors cursor-pointer ${
                isTabActive('settings') ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <i className="fa-solid fa-gear text-lg mb-1"></i>
              <span className="text-[10px]">Réglages</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
