import { db } from "../firebaseConfig";
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  writeBatch
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
  },

  // SEED FUNCTION: Migrate aeronox-solutions data to new_site2
  async seedAeronoxData() {
    const portfolioData = await import("../data/portfolio.json");
    // Ensure we have an array (depending on how import works, it might be portfolioData.default or the array itself)
    const ALL_PROJECTS = portfolioData.default || portfolioData;
    
    if (!Array.isArray(ALL_PROJECTS)) {
        console.error("Portfolio data is not an array");
        return;
    }

    const batch = writeBatch(db);
    ALL_PROJECTS.forEach((proj) => {
      // Use the 'id' as the document ID for consistency, fallback to slug or generated ID if missing
      const docId = proj.id || proj.slug || doc(collection(db, PROJECT_COLLECTION)).id;
      const docRef = doc(db, PROJECT_COLLECTION, docId);
      
      // We will parse tags into a techStack array for backwards compatibility with new_site2
      const techStack = proj.tags ? proj.tags.split(',').map(t => t.trim()) : (proj.techStack || []);
      
      batch.set(docRef, {
        title: proj.title || '',
        slug: proj.slug || docId,
        category: proj.category || 'Web Development',
        client: proj.client || '',
        clientLocation: proj.clientLocation || '',
        desc: proj.desc || '',
        content: proj.content || '',
        image: proj.image ? proj.image.replace('./images/', '/images/') : '',
        growthBadge: proj.growthBadge || '',
        beforeStats: proj.beforeStats || '',
        afterStats: proj.afterStats || '',
        challenge: proj.challenge || '',
        solution: proj.solution || '',
        order: proj.order || 0,
        techStack: techStack,
        links: proj.links || [],
        color: proj.color || '#6a35ff', // Default
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    await batch.commit();
    return `Seeding complete! ${ALL_PROJECTS.length} projects imported.`;
  }
};
