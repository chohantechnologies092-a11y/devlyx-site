import { db } from "../firebaseConfig";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  limit, 
  writeBatch 
} from "firebase/firestore";
import { leadService } from "./leadService";

// ─────────────────────────────────────────────────────────────
// AI PROVIDERS CONFIG
// ─────────────────────────────────────────────────────────────
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_URL = (key) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;

// ─────────────────────────────────────────────────────────────
// SYSTEM PROMPT — Agent Personality & Knowledge
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
Guide every visitor naturally through these steps:
1. Understand their business / industry.
2. Understand what they want to build (features/goals).
3. Understand their budget range.
4. When you have enough details or when the user asks for a form/contact, append exactly [SHOW_FORM] to your reply.

## IMPORTANT TAGS (You MUST use these when a step is complete):
- When you understand their business, append [GOT_BUSINESS] at the very end of your reply.
- When you understand their project goals, append [GOT_GOALS] at the very end of your reply.
- When the user states their budget, append [GOT_BUDGET] at the very end of your reply.
- When you want them to fill their details, append [SHOW_FORM] at the very end of your reply.
- When user provides contact info in chat, append [LEAD_COLLECTED] at the very end of your reply.

## Rules:
- Answer questions directly first, then advance the conversation.
- Never repeat the same response twice in a row.
- Keep answers concise and engaging.`;

// ─────────────────────────────────────────────────────────────
// SMART CONVERSATIONAL HEURISTICS ENGINE (Fallback / Offline)
// ─────────────────────────────────────────────────────────────
function getSmartFallbackResponse(userText, state, aiData, history = []) {
  const t = userText.trim().toLowerCase();
  let reply = "";
  let newState = state || 'AWAITING_BUSINESS_TYPE';
  let newAiData = { ...aiData };

  // 1. Check if user typed contact info directly (email or phone)
  const hasEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i.test(t);
  const hasPhone = /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/.test(t);
  if (hasEmail || hasPhone) {
    newAiData.contact = userText;
    newState = 'COMPLETED';
    return {
      reply: "Thank you! I've recorded your contact details. 🚀 Our lead engineer will review your project and get in touch within 24 hours with a custom proposal! [LEAD_COLLECTED]",
      newState,
      newAiData
    };
  }

  // 2. User explicitly asking for contact form, details submission, quote, or link
  if (/form|submit|detail|fill|link|contact|rabta|email|phone|whatsapp|call|reach|number|kahan bhejun|bhejo|dikhao|send form|pop\s*up|quote|proposal/i.test(t)) {
    newState = 'AWAITING_CONTACT';
    return {
      reply: "Here is our secure contact form! 📝 Please share your name and contact details, and our engineering team will reach out with a detailed proposal. [SHOW_FORM]",
      newState,
      newAiData
    };
  }

  // 3. User Affirmations / Acknowledgements ("ok", "ok thats nice", "theek hai", "acha", "han", "yes", "sure", "great", "cool", "alright")
  if (/^(ok|okay|ok thats nice|k|theek hai|thk hai|acha|achha|han|haa|yes|yup|yeah|sure|great|cool|alright|nice|done|sahi hai|fine|perfect)$/i.test(t)) {
    if (!newAiData.businessType) {
      newState = 'AWAITING_BUSINESS_TYPE';
      reply = "Awesome! 😊 Could you tell me a little about your business or industry (e.g. Food & Restaurant, E-Commerce, Real Estate, Healthcare, Tech)?";
    } else if (!newAiData.goals) {
      newState = 'AWAITING_GOALS';
      reply = `Great! 🚀 For your ${newAiData.businessType}, what type of digital solution are you planning to build (e.g., a Mobile App, Custom Website, or SaaS platform)?`;
    } else if (!newAiData.budget) {
      newState = 'AWAITING_BUDGET';
      reply = "Got it! Do you have an estimated budget range or specific target launch date for this project? 💰";
    } else {
      newState = 'AWAITING_CONTACT';
      reply = "Sounds perfect! Let's get your contact details so our team can send over a comprehensive plan. [SHOW_FORM]";
    }
    return { reply, newState, newAiData };
  }

  // 4. Greetings
  if (/^(hello|hi|hey|salam|assalam|assalamu alaikum|aoa|howdy|kia hal|kese ho)/i.test(t)) {
    if (!newAiData.businessType) {
      newState = 'AWAITING_BUSINESS_TYPE';
      reply = "Hello! 👋 I'm Dex, your Devlyx project consultant! What kind of business do you run, and what can we help you build today?";
    } else {
      reply = "Hello again! 👋 Let me know if you'd like to discuss features, pricing, or submit your project details!";
    }
    return { reply, newState, newAiData };
  }

  // 5. Company / About Devlyx
  if (/company|about|who are|devlyx|tell me about|agency|team|experience/i.test(t)) {
    reply = "Devlyx Solutions is a premier software engineering agency 🚀 We engineer scalable Mobile Apps (iOS/Android), Modern Web Platforms, SaaS products, and AI solutions.\n\nTell me a bit about your business so I can explain how we can create value for you!";
    return { reply, newState, newAiData };
  }

  // 6. Services & Tech Stack
  if (/service|offer|kia krty|what do you do|speciali|stack|technolog/i.test(t)) {
    reply = "We offer end-to-end engineering: 🛠️\n📱 Mobile Apps (iOS, Android, Flutter, React Native)\n🌐 Web Platforms & Scalable SaaS (React, Next.js, Node, Firebase)\n🤖 AI & Workflow Automations\n🎨 High-end UI/UX Design\n\nWhich of these matches what you're looking to build?";
    return { reply, newState, newAiData };
  }

  // 7. Portfolio / Case Studies
  if (/portfolio|project|work|example|case study|sample|previous/i.test(t)) {
    reply = "You can view our featured projects at devlyxsolutions.com/projects 🎯 We've built high-concurrency mobile apps, scalable SaaS, and enterprise web solutions. What industry is your project for?";
    return { reply, newState, newAiData };
  }

  // 8. Pricing / Cost queries
  if (/price|cost|budget|kitna|how much|charges|rates|rate/i.test(t)) {
    if (!newAiData.businessType) {
      reply = "Our standard pricing: 🌐 Custom Websites start at $800, 📱 Mobile Apps at $2,500, and 🤖 SaaS / AI solutions at $3,000+.\n\nTo give you a precise quote, what type of business do you run and what features do you need?";
    } else {
      newState = 'AWAITING_BUDGET';
      reply = `For a ${newAiData.businessType} project, websites typically start at $800 and apps at $2,500. 💰 What is your target budget or timeline for this build?`;
    }
    return { reply, newState, newAiData };
  }

  // 9. Timeline queries
  if (/timeline|how long|deadline|duration|kitny din|kab tak/i.test(t)) {
    reply = "Timelines typically range from 1-2 weeks for landing pages, 6-10 weeks for full Mobile MVPs, and 3-6 months for enterprise SaaS. ⏱️ What is your target launch timeline?";
    return { reply, newState, newAiData };
  }

  // 10. Industry / Business Types matching
  const isBusinessMention = /food|restaurant|cafe|bakery|e-?commerce|shop|store|clothing|fashion|retail|real\s*estate|property|health|medical|clinic|doctor|hospital|education|school|academy|course|tech|fintech|crypto|saas|logistics|travel|hotel|cleaning|fitness|gym|salon|agency|services|lawyer|firm|startup/i.test(t);
  
  if (isBusinessMention || newState === 'AWAITING_BUSINESS_TYPE') {
    newAiData.businessType = userText;
    newState = 'AWAITING_GOALS';
    
    let industryName = "business";
    if (/food|restaurant|cafe|bakery/i.test(t)) industryName = "food & beverage";
    else if (/e-?commerce|clothing|fashion|store|shop|retail/i.test(t)) industryName = "e-commerce";
    else if (/real\s*estate|property/i.test(t)) industryName = "real estate";
    else if (/health|medical|clinic|doctor/i.test(t)) industryName = "healthcare";
    else if (/education|school|academy/i.test(t)) industryName = "education";
    else if (/fitness|gym/i.test(t)) industryName = "fitness";
    else industryName = userText.slice(0, 30);

    reply = `A ${industryName} business has tremendous growth potential online! 🚀 What specific solution are you looking to build (e.g. a Mobile App with ordering/booking, a Modern Website, or a full management system)?`;
    return { reply, newState, newAiData };
  }

  // 11. Goals / Project Type matching
  const isGoalMention = /web|website|site|landing|app|mobile|ios|android|flutter|platform|portal|dashboard|software|system|crm|erp|saas|automation|ai|ordering|booking|management/i.test(t);
  
  if (isGoalMention || newState === 'AWAITING_GOALS') {
    newAiData.goals = userText;
    newState = 'AWAITING_BUDGET';

    let productType = "platform";
    if (/app|mobile|ios|android/i.test(t)) productType = "Mobile App (iOS & Android)";
    else if (/web|website|landing/i.test(t)) productType = "Web Platform";
    else if (/saas|portal|dashboard|crm|erp/i.test(t)) productType = "Custom SaaS / Web Platform";
    else productType = userText.slice(0, 30);

    reply = `Excellent choice! A high-performance ${productType} will provide an exceptional user experience. 💡 What rough budget range or timeline do you have in mind for this project?`;
    return { reply, newState, newAiData };
  }

  // 12. Budget / Timeline answering
  const isBudgetMention = /\$|\d{2,6}|k|budget|flexible|affordable|standard|cheap|expensive|asap|month|week|estimate|reasonable/i.test(t);
  
  if (isBudgetMention || newState === 'AWAITING_BUDGET') {
    newAiData.budget = userText;
    newState = 'AWAITING_CONTACT';
    reply = "Understood! That gives us clear parameters to tailor the architecture and scope for your project. 🎯 Let's connect you with our technical lead — please fill in your details below: [SHOW_FORM]";
    return { reply, newState, newAiData };
  }

  // 13. State Fallback if nothing matched
  if (newState === 'AWAITING_CONTACT') {
    reply = "Please click below to submit your contact details and our team will get in touch with you shortly! 📬 [SHOW_FORM]";
  } else {
    newState = 'AWAITING_CONTACT';
    reply = "I'd love to help you bring this project to life! 🚀 Let's get your details so our team can prepare a custom project roadmap for you. [SHOW_FORM]";
  }

  return { reply, newState, newAiData };
}

// ─────────────────────────────────────────────────────────────
// MAIN CHAT SERVICE
// ─────────────────────────────────────────────────────────────
export const chatService = {
  async startSession() {
    let sessionId = localStorage.getItem('devlyx_chat_session');
    
    if (sessionId) {
      try {
        const chatSnap = await getDoc(doc(db, "chats", sessionId));
        if (!chatSnap.exists()) {
          sessionId = null;
        }
      } catch (error) {
        // Fallback to proceed if offline
      }
    }

    if (!sessionId) {
      let geoData = { country: 'Unknown', city: 'Unknown', ip: '' };
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const d = await res.json();
          geoData = { country: d.country_name || 'Unknown', city: d.city || 'Unknown', ip: d.ip || '' };
        }
      } catch (_) {}

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
        setDoc(doc(db, "chats", sessionId), { chatHistory: [{ role: 'model', text: greeting }] }, { merge: true });
      }, 600);
    }
    return sessionId;
  },

  async sendMessage(sessionId, text, sender = 'visitor') {
    await addDoc(collection(db, "chats", sessionId, "messages"), {
      text, sender, createdAt: serverTimestamp()
    });
    await setDoc(doc(db, "chats", sessionId), {
      lastMessage: text,
      unreadByAdmin: sender === 'visitor',
      updatedAt: serverTimestamp()
    }, { merge: true });

    if (sender === 'visitor') {
      const chatSnap = await getDoc(doc(db, "chats", sessionId));
      const chatData = chatSnap.exists() ? chatSnap.data() : {};
      setTimeout(() => this._think(sessionId, text, chatData), 1000);
    }
  },

  async _think(sessionId, userText, chatData) {
    let state = chatData.aiState || 'AWAITING_BUSINESS_TYPE';
    let aiData = chatData.aiData || {};
    const history = chatData.chatHistory || [];

    // Get training configuration if available
    let systemPrompt = DEFAULT_SYSTEM_PROMPT;
    let customGroqKey = import.meta.env.VITE_GROQ_API_KEY || '';
    let customGeminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

    try {
      const trainingSnap = await getDocs(collection(db, "agentTraining"));
      if (!trainingSnap.empty) {
        const configDoc = trainingSnap.docs.find(d => d.id === 'config') || trainingSnap.docs[0];
        const training = configDoc.data();
        if (training.systemPrompt) systemPrompt = training.systemPrompt;
        if (training.groqApiKey) customGroqKey = training.groqApiKey;
        if (training.geminiApiKey) customGeminiKey = training.geminiApiKey;
      }
    } catch(e) {}

    let agentReply = "";
    let newState = state;
    let newAiData = { ...aiData };

    const groqAvailable = !!(customGroqKey && customGroqKey.startsWith('gsk_'));
    const geminiAvailable = !!(customGeminiKey && customGeminiKey !== 'your_gemini_api_key_here');

    // ── AI PROVIDER 1: Groq ──
    if (groqAvailable && !agentReply) {
      try {
        const contextBlock = `
