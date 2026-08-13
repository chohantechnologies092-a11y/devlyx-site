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
    { title: "15+ Years", subtitle: "Industry Mastery", desc: "A decade and a half of engineering complex digital ecosystems." },
    { title: "99% Success", subtitle: "Client Satisfaction", desc: "Delivering results that exceed global standards." },
    { title: "Global Reach", subtitle: "250+ Clients", desc: "Partnering with innovators from Silicon Valley to Dubai." },
    { title: "Modern Tech", subtitle: "Next-Gen Stack", desc: "Specializing in React, Node, AI, and Cloud Architecture." }
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
        return { ...DEFAULT_ABOUT_DATA, ...snapshot.data() };
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
