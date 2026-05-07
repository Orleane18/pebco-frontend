import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/api/chatbot";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis l'assistant PEBCO Bethesda. Comment puis-je vous aider ? 😊",
    },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg    = { role: "user", content: text };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(API_URL, {
        message: text,
        history: newHistory.slice(1), // sans le message d'accueil
      });
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erreur de connexion. Réessayez." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = ["Conditions d'éligibilité", "Taux d'intérêt", "Comment rembourser ?"];

  return (
    <div style={s.wrapper}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.avatar}>PB</div>
        <div>
          <div style={s.hName}>Assistant PEBCO Bethesda</div>
          <div style={s.hStatus}><span style={s.dot}/>En ligne</div>
        </div>
      </div>

      {/* Messages */}
      <div style={s.body}>
        {messages.map((msg, i) => (
          <div key={i} style={{ ...s.row, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ ...s.bubble, ...(msg.role === "user" ? s.bUser : s.bBot) }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ ...s.row, justifyContent: "flex-start" }}>
            <div style={{ ...s.bubble, ...s.bBot }}>
              <span style={s.dot2}/><span style={{ ...s.dot2, animationDelay: ".2s" }}/><span style={{ ...s.dot2, animationDelay: ".4s" }}/>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div style={s.chips}>
        {suggestions.map((q) => (
          <button key={q} style={s.chip} onClick={() => setInput(q)}>{q}</button>
        ))}
      </div>

      {/* Input */}
      <div style={s.footer}>
        <textarea
          rows={1}
          style={s.input}
          placeholder="Posez votre question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button style={{ ...s.send, opacity: loading || !input.trim() ? 0.5 : 1 }}
          onClick={sendMessage} disabled={loading || !input.trim()}>➤</button>
      </div>
    </div>
  );
}

const s = {
  wrapper: { display:"flex", flexDirection:"column", width:"100%", maxWidth:420, height:540, border:"1px solid #e2e8f0", borderRadius:16, overflow:"hidden", fontFamily:"sans-serif", background:"#fff", boxShadow:"0 4px 24px rgba(0,0,0,.08)" },
  header:  { display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:"#1B3A6B", color:"#fff" },
  avatar:  { width:38, height:38, borderRadius:"50%", background:"#2563EB", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:13 },
  hName:   { fontWeight:600, fontSize:14 },
  hStatus: { fontSize:11, opacity:.85, display:"flex", alignItems:"center", gap:4 },
  dot:     { width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block" },
  body:    { flex:1, overflowY:"auto", padding:"14px 12px", background:"#f8fafc", display:"flex", flexDirection:"column", gap:8 },
  row:     { display:"flex" },
  bubble:  { maxWidth:"78%", padding:"9px 13px", borderRadius:14, fontSize:13, lineHeight:1.55 },
  bUser:   { background:"#1B3A6B", color:"#fff", borderBottomRightRadius:4 },
  bBot:    { background:"#fff", color:"#1e293b", border:"1px solid #e2e8f0", borderBottomLeftRadius:4, display:"flex", gap:4, alignItems:"center" },
  dot2:    { width:7, height:7, borderRadius:"50%", background:"#94a3b8", display:"inline-block", animation:"bounce 1.2s infinite" },
  chips:   { display:"flex", gap:6, padding:"6px 12px", flexWrap:"wrap", borderTop:"1px solid #f1f5f9" },
  chip:    { background:"#eff6ff", color:"#1849a9", border:"1px solid #bfdbfe", borderRadius:20, padding:"3px 10px", fontSize:11, cursor:"pointer" },
  footer:  { display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderTop:"1px solid #e2e8f0" },
  input:   { flex:1, border:"1px solid #e2e8f0", borderRadius:10, padding:"8px 12px", fontSize:13, resize:"none", outline:"none", fontFamily:"sans-serif" },
  send:    { background:"#1B3A6B", color:"#fff", border:"none", borderRadius:10, width:38, height:38, cursor:"pointer", fontSize:15 },
};