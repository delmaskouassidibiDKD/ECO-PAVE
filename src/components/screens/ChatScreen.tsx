import React, { useState, useRef, useEffect } from 'react';
import { ScreenId, ChatMessage } from '../../types';
import { INITIAL_CHAT, HOTLINK_IMAGES } from '../../data/mockData';

interface ChatScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Alex',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Auto smart response from Amanda Carol
    setTimeout(() => {
      let botResponse = "Merci pour votre message ! Notre équipe Éco Pavé vous accompagne dans la valorisation de vos plastiques à Abidjan.";
      const lower = text.toLowerCase();

      if (lower.includes('point') || lower.includes('calcul')) {
        botResponse = "Le barème est simple : 25 points par kg de bouteilles PET, 40 points pour les bouchons, et 50 points bonus lors des signalements dans votre quartier ! 🌟";
      } else if (lower.includes('borne') || lower.includes('cocody') || lower.includes('plateau') || lower.includes('où')) {
        botResponse = "Nous avons 4 bornes RVM actives : Cocody Centre (350m), Plateau Commerce (1.2km), Riviera 3 Golf (2.4km) et Yopougon Keneya (4.8km). Elles sont toutes ouvertes aujourd'hui ! 📍";
      } else if (lower.includes('échange') || lower.includes('cadeau') || lower.includes('boutique') || lower.includes('argent')) {
        botResponse = "Vos éco-points peuvent être convertis dans l'onglet Boutique en bons d'achat, bocaux réutilisables ou remises partenaires chez nos commerçants affiliés ! 🎁";
      } else if (lower.includes('merci') || lower.includes('bonjour')) {
        botResponse = "Avec grand plaisir ! Ensemble, faisons d'Abidjan la capitale la plus propre et durable d'Afrique de l'Ouest. 🇨🇮🌿";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'Amanda',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-5rem)] select-none">
      {/* Header Chat */}
      <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between text-white shrink-0 shadow-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('screen-home')}
            aria-label="Retour accueil"
            className="text-white hover:text-emerald-200 cursor-pointer"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <div className="relative">
            <img
              alt="Support Amanda"
              className="w-9 h-9 rounded-full object-cover border-2 border-white"
              src={HOTLINK_IMAGES.avatar}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 rounded-full border border-white"></span>
          </div>
          <div>
            <h3 className="text-xs font-bold leading-none">AMANDA CAROL</h3>
            <span className="text-[10px] text-emerald-100">Support Éco Pavé • En ligne</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <button
            onClick={() => alert('Support ajouté aux favoris !')}
            className="hover:text-emerald-200 cursor-pointer"
            title="Favori"
          >
            <i className="fa-regular fa-star"></i>
          </button>
          <button
            onClick={() => onNavigate('screen-settings')}
            className="hover:text-emerald-200 cursor-pointer"
            title="Options"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>

      {/* Corps du Chat (Messages défilants) */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3 bg-[#0a0f1d]">
        <div className="text-center my-1">
          <span className="text-[10px] bg-slate-800/80 text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-slate-700/50">
            Aujourd'hui
          </span>
        </div>

        {messages.map((msg) => {
          if (msg.isUser) {
            return (
              <div key={msg.id} className="flex items-start justify-end space-x-2 ml-auto max-w-[85%]">
                <div className="bg-emerald-600 text-white text-xs p-3 rounded-2xl rounded-tr-none shadow-sm">
                  <p className="leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-end space-x-1 text-[9px] text-emerald-200 mt-1">
                    <span>{msg.time}</span>
                    <i className="fa-solid fa-check-double text-[8px]"></i>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="flex items-start space-x-2 max-w-[85%]">
              <img
                alt="Avatar Support"
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-1 border border-emerald-500/50"
                src={HOTLINK_IMAGES.avatar}
              />
              <div className="bg-slate-800 text-slate-200 text-xs p-3 rounded-2xl rounded-tl-none border border-slate-700/60 shadow-sm">
                <p className="leading-relaxed">{msg.text}</p>
                <span className="text-[9px] text-slate-400 block text-right mt-1">{msg.time}</span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 italic pl-9">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-200"></span>
            <span className="text-[11px] ml-1">Amanda est en train d'écrire...</span>
          </div>
        )}
      </div>

      {/* Questions rapides */}
      <div className="p-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => handleSendMessage('Où sont les bornes les plus proches ?')}
          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-full px-2.5 py-1 whitespace-nowrap cursor-pointer transition-colors"
        >
          📍 Où sont les bornes ?
        </button>
        <button
          onClick={() => handleSendMessage('Comment sont calculés les points ?')}
          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-full px-2.5 py-1 whitespace-nowrap cursor-pointer transition-colors"
        >
          ⭐ Calcul des points
        </button>
        <button
          onClick={() => handleSendMessage('Comment échanger mes points ?')}
          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-full px-2.5 py-1 whitespace-nowrap cursor-pointer transition-colors"
        >
          🎁 Échanger points
        </button>
      </div>

      {/* Barre de saisie Message */}
      <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
        <button
          type="button"
          onClick={() => handleSendMessage("Voici une photo de mes bouteilles triées pour vérification")}
          className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="Joindre fichier"
        >
          <i className="fa-solid fa-paperclip"></i>
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          className="flex-1 bg-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-500"
          placeholder="Écrivez votre message..."
        />
        <button
          type="button"
          onClick={() => handleSendMessage()}
          className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center justify-center text-xs shadow-md transition-colors cursor-pointer"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};
