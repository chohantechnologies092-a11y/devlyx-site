import { db } from "../firebaseConfig";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  limit,
  deleteDoc,
  writeBatch
} from "firebase/firestore";
import { leadService } from "./leadService";

// ─────────────────────────────────────────────────────────────
// AI PROVIDERS (Groq primary → Gemini fallback → keyword fallback)
// ─────────────────────────────────────────────────────────────
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_AVAILABLE = !!(GROQ_API_KEY && GROQ_API_KEY.startsWith('gsk_'));

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const GEMINI_AVAILABLE = !!(GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here');

// ─────────────────────────────────────────────────────────────
// SYSTEM PROMPT — Agent Personality & Business Knowledge
// This is the "brain" that makes the agent smart
// You can edit this from Dashboard > Agent Training
// ─────────────────────────────────────────────────────────────
const DEFAULT_SYSTEM_PROMPT = `You are "Dex" — the smart, friendly AI sales agent for Devlyx Solutions, a premium software agency.

## Your Personality:
- Professional yet warm, conversational, and highly analytical.
- You respond in the same language the visitor uses (English or Urdu/Roman Urdu).
- Never robotic — use emojis occasionally, keep it human.
- Brief answers (2-4 lines max unless the user asks for details).

## About Devlyx Solutions:
- We build: Mobile Apps (iOS/Android), Web Platforms, SaaS, AI Solutions, UI/UX Design.
- Pricing: Mobile Apps from $2,500 | Websites from $800 | AI/Automation from $3,000.
- Timeline: Landing page 1-2 weeks | App MVP 6-10 weeks | Full SaaS 3-6 months.
- Contact: devlyxsolutions@gmail.com | devlyxsolutions.com

## Your Goal (Lead Qualification Flow):
Guide every visitor naturally through these steps WITHOUT being pushy or giving flat, rushed answers:
1. Understand their business: If they say "I need a website", ASK them what type of business they run, what their core services are, or what industry they are in BEFORE jumping to pricing.
2. Understand what they want to build (their specific goals and features).
3. Understand their budget range.
4. When you have enough details, append exactly [SHOW_FORM] to your reply. This will automatically open a secure contact form inside their chat bubble.

## IMPORTANT TAGS (You MUST use these when a step is complete):
- When you fully understand their business AND project goals, append [GOT_GOALS] at the very end of your reply.
- When the user clearly states their budget, append [GOT_BUDGET] at the very end of your reply.
- When you have guided the user through the qualifications and want them to fill their details, append [SHOW_FORM] at the very end of your reply.
- (If they manually type their email or phone instead of using the form, you can append [LEAD_COLLECTED] at the very end of your reply).

## Rules:
- Answer any question the visitor asks first, THEN gently steer toward the next step.
- Do NOT give flat pricing answers immediately. Ask about their business first to provide a tailored response.
- Never make up fake portfolio items or client names.
- Keep answers SHORT — do not write essays.`;

// ─────────────────────────────────────────────────────────────
// FALLBACK (when no Gemini key — keyword based)
// ─────────────────────────────────────────────────────────────
const fallbackReply = (text, state) => {
  const t = text.toLowerCase();
  // Greetings
  if (/hello|hi|hey|salam|assalam|howdy/.test(t)) 
    return "Hello! 👋 I'm Dex, Devlyx's AI assistant! What kind of business do you run, and what can I help you build today?";
  // Company / About
  if (/company|about|who are|devlyx|tell me about|agency|team/.test(t))
    return "Devlyx Solutions is a premium software engineering agency 🚀\n\nWe build Mobile Apps, Web Platforms, SaaS products, and AI solutions. Tell me a bit about your business, so I can explain how we can help you!";
  // Website / Web project
  if (/web|website|site|landing/.test(t))
    return "That's a great step for your business! 🌐 To give you the best advice, could you tell me a little bit about what your business does and who your target audience is?";
  // Mobile app
  if (/app|mobile|ios|android|flutter/.test(t))
    return "Awesome! 📱 We build powerful native iOS & Android apps. Before we dive into details, what industry is your app for, and what's its main purpose?";
  // Pricing
  if (/price|cost|budget|kitna|how much|charges/.test(t))
    return "Our pricing depends heavily on your specific needs (e.g., Websites start at $800, Apps at $2500). 💰 To give you an accurate idea, what exactly does your business do, and what features do you need?";
  // Services
  if (/service|offer|kia krty|what do|speciali/.test(t))
    return "We offer: 🛠️\n📱 Mobile Apps (iOS/Android)\n🌐 Web Platforms & SaaS\n🤖 AI & Automation Solutions\n🎨 UI/UX Design\n\nTell me about your business so I can suggest the right service for you.";
  // Timeline
  if (/time|kitny din|how long|deadline|timeline|week|month/.test(t))
    return "Timelines vary (e.g., 1-2 weeks for a landing page, 6-10 weeks for an app). ⏱️ Could you briefly describe your business and the core features you need so I can give a better estimate?";
  // Contact
  if (/contact|reach|email|phone|whatsapp|call/.test(t))
    return "You can reach us at: 📬\n✉️ devlyxsolutions@gmail.com\n🌐 devlyxsolutions.com/contact\n\nOr share YOUR contact info and we'll reach out within 24 hours!";
  // Portfolio / Projects
  if (/portfolio|project|work|example|case study|sample/.test(t))
    return "Check out our portfolio at devlyxsolutions.com/projects 🎯 We've built platforms for various industries. What industry is your business in?";
  // Build / Start
  if (/build|create|develop|make|want|need|start/.test(t))
    return "Exciting! 🔥 Tell me more about your business — what industry are you in, and what problem are you trying to solve with this new project?";

  // Flow-based fallback
  const flowReplies = {
    AWAITING_GOALS: "I'd love to help! 😊 To start, could you tell me a bit about what your business does?",
    AWAITING_BUDGET: "Got it! Since the scope is clearer, what rough budget range do you have in mind for this project?",
    AWAITING_CONTACT: "Perfect! Please share your email or WhatsApp number so our technical team can reach out to you with a tailored plan. 📬",
    COMPLETED: "You're all set! Our team will be in touch within 24 hours. 🚀",
  };
  return flowReplies[state] || "Happy to help! Could you tell me a little bit about your business and what you're looking to achieve? 😊";
};

// ─────────────────────────────────────────────────────────────
// MAIN SERVICE
// ─────────────────────────────────────────────────────────────
export const chatService = {
  async startSession() {
    let sessionId = localStorage.getItem('devlyx_chat_session');
    if (!sessionId) {

      // Fetch visitor geo + device info
      let geoData = { country: 'Unknown', city: 'Unknown', ip: '' };
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const d = await res.json();
          geoData = { country: d.country_name || 'Unknown', city: d.city || 'Unknown', ip: d.ip || '' };
        }
      } catch (_) {
        try {
          const res2 = await fetch('https://ipinfo.io/json', { signal: AbortSignal.timeout(3000) });
          if (res2.ok) {
            const d = await res2.json();
            geoData = { country: d.country || 'Unknown', city: d.city || 'Unknown', ip: d.ip || '' };
          }
        } catch (__) {}
      }

      const device = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
      const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' 
                    : navigator.userAgent.includes('Firefox') ? 'Firefox'
                    : navigator.userAgent.includes('Safari') ? 'Safari' : 'Other';
      const referrer = document.referrer || 'Direct';
      const page = window.location.pathname;

      const ref = await addDoc(collection(db, "chats"), {
        visitorName: 'Visitor',
        status: 'active',
        lastMessage: '',
        unreadByAdmin: true,
        aiState: 'AWAITING_BUSINESS_TYPE',
        aiData: {},
        chatHistory: [],
        // Visitor intelligence
        country: geoData.country,
        city: geoData.city,
        ip: geoData.ip,
        device,
        browser,
        referrer,
        landingPage: page,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      sessionId = ref.id;
      localStorage.setItem('devlyx_chat_session', sessionId);

      // Greeting
      setTimeout(() => {
        const greeting = "Hello! 👋 I'm **Dex**, the Devlyx AI assistant.\n\nI'm here to understand your project and connect you with the right expert. So — what are you looking to build? 🚀";
        this._agentSay(sessionId, greeting);
        updateDoc(ref, { chatHistory: [{ role: 'model', text: greeting }] });
      }, 800);
    }
    return sessionId;
  },

  async sendMessage(sessionId, text, sender = 'visitor') {
    // Save message to Firestore
    await addDoc(collection(db, "chats", sessionId, "messages"), {
      text, sender, createdAt: serverTimestamp()
    });
    await updateDoc(doc(db, "chats", sessionId), {
      lastMessage: text,
      unreadByAdmin: sender === 'visitor',
      updatedAt: serverTimestamp()
    });

    if (sender === 'visitor') {
      // Use getDoc for reliable single-document fetch
      const chatSnap = await getDoc(doc(db, "chats", sessionId));
      const chatData = chatSnap.exists() ? chatSnap.data() : {};
      setTimeout(() => this._think(sessionId, text, chatData), 1200);
    }
  },

  async _think(sessionId, userText, chatData) {
    const state = chatData.aiState || 'AWAITING_GOALS';
    const aiData = chatData.aiData || {};
    const history = chatData.chatHistory || [];

    // Get custom system prompt if admin has set one
    let systemPrompt = DEFAULT_SYSTEM_PROMPT;
    try {
      const trainingSnap = await getDocs(collection(db, "agentTraining"));
      if (!trainingSnap.empty) {
        const configDoc = trainingSnap.docs.find(d => d.id === 'config') || trainingSnap.docs[0];
        const training = configDoc.data();
        if (training.systemPrompt) systemPrompt = training.systemPrompt;
      }
    } catch(e) {}

    // Enforce form popup instructions on top of ANY prompt (even custom ones in Firestore)
    if (!systemPrompt.includes('[SHOW_FORM]')) {
      systemPrompt += `
\n\n## CRITICAL INSTRUCTIONS:
- When you are ready to collect the user's name, email, or phone, you MUST append exactly [SHOW_FORM] at the very end of your reply. This is mandatory to open the secure contact modal. Do NOT ask them to type it in plain text, tell them to use the form.`;
    }

    // Inject current context so AI knows where it is in the flow
    const contextBlock = `
=== CURRENT CONVERSATION STATE ===
- State: ${state}
- Collected Business Type: ${aiData.businessType || 'Not yet collected'}
- Collected Goals: ${aiData.goals || 'Not yet collected'}
- Collected Budget: ${aiData.budget || 'Not yet collected'}

State Instructions:
- AWAITING_BUSINESS_TYPE: Ask what type of business or industry the user is in. Once they explain it, append [GOT_BUSINESS] at the end of your reply.
- AWAITING_GOALS: You know their business (${aiData.businessType || 'unknown'}). Now dig deeper — ask what specific features or goals they need. Once clear, append [GOT_GOALS].
- AWAITING_BUDGET: Business and goals are clear. Now ask for their budget range. Once stated, append [GOT_BUDGET].
- AWAITING_CONTACT: All info collected. Show the contact form by appending [SHOW_FORM].`;

    let agentReply = "";

    // Build conversation messages for AI
    const chatMessages = [
      { role: 'system', content: systemPrompt + "\n\n" + contextBlock },
      ...history.slice(-14).map(h => ({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: h.text
      })),
      { role: 'user', content: userText }
    ];

    // ── PROVIDER 1: Groq (Llama 3.3 70B — fast & free) ──
    if (GROQ_AVAILABLE && !agentReply) {
      try {
        const res = await fetch(GROQ_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: chatMessages,
            temperature: 0.75,
            max_tokens: 400
          })
        });
        if (!res.ok) throw new Error(`Groq HTTP ${res.status}`);
        const data = await res.json();
        agentReply = data.choices?.[0]?.message?.content?.trim() || '';
        if (agentReply) console.log('[Dex] Replied via Groq ✓');
      } catch (err) {
        console.warn('[Dex] Groq failed, trying Gemini...', err?.message);
      }
    }

    // ── PROVIDER 2: Gemini (fallback) ──
    if (GEMINI_AVAILABLE && !agentReply) {
      try {
        let fullPrompt = chatMessages.map(m => `${m.role === 'user' ? 'Visitor' : m.role === 'system' ? 'System' : 'Dex'}: ${m.content}`).join('\n');
        fullPrompt += '\nDex:';
        const res = await fetch(GEMINI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: { temperature: 0.75, maxOutputTokens: 400 }
          })
        });
        if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
        const data = await res.json();
        agentReply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        if (agentReply) console.log('[Dex] Replied via Gemini ✓');
      } catch (err) {
        console.warn('[Dex] Gemini also failed:', err?.message);
      }
    }

    // ── PROVIDER 3: Smart keyword fallback ──
    if (!agentReply) {
      agentReply = fallbackReply(userText, state);
      console.log('[Dex] Using keyword fallback');
    }

    // Update Firestore chat history
    try {
      const newHistory = [
        ...history,
        { role: 'user', text: userText },
        { role: 'model', text: agentReply }
      ].slice(-20);
      await updateDoc(doc(db, "chats", sessionId), { chatHistory: newHistory });
    } catch (e) {
      console.warn('[Dex] History update failed:', e?.message);
    }

    // ── Check if agent extracted data intelligently ──
    let newState = state;
    let newAiData = { ...aiData };

    if (agentReply.includes('[GOT_BUSINESS]')) {
      agentReply = agentReply.replace('[GOT_BUSINESS]', '').trim();
      if (newState === 'AWAITING_BUSINESS_TYPE') {
        newState = 'AWAITING_GOALS';
        newAiData.businessType = userText;
      }
    }
    
    if (agentReply.includes('[GOT_GOALS]')) {
      agentReply = agentReply.replace('[GOT_GOALS]', '').trim();
      if (newState === 'AWAITING_GOALS' || newState === 'AWAITING_BUSINESS_TYPE') {
        newState = 'AWAITING_BUDGET';
        newAiData.goals = userText;
      }
    }
    
    if (agentReply.includes('[GOT_BUDGET]')) {
      agentReply = agentReply.replace('[GOT_BUDGET]', '').trim();
      if (newState === 'AWAITING_BUDGET' || newState === 'AWAITING_GOALS') {
        newState = 'AWAITING_CONTACT';
        newAiData.budget = userText;
      }
    }

    if (agentReply.includes('[LEAD_COLLECTED]')) {
      agentReply = agentReply.replace('[LEAD_COLLECTED]', '').trim();
      newState = 'COMPLETED';
      newAiData.contact = userText;
      
      // Extract Email and Phone using regex
      const emailMatch = userText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      const phoneMatch = userText.match(/(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g);
      
      const extractedEmail = emailMatch ? emailMatch[0] : 'via-chat';
      const extractedPhone = phoneMatch ? phoneMatch[0] : '';
      
      // Attempt to extract a name (simple heuristic: first few words before the contact info)
      let extractedName = 'Chat Lead (Dex)';
      const nameMatch = userText.match(/my name is ([a-zA-Z\s]+)/i) || userText.match(/i am ([a-zA-Z\s]+)/i);
      if (nameMatch && nameMatch[1]) {
        extractedName = nameMatch[1].trim();
      }

      // Auto-generate lead with all collected data
      await leadService.submitLead({
        name: extractedName,
        email: extractedEmail,
        phone: extractedPhone,
        description: `🤖 Dex AI Lead\nBusiness: ${newAiData.businessType || 'N/A'}\nGoals: ${newAiData.goals || 'N/A'}\nBudget: ${newAiData.budget || 'N/A'}\nLast Message: ${userText}`,
        source: 'Dex AI Agent'
      });
    }

    // ── SAFETY FAILSAVE INTERCEPTORS ──
    const userMentionedForm = /form|pop\s*up|dabba|link|details|contact|whatsapp|number|email/i.test(userText.toLowerCase());
    
    // If user explicitly asks for form/details while in qualification states
    if (userMentionedForm && newState !== 'COMPLETED') {
      if (newState === 'AWAITING_GOALS' || newState === 'AWAITING_BUDGET' || newState === 'AWAITING_CONTACT') {
        newState = 'AWAITING_CONTACT';
        if (!agentReply.includes('[SHOW_FORM]')) {
          agentReply = "Sure! Here is the secure contact form to share your details. [SHOW_FORM]";
        }
      }
    }

    // Force [SHOW_FORM] if we just transitioned to AWAITING_CONTACT and it isn't there
    if (newState === 'AWAITING_CONTACT' && !agentReply.includes('[SHOW_FORM]') && !agentReply.includes('[LEAD_COLLECTED]')) {
      agentReply += " [SHOW_FORM]";
    }

    // Update state if changed
    if (newState !== state) {
      await updateDoc(doc(db, "chats", sessionId), { 
        aiState: newState,
        aiData: newAiData
      });
    }

    await this._agentSay(sessionId, agentReply);
  },

  async _agentSay(sessionId, text) {
    await addDoc(collection(db, "chats", sessionId, "messages"), {
      text, sender: 'agent', createdAt: serverTimestamp()
    });
    await updateDoc(doc(db, "chats", sessionId), {
      lastMessage: text.slice(0, 100), updatedAt: serverTimestamp()
    });
  },

  // ── Admin Training ──
  async saveTraining(systemPrompt) {
    await setDoc(doc(db, "agentTraining", "config"), {
      systemPrompt,
      updatedAt: serverTimestamp()
    });
  },

  async getTraining() {
    const snap = await getDocs(collection(db, "agentTraining"));
    if (!snap.empty) return snap.docs[0].data();
    return { systemPrompt: DEFAULT_SYSTEM_PROMPT };
  },

  subscribeToMessages(sessionId, callback) {
    const q = query(collection(db, "chats", sessionId, "messages"), orderBy("createdAt", "asc"));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  subscribeToAllChats(callback) {
    const q = query(collection(db, "chats"), orderBy("updatedAt", "desc"), limit(50));
    return onSnapshot(q, (snap) => callback(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  },

  async markAsRead(sessionId) {
    await updateDoc(doc(db, "chats", sessionId), { unreadByAdmin: false });
  },

  async deleteChat(sessionId) {
    // Get all messages to delete them
    const messagesSnap = await getDocs(collection(db, "chats", sessionId, "messages"));
    const batch = writeBatch(db);
    
    messagesSnap.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    
    // Delete the main chat document
    batch.delete(doc(db, "chats", sessionId));
    
    await batch.commit();
  },

  getDefaultPrompt() {
    return DEFAULT_SYSTEM_PROMPT;
  }
};