=== CONVERSATION STATE ===
- State: ${state}
- Collected Business: ${aiData.businessType || 'None'}
- Collected Goals: ${aiData.goals || 'None'}
- Collected Budget: ${aiData.budget || 'None'}
Instructions:
- AWAITING_BUSINESS_TYPE: Ask about their business. Append [GOT_BUSINESS] when answered.
- AWAITING_GOALS: Ask about their project goals/features. Append [GOT_GOALS] when answered.
- AWAITING_BUDGET: Ask about their budget or timeline. Append [GOT_BUDGET] when answered.
- AWAITING_CONTACT / Complete: Append [SHOW_FORM] at end of message.`;

        const chatMessages = [
          { role: 'system', content: systemPrompt + "\n\n" + contextBlock },
          ...history.slice(-14).map(h => ({
            role: h.role === 'user' ? 'user' : 'assistant',
            content: h.text
          })),
          { role: 'user', content: userText }
        ];

        const groqModels = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'groq/compound', 'qwen/qwen3.8-27b'];
        for (const model of groqModels) {
          try {
            const res = await fetch(GROQ_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${customGroqKey}`
              },
              body: JSON.stringify({
                model,
                messages: chatMessages,
                temperature: 0.7,
                max_tokens: 350
              })
            });
            if (res.ok) {
              const data = await res.json();
              agentReply = data.choices?.[0]?.message?.content?.trim() || '';
              if (agentReply) {
                console.log(`[Dex] Replied via Groq (${model}) ✓`);
                break;
              }
            }
          } catch (_) {}
        }
      } catch (err) {
        console.warn('[Dex] Groq error:', err?.message);
      }
    }

    // ── AI PROVIDER 2: Gemini ──
    if (geminiAvailable && !agentReply) {
      try {
        const chatMessages = [
          ...history.slice(-10).map(h => `${h.role === 'user' ? 'Visitor' : 'Dex'}: ${h.text}`),
          `Visitor: ${userText}`,
          `Dex:`
        ].join('\n');

        const res = await fetch(GEMINI_URL(customGeminiKey), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemPrompt}\n\n${chatMessages}` }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 350 }
          })
        });
        if (res.ok) {
          const data = await res.json();
          agentReply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        }
      } catch (err) {
        console.warn('[Dex] Gemini error:', err?.message);
      }
    }

    // ── AI Extraction & State Transition from Tags ──
    if (agentReply) {
      if (agentReply.includes('[GOT_BUSINESS]')) {
        agentReply = agentReply.replace('[GOT_BUSINESS]', '').trim();
        newState = 'AWAITING_GOALS';
        newAiData.businessType = userText;
      }
      if (agentReply.includes('[GOT_GOALS]')) {
        agentReply = agentReply.replace('[GOT_GOALS]', '').trim();
        newState = 'AWAITING_BUDGET';
        newAiData.goals = userText;
      }
      if (agentReply.includes('[GOT_BUDGET]')) {
        agentReply = agentReply.replace('[GOT_BUDGET]', '').trim();
        newState = 'AWAITING_CONTACT';
        newAiData.budget = userText;
      }
      if (agentReply.includes('[SHOW_FORM]')) {
        newState = 'AWAITING_CONTACT';
      }
    } else {
      // ── PROVIDER 3: Smart Conversational Heuristics Engine ──
      const fallbackResult = getSmartFallbackResponse(userText, state, aiData, history);
      agentReply = fallbackResult.reply;
      newState = fallbackResult.newState;
      newAiData = fallbackResult.newAiData;
    }

    // ── UNIVERSAL SAFETY INTERCEPTORS ──
    const userMentionedForm = /form|pop\s*up|dabba|link|details|contact|whatsapp|number|email|submit|quote|proposal|schedule/i.test(userText.toLowerCase());
    
    if (userMentionedForm && newState !== 'COMPLETED') {
      newState = 'AWAITING_CONTACT';
      if (!agentReply.includes('[SHOW_FORM]')) {
        agentReply = "Sure! Here is our contact form so you can share your project requirements directly with our engineering team. [SHOW_FORM]";
      }
    }

    if (agentReply.includes('[LEAD_COLLECTED]')) {
      newState = 'COMPLETED';
      newAiData.contact = userText;

      const emailMatch = userText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      const phoneMatch = userText.match(/(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g);

      await leadService.submitLead({
        name: 'Chat Lead (Dex)',
        email: emailMatch ? emailMatch[0] : 'chat-lead@devlyx.com',
        phone: phoneMatch ? phoneMatch[0] : '',
        description: `🤖 Dex AI Lead\nBusiness: ${newAiData.businessType || 'N/A'}\nGoals: ${newAiData.goals || 'N/A'}\nBudget: ${newAiData.budget || 'N/A'}\nLast Message: ${userText}`,
        source: 'Dex AI Agent'
      });
    }

    // ── REPETITION & LOOP BLOCKER ──
    const lastAgentMsg = history.filter(h => h.role === 'model').slice(-1)[0]?.text || '';
    const cleanCurrent = agentReply.replace(/\[.*?\]/g, '').trim().toLowerCase();
    const cleanLast = lastAgentMsg.replace(/\[.*?\]/g, '').trim().toLowerCase();

    if (cleanLast && cleanCurrent === cleanLast) {
      if (newState === 'AWAITING_BUSINESS_TYPE') {
        newState = 'AWAITING_GOALS';
        agentReply = "Got it! 🚀 What kind of digital platform do you have in mind (e.g. Mobile App, Custom Website, or SaaS product)?";
      } else if (newState === 'AWAITING_GOALS') {
        newState = 'AWAITING_BUDGET';
        agentReply = "Understood! Do you have an estimated budget range or specific target timeline for this project? 💰";
      } else {
        newState = 'AWAITING_CONTACT';
        agentReply = "Let's connect you with our development team to discuss the exact roadmap. Please share your details below: [SHOW_FORM]";
      }
    }

    // Update Firestore chat document
    try {
      const newHistory = [
        ...history,
        { role: 'user', text: userText },
        { role: 'model', text: agentReply }
      ].slice(-20);

      await setDoc(doc(db, "chats", sessionId), { 
        chatHistory: newHistory,
        aiState: newState,
        aiData: newAiData,
        lastMessage: agentReply.slice(0, 100).replace(/\[.*?\]/g, ''),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn('[Dex] Firestore update warning:', e?.message);
    }

    await this._agentSay(sessionId, agentReply);
  },

  async _agentSay(sessionId, text) {
    await addDoc(collection(db, "chats", sessionId, "messages"), {
      text, sender: 'agent', createdAt: serverTimestamp()
    });
    await setDoc(doc(db, "chats", sessionId), {
      lastMessage: text.slice(0, 100).replace(/\[.*?\]/g, ''),
      updatedAt: serverTimestamp()
    }, { merge: true });
  },

  // ── Admin Training ──
  async saveTraining(data) {
    await setDoc(doc(db, "agentTraining", "config"), {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
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
    await setDoc(doc(db, "chats", sessionId), { unreadByAdmin: false }, { merge: true });
  },

  async deleteChat(sessionId) {
    const messagesSnap = await getDocs(collection(db, "chats", sessionId, "messages"));
    const batch = writeBatch(db);
    messagesSnap.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    batch.delete(doc(db, "chats", sessionId));
    await batch.commit();
  },

  getDefaultPrompt() {
    return DEFAULT_SYSTEM_PROMPT;
  }
};

