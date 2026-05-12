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

    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setMessages(prev => [...prev, { sender: "bot", text: "...", isTyping: true }]);

    try {
      const history = messages
        .filter(m => !m.isTyping)
        .slice(1)
        .map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const { data } = await axios.post("http://localhost:3001/api/chatbot", {
        message: userText,
        history,
      });

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
      
      {/* BANNIÈRE PAGE FAQ - sans trait noir */}
<section className="relative py-32 md:py-40 overflow-hidden border-0 shadow-none">
  <div className="absolute inset-0" style={{ backgroundImage: `url('/images/photo50.jpg')`, backgroundSize: 'cover'}} />
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Assistance</span>
      <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
        Centre d'<span className="font-semibold text-blue-400">Aide.</span>
      </h1>
      <p className="text-slate-300 max-w-md font-light text-sm">
        Une question ? Trouvez vos réponses instantanément ou échangez avec notre équipe dédiée.
      </p>
    </motion.div>
  </div>

  {/* Vague : la couleur doit correspondre au fond de la page en dessous */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full h-auto" style={{ display: 'block' }}>
      <path fill="#F8FAFC" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
    </svg>
  </div>
</section>

      {/* Contenu principal - plus de margin-top négatif, espacement réduit */}
      <div className="max-w-4xl mx-auto px-6 mt-8 relative z-20 border-0">
        
        {/* FAQ ACCORDION (tailles réduites) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-10"
        >
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <QuestionMarkCircleIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Questions Fréquentes</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {faqData.map((item, idx) => (
              <div key={idx} className="group transition-all">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                >
                  <span className={`text-sm font-semibold transition-colors duration-300 ${openIndex === idx ? 'text-blue-600' : 'text-slate-700'}`}>
                    {item.question}
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-0 text-[13px] leading-relaxed text-slate-500">
                        <div className="pl-4 border-l-2 border-blue-100">
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

        {/* SUPPORT CARDS (réduites) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <PhoneIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Téléphone</h3>
              <p className="text-blue-600 font-semibold text-sm">+229 95 05 05 05</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">Lun - Ven : 08h00 - 18h00</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <EnvelopeIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Email</h3>
              <p className="text-blue-600 font-semibold text-sm">support@pebco-finance.com</p>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">Réponse sous 24h ouvrées</p>
            </div>
          </div>
        </div>
      </div>

      {/* CHATBOT WIDGET - descendu (bottom-16) */}
      <div className="fixed bottom-16 right-8 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-80 sm:w-[340px] overflow-hidden border border-slate-100 mb-4"
            >
              <div className="bg-slate-800 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-semibold text-xs tracking-tight">Assistant Pebco</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-300 hover:text-white transition-colors">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="h-[320px] overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-slate-700 text-white rounded-xl rounded-br-none shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-xl rounded-bl-none shadow-sm'
                    }`}>
                      {msg.isTyping ? (
                        <span className="flex gap-1 items-center py-0.5">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Écrivez votre message..."
                  className="flex-1 bg-slate-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 transition"
                />
                <button onClick={sendMessage} className="bg-slate-700 text-white rounded-lg px-3 py-2 hover:bg-slate-600 transition shadow">
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-slate-800 text-white rounded-full p-4 shadow-xl hover:bg-slate-700 transition-all duration-300 transform active:scale-95 group"
        >
          {isChatOpen ? <XMarkIcon className="w-6 h-6" /> : <ChatBubbleLeftRightIcon className="w-6 h-6" />}
          {!isChatOpen && (
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-slate-800 px-2.5 py-1.5 rounded-lg text-[10px] font-bold shadow-md border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Besoin d'aide ?
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FaqPage;