import { db, auth } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  writeBatch,
  where,
  Timestamp
} from "firebase/firestore";

// ─────────────────────────────────────────────────────────────
// ADMIN & DEVELOPER DEVICE EXCLUSION
// ─────────────────────────────────────────────────────────────
export const isAdminDevice = () => {
  try {
    // 1. Firebase Auth - if any admin/team member is currently logged in, NEVER track!
    if (auth?.currentUser) {
      localStorage.setItem('devlyx_admin_device', 'true');
      return true;
    }
    // 2. Persistent localStorage flag
    if (localStorage.getItem('devlyx_admin_device') === 'true') {
      return true;
    }
    // 3. sessionStorage flag
    if (sessionStorage.getItem('devlyx_admin_device') === 'true') {
      return true;
    }
    // 4. URL query trigger (?admin_exclude=1 or ?devlyx_admin=1)
    if (window.location.search && (window.location.search.includes('admin_exclude=1') || window.location.search.includes('devlyx_admin=1'))) {
      localStorage.setItem('devlyx_admin_device', 'true');
      return true;
    }
    // 5. Internal route check
    const p = window.location.pathname || '';
    if (p.startsWith('/dashboard') || p.startsWith('/login') || p.startsWith('/admin')) {
      return true;
    }
  } catch (_) {}
  return false;
};

// ─────────────────────────────────────────────────────────────
// BOT & SPIDER DETECTION
// ─────────────────────────────────────────────────────────────
const isBot = () => {
  const ua = navigator.userAgent || '';
  const botPattern = /bot|spider|crawl|slurp|lighthouse|headlesschrome|googlebot|bingbot|yandexbot|duckduckbot|baiduspider|twitterbot|facebookexternalhit|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|slackbot|vkShare|W3C_Validator/i;
  return botPattern.test(ua) || navigator.webdriver;
};

// ─────────────────────────────────────────────────────────────
// CLIENT & SESSION IDENTITY (GA-Style)
// ─────────────────────────────────────────────────────────────
const getVisitorId = () => {
  let vid = localStorage.getItem('devlyx_vid');
  if (!vid) {
    vid = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
    localStorage.setItem('devlyx_vid', vid);
  }
  return vid;
};

const getSessionId = () => {
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 mins GA standard
  const now = Date.now();
  const lastActive = parseInt(sessionStorage.getItem('devlyx_last_active') || '0', 10);
  let sid = sessionStorage.getItem('devlyx_sid');

  if (!sid || (now - lastActive > SESSION_TIMEOUT_MS)) {
    sid = 's_' + Math.random().toString(36).substring(2, 11) + '_' + now.toString(36);
    sessionStorage.setItem('devlyx_sid', sid);
    sessionStorage.setItem('devlyx_session_start', now.toString());
    sessionStorage.setItem('devlyx_pageview_count', '0');
  }

  sessionStorage.setItem('devlyx_last_active', now.toString());
  return sid;
};

// ─────────────────────────────────────────────────────────────
// DEVICE, BROWSER & OS DETECTION
// ─────────────────────────────────────────────────────────────
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return "Mobile";
  return "Desktop";
};

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Other";
};

const getOS = () => {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "Windows";
  if (/macintosh|mac os x/i.test(ua)) return "macOS";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
};

// ─────────────────────────────────────────────────────────────
// TRAFFIC SOURCE & ACQUISITION (Google Analytics Style)
// ─────────────────────────────────────────────────────────────
const getTrafficSource = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');

  if (utmSource) {
    return {
      channel: utmMedium ? `${utmSource} / ${utmMedium}` : utmSource,
      source: utmSource,
      medium: utmMedium || 'cpc',
      campaign: utmCampaign || 'none',
      type: 'Campaign'
    };
  }

  const ref = document.referrer || '';
  if (!ref) {
    return { channel: 'Direct', source: 'Direct', medium: 'none', campaign: 'none', type: 'Direct' };
  }

  try {
    const refHost = new URL(ref).hostname.toLowerCase();
    if (refHost.includes(window.location.hostname)) {
      return { channel: 'Internal', source: 'Internal', medium: 'internal', campaign: 'none', type: 'Internal' };
    }
    if (/google\./.test(refHost)) return { channel: 'Google Search', source: 'google', medium: 'organic', type: 'Organic Search' };
    if (/bing\./.test(refHost)) return { channel: 'Bing Search', source: 'bing', medium: 'organic', type: 'Organic Search' };
    if (/yahoo\./.test(refHost)) return { channel: 'Yahoo Search', source: 'yahoo', medium: 'organic', type: 'Organic Search' };
    if (/duckduckgo\./.test(refHost)) return { channel: 'DuckDuckGo', source: 'duckduckgo', medium: 'organic', type: 'Organic Search' };
    if (/linkedin\./.test(refHost)) return { channel: 'LinkedIn', source: 'linkedin', medium: 'social', type: 'Social' };
    if (/twitter\.|t\.co|x\.com/.test(refHost)) return { channel: 'X / Twitter', source: 'twitter', medium: 'social', type: 'Social' };
    if (/facebook\.|fb\.com/.test(refHost)) return { channel: 'Facebook', source: 'facebook', medium: 'social', type: 'Social' };
    if (/instagram\./.test(refHost)) return { channel: 'Instagram', source: 'instagram', medium: 'social', type: 'Social' };
    if (/reddit\./.test(refHost)) return { channel: 'Reddit', source: 'reddit', medium: 'social', type: 'Social' };
    if (/youtube\./.test(refHost)) return { channel: 'YouTube', source: 'youtube', medium: 'social', type: 'Social' };
    if (/whatsapp\./.test(refHost)) return { channel: 'WhatsApp', source: 'whatsapp', medium: 'social', type: 'Social' };

    return { channel: refHost, source: refHost, medium: 'referral', type: 'Referral' };
  } catch (_) {
    return { channel: 'Referral', source: 'Referral', medium: 'referral', type: 'Referral' };
  }
};

// ─────────────────────────────────────────────────────────────
// GEOLOCATION RESOLVER (Cached per session)
// ─────────────────────────────────────────────────────────────
const getGeoLocation = async () => {
  const cached = sessionStorage.getItem('devlyx_geo');
  if (cached) {
    try { return JSON.parse(cached); } catch(_) {}
  }

  let geo = { country: "Unknown", city: "Unknown", country_code: "", region: "" };
  
  // Provider 1: geojs.io (Fast, no rate limits)
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json", { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const d = await res.json();
      geo = {
        country: d.country || "Unknown",
        city: d.city || "Unknown",
        country_code: d.country_code || "",
        region: d.region || ""
      };
    }
  } catch (_) {
    // Provider 2: ipwhois.app
    try {
      const res2 = await fetch("https://ipwhois.app/json/", { signal: AbortSignal.timeout(3000) });
      if (res2.ok) {
        const d2 = await res2.json();
        geo = {
          country: d2.country || "Unknown",
          city: d2.city || "Unknown",
          country_code: d2.country_code || "",
          region: d2.region || ""
        };
      }
    } catch (__) {
      // Fallback to browser locale
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        geo.city = tz.split('/')[1]?.replace(/_/g, ' ') || 'Unknown';
      } catch (___) {}
    }
  }

  try {
    sessionStorage.setItem('devlyx_geo', JSON.stringify(geo));
  } catch (_) {}

  return geo;
};

// ─────────────────────────────────────────────────────────────
// INTERNAL TRACKING STATE
// ─────────────────────────────────────────────────────────────
let _currentVisitId = null;
let _visitStartTime = Date.now();
let _heartbeatTimer = null;

