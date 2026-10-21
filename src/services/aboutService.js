import { db } from "../firebaseConfig";
import { 
  doc, 
  getDoc, 
  setDoc,
  serverTimestamp 
} from "firebase/firestore";

const SETTINGS_COLLECTION = "settings";
const ABOUT_DOC = "aboutPage";

const DEFAULT_ABOUT_DATA = {
  heroTitle: "We Build Digital Empires.",
  heroSubtitle: "More than an agency. We are a high-performance engineering cell dedicated to the craft of technical excellence.",
  heroBackground: "https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg",
  companyStory: "Founded with a vision to bridge the gap between creative design and hardcore engineering, Devlyx Solutions began as a small collective of passionate developers. Today, we stand as a premier digital agency partnering with brands globally. Our approach is simple: understand the core of the business, design with empathy, and engineer with precision. We believe that technology should empower, not complicate, and every line of code we write is dedicated to that philosophy.",
  stats: [
    { title: "15+ Years", subtitle: "Combined Expertise", desc: "A collective decade and a half of engineering and shipping robust digital ecosystems." },
    { title: "99% Success", subtitle: "Client Satisfaction", desc: "Delivering results that exceed global industry standards." },
    { title: "Global Reach", subtitle: "150+ Clients", desc: "Partnering with enterprises from Pakistan and the Gulf to international markets." },
    { title: "Modern Tech", subtitle: "Next-Gen Stack", desc: "Specializing in React, Flutter, Node, AI, and Cloud Architecture." }
  ],
  philosophyImage: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
  philosophies: [
    { title: "Radical Transparency", desc: "No black boxes. We work in the open, keeping you aligned at every stage." },
    { title: "Quality as Standard", desc: "Zero technical debt. We build for the long term with clean, tested code." },
    { title: "User-First Thinking", desc: "Technology is nothing without a seamless user experience." }
  ],
  ceoName: "Junaid Ahsan",
  ceoRole: "Founder & CEO",
  ceoImage: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
  ceoMessage: "At Devlyx Solutions, our mission is to redefine what's possible in the digital space. We don't just build software; we engineer competitive advantages that allow our partners to dominate their respective markets. Technology is the canvas, and innovation is our brush.",
  teamMembers: []
};

export const aboutService = {
  // Get About Page Data
  async getAboutData() {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, ABOUT_DOC);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const firestoreData = snapshot.data();
        let stats = firestoreData.stats || DEFAULT_ABOUT_DATA.stats;
        stats = stats.map(s => {
          let title = s.title || '';
          let subtitle = s.subtitle || '';
          let desc = s.desc || '';

          if (title.includes('15+') || title.includes('10+') || subtitle.includes('Industry Mastery') || subtitle.includes('Combined Expertise')) {
            title = '15+ Years';
            subtitle = 'Combined Expertise';
            desc = 'A collective decade and a half of engineering and shipping robust digital ecosystems.';
          }
          if (subtitle.includes('250+') || subtitle.includes('50+') || title.includes('250+') || title.includes('50+') || subtitle.toLowerCase().includes('clients')) {
            subtitle = '150+ Clients';
            title = 'Global Reach';
            desc = 'Partnering with enterprises from Pakistan and the Gulf to international markets.';
          }
          return { ...s, title, subtitle, desc };
        });

        return { ...DEFAULT_ABOUT_DATA, ...firestoreData, stats };
      }
      return DEFAULT_ABOUT_DATA;
    } catch (error) {
      console.error("Error fetching about data:", error);
      return DEFAULT_ABOUT_DATA;
    }
  },

  // Update About Page Data
  async updateAboutData(data) {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, ABOUT_DOC);
      await setDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error("Error updating about data:", error);
      throw error;
    }
  }
};
