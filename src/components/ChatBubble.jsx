import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, ChevronDown, Loader2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatService } from '../services/chatService';
import { leadService } from '../services/leadService';

// Format message text — bold **text**, newlines, lists
const FormatText = ({ text }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <span className="leading-relaxed">
      {lines.map((line, i) => {
        // Bold **text**
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((part, j) =>
              j % 2 === 1
                ? <strong key={j} className="font-black">{part}</strong>
                : <span key={j}>{part}</span>
            )}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
};

const ChatContactModal = ({ isOpen, onClose, onSuccess, sessionId }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      await leadService.submitLead({
        ...form,
        description: 'Lead collected via ChatBubble Pop-up Form.',
        source: 'Dex AI Agent (Pop-up Form)'
      });
      setSubmitted(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0a051d]/60 backdrop-blur-md z-[100000] flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-md bg-white rounded-3xl p-8 shadow-3xl border border-gray-100/50 flex flex-col gap-5 relative overflow-hidden"
          >
            {/* Background design accents */}
            <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#6a35ff]/5 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-[#00c2cb]/5 pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-gray-900 font-black text-lg tracking-tight">Contact Details</h3>
                <p className="text-[10px] text-[#6a35ff] font-extrabold uppercase tracking-widest mt-0.5">Let's secure your proposal</p>
              </div>
              {!submitted && (
                <button onClick={onClose} className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all">
                  <X size={16} />
                </button>
              )}
            </div>

            {submitted ? (
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="py-12 flex flex-col items-center justify-center gap-4 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 font-black text-2xl">✓</div>
                <div>
                  <h4 className="text-gray-900 font-black text-base">Details Submitted!</h4>
                  <p className="text-xs text-gray-400 font-semibold mt-1">Our team will reach out shortly.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Name</label>
                  <input type="text" placeholder="e.g. John Doe" required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#6a35ff] text-gray-900 font-semibold transition-all focus:bg-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                  <input type="email" placeholder="e.g. john@example.com" required value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#6a35ff] text-gray-900 font-semibold transition-all focus:bg-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone (Optional)</label>
                  <input type="tel" placeholder="e.g. +92 300 1234567" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-[#6a35ff] text-gray-900 font-semibold transition-all focus:bg-white" />
                </div>
                <button type="submit" disabled={loading} className="mt-2 py-3.5 bg-gradient-to-r from-[#6a35ff] to-[#8b5cf6] hover:shadow-lg hover:shadow-purple-500/20 text-white rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer">
                  {loading ? <Loader2 size={14} className="animate-spin" /> : 'Submit Details'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="flex items-center gap-1 px-5 py-4 bg-white rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#6a35ff]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const prevMsgCount = useRef(0);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    if (isOpen && !sessionId) {
      chatService.startSession().then(id => setSessionId(id));
      setHasUnread(false);
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (sessionId) {
      const unsubscribe = chatService.subscribeToMessages(sessionId, (msgs) => {
        const prevCount = prevMsgCount.current;

        if (msgs.length > prevCount) {
          const latest = msgs[msgs.length - 1];
          if (latest.sender === 'visitor') {
            setIsTyping(true);
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            typingTimerRef.current = setTimeout(() => setIsTyping(false), 15000);
          } else {
            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
            setIsTyping(false);
          }
          if (!isOpen && latest.sender !== 'visitor') {
            setHasUnread(true);
          }
          // Automatically trigger the popup if the bot demands it
          if (latest.sender === 'agent' && latest.text.includes('[SHOW_FORM]')) {
            setTimeout(() => {
              setShowModalForm(true);
            }, 800);
          }
        }

        prevMsgCount.current = msgs.length;
        setMessages(msgs);
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
      });
      return () => {
        unsubscribe();
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      };
    }
  }, [sessionId, isOpen]);

  // When agent replies, stop typing
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender !== 'visitor') {
      setIsTyping(false);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleNewChat = async () => {
    localStorage.removeItem('devlyx_chat_session');
    setSessionId(null);
    setMessages([]);
    setShowModalForm(false);
    setIsTyping(false);
    prevMsgCount.current = 0;
    const id = await chatService.startSession();
    setSessionId(id);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text || !sessionId) return;
    setInputText('');
    setIsTyping(true);
    await chatService.sendMessage(sessionId, text, 'visitor');
  };

  const quickReplies = ['Services & Pricing', 'Start a Project', 'View Portfolio'];

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}>
      {/* Centered Premium Modal Pop-up (Moved to root to break out of Framer Motion transforms) */}
      <ChatContactModal 
        isOpen={showModalForm} 
        onClose={() => setShowModalForm(false)} 
        sessionId={sessionId}
        onSuccess={() => chatService.sendMessage(sessionId, "[LEAD_COLLECTED]", 'visitor')} 
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="absolute bottom-20 right-0 w-[380px] flex flex-col overflow-hidden"
            style={{
              height: '510px',
              maxHeight: 'calc(100vh - 110px)',
              borderRadius: '24px',
              boxShadow: '0 24px 80px rgba(10, 5, 30, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)',
              background: 'rgba(11, 7, 30, 0.93)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-6 py-5 flex-shrink-0 border-b border-white/5 relative"
              style={{ background: 'linear-gradient(135deg, rgba(20, 10, 50, 0.6) 0%, rgba(10, 5, 30, 0.8) 100%)' }}
            >
              {/* Pulsating background accent glow */}
              <div className="absolute top-0 left-1/4 w-32 h-10 bg-purple-500/10 blur-xl pointer-events-none rounded-full" />
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)' }}
                  >
                    {/* Inner glossy reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    <Bot size={22} className="relative z-10" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0b071e] animate-pulse" />
                </div>
                <div>
                  <div className="text-white font-black text-[15px] tracking-tight flex items-center gap-1.5">
                    Dex 
                    <span className="text-[8px] bg-purple-500/20 text-purple-300 font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">AI Agent</span>
                  </div>
                  <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                    Devlyx Solutions
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <button
                  onClick={handleNewChat}
                  title="Start New Chat"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent transition-all duration-200"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent transition-all duration-200"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin scrollbar-thumb-white/5" style={{ background: 'rgba(7, 3, 20, 0.4)' }}>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-4 pb-10"
                >
                  <div
                    className="w-16 h-16 rounded-3xl flex items-center justify-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(6, 182, 212, 0.15))' }}
                  >
                    <div className="absolute inset-0 bg-purple-500/5 blur-lg" />
                    <Sparkles size={28} className="text-purple-400 relative z-10" />
                  </div>
                  <div>
                    <p className="text-white font-black text-base tracking-tight">Chat with Dex</p>
                    <p className="text-white/40 text-xs font-semibold mt-1">Devlyx's elite project consultant</p>
                  </div>
                </motion.div>
              )}

              {messages.map((msg, i) => {
                const isVisitor = msg.sender === 'visitor';
                const isAgent = msg.sender === 'agent' || msg.sender === 'admin';
                const showAvatar = isAgent && (i === 0 || messages[i - 1]?.sender !== msg.sender);

                return (
                  <motion.div
                    key={msg.id || i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${isVisitor ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Agent Avatar */}
                    {isAgent && (
                      <div className="flex-shrink-0 mt-auto">
                        {showAvatar ? (
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white relative overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)' }}
                          >
                            <Bot size={13} className="relative z-10" />
                          </div>
                        ) : (
                          <div className="w-8" />
                        )}
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed relative ${
                        isVisitor
                           ? 'text-white rounded-2xl rounded-br-sm font-semibold'
                           : 'text-white/90 rounded-2xl rounded-bl-sm border border-white/5 bg-white/5 backdrop-blur-md shadow-sm font-medium'
                      }`}
                      style={isVisitor ? {
                        background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                        boxShadow: '0 8px 24px rgba(168, 85, 247, 0.3)'
                      } : {}}
                    >
                      <FormatText text={msg.text.replace(/\[SHOW_FORM\]|\[Contact Form\]\(\/contact\)/g, '')} />
                      {msg.text.includes('[SHOW_FORM]') && (
                        <button 
                          onClick={() => setShowModalForm(true)}
                          className="mt-3.5 w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 border border-white/10 active:scale-95 cursor-pointer"
                        >
                          📝 Fill Contact Details
                        </button>
                      )}
                      {msg.sender === 'admin' && (
                        <div className="text-[9px] font-black uppercase tracking-widest mt-1.5 text-purple-300 opacity-80">
                          Human Agent
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {isTyping && <TypingIndicator />}
              <div ref={scrollRef} />
            </div>

            {/* ── Quick Replies ── */}
            {messages.length <= 1 && (
              <div className="px-5 pb-3 flex gap-2 flex-wrap" style={{ background: 'rgba(7, 3, 20, 0.4)' }}>
                {quickReplies.map(qr => (
                  <button
                    key={qr}
                    onClick={() => {
                      setInputText(qr);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    className="px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/5 text-purple-300 hover:bg-purple-500 hover:text-white hover:border-purple-400 transition-all duration-200"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ── */}
            <form
              onSubmit={handleSend}
              className="px-5 py-4 flex-shrink-0 border-t border-white/5"
              style={{ background: 'linear-gradient(180deg, rgba(11, 7, 30, 0.6) 0%, rgba(7, 3, 20, 0.9) 100%)' }}
            >
              <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4 py-2 border border-white/5 focus-within:border-purple-500/50 focus-within:bg-white/10 transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm font-semibold text-white placeholder:text-white/30 focus:outline-none py-2"
                />
                <motion.button
                  type="submit"
                  disabled={!inputText.trim()}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 disabled:opacity-20 transition-all duration-200 cursor-pointer"
                  style={{ background: inputText.trim() ? 'linear-gradient(135deg, #a855f7, #6366f1)' : 'rgba(255,255,255,0.05)' }}
                >
                  <Send size={15} className={inputText.trim() ? 'text-white' : 'text-white/35'} />
                </motion.button>
              </div>
              <p className="text-center text-[8px] text-white/20 font-black uppercase tracking-widest mt-2.5">
                Powered by Devlyx AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger Button ── */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setHasUnread(false); }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white relative overflow-hidden group shadow-2xl transition-colors duration-300"
        style={{
          background: isOpen
            ? '#0b071e'
            : 'linear-gradient(135deg, #6a35ff 0%, #8b5cf6 100%)',
          boxShadow: isOpen
            ? '0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 12px 40px rgba(106, 53, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: isOpen ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Subtle premium hover overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="relative z-10">
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative z-10">
              <MessageCircle size={26} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white text-[9px] text-white font-black flex items-center justify-center z-20"
          >
            1
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBubble;
