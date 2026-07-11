import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbagZtJi5viJqXRlfUSdNZmWSf85GHVPg",
  authDomain: "devlyx-blog.firebaseapp.com",
  projectId: "devlyx-blog",
  storageBucket: "devlyx-blog.firebasestorage.app",
  messagingSenderId: "1003226725061",
  appId: "1:1003226725061:web:403d25ee27f2e67fc84eac",
  measurementId: "G-1GPR5ZTCZD"
};

// Initialize Firebase locally inside function runtime
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async (req, context) => {
  const baseUrl = 'https://devlyxsolutions.com';
  const staticPages = [
    '',
    '/about',
    '/services',
    '/blog',
    '/contact',
    '/projects',
    '/start-project'
  ];

  try {
    // Fetch posts
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const postsSnapshot = await getDocs(postsQuery);
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch projects
    const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const projectsSnapshot = await getDocs(projectsQuery);
    const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static Pages
    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Blog Posts
    posts.forEach(post => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.updatedAt?.seconds ? new Date(post.updatedAt.seconds * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    // Projects
    projects.forEach(proj => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/projects/${proj.slug}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400"
      }
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(`Error generating sitemap: ${error.message}`, { status: 500 });
  }
};

export const config = {
  path: "/sitemap.xml",
  preferStatic: false
};
