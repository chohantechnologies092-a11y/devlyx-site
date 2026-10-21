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

export const DEFAULT_PROJECTS = [
  {
    id: "proj-durood-circle",
    title: "Durood Circle Global",
    slug: "durood-circle",
    category: "Mobile & Cloud Platform",
    entryType: "project",
    client: "Durood Circle Global",
    clientLocation: "Worldwide",
    desc: "High-concurrency global spiritual application serving tens of thousands of worldwide users with real-time counters, streaks, and community synchronization.",
    content: "<h2>Overview</h2><p>Durood Circle is a globally distributed application empowering thousands of active daily users to maintain spiritual streaks, contribute to global milestones, and sync counters in sub-second latency.</p><h2>The Engineering Challenge</h2><p>Synchronizing tens of thousands of concurrent counter clicks without database congestion or latency spikes required a custom aggregation layer and efficient local state syncing.</p><h2>The Solution</h2><p>Devlyx built a lightweight Flutter client with local batch syncing, backed by serverless Firebase Cloud Functions and Firestore triggers. Result: Zero downtime and 50,000+ active daily users.</p>",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=75",
    growthBadge: "50K+ Active Users",
    color: "#00a859",
    order: 1,
    techStack: ["Flutter", "Firebase", "Cloud Functions", "Node.js", "React"],
    features: [
      "Real-time global counters & offline batch sync",
      "Interactive streaks & push notification system",
      "Zero downtime high-concurrency cloud architecture"
    ],
    stats: [
      { value: "50K+", label: "Active Users" },
      { value: "99.9%", label: "Uptime" }
    ],
    links: [
      { type: "apple", url: "https://apps.apple.com", label: "App Store" },
      { type: "google", url: "https://play.google.com", label: "Google Play" }
    ]
  },
  {
    id: "proj-al-sama-suppliers",
    title: "AL Sama Suppliers Portal",
    slug: "al-sama-suppliers",
    category: "Enterprise Web & ERP",
    entryType: "project",
    client: "AL Sama Suppliers",
    clientLocation: "Rawalpindi, Pakistan",
    desc: "Wholesale distribution platform, multi-warehouse stock management, automated invoice generation, and customer ledger accounting.",
    content: "<h2>The Challenge</h2><p>AL Sama Suppliers, a major wholesale distributor in Rawalpindi, struggled with manual paper ledgers, fragmented warehouse tracking across thousands of fast-moving SKUs, and slow reconciliation.</p><h2>The Engineering Solution</h2><p>Devlyx architected a modern web-based inventory and B2B ordering portal. Featuring real-time stock deductions, multi-user role permissions, automated PDF invoices, and vendor account ledgers.</p><h2>The Results</h2><p>Order dispatch speed improved by 85%, eliminating stock discrepancies and saving over 30 hours of manual bookkeeping each week.</p>",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=75",
    growthBadge: "+85% Faster Dispatch",
    color: "#6a35ff",
    order: 2,
    techStack: ["React", "Node.js", "TailwindCSS", "PostgreSQL", "Express"],
    features: [
      "Automated invoice creation & SKU tracking",
      "Multi-location warehouse inventory synchronization",
      "Real-time vendor ledgers & balances"
    ],
    stats: [
      { value: "85%", label: "Faster Order Flow" },
      { value: "10K+", label: "SKUs Managed" }
    ],
    links: [
      { type: "web", url: "https://alsamasuppliers.com", label: "Live System" }
    ]
  },
  {
    id: "proj-malfak-contracting",
    title: "Malfak Contracting Bahrain",
    slug: "malfak-contracting",
    category: "Corporate Engineering Portal",
    entryType: "project",
    client: "Malfak Contracting",
    clientLocation: "Manama, Bahrain",
    desc: "Corporate civil contracting portal engineered for heavy construction tenders, milestone tracking, and regional client acquisition across the Gulf.",
    content: "<h2>Corporate Mission</h2><p>Malfak Contracting required an authoritative digital ecosystem that communicated their engineering prowess to government agencies and private developers across Bahrain and Saudi Arabia.</p><h2>Technical Architecture</h2><p>Devlyx built a lightning-fast responsive platform showcasing high-resolution project blueprints, interactive milestone timelines, and a secure Request-For-Quote (RFQ) pipeline.</p><h2>Outcome</h2><p>3x increase in qualified enterprise tender inquiries within 90 days of deployment.</p>",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=75",
    growthBadge: "3x Tender Inquiries",
    color: "#00c2cb",
    order: 3,
    techStack: ["React", "TailwindCSS", "Framer Motion", "Cloudflare", "Firebase"],
    features: [
      "Interactive civil engineering portfolio & blueprint galleries",
      "High-speed bilingual RFQ submission engine",
      "Gulf regional compliance & certification display"
    ],
    stats: [
      { value: "3x", label: "Inquiry Growth" },
      { value: "100%", label: "Mobile Optimized" }
    ],
    links: [
      { type: "web", url: "https://malfakcontracting.com", label: "Corporate Site" }
    ]
  },
  {
    id: "prod-pharmasync-pos",
    title: "PharmaSync POS Software",
    slug: "pharmasync-pos",
    category: "Desktop & Cloud POS",
    entryType: "product",
    client: "Healthcare & Retail Pharmacies",
    clientLocation: "Pakistan & GCC",
    desc: "High-speed desktop (Electron) and cloud POS engineered with sub-second barcode checkout, batch expiry countdown, formula search, and supplier ledger.",
    content: "<h2>Product Overview</h2><p>PharmaSync is a turnkey pharmacy management system built with React & Electron. It supports offline-first barcode scanning, thermal receipt printers, and automated expiry warnings.</p><h2>Core Modules</h2><ul><li>Batch & Expiry date tracking with automatic alerts</li><li>Fast drug generic & alternative medicine lookup</li><li>Distributor purchase orders and credit khata management</li><li>Multi-counter local network synchronization</li></ul>",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=75",
    videoUrl: "https://www.youtube.com/@Devlyxsolutions",
    growthBadge: "99.9% Billing Accuracy",
    color: "#3ecf8e",
    order: 4,
    techStack: ["React", "Electron", "SQLite", "TailwindCSS", "Node.js"],
    features: [
      "0ms latency barcode scan & thermal printing",
      "Batch expiry countdown alerts",
      "Automated purchase orders & formula lookup"
    ],
    stats: [
      { value: "99.9%", label: "Accuracy" },
      { value: "0.2s", label: "Checkout Time" }
    ]
  },
  {
    id: "prod-restocloud-pos",
    title: "RestoCloud Restaurant POS",
    slug: "restocloud-pos",
    category: "Cloud POS & KOT",
    entryType: "product",
    client: "Restaurants, Cafes & Franchises",
    clientLocation: "Global",
    desc: "All-in-one restaurant billing system featuring wireless Kitchen Order Tickets (KOT), interactive table layouts, rider tracking, and end-of-day profit analytics.",
    content: "<h2>Product Overview</h2><p>RestoCloud streamlines front-of-house and back-of-house operations for fine dining, cafes, and fast-food chains.</p><h2>Capabilities</h2><ul><li>Instant wireless KOT printing to kitchen stations</li><li>Visual floor layout & table reservation management</li><li>Split-bill payments and multi-currency billing</li><li>Delivery rider dispatch and live delivery tracking</li></ul>",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=75",
    videoUrl: "https://www.youtube.com/@Devlyxsolutions",
    growthBadge: "40% Faster Turnaround",
    color: "#f59e0b",
    order: 5,
    techStack: ["React", "Node.js", "WebSockets", "TailwindCSS", "PWA"],
    features: [
      "Instant wireless KOT printer routing",
      "Visual table booking & split bill payment",
      "Rider dispatch & daily sales audits"
    ],
    stats: [
      { value: "40%", label: "Turnaround Boost" },
      { value: "24/7", label: "Cloud Sync" }
    ]
  },
  {
    id: "prod-mobile-installment-khata",
    title: "EasyKhata & Installment Engine",
    slug: "mobile-installment-khata",
    category: "Fintech & Ledger",
    entryType: "product",
    client: "Electronics & Mobile Retailers",
    clientLocation: "Pakistan",
    desc: "Specialized installment recovery, EMI schedule tracking, customer KYC documentation, automated payment receipting, and ledger balance tracking.",
    content: "<h2>Product Overview</h2><p>Designed specifically for mobile phones and home appliances installment businesses to track monthly recoveries, markups, and customer guarantor records without paper khata books.</p><h2>Key Features</h2><ul><li>Automated EMI payment schedule generator</li><li>Guarantor documentation vault & KYC tracking</li><li>Instant WhatsApp & SMS receipt alerts</li><li>Defaulter aging reports and penalty calculations</li></ul>",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=75",
    videoUrl: "https://www.youtube.com/@Devlyxsolutions",
    growthBadge: "100% Ledger Automation",
    color: "#2563eb",
    order: 6,
    techStack: ["React", "Electron", "SQLite", "TailwindCSS"],
    features: [
      "Automated customer installment schedule",
      "Guarantor verification & ID document vault",
      "Instant WhatsApp & SMS receipt generation"
    ],
    stats: [
      { value: "100%", label: "Ledger Accuracy" },
      { value: "20hrs/wk", label: "Time Saved" }
    ]
  },
  {
    id: "prod-garments-retail-pos",
    title: "Garments & Apparel POS",
    slug: "garments-retail-pos",
    category: "Retail Management",
    entryType: "product",
    client: "Apparel & Fashion Retailers",
    clientLocation: "Pakistan & UAE",
    desc: "Thermal barcode label printing, size-color-brand inventory matrix, customer loyalty discounts, and multi-counter cash drawer control.",
    content: "<h2>Product Overview</h2><p>A specialized retail point-of-sale engineered for apparel, fashion boutiques, and footwear stores handling complex size and color variations.</p><h2>Key Features</h2><ul><li>Barcode tag designer and batch sticker printing</li><li>Color x Size x Brand inventory matrix</li><li>Flexible exchange and credit note processing</li><li>Customer loyalty points and festival campaign discounts</li></ul>",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=75",
    videoUrl: "https://www.youtube.com/@Devlyxsolutions",
    growthBadge: "3x Faster Checkout",
    color: "#ec4899",
    order: 7,
    techStack: ["React", "Electron", "TailwindCSS", "Node.js"],
    features: [
      "Custom barcode sticker generation",
      "Color / Size variant stock matrix",
      "Instant customer exchange & return processing"
    ],
    stats: [
      { value: "3x", label: "Faster Billing" },
      { value: "0", label: "Stock Discrepancy" }
    ]
  }
];

