import { db } from "../firebaseConfig";
import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  orderBy, 
  serverTimestamp,
  increment,
  setDoc
} from "firebase/firestore";

const LEADS_COLLECTION = "leads";
const ANALYTICS_DOC = doc(db, "analytics", "overview");

export const leadService = {
  // Submit a new lead from the Estimator
  async submitLead(leadData) {
    const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
      ...leadData,
      status: 'new', // new, contacted, closed
      createdAt: serverTimestamp(),
    });
    
    // Increment total leads counter
    await setDoc(ANALYTICS_DOC, { totalLeads: increment(1) }, { merge: true });
    
    return docRef.id;
  },

  // Get all leads for the dashboard
  async getAllLeads() {
    const q = query(collection(db, LEADS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Update lead status
  async updateLeadStatus(id, status) {
    const docRef = doc(db, LEADS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete lead
  async deleteLead(id) {
    const docRef = doc(db, LEADS_COLLECTION, id);
    await deleteDoc(docRef);

    // Decrement total leads counter
    await setDoc(ANALYTICS_DOC, { totalLeads: increment(-1) }, { merge: true });
  },

  // Newsletter Subscription
  async subscribeNewsletter(email) {
    const q = query(collection(db, "newsletter"), where("email", "==", email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) return { status: 'exists' };

    await addDoc(collection(db, "newsletter"), {
      email,
      status: 'active',
      subscribedAt: serverTimestamp()
    });
    return { status: 'success' };
  },

  // Get all newsletter subscribers
  async getNewsletterSubscribers() {
    const q = query(collection(db, "newsletter"), orderBy("subscribedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

