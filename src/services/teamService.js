import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

// Roles and their allowed nav tabs
export const ROLES = {
  super_admin: {
    label: 'Super Admin',
    color: 'purple',
    allowedTabs: ['overview', 'projects', 'posts', 'support', 'leads', 'subscribers', 'analytics', 'team', 'settings']
  },
  blogger: {
    label: 'Blogger',
    color: 'blue',
    allowedTabs: ['posts', 'analytics']
  },
  manager: {
    label: 'Manager',
    color: 'green',
    allowedTabs: ['overview', 'projects', 'leads', 'subscribers', 'analytics']
  },
  support_agent: {
    label: 'Support Agent',
    color: 'cyan',
    allowedTabs: ['support', 'leads']
  }
};

export const teamService = {
  // Get user role from Firestore
  async getUserRole(email) {
    const q = query(collection(db, "teamMembers"), where("email", "==", email));
    const snap = await getDocs(q);
    if (!snap.empty) return snap.docs[0].data().role;
    return 'super_admin'; // Default: the original admin
  },

  async getAllMembers() {
    const snap = await getDocs(collection(db, "teamMembers"));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async addMember({ name, email, role }) {
    // Create Firebase Auth account and send reset email
    try {
      const tempPassword = Math.random().toString(36).slice(-10) + 'A1!';
      await createUserWithEmailAndPassword(auth, email, tempPassword);
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      // User might already exist — just add role
      console.warn("Auth creation note:", e.message);
    }

    // Save role in Firestore
    await addDoc(collection(db, "teamMembers"), {
      name,
      email,
      role,
      createdAt: serverTimestamp()
    });
  },

  async updateMemberRole(id, role) {
    await updateDoc(doc(db, "teamMembers", id), { role });
  },

  async removeMember(id) {
    await deleteDoc(doc(db, "teamMembers", id));
  }
};
