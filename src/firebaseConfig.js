import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbagZtJi5viJqXRlfUSdNZmWSf85GHVPg",
  authDomain: "devlyx-blog.firebaseapp.com",
  projectId: "devlyx-blog",
  storageBucket: "devlyx-blog.firebasestorage.app",
  messagingSenderId: "1003226725061",
  appId: "1:1003226725061:web:403d25ee27f2e67fc84eac",
  measurementId: "G-1GPR5ZTCZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely
let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics could not be initialized:", err);
  }
}

export { analytics };
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


