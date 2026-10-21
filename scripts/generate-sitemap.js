import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from the root directory
const env = loadEnv('production', path.resolve(__dirname, '..'), '');

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: "devlyx-blog.firebaseapp.com",
  projectId: "devlyx-blog",
  storageBucket: "devlyx-blog.firebasestorage.app",
  messagingSenderId: "1003226725061",
  appId: "1:1003226725061:web:403d25ee27f2e67fc84eac",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BASE_URL = 'https://devlyxsolutions.com';

async function generateSitemap() {
  console.log("Generating sitemap...");
  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  
  const urls = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/services', changefreq: 'weekly', priority: '0.9' },
    { loc: '/services/pharmacy-pos-software', changefreq: 'weekly', priority: '0.9' },
    { loc: '/products/pharmacy-pos-software', changefreq: 'weekly', priority: '0.9' },
    { loc: '/services/restaurant-pos-software', changefreq: 'weekly', priority: '0.9' },
    { loc: '/products/restaurant-pos-software', changefreq: 'weekly', priority: '0.9' },
    { loc: '/services/software-development-uae', changefreq: 'weekly', priority: '0.9' },
    { loc: '/products', changefreq: 'weekly', priority: '0.9' },
    { loc: '/projects', changefreq: 'weekly', priority: '0.9' },
    { loc: '/start-project', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog', changefreq: 'daily', priority: '0.9' },
    { loc: '/about', changefreq: 'monthly', priority: '0.7' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
    { loc: '/terms', changefreq: 'yearly', priority: '0.4' },
  ];

  try {
    // Fetch Projects
    console.log("Fetching projects for sitemap...");
    const projectsSnapshot = await getDocs(query(collection(db, 'projects')));
    projectsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.slug) {
        urls.push({
          loc: `/projects/${data.slug}`,
          changefreq: 'monthly',
          priority: '0.8'
        });
      }
    });

    // Fetch Blog Posts
    console.log("Fetching blog posts for sitemap...");
    const postsSnapshot = await getDocs(query(collection(db, 'posts')));
    postsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.slug) {
        urls.push({
          loc: `/blog/${data.slug}`,
          changefreq: 'monthly',
          priority: '0.7'
        });
      }
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log(`Successfully generated sitemap.xml with ${urls.length} entries.`);

    // Ensure Netlify functions-internal has CommonJS scope so Netlify Emails bundling never fails
    try {
      const fiDir = path.resolve(__dirname, '../.netlify/functions-internal');
      const emailsDir = path.resolve(fiDir, 'emails');
      fs.mkdirSync(fiDir, { recursive: true });
      fs.mkdirSync(emailsDir, { recursive: true });
      fs.writeFileSync(path.resolve(fiDir, 'package.json'), JSON.stringify({ type: "commonjs" }, null, 2));
      fs.writeFileSync(path.resolve(emailsDir, 'package.json'), JSON.stringify({ type: "commonjs" }, null, 2));
    } catch (e) {
      console.warn("Could not write functions-internal package.json:", e);
    }
    
    // Process exits successfully
    process.exit(0);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