export const projectService = {
  // Get all projects
  async getAllProjects() {
    try {
      const q = query(collection(db, PROJECT_COLLECTION), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const firestoreProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (firestoreProjects && firestoreProjects.length > 0) {
        // Map any Firestore overrides onto default projects if they exist
        const firestoreBySlug = new Map(firestoreProjects.map(p => [p.slug, p]));
        const enrichedDefaults = DEFAULT_PROJECTS.map(def => {
          const remote = firestoreBySlug.get(def.slug);
          if (!remote) return def;
          return {
            ...def,
            ...remote,
            // Keep rich content/features from curated default if remote doc is empty/incomplete
            content: remote.content || def.content,
            features: (remote.features && remote.features.length > 0) ? remote.features : def.features,
            stats: (remote.stats && remote.stats.length > 0) ? remote.stats : def.stats,
            techStack: (remote.techStack && remote.techStack.length > 0) ? remote.techStack : def.techStack,
            growthBadge: remote.growthBadge || def.growthBadge,
            desc: remote.desc || def.desc,
            image: remote.image || def.image,
            links: (remote.links && remote.links.length > 0) ? remote.links : def.links
          };
        });

        const defaultSlugs = new Set(DEFAULT_PROJECTS.map(p => p.slug));
        const additionalProjects = firestoreProjects.filter(p => !defaultSlugs.has(p.slug));
        return [...enrichedDefaults, ...additionalProjects];
      }
      return DEFAULT_PROJECTS;
    } catch (error) {
      console.warn("Could not load projects from Firestore, using default curated projects:", error);
      return DEFAULT_PROJECTS;
    }
  },

  // Get single project by slug
  async getProjectBySlug(slug) {
    const defaultItem = DEFAULT_PROJECTS.find(p => p.slug === slug);
    try {
      const q = query(collection(db, PROJECT_COLLECTION), where("slug", "==", slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const remoteData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        if (!defaultItem) return remoteData;
        return {
          ...defaultItem,
          ...remoteData,
          content: remoteData.content || defaultItem.content,
          features: (remoteData.features && remoteData.features.length > 0) ? remoteData.features : defaultItem.features,
          stats: (remoteData.stats && remoteData.stats.length > 0) ? remoteData.stats : defaultItem.stats,
          desc: remoteData.desc || defaultItem.desc,
          image: remoteData.image || defaultItem.image,
          links: (remoteData.links && remoteData.links.length > 0) ? remoteData.links : defaultItem.links
        };
      }
      return defaultItem || null;
    } catch (error) {
      console.warn("Error fetching project by slug from Firestore, using default:", error);
      return defaultItem || null;
    }
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
        videoUrl: proj.videoUrl || '',
        color: proj.color || '#6a35ff', // Default
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    await batch.commit();
    return `Seeding complete! ${ALL_PROJECTS.length} projects imported.`;
  }
};
