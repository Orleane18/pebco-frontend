import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Chatbot from "../components/Chatbot";
import { 
  ChevronDownIcon, 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

// Données FAQ (inchangées)
const faqData = [
  {
    question: "Quels documents dois-je fournir pour une demande de crédit ?",
    answer: "Pièce d'identité (CNI, passeport), justificatif de revenus (3 dernières payes, relevé bancaire, attestation de revenus), justificatif de domicile (facture d'électricité, eau), et selon le type de crédit : garantie, apport, etc."
  },
  {
    question: "Comment se déroule l'instruction de ma demande ?",
    answer: "Notre équipe vérifie vos documents (24h à 48h), procède à une analyse de votre capacité de remboursement, puis vous recevez une réponse par email et SMS. Le décaissement se fait sous 24h après acceptation."
  },
  {
    question: "Que faire en cas de retard de remboursement ?",
    answer: "Contactez immédiatement notre service client. Nous pouvons étudier un rééchelonnement ou un report d'échéance. Évitez les incidents de paiement qui impactent votre score."
  },
  {
    question: "Quels sont les taux d'intérêt appliqués ?",
    answer: "Nos TAEG commencent à 4,8% pour le crédit immobilier et vont jusqu'à 6% pour le crédit mutuel. Le taux exact dépend de votre profil et de la durée."
  }
];


const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour ! Je suis l'assistant Pebco. Comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

 const sendMessage = async () => {
  if (!inputMessage.trim()) return;
  
  const userText = inputMessage.trim();
  setInputMessage("");

  // Ajout du message utilisateur
  setMessages(prev => [...prev, { sender: "user", text: userText }]);

  // Indicateur "en train d'écrire..."
  setMessages(prev => [...prev, { sender: "bot", text: "...", isTyping: true }]);

  try {
    // Historique formaté pour l'API (sans le message d'accueil initial)
    const history = messages
      .filter(m => !m.isTyping)
      .slice(1) // retire le message d'accueil
      .map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

    const { data } = await axios.post("http://localhost:3001/api/chatbot", {
      message: userText,
      history,
    });

    // Remplace le "..." par la vraie réponse
    setMessages(prev => [
      ...prev.filter(m => !m.isTyping),
      { sender: "bot", text: data.reply }
    ]);

  } catch (error) {
    setMessages(prev => [
      ...prev.filter(m => !m.isTyping),
      { sender: "bot", text: "Je suis momentanément indisponible. Appelez-nous au +229 95 05 05 05." }
    ]);
  }
};

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
      
      {/* HEADER SECTION */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('/images/photo11.jpg')`, backgroundSize: 'cover' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Assistance</span>
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Centre d'<span className="font-semibold text-blue-500">Aide.</span>
            </h1>
            <p className="text-slate-400 max-w-md font-light text-sm">
              Une question ? Trouvez vos réponses instantanément ou échangez avec notre équipe dédiée.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* FAQ ACCORDION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-12"
        >
          <div className="p-8 border-b border-slate-50 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <QuestionMarkCircleIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Questions Fréquentes</h2>
          </div>

          <div className="divide-y divide-slate-50">
            {faqData.map((item, idx) => (
              <div key={idx} className="group transition-all">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex justify-between items-center w-full px-8 py-6 text-left focus:outline-none"
                >
                  <span className={`text-[15px] font-semibold transition-colors duration-300 ${openIndex === idx ? 'text-blue-600' : 'text-slate-700'}`}>
                    {item.question}
                  </span>
                  <ChevronDownIcon className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2 text-[14px] leading-relaxed text-slate-500 font-light">
                        <div className="pl-6 border-l-2 border-blue-100">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SUPPORT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-5">
            <div className="p-3 bg-green-50 rounded-xl">
              <PhoneIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Téléphone</h3>
              <p className="text-blue-600 font-semibold">+229 95 05 05 05</p>
              <p className="text-[11px] text-slate-400 mt-1 font-medium italic">Lun - Ven : 08h00 - 18h00</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-start gap-5">
            <div className="p-3 bg-orange-50 rounded-xl">
              <EnvelopeIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Email</h3>
              <p className="text-blue-600 font-semibold">support@pebco-finance.com</p>
              <p className="text-[11px] text-slate-400 mt-1 font-medium italic">Réponse sous 24h ouvrées</p>
            </div>
          </div>
        </div>
      </div>

      {/* CHATBOT WIDGET */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-[2rem] shadow-2xl w-80 sm:w-[360px] overflow-hidden border border-slate-100 mb-4"
            >
              <div className="bg-slate-900 p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-bold text-sm tracking-tight">Assistant Pebco</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="h-[350px] overflow-y-auto p-6 space-y-4 bg-[#FBFBFD]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-slate-800 text-white rounded-[1.25rem] rounded-tr-none shadow-md' 
                          : 'bg-white border border-slate-300 text-slate-700 rounded-[1.25rem] rounded-tl-none shadow-sm'
                      }`}>
                        {/* Indicateur de frappe ou texte normal */}
                        {msg.isTyping ? (
                          <span className="flex gap-1 items-center py-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                        ) : (
                          msg.text
                        )}
                      </div>
                    </div>
                  ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all font-light"
                />
                <button onClick={sendMessage} className="bg-slate-900 text-white rounded-xl p-3 hover:bg-slate-900 transition shadow-lg shadow-green-600/20">
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-slate-900 text-white rounded-full p-5 shadow-2xl hover:bg-slate-900 transition-all duration-300 transform active:scale-95 group"
        >
          {isChatOpen ? <XMarkIcon className="w-7 h-7" /> : <ChatBubbleLeftRightIcon className="w-7 h-7" />}
          {!isChatOpen && (
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Besoin d'aide ?
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FaqPage;