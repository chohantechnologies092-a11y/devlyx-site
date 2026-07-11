import { db } from "../firebaseConfig";
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
  writeBatch
} from "firebase/firestore";

// --- Helper: detect device type ---
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return "Mobile";
  return "Desktop";
};

// --- Helper: detect browser ---
const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";
  return "Other";
};

// Store visitId in session so we can update it with time-on-site later
let _currentVisitId = null;
let _visitStartTime = Date.now();

export const statsService = {

  // --- Track a full visit with geolocation + device ---
  async trackVisit() {
    const path = window.location.pathname;
    if (path.startsWith('/admin') || path.startsWith('/login') || path.startsWith('/dashboard')) {
      return; // Exclude admin/login/dashboard from analytics
    }

    let geo = { country: "Unknown", city: "Unknown", country_code: "" };
    try {
      // Primary API: ipapi.co
      let res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const data = await res.json();
        geo = {
          country: data.country_name || "Unknown",
          city: data.city || "Unknown",
          country_code: data.country_code || "",
        };
      } else {
        // Fallback API: ipinfo.io
        const fallback = await fetch("https://ipinfo.io/json", { signal: AbortSignal.timeout(3000) });
        if (fallback.ok) {
          const data = await fallback.json();
          geo = {
            country: data.country || "Unknown",
            city: data.city || "Unknown",
            country_code: data.country || "",
          };
        }
      }
    } catch (e) { 
      console.warn("statsService: geolocation error:", e.message);
    }

    const visitData = {
      page: window.location.pathname,
      country: geo.country,
      city: geo.city,
      country_code: geo.country_code,
      device: getDeviceType(),
      browser: getBrowser(),
      timeOnSite: 0,  // will be updated on leave
      createdAt: serverTimestamp(),
    };

    const ref = await addDoc(collection(db, "visits"), visitData);
    _currentVisitId = ref.id;
    _visitStartTime = Date.now();

    // Also increment overview counter
    const statsRef = doc(db, "analytics", "overview");
    await setDoc(statsRef, { totalVisits: increment(1) }, { merge: true });
  },

  // --- Save time-on-site when user leaves ---
  async saveTimeOnSite() {
    if (!_currentVisitId) return;
    const seconds = Math.round((Date.now() - _visitStartTime) / 1000);
    if (seconds < 2) return; // ignore bounces under 2s
    try {
      await updateDoc(doc(db, "visits", _currentVisitId), { timeOnSite: seconds });
    } catch (_) { /* fail silently */ }
  },

  // --- Track a blog post view ---
  async trackPostView(postId) {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { views: increment(1) });
  },

  // --- Save a new lead from contact form ---
  async saveLead(leadData) {
    const ref = await addDoc(collection(db, "leads"), {
      ...leadData,
      status: "new",
      createdAt: serverTimestamp(),
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

  // --- Get recent leads ---
  async getRecentLeads(count = 100) {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(count));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  // --- Reset All Analytics ---
  async resetAnalytics() {
    console.log("statsService: resetting analytics overview...");
    // 1. Reset the overview counter
    const statsRef = doc(db, "analytics", "overview");
    await setDoc(statsRef, { totalVisits: 0 }, { merge: true });

    console.log("statsService: fetching visits to delete...");
    // 2. Delete all visits records (up to 500 at once for safety)
    const q = query(collection(db, "visits"), limit(500));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log("statsService: no visits found to delete.");
      return;
    }

    console.log(`statsService: deleting ${snapshot.size} visits...`);
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => {
      batch.delete(d.ref);
    });
    
    await batch.commit();
    console.log("statsService: batch delete committed.");
  },

  async saveSubscriber(email) {
    try {
      const subscribersRef = collection(db, 'subscribers');
      await addDoc(subscribersRef, {
        email,
        createdAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error saving subscriber:", error);
      throw error;
    }
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
  },

  async getLatestVisits(count = 100) {
    try {
      const q = query(collection(db, "visits"), orderBy("createdAt", "desc"), limit(count));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      console.error("Error getting latest visits:", error);
      return [];
    }
  }
};
