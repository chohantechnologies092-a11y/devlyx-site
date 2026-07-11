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

const BLOG_COLLECTION = "posts";

export const blogService = {
  // Get all posts
  async getAllPosts() {
    const q = query(collection(db, BLOG_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get single post by slug
  async getPostBySlug(slug) {
    const q = query(collection(db, BLOG_COLLECTION), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },

  // Create new post
  async createPost(postData) {
    const docRef = await addDoc(collection(db, BLOG_COLLECTION), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Update post
  async updatePost(id, postData) {
    const docRef = doc(db, BLOG_COLLECTION, id);
    await updateDoc(docRef, {
      ...postData,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete post
  async deletePost(id) {
    const docRef = doc(db, BLOG_COLLECTION, id);
    await deleteDoc(docRef);
  }
};
