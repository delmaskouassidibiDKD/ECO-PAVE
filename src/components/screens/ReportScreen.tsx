import React, { useState, useRef } from 'react';
import { ScreenId } from '../../types';
import { HOTLINK_IMAGES } from '../../data/mockData';

interface ReportScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSubmitReport: (category: string, volume: string, pointsAwarded: number, kgEstimate: number) => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({ onNavigate, onSubmitReport }) => {
  const [selectedCategory, setSelectedCategory] = useState('Bouteilles PET');
  const [selectedVolume, setSelectedVolume] = useState<'Petit sac' | 'Moyen tas' | 'Dépôt sauvage'>('Petit sac');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isScanningAi, setIsScanningAi] = useState(false);
  const [aiDetected, setAiDetected] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'Bouteilles PET', icon: '🧴', label: 'Bouteilles PET', code: 'Code 1' },
    { id: 'Sachets d\'eau', icon: '💧', label: "Sachets d'eau", code: 'PEBD' },
    { id: 'Bidons / Flacons', icon: '🛢️', label: 'Bidons / Flacons', code: 'PEHD' },
    { id: 'Emballages divers', icon: '🛍️', label: 'Emballages divers', code: 'PP/Mixte' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      runAiScan();
    }
  };

  const handlePickPreset = (imageUrl: string, cat: string) => {
    setPreviewImage(imageUrl);
    setSelectedCategory(cat);
    runAiScan();
  };

  const runAiScan = () => {
    setIsScanningAi(true);
    setAiDetected(null);
    setTimeout(() => {
      setIsScanningAi(false);
      setAiDetected('Plastique PET Détecté • Conforme 98% (Éco Pavé)');
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const kgMap = {
      'Petit sac': 2.5,
      'Moyen tas': 8.0,
      'Dépôt sauvage': 25.0,
    };
    const pts = 50;
    const kg = kgMap[selectedVolume] || 2.5;

    onSubmitReport(selectedCategory, selectedVolume, pts, kg);
    onNavigate('screen-home');
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-4 space-y-4 pb-28 pt-2">
      {/* En-tête */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate('screen-home')}
          aria-label="Retour accueil"
          className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </button>
        <h2 className="text-base font-bold text-white">Signaler un dépôt</h2>
        <button
          onClick={() => onNavigate('screen-chat')}
          aria-label="Aide et assistance"
          className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-circle-question text-xs"></i>
        </button>
      </div>

      {/* Bannière Campagne Côte d'Ivoire */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 text-white shadow-lg flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-bold">
            🇨🇮 Côte d'Ivoire Propre
          </span>
          <h3 className="text-sm font-bold mt-1">Nettoyons nos communes</h3>
          <p className="text-[11px] text-emerald-100 max-w-[210px] leading-snug mt-0.5">
            Photographiez les déchets plastiques pour guider nos équipes de ramassage.
          </p>
        </div>
        <div className="bg-white text-emerald-800 px-3 py-2 rounded-2xl text-center font-extrabold shadow-md shrink-0 relative z-10">
          <span className="block text-base leading-none font-black">+50</span>
          <span className="text-[9px] uppercase tracking-wider block font-bold text-emerald-900">Points</span>
        </div>
      </div>

      {/* Zone Photo avec Camera Upload & Simulation */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed ${
          previewImage ? 'border-emerald-500' : 'border-emerald-500/50'
        } bg-slate-900/60 rounded-3xl p-5 text-center flex flex-col items-center justify-center relative cursor-pointer hover:border-emerald-400 transition-all group overflow-hidden`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {previewImage ? (
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-2">
            <img
              src={previewImage}
              alt="Déchet photographié"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-xl border border-slate-700 font-medium">
                Changer de photo
              </span>
            </div>
            {isScanningAi && (
              <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs flex flex-col items-center justify-center">
                <i className="fa-solid fa-wand-magic-sparkles text-emerald-400 text-2xl animate-spin mb-1"></i>
                <span className="text-xs font-bold text-white">Analyse IA en cours...</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform flex items-center justify-center text-2xl mb-2">
              <i className="fa-solid fa-camera"></i>
            </div>
            <h4 className="text-xs font-bold text-white">Toucher pour photographier</h4>
            <p className="text-[10px] text-slate-400 mt-1">Ou importer un cliché depuis votre galerie</p>
          </>
        )}

        {aiDetected && (
          <div className="mt-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[11px] font-semibold px-3 py-1 rounded-xl flex items-center space-x-1.5">
            <i className="fa-solid fa-check-circle"></i>
            <span>{aiDetected}</span>
          </div>
        )}

        <div
          className="flex space-x-2 mt-3"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => handlePickPreset(HOTLINK_IMAGES.petBottles, 'Bouteilles PET')}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded-lg text-slate-300 flex items-center space-x-1 transition-colors"
          >
            <i className="fa-solid fa-barcode text-emerald-400"></i>
            <span>Scanner code</span>
          </button>
          <button
            type="button"
            onClick={runAiScan}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded-lg text-slate-300 flex items-center space-x-1 transition-colors"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-emerald-400"></i>
            <span>Détection IA</span>
          </button>
        </div>
      </div>

      {/* Catégorie de plastique */}
      <div>
        <label className="text-xs font-bold text-slate-300 block mb-2">Catégorie de plastique</label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between font-medium transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </div>
                {isSelected && <i className="fa-solid fa-check text-emerald-400 text-xs shrink-0"></i>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Volume approximatif */}
      <div>
        <label className="text-xs font-bold text-slate-300 block mb-2">Volume approximatif</label>
        <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
          {(['Petit sac', 'Moyen tas', 'Dépôt sauvage'] as const).map((vol) => {
            const isSelected = selectedVolume === vol;
            return (
              <button
                type="button"
                key={vol}
                onClick={() => setSelectedVolume(vol)}
                className={`py-2 rounded-xl transition-all cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {vol}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bouton Valider */}
      <button
        onClick={handleSubmit}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3.5 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2 cursor-pointer mt-2"
      >
        <i className="fa-solid fa-paper-plane"></i>
        <span>Envoyer le signalement</span>
      </button>
    </div>
  );
};
