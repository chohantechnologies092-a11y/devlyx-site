import { db } from "../firebaseConfig";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

const PROJECT_COLLECTION = "projects";

export const projectService = {
  // Get all projects
  async getAllProjects() {
    const q = query(collection(db, PROJECT_COLLECTION), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get single project by slug
  async getProjectBySlug(slug) {
    const q = query(collection(db, PROJECT_COLLECTION), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },

  // Create new project
  async createProject(projectData) {
    const docRef = await addDoc(collection(db, PROJECT_COLLECTION), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Update project
  async updateProject(id, projectData) {
    const docRef = doc(db, PROJECT_COLLECTION, id);
    await updateDoc(docRef, {
      ...projectData,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete project
  async deleteProject(id) {
    const docRef = doc(db, PROJECT_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