// ─────────────────────────────────────────────────────────────
// EXPORTED STATS SERVICE
// ─────────────────────────────────────────────────────────────
export const statsService = {

  // --- Check if current browser is an admin device ---
  isAdminDevice() {
    return isAdminDevice();
  },

  // --- Toggle admin device exclusion ---
  setAdminDevice(enabled) {
    if (enabled) {
      localStorage.setItem('devlyx_admin_device', 'true');
      sessionStorage.setItem('devlyx_admin_device', 'true');
    } else {
      localStorage.removeItem('devlyx_admin_device');
      sessionStorage.removeItem('devlyx_admin_device');
    }
  },

  // --- Track Page View (SPA Navigation & Initial Load) ---
  async trackPageView(pathname = window.location.pathname) {
    if (isBot()) return;
    if (isAdminDevice()) return;
    
    // Ignore internal admin routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/dashboard')) {
      return;
    }

    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    const geo = await getGeoLocation();
    const traffic = getTrafficSource();
    const device = getDeviceType();
    const browser = getBrowser();
    const os = getOS();
    const screenRes = `${window.screen?.width || 0}x${window.screen?.height || 0}`;
    const language = navigator.language || 'en';

    // Increment pageviews count for this session
    let pageCount = parseInt(sessionStorage.getItem('devlyx_pageview_count') || '0', 10) + 1;
    sessionStorage.setItem('devlyx_pageview_count', pageCount.toString());

    _visitStartTime = Date.now();

    const visitData = {
      visitorId,
      sessionId,
      page: pathname,
      pageTitle: document.title || 'Devlyx Solutions',
      pageviews: pageCount,
      country: geo.country,
      city: geo.city,
      country_code: geo.country_code,
      region: geo.region,
      device,
      browser,
      os,
      screen: screenRes,
      language,
      channel: traffic.channel,
      trafficType: traffic.type,
      trafficSource: traffic.source,
      trafficMedium: traffic.medium,
      campaign: traffic.campaign,
      timeOnSite: 0,
      lastActiveAt: serverTimestamp(),
      createdAt: serverTimestamp()
    };

    try {
      const ref = await addDoc(collection(db, "visits"), visitData);
      _currentVisitId = ref.id;

      // Update overview counters atomically
      const statsRef = doc(db, "analytics", "overview");
      await setDoc(statsRef, {
        totalVisits: increment(1),
        lastUpdated: serverTimestamp()
      }, { merge: true });

      // Start active heartbeat
      this.startHeartbeat();
    } catch (e) {
      console.warn("statsService: tracking failed", e?.message);
    }
  },

  // Alias for initial load
  async trackVisit() {
    return this.trackPageView(window.location.pathname);
  },

  // --- Active Heartbeat (Every 20s to record accurate active engagement) ---
  startHeartbeat() {
    if (isAdminDevice()) return;
    if (_heartbeatTimer) clearInterval(_heartbeatTimer);
    _heartbeatTimer = setInterval(() => {
      if (document.visibilityState === 'visible' && _currentVisitId) {
        const elapsed = Math.round((Date.now() - _visitStartTime) / 1000);
        updateDoc(doc(db, "visits", _currentVisitId), {
          timeOnSite: elapsed,
          lastActiveAt: serverTimestamp()
        }).catch(() => {});
      }
    }, 20000);
  },

  // --- Save time-on-site when user leaves / changes page ---
  async saveTimeOnSite() {
    if (isAdminDevice()) return;
    if (!_currentVisitId) return;
    const seconds = Math.round((Date.now() - _visitStartTime) / 1000);
    if (seconds < 1) return;
    try {
      await updateDoc(doc(db, "visits", _currentVisitId), { 
        timeOnSite: seconds,
        lastActiveAt: serverTimestamp()
      });
    } catch (_) {}
  },

  // --- Track a blog post view ---
  async trackPostView(postId) {
    if (isAdminDevice() || isBot()) {
      return;
    }
    if (!postId) return;
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, { views: increment(1) });
    } catch (_) {}
  },

  // --- Save a new lead from contact form ---
  async saveLead(leadData) {
    const ref = await addDoc(collection(db, "leads"), {
      ...leadData,
      status: "new",
      createdAt: serverTimestamp()
    });
    const statsRef = doc(db, "analytics", "overview");
    await setDoc(statsRef, { totalLeads: increment(1) }, { merge: true });
    return ref.id;
  },

  // --- Update lead status ---
  async updateLeadStatus(id, status) {
    await updateDoc(doc(db, "leads", id), { status });
  },

  // --- Delete a lead ---
  async deleteLead(id) {
    await deleteDoc(doc(db, "leads", id));
    const statsRef = doc(db, "analytics", "overview");
    await setDoc(statsRef, { totalLeads: increment(-1) }, { merge: true });
  },

  // --- Get overview stats for dashboard header ---
  async getOverviewStats() {
    const statsRef = doc(db, "analytics", "overview");
    const snapshot = await getDoc(statsRef);
    return snapshot.exists() ? snapshot.data() : { totalVisits: 0, totalLeads: 0 };
  },

  // --- Get all visits for analytics page (last 500) ---
  async getAllVisits() {
    const q = query(collection(db, "visits"), orderBy("createdAt", "desc"), limit(500));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  // --- Get latest visits for live activity (up to count) ---
  async getLatestVisits(count = 100) {
    try {
      const q = query(collection(db, "visits"), orderBy("createdAt", "desc"), limit(count));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      console.error("Error getting latest visits:", error);
      return [];
    }
  },

  // --- Get recent leads ---
  async getRecentLeads(count = 100) {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(count));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  // --- Reset All Analytics ---
  async resetAnalytics() {
    const statsRef = doc(db, "analytics", "overview");
    await setDoc(statsRef, { totalVisits: 0, lastReset: serverTimestamp() }, { merge: true });

    const q = query(collection(db, "visits"), limit(500));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => {
      batch.delete(d.ref);
    });
    await batch.commit();
  },

  // --- Newsletter subscribers ---
  async saveSubscriber(email) {
    const subscribersRef = collection(db, 'subscribers');
    await addDoc(subscribersRef, {
      email,
      createdAt: serverTimestamp()
    });
    return true;
  },

  async getAllSubscribers() {
    try {
      const subscribersRef = collection(db, 'subscribers');
      const q = query(subscribersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting subscribers:", error);
      return [];
    }
  }
};
