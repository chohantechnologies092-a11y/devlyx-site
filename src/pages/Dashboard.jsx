import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import '../styles/dashboard-dark.css';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { blogService } from '../services/blogService';
import { statsService } from '../services/statsService';
import { projectService } from '../services/projectService';
import { leadService } from '../services/leadService';
import { 
  LayoutDashboard, 
  FileText, 
  Plus, 
  LogOut, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Search,
  ChevronRight,
  Image as ImageIcon,
  Type,
  Tag,
  Link2,
  Clock,
  ArrowLeft,
  Save,
  Loader2,
  Mail,
  User,
  Briefcase,
  CheckCircle2,
  XCircle,
  BarChart2,
  Globe,
  MonitorSmartphone,
  TrendingUp,
  X,
  Eye,
  Activity,
  Layers,
  Settings,
  Download,
  Share2,
  MessageCircle
} from 'lucide-react';
import WorldMap from '../components/WorldMap';
import { sitemapService } from '../services/sitemapService';
import { chatService } from '../services/chatService';
import ClientsDashboardPage from './ClientsDashboardPage';

import { useDashboardTheme } from '../hooks/useDashboardTheme';
import { teamService, ROLES } from '../services/teamService';
import { Moon, Sun, Menu, Users, Shield } from 'lucide-react';

// Shared theme context
export const ThemeCtx = React.createContext({ dark: false, t: {} });

// All nav items — filtered by role
const ALL_NAV = [
  { id: 'overview',     name: 'Overview',     icon: LayoutDashboard },
  { id: 'clients',      name: 'Clients',      icon: Briefcase },
  { id: 'projects',     name: 'Portfolio',    icon: Layers },
  { id: 'posts',        name: 'Articles',     icon: FileText },
  { id: 'support',      name: 'Live Support', icon: MessageCircle },
  { id: 'leads',        name: 'Leads',        icon: Mail },
  { id: 'subscribers',  name: 'Subscribers',  icon: CheckCircle2 },
  { id: 'analytics',    name: 'Analytics',    icon: BarChart2 },
  { id: 'team',         name: 'Team',         icon: Users },
  { id: 'settings',     name: 'Settings',     icon: Settings },
];

const NAV_PATHS = {
  overview: '/dashboard',
  clients: '/dashboard/clients',
  projects: '/dashboard/projects',
  posts: '/dashboard/posts',
  support: '/dashboard/support',
  leads: '/dashboard/leads',
  subscribers: '/dashboard/subscribers',
  analytics: '/dashboard/analytics',
  team: '/dashboard/team',
  settings: '/dashboard/settings',
};

// --- Dashboard Layout ---
const DashboardLayout = ({ children, activeTab, user }) => {
  const navigate = useNavigate();
  const { dark, toggle, t } = useDashboardTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('super_admin');

  useEffect(() => {
    if (user?.email) {
      teamService.getUserRole(user.email).then(setUserRole);
    }
  }, [user]);

  const allowedTabs = ROLES[userRole]?.allowedTabs || ROLES.super_admin.allowedTabs;
  const navItems = ALL_NAV.filter(n => allowedTabs.includes(n.id));

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const SidebarContent = ({ collapsed }) => (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 w-full">
      {/* Logo */}
      <div className={`py-7 border-b flex-shrink-0 flex items-center transition-all ${collapsed ? 'justify-center px-4' : 'justify-start px-8'}`} style={{ borderColor: t.cardBorder }}>
        <Link to="/" className="flex items-center gap-3" title="Home">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6a35ff] to-[#00c2cb] flex items-center justify-center text-white font-black text-sm flex-shrink-0">D</div>
          {!collapsed && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="text-base font-black tracking-tighter whitespace-nowrap" style={{ color: t.text }}>DEVLYX</div>
              <div className="text-[8px] uppercase tracking-[0.2em] font-bold whitespace-nowrap" style={{ color: '#00c2cb' }}>Admin Panel</div>
            </div>
          )}
        </Link>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-6 pt-5 pb-2 transition-all animate-in fade-in duration-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl w-fit" style={{ background: `${t.hover}` }}>
            <Shield size={10} style={{ color: '#6a35ff' }} />
            <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap" style={{ color: '#6a35ff' }}>
              {ROLES[userRole]?.label || 'Admin'}
            </span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className={`flex-1 ${collapsed ? 'px-3 mt-4' : 'px-4 mt-2'} py-2 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar transition-all duration-300`}>
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <Link
              key={item.id}
              to={NAV_PATHS[item.id]}
              onClick={() => setSidebarOpen(false)}
              title={collapsed ? item.name : ''}
              className={`flex items-center ${collapsed ? 'justify-center px-0 py-4' : 'gap-4 px-5 py-3.5'} rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-200`}
              style={{
                background: isActive ? '#6a35ff' : 'transparent',
                color: isActive ? '#fff' : t.textMuted,
                boxShadow: isActive ? '0 8px 24px rgba(106,53,255,0.3)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = t.hover; e.currentTarget.style.color = t.text; }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = t.textMuted; }}}
            >
              <item.icon size={17} className="flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className={`p-4 border-t flex-shrink-0 flex flex-col gap-2 transition-all duration-300 ${collapsed ? 'items-center px-2' : ''}`} style={{ borderColor: t.cardBorder }}>
        <div className={`flex items-center gap-3 ${collapsed ? 'px-0 py-2 justify-center' : 'px-3 py-3'} rounded-2xl w-full transition-all`} style={{ background: t.hover }} title={user?.email}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6a35ff] to-[#8b5cf6] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-in fade-in duration-300">
              <div className="text-[10px] font-black uppercase tracking-tight truncate whitespace-nowrap" style={{ color: t.text }}>{user?.email?.split('@')[0]}</div>
              <div className="text-[8px] font-bold uppercase tracking-widest truncate whitespace-nowrap" style={{ color: t.textMuted }}>{user?.email}</div>
            </div>
          )}
        </div>
        <div className={`flex items-center gap-2 w-full transition-all duration-300 ${collapsed ? 'flex-col' : ''}`}>
          <button
            onClick={toggle}
            title="Toggle Theme"
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all w-full`}
            style={{ background: t.hover, color: t.textMuted }}
          >
            {dark ? <Sun size={14} className="flex-shrink-0" /> : <Moon size={14} className="flex-shrink-0" />}
            {!collapsed && (dark ? 'Light' : 'Dark')}
          </button>
          <button
            onClick={handleLogout}
            title="Logout"
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all w-full`}
          >
            <LogOut size={14} className="flex-shrink-0" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ThemeCtx.Provider value={{ dark, t }}>
      <div
        className="flex min-h-screen transition-colors duration-200"
        style={{ background: t.bg, color: t.text }}
        data-dash-theme={dark ? 'dark' : 'light'}
      >

        {/* Desktop Sidebar */}
        <aside
          className={`${isCollapsed ? 'w-[88px]' : 'w-64'} fixed h-full z-30 hidden lg:flex flex-col border-r transition-all duration-300 ease-in-out`}
          style={{ background: t.sidebar, borderColor: t.cardBorder }}
        >
          <SidebarContent collapsed={isCollapsed} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                className="fixed left-0 top-0 h-full w-72 z-50 flex flex-col lg:hidden border-r shadow-2xl"
                style={{ background: t.sidebar, borderColor: t.cardBorder }}
              >
                <SidebarContent collapsed={false} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:ml-[88px]' : 'lg:ml-64'} flex flex-col min-h-screen w-full overflow-x-hidden`}>
          {/* Top Bar */}
          <header
            className="sticky top-0 z-20 px-4 md:px-6 py-4 border-b flex items-center gap-3 backdrop-blur-sm transition-colors duration-200"
            style={{ background: `${t.sidebar}e8`, borderColor: t.cardBorder }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl transition-colors shrink-0"
              style={{ background: t.hover }}
            >
              <Menu size={20} style={{ color: t.textMuted }} />
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-xl transition-colors shrink-0"
              style={{ background: t.hover }}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu size={20} style={{ color: t.textMuted }} />
            </button>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest truncate block" style={{ color: t.textMuted }}>
                {navItems.find(n => n.id === activeTab)?.name || 'Dashboard'}
              </span>
            </div>

            <button
              onClick={toggle}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shrink-0"
              style={{ background: t.hover, color: t.textMuted }}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </ThemeCtx.Provider>
  );
};

// --- Overview Component ---
const Overview = ({ posts, projects, stats, visits = [] }) => {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Welcome Back</h1>
        <p className="text-gray-500 font-medium">Here's what's happening with your content.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
            <Layers size={24} />
          </div>
          <div className="text-4xl font-black text-gray-900 mb-1">{projects?.length || 0}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Projects</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-[#6a35ff] mb-6">
            <FileText size={24} />
          </div>
          <div className="text-4xl font-black text-gray-900 mb-1">{posts.length}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Articles</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-[#00c2cb] mb-6">
            <Search size={24} />
          </div>
          <div className="text-4xl font-black text-gray-900 mb-1">{stats.totalVisits || 0}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Visits</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
            <Mail size={24} />
          </div>
          <div className="text-4xl font-black text-gray-900 mb-1">{stats.totalLeads || 0}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Leads</div>
        </div>
      </div>

      <WorldMap visits={visits} />

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
          <ExternalLink size={24} />
        </div>
        <div className="text-4xl font-black text-gray-900 mb-1">
          {posts.reduce((acc, post) => acc + (post.views || 0), 0)}
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Article Views</div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight flex items-center gap-4">
          Recent Activity
          <div className="h-[1px] flex-1 bg-gray-50"></div>
        </h2>
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-6 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1 group-hover:text-[#6a35ff] transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}</div>
                        <div className="text-[10px] font-bold text-[#00c2cb] uppercase tracking-widest flex items-center gap-1">
                            <Search size={10} /> {post.views || 0} views
                        </div>
                    </div>
                  </div>
                </div>
                <Link to={`/blog/${post.slug}`} target="_blank" className="text-gray-400 hover:text-[#6a35ff]">
                  <ExternalLink size={18} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold">No articles yet. Start by creating one!</div>
        )}
      </div>
    </div>
  );
};

// --- Status Badge helper ---
const STATUS_CONFIG = {
  new:          { label: 'New',           color: 'bg-amber-100 text-amber-700 border-amber-200' },
  in_progress:  { label: 'In Progress',   color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  won:          { label: 'Closed — Won',  color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  lost:         { label: 'Closed — Lost', color: 'bg-rose-100 text-rose-700 border-rose-200' },
};

// --- Leads Management Page ---
const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSource, setFilterSource] = useState('all'); // all, website, ai
  const [selected, setSelected] = useState(null);

  const load = () => statsService.getRecentLeads(100).then(data => { setLeads(data); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleStatus = async (id, status) => {
    await statsService.updateLeadStatus(id, status);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead permanently?')) return;
    await statsService.deleteLead(id);
    setLeads(prev => prev.filter(l => l.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = leads.filter(l => {
    const matchesSearch = l.name?.toLowerCase().includes(search.toLowerCase()) ||
                          l.email?.toLowerCase().includes(search.toLowerCase()) ||
                          l.service?.toLowerCase().includes(search.toLowerCase());
    
    if (filterSource === 'all') return matchesSearch;
    if (filterSource === 'ai') return matchesSearch && l.source === 'Dex AI Agent';
    if (filterSource === 'website') return matchesSearch && l.source !== 'Dex AI Agent';
    return matchesSearch;
  });

  const fmt = ts => ts?.seconds ? new Date(ts.seconds * 1000).toLocaleString() : 'Just now';

  const exportLeads = () => {
    const headers = ["Name", "Email", "Phone", "Service", "Budget", "Timeline", "Status", "Date"];
    const rows = leads.map(l => [
      l.name || '—',
      l.email || '—',
      l.phone || '—',
      Array.isArray(l.services) ? l.services.join('; ') : l.service || '—',
      l.budget || '—',
      l.timeline || '—',
      l.status || 'new',
      fmt(l.createdAt)
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `devlyx_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new;
    return <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${cfg.color}`}>{cfg.label}</span>;
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Leads</h1>
          <p className="text-gray-500 font-medium">All inquiries from your contact form.</p>
        </div>
        <button 
          onClick={exportLeads}
          className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-900 rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:bg-gray-50 transition-all active:scale-95"
        >
          <Download size={16} /> Export CSV
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Leads', val: leads.length, icon: <Mail size={18}/>, color: 'bg-purple-50 text-[#6a35ff]' },
          { label: 'Website Leads', val: leads.filter(l => l.source !== 'Dex AI Agent').length, icon: <CheckCircle2 size={18}/>, color: 'bg-blue-50 text-blue-600' },
          { label: 'AI Bot Leads', val: leads.filter(l => l.source === 'Dex AI Agent').length, icon: <Activity size={18}/>, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'In Progress', val: leads.filter(l => l.status==='in_progress').length, icon: <Briefcase size={18}/>, color: 'bg-orange-50 text-orange-500' },
        ].map((s,i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <div className="text-2xl font-black text-gray-900">{s.val}</div>
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search leads..." className="w-full pl-12 pr-5 py-3 bg-white border border-gray-100 rounded-full focus:outline-none text-sm font-medium"/>
          </div>
          <div className="flex bg-gray-100/50 p-1 rounded-full border border-gray-100">
            {['all', 'website', 'ai'].map(type => (
              <button
                key={type}
                onClick={() => setFilterSource(type)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filterSource === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {type === 'all' ? 'All Leads' : type === 'ai' ? 'AI Bot' : 'Website'}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#6a35ff] border-t-transparent rounded-full animate-spin"></div></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-bold">No leads yet. Submit the contact form to test.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Client</th>
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Phone</th>
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Service</th>
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Date</th>
                  <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-all cursor-pointer" onClick={() => setSelected(lead)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6a35ff] to-[#00c2cb] flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                          {lead.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="font-black text-gray-900 text-sm flex items-center gap-2">
                            {lead.name || '—'}
                            {lead.source === 'Dex AI Agent' && (
                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded text-[8px] tracking-widest uppercase border border-indigo-100">AI</span>
                            )}
                          </div>
                          <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="text-[10px] text-[#6a35ff] hover:underline">{lead.email}</a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-gray-600 tracking-tight">{lead.phone || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-50 text-[9px] font-black uppercase tracking-widest text-[#6a35ff] rounded-full">
                        {Array.isArray(lead.services) ? lead.services[0] + (lead.services.length > 1 ? ` +${lead.services.length-1}` : '') : lead.service || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                      {(() => {
                        const cfg = STATUS_CONFIG[lead.status || 'new'] || STATUS_CONFIG.new;
                        return (
                          <div className="relative group/status">
                            <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full border cursor-pointer select-none ${cfg.color}`}>
                              {cfg.label} ▾
                            </span>
                            <div className="absolute left-0 top-8 z-30 bg-white border border-gray-100 rounded-2xl shadow-2xl p-2 space-y-1 hidden group-hover/status:block w-48 animate-in fade-in zoom-in-95 duration-200">
                              {Object.entries(STATUS_CONFIG).map(([key, c]) => (
                                <button key={key} onClick={() => handleStatus(lead.id, key)}
                                  className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${(lead.status||'new')===key ? c.color : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                                  {c.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-400">{fmt(lead.createdAt)}</td>
                    <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setSelected(lead)} className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a35ff] hover:border-purple-100 transition-all"><Eye size={14}/></button>
                        <button onClick={() => handleDelete(lead.id)} className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelected(null)}/>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Lead Details</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Received {fmt(selected.createdAt)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all"><X size={18}/></button>
            </div>
            <div className="p-8 flex-1 space-y-8">
              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6a35ff] to-[#00c2cb] flex items-center justify-center text-white text-2xl font-black">
                  {selected.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="text-xl font-black text-gray-900">{selected.name}</div>
                  <div className="flex flex-col gap-1 mt-1">
                    <a href={`mailto:${selected.email}`} className="text-sm text-[#6a35ff] font-bold hover:underline">{selected.email}</a>
                    {selected.phone && (
                      <a href={`tel:${selected.phone}`} className="text-xs text-gray-500 font-bold hover:text-gray-900 transition-colors">{selected.phone}</a>
                    )}
                  </div>
                </div>
              </div>
              {/* Status */}
              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Status</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <button key={key} onClick={() => handleStatus(selected.id, key)}
                      className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-full border transition-all ${(selected.status||'new')===key ? cfg.color+' scale-105' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'}`}>
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Source', val: selected.source || 'Website' },
                  { label: 'Service(s)', val: Array.isArray(selected.services) ? selected.services.join(', ') : selected.service || 'General' },
                  { label: 'Timeline', val: selected.timeline || '—' },
                  { label: 'Budget Tier', val: selected.budget || '—' },
                  { label: 'Estimate Range', val: selected.calculatedEstimate || '—', color: 'text-[#00a859]' },
                ].map((item, i) => (
                  <div key={i} className={`p-4 bg-gray-50 rounded-2xl ${item.label === 'Estimate Range' ? 'col-span-2' : ''}`}>
                    <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</div>
                    <div className={`font-black text-xs uppercase tracking-tight ${item.color || 'text-gray-900'}`}>{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Features Chip Grid */}
              {selected.features?.length > 0 && (
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Features Requested</label>
                  <div className="flex flex-wrap gap-2">
                    {selected.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-500 shadow-sm">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project details */}
              <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50 space-y-6">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Core Description</div>
                  <div className="bg-white/50 rounded-2xl p-4 border border-white">
                    <p className="text-sm text-gray-700 font-medium leading-relaxed break-words whitespace-pre-wrap">{selected.description || selected.details || 'No details provided.'}</p>
                  </div>
                </div>

                {selected.serviceNotes && (
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Service Notes</div>
                    <div className="bg-white/50 rounded-2xl p-4 border border-white text-sm text-gray-600 italic">"{selected.serviceNotes}"</div>
                  </div>
                )}

                {selected.featureNotes && (
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Feature Notes</div>
                    <div className="bg-white/50 rounded-2xl p-4 border border-white text-sm text-gray-600 italic">"{selected.featureNotes}"</div>
                  </div>
                )}

                {selected.timelineNotes && (
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Timeline/Budget Notes</div>
                    <div className="bg-white/50 rounded-2xl p-4 border border-white text-sm text-gray-600 italic">"{selected.timelineNotes}"</div>
                  </div>
                )}
              </div>
            </div>
            {/* Actions */}
            <div className="p-8 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => {
                  const subject = encodeURIComponent("Response from Devlyx Solutions");
                  const body = encodeURIComponent(`Hi ${selected.name},\n\nThank you for reaching out regarding ${selected.service || 'your project'}. We've reviewed your request and would love to discuss this further.\n\nBest regards,\nThe Devlyx Team`);
                  window.location.href = `mailto:${selected.email}?subject=${subject}&body=${body}`;
                }}
                className="flex-1 py-4 bg-[#6a35ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] text-center hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={16} /> Quick Reply Template
              </button>
              <button onClick={() => handleDelete(selected.id)} className="w-14 h-14 rounded-2xl border border-red-100 flex items-center justify-center text-red-400 hover:bg-red-50 transition-all flex-shrink-0"><Trash2 size={18}/></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Analytics Page ---
const AnalyticsPage = ({ posts }) => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsService.getAllVisits().then(data => { 
      // Filter out admin routes so old data is hidden
      const filtered = data.filter(v => {
        const p = v.page || '';
        return !p.startsWith('/admin') && !p.startsWith('/login') && !p.startsWith('/dashboard');
      });
      setVisits(filtered); 
      setLoading(false); 
    });
  }, []);

  const avgTime = visits.length
    ? Math.round(visits.filter(v => v.timeOnSite > 0).reduce((a, v) => a + v.timeOnSite, 0) / (visits.filter(v => v.timeOnSite > 0).length || 1))
    : 0;

  const fmtTime = s => s >= 60 ? `${Math.floor(s/60)}m ${s%60}s` : `${s}s`;

  const byCountry = visits.reduce((acc, v) => {
    const key = v.country || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const countryList = Object.entries(byCountry).sort((a,b) => b[1]-a[1]).slice(0, 10);

  const byDevice = visits.reduce((acc, v) => {
    const key = v.device || 'Desktop';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topPage = visits.reduce((acc, v) => {
    const k = v.page || '/';
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const pageList = Object.entries(topPage).sort((a,b) => b[1]-a[1]).slice(0, 5);

  const maxCountry = countryList[0]?.[1] || 1;
  const topPost = [...posts].sort((a,b) => (b.views||0)-(a.views||0)).slice(0, 5);
  const maxViews = topPost[0]?.views || 1;

  // Group visits by date for the growth chart
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const getDateString = (createdAt) => {
    if (!createdAt) return null;
    if (createdAt.toDate && typeof createdAt.toDate === 'function') return createdAt.toDate().toISOString().split('T')[0];
    if (createdAt.seconds) return new Date(createdAt.seconds * 1000).toISOString().split('T')[0];
    if (typeof createdAt === 'string') return createdAt.split('T')[0];
    if (createdAt instanceof Date) return createdAt.toISOString().split('T')[0];
    if (typeof createdAt === 'number') return new Date(createdAt).toISOString().split('T')[0];
    return null;
  };

  const chartData = last7Days.map(date => {
    const count = visits.filter(v => getDateString(v.createdAt) === date).length;
    return { date: date.split('-').slice(1).join('/'), count };
  });
  const maxVisits = Math.max(...chartData.map(d => d.count), 1);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Analytics</h1>
        <p className="text-gray-500 font-medium">Real-time visitor data collected from your site.</p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#6a35ff] border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <>
          {/* Top stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: 'Total Sessions', val: visits.length, icon: <Activity size={18}/>, color: 'bg-purple-50 text-[#6a35ff]' },
              { label: 'Avg. Time on Site', val: fmtTime(avgTime), icon: <Clock size={18}/>, color: 'bg-cyan-50 text-[#00c2cb]' },
              { label: 'Top Country', val: countryList[0]?.[0] || '—', icon: <Globe size={18}/>, color: 'bg-green-50 text-green-600' },
              { label: 'Mobile Sessions', val: `${Math.round(((byDevice['Mobile']||0)/visits.length)*100)||0}%`, icon: <MonitorSmartphone size={18}/>, color: 'bg-orange-50 text-orange-500' },
            ].map((s,i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>{s.icon}</div>
                <div className="text-2xl font-black text-gray-900 mb-1">{s.val}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Growth Chart */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                Visitor Traffic
                <span className="text-[10px] bg-purple-50 text-[#6a35ff] px-3 py-1 rounded-lg tracking-widest uppercase">Last 7 Days</span>
              </h2>
            </div>
            
            <div className="relative h-64 mt-4 w-full">
              {/* Background Grid Lines */}
              <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-8 z-0">
                {[100, 75, 50, 25, 0].map((perc) => (
                  <div key={perc} className="w-full border-t border-dashed border-gray-100 relative">
                    <span className="absolute -left-1 -translate-x-full -top-2.5 text-[9px] font-black text-gray-300 uppercase pr-3">
                      {Math.round((maxVisits * perc) / 100)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart Bars */}
              <div className="absolute inset-x-0 bottom-8 top-0 flex items-end justify-between gap-2 sm:gap-6 pl-10 pr-2 z-10">
                {chartData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                    <div className="relative w-full flex flex-col items-center h-full justify-end">
                      {/* Tooltip */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all transform -translate-y-2 group-hover:translate-y-0 bg-gray-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap shadow-xl z-20">
                        {d.count} visits
                      </div>
                      {/* Bar */}
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: d.count > 0 ? `${(d.count / maxVisits) * 100}%` : '6px' }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className={`w-full max-w-[36px] rounded-t-xl group-hover:brightness-110 transition-all cursor-pointer relative ${
                          d.count > 0 
                            ? 'bg-gradient-to-t from-[#6a35ff] to-[#00c2cb] shadow-[0_0_20px_rgba(106,53,255,0.2)]' 
                            : 'bg-[#6a35ff]/10'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* X-Axis Labels */}
              <div className="absolute inset-x-0 bottom-0 flex justify-between gap-2 sm:gap-6 pl-10 pr-2 pt-3 border-t border-gray-100">
                {chartData.map((d, i) => (
                  <div key={i} className="flex-1 text-center text-[9px] font-black text-gray-400 uppercase tracking-widest truncate">
                    {d.date.split('/')[0]}/{d.date.split('/')[1]}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Blog Posts by Views */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 tracking-tight mb-6 flex items-center gap-3"><TrendingUp size={18} className="text-[#6a35ff]"/>Top Articles</h2>
              {topPost.length === 0 ? (
                <p className="text-gray-400 font-bold text-sm text-center py-8">No article views yet.</p>
              ) : (
                <div className="space-y-4">
                  {topPost.map((p,i) => (
                    <div key={p.id}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-black text-gray-700 truncate max-w-[70%]">{p.title}</span>
                        <span className="text-xs font-black text-[#6a35ff]">{p.views || 0} views</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#6a35ff] to-[#00c2cb] rounded-full transition-all" style={{width:`${((p.views||0)/maxViews)*100}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visits by Country */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 tracking-tight mb-6 flex items-center gap-3"><Globe size={18} className="text-[#00c2cb]"/>Visits by Country</h2>
              {countryList.length === 0 ? (
                <p className="text-gray-400 font-bold text-sm text-center py-8">No location data yet.</p>
              ) : (
                <div className="space-y-4">
                  {countryList.map(([country, count],i) => (
                    <div key={country}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-black text-gray-700">{country}</span>
                        <span className="text-xs font-black text-[#00c2cb]">{count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#00c2cb] to-[#6a35ff] rounded-full" style={{width:`${(count/maxCountry)*100}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Device & Page breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 tracking-tight mb-6 flex items-center gap-3"><MonitorSmartphone size={18} className="text-orange-500]"/>Devices</h2>
              <div className="space-y-4">
                {Object.entries(byDevice).map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className="font-black text-gray-900 text-sm">{device}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-gray-400">{Math.round((count/visits.length)*100)}%</span>
                      <span className="text-sm font-black text-[#6a35ff]">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 tracking-tight mb-6 flex items-center gap-3"><Eye size={18} className="text-green-500"/>Top Pages</h2>
              <div className="space-y-3">
                {pageList.map(([page, count]) => (
                  <div key={page} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className="font-bold text-gray-600 text-sm truncate max-w-[70%]">{page}</span>
                    <span className="text-sm font-black text-[#00c2cb]">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50">
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Recent Sessions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="border-b border-gray-50">
                  {['Country','City','Device','Browser','Page','Time on Site','Date'].map(h => (
                    <th key={h} className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {visits.slice(0, 20).map(v => (
                    <tr key={v.id} className="hover:bg-gray-50/50 transition-all">
                      <td className="px-6 py-4 text-sm font-bold text-gray-700">{v.country || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">{v.city || '—'}</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 bg-purple-50 text-[9px] font-black uppercase text-[#6a35ff] rounded-full">{v.device||'Desktop'}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">{v.browser || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">{v.page || '/'}</td>
                      <td className="px-6 py-4 text-sm font-black text-[#00c2cb]">{v.timeOnSite > 0 ? fmtTime(v.timeOnSite) : '—'}</td>
                      <td className="px-6 py-4 text-xs text-gray-400 font-bold">{v.createdAt?.seconds ? new Date(v.createdAt.seconds*1000).toLocaleString() : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- Settings Page ---
const SettingsPage = () => {
  const [resetting, setResetting] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [agentPrompt, setAgentPrompt] = useState('');
  const [savingPrompt, setSavingPrompt] = useState(false);
  const [promptSaved, setPromptSaved] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    chatService.getTraining().then(data => {
      setAgentPrompt(data.systemPrompt || chatService.getDefaultPrompt());
    });
  }, []);

  const handleSavePrompt = async () => {
    setSavingPrompt(true);
    try {
      await chatService.saveTraining(agentPrompt);
      setPromptSaved(true);
      setTimeout(() => setPromptSaved(false), 3000);
    } catch(e) {
      alert('Failed to save: ' + e.message);
    } finally {
      setSavingPrompt(false);
    }
  };

  const handleGenerateSitemap = async () => {
    setGenerating(true);
    try {
      const xml = await sitemapService.generateSitemap();
      try {
        if (window.showSaveFilePicker) {
          const handle = await window.showSaveFilePicker({
            suggestedName: 'sitemap.xml',
            types: [{
              description: 'XML Sitemap',
              accept: { 'text/xml': ['.xml'] },
            }],
          });
          const writable = await handle.createWritable();
          await writable.write(xml);
          await writable.close();
          alert('Sitemap saved successfully! Make sure to put it in the public folder if you want it served.');
        } else {
          // Fallback
          const blob = new Blob([xml], { type: 'text/xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'sitemap.xml';
          a.click();
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          // User didn't cancel
          const blob = new Blob([xml], { type: 'text/xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'sitemap.xml';
          a.click();
        }
      }
    } catch (error) {
      alert("Error generating sitemap: " + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleResetAnalytics = async () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000); // Reset confirmation state after 3s
      return;
    }

    console.log("Reset starting...");
    setResetting(true);
    try {
      await statsService.resetAnalytics();
      console.log("Reset successful");
      alert("Analytics have been reset successfully.");
      setConfirmReset(false);
    } catch (error) {
      console.error("Reset error:", error);
      alert("Error resetting analytics: " + error.message);
    } finally {
      setResetting(false);
      console.log("Reset process finished");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) return;
    setPassLoading(true);
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      alert('Error updating password: ' + error.message);
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Settings</h1>
        <p className="text-gray-500 font-medium">Control and configure your dashboard.</p>
      </header>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 space-y-10">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Search Engine Optimization</h3>
              <p className="text-sm text-gray-400 font-medium mt-1">Generate a fresh sitemap.xml to notify Google of new articles and projects.</p>
            </div>
            <button 
              onClick={handleGenerateSitemap}
              disabled={generating}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50 flex items-center gap-3"
            >
              {generating ? <Loader2 size={16} className="animate-spin" /> : <Globe size={16} />}
              Generate Sitemap.xml
            </button>
          </div>
        </section>

        <div className="h-[1px] bg-gray-50 w-full" />

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Reset Analytics</h3>
              <p className="text-sm text-gray-400 font-medium mt-1">Clear all visitor history and reset the global visit counter.</p>
            </div>
            <button 
              onClick={handleResetAnalytics}
              disabled={resetting}
              className={`px-8 py-4 ${confirmReset ? 'bg-red-600 animate-pulse' : 'bg-rose-500'} text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:-translate-y-1 transition-all shadow-xl shadow-rose-500/20 disabled:opacity-50 flex items-center gap-3`}
            >
              {resetting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              {confirmReset ? "Click Again to Confirm" : "Reset All Analytics"}
            </button>
          </div>
        </section>

        <div className="h-[1px] bg-gray-50 w-full" />

        <section className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Security</h3>
              <p className="text-sm text-gray-400 font-medium mt-1">Change your account password.</p>
            </div>
          </div>
          <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="password" 
              placeholder="Current Password" 
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#6a35ff] text-sm font-semibold text-gray-900"
            />
            <input 
              type="password" 
              placeholder="New Password" 
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#6a35ff] text-sm font-semibold text-gray-900"
            />
            <button 
              type="submit"
              disabled={passLoading || !oldPassword || !newPassword}
              className="px-8 py-4 bg-[#6a35ff] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {passLoading ? <Loader2 size={16} className="animate-spin" /> : 'Update Password'}
            </button>
          </form>
        </section>

        <div className="h-[1px] bg-gray-50 w-full" />

        {/* Agent Training Section */}
        <section className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6a35ff] to-[#00c2cb] flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </span>
                Train Dex AI Agent
              </h3>
              <p className="text-sm text-gray-400 font-medium mt-2 max-w-lg">
                Edit the agent's personality, knowledge, and behaviour. This is the "brain" of Dex — the more detail you add, the smarter it becomes.
              </p>
            </div>
            <button
              onClick={handleSavePrompt}
              disabled={savingPrompt}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all hover:-translate-y-1 shadow-xl disabled:opacity-50 ${
                promptSaved 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                  : 'bg-[#6a35ff] text-white shadow-purple-500/20'
              }`}
            >
              {savingPrompt ? <Loader2 size={16} className="animate-spin" /> : promptSaved ? '✓ Saved!' : 'Save Training'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">System Prompt — Active Brain</span>
            </div>
            <textarea
              value={agentPrompt}
              onChange={(e) => setAgentPrompt(e.target.value)}
              className="w-full pt-12 p-6 bg-gray-900 text-green-400 font-mono text-xs rounded-3xl border-none focus:ring-2 focus:ring-[#6a35ff] min-h-[400px] resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl">
            <p className="text-xs font-bold text-amber-700">
              💡 <strong>Pro Tips:</strong> Add your team's names, real case studies, or FAQs to make Dex even smarter. The agent reads this before every conversation.
            </p>
          </div>
        </section>

        <div className="h-[1px] bg-gray-50 w-full" />

        <section className="space-y-4">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">System Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Environment</div>
              <div className="font-black text-xs uppercase tracking-tight text-gray-900">Production Mode</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
              <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Version</div>
              <div className="font-black text-xs uppercase tracking-tight text-gray-900">v2.1.0-editorial</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};



// --- Live Support Page ---
const LiveSupportPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const unsubscribe = chatService.subscribeToAllChats(setChats);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const unsubscribe = chatService.subscribeToMessages(selectedChat.id, (msgs) => {
        setMessages(msgs);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
      chatService.markAsRead(selectedChat.id);
      return () => unsubscribe();
    }
  }, [selectedChat]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedChat) return;
    const text = replyText;
    setReplyText('');
    await chatService.sendMessage(selectedChat.id, text, 'admin');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col lg:flex-row gap-8">
      {/* Sidebar: Chat List */}
      <div className="w-full lg:w-80 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden flex-shrink-0" style={{ minHeight: '300px' }}>
        <div className="p-8 border-b border-gray-50">
           <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Chats</h2>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{chats.length} active sessions</p>
        </div>
        <div className="flex-1 overflow-y-auto">
           {chats.map(chat => (
             <button 
               key={chat.id}
               onClick={() => setSelectedChat(chat)}
               className={`w-full p-6 text-left border-b border-gray-50 transition-all hover:bg-gray-50 flex items-center justify-between ${selectedChat?.id === chat.id ? 'bg-purple-50/50' : ''}`}
             >
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 ${chat.unreadByAdmin ? 'bg-[#6a35ff] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {chat.visitorName?.[0] || 'V'}
                   </div>
                   <div className="max-w-[140px] min-w-0">
                      <div className="text-sm font-black text-gray-900 truncate">{chat.visitorName || 'Visitor'}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {chat.city && <span className="text-[9px] font-bold text-[#6a35ff] truncate">{chat.city}, {chat.country}</span>}
                        {!chat.city && <span className="text-[10px] font-medium text-gray-400 truncate">{chat.lastMessage || 'No messages'}</span>}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {chat.device && <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-bold uppercase">{chat.device}</span>}
                        {chat.browser && <span className="text-[8px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-bold uppercase">{chat.browser}</span>}
                      </div>
                   </div>
                </div>
               {chat.unreadByAdmin && <div className="w-2 h-2 rounded-full bg-[#6a35ff]"></div>}
             </button>
           ))}
        </div>
      </div>

      {/* Main: Chat Window */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
         {selectedChat ? (
           <>
             <header className="p-6 lg:p-8 border-b border-gray-50 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6a35ff] to-[#8b5cf6] flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                      <User size={20} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedChat.visitorName || 'Visitor'}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Session</p>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <button 
                     onClick={async () => {
                       if(window.confirm('Are you sure you want to delete this chat permanently?')) {
                         await chatService.deleteChat(selectedChat.id);
                         setSelectedChat(null);
                       }
                     }} 
                     className="px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                   >
                     <Trash2 size={14} /> <span className="hidden sm:inline">Delete</span>
                   </button>
                </div>
             </header>

             <div className="flex-1 flex overflow-hidden">
               {/* Messages Area */}
               <div className="flex-1 flex flex-col relative border-r border-gray-50">
                 <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 bg-gray-50/30">
                {messages.map((msg, i) => {
                  const isAdmin = msg.sender === 'admin';
                  const isAgent = msg.sender === 'agent';
                  return (
                    <div key={i} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[70%] p-6 rounded-3xl text-sm font-medium shadow-sm ${
                         isAdmin ? 'bg-gray-900 text-white rounded-tr-none' : 
                         isAgent ? 'bg-white border border-gray-100 text-gray-400 italic rounded-tl-none' :
                         'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                       }`}>
                          {msg.text}
                          <div className={`text-[8px] font-bold mt-2 opacity-40 uppercase tracking-widest ${isAdmin ? 'text-white' : 'text-gray-400'}`}>
                             {isAdmin ? 'Admin' : isAgent ? 'AI Agent' : 'Visitor'}
                          </div>
                       </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
             </div>

             <form onSubmit={handleReply} className="p-6 bg-white border-t border-gray-50">
                <div className="flex gap-4">
                   <input 
                     type="text" 
                     value={replyText}
                     onChange={(e) => setReplyText(e.target.value)}
                     placeholder="Type your reply..."
                     className="flex-1 p-5 bg-gray-50 rounded-[1.5rem] border-none focus:ring-2 focus:ring-[#6a35ff] font-medium text-sm"
                   />
                   <button 
                     type="submit"
                     className="px-8 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#6a35ff] transition-all shadow-xl shadow-purple-500/10 flex items-center justify-center gap-2"
                   >
                     Send
                   </button>
                </div>
             </form>
           </div>
           
           {/* Info Panel */}
           <div className="w-64 bg-white p-6 overflow-y-auto hidden md:block flex-shrink-0">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Visitor Intelligence</h4>
               
               <div className="space-y-3 mb-6">
                 {[  
                   { label: 'Country', value: selectedChat.country, icon: '🌍' },
                   { label: 'City', value: selectedChat.city, icon: '🏙️' },
                   { label: 'Device', value: selectedChat.device, icon: '📱' },
                   { label: 'Browser', value: selectedChat.browser, icon: '🌐' },
                   { label: 'Landing Page', value: selectedChat.landingPage, icon: '📄' },
                   { label: 'Referrer', value: selectedChat.referrer, icon: '🔗' },
                   { label: 'IP', value: selectedChat.ip, icon: '📡' },
                 ].map(({ label, value, icon }) => value && value !== 'Unknown' ? (
                   <div key={label} className="flex items-start justify-between gap-2">
                     <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 flex-shrink-0 mt-0.5">{icon} {label}</span>
                     <span className="text-[10px] font-bold text-gray-700 text-right truncate max-w-[110px]">{value}</span>
                   </div>
                 ) : null)}
               </div>

               <div className="h-[1px] bg-gray-100 mb-4" />
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">AI Discovery</h4>

               <div className="space-y-4">
                 <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-[#6a35ff] mb-2">State</p>
                   <div className="px-3 py-2 bg-purple-50 text-[#6a35ff] text-xs font-bold rounded-lg inline-block">
                     {selectedChat.aiState?.replace(/_/g, ' ') || 'UNKNOWN'}
                   </div>
                 </div>
                 
                 <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Goals</p>
                   <div className="p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 leading-relaxed border border-gray-100">
                     {selectedChat.aiData?.goals || <span className="text-gray-400 italic">Not collected yet</span>}
                   </div>
                 </div>

                 <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Budget</p>
                   <div className="p-3 bg-gray-50 rounded-xl text-xs font-black text-gray-900 border border-gray-100">
                     {selectedChat.aiData?.budget || <span className="text-gray-400 italic font-medium">Not collected yet</span>}
                   </div>
                 </div>

                 <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Contact</p>
                   <div className="p-3 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 border border-gray-100">
                     {selectedChat.aiData?.contact || <span className="text-gray-400 italic">Not collected yet</span>}
                   </div>
                 </div>
               </div>
           </div>
         </div>
         </>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8">
                 <MessageCircle size={48} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Select a Conversation</h2>
              <p className="text-gray-400 font-medium max-w-xs mx-auto">Select an active chat from the sidebar to start supporting your visitors.</p>
           </div>
         )}
      </div>
    </div>
  );
};

// --- Team Page ---
const TeamPage = () => {
  const { t } = React.useContext(ThemeCtx);
  const [members, setMembers] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'blogger' });

  const ROLE_COLORS = {
    super_admin: '#6a35ff', blogger: '#3b82f6',
    manager: '#10b981', support_agent: '#00c2cb'
  };

  useEffect(() => {
    teamService.getAllMembers().then(setMembers);
  }, []);

  const handleAdd = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      await teamService.addMember(form);
      setMembers(await teamService.getAllMembers());
      setForm({ name: '', email: '', role: 'blogger' });
      setAdding(false);
    } catch(e) { alert(e.message); }
    finally { setLoading(false); }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Remove this team member?')) return;
    await teamService.removeMember(id);
    setMembers(await teamService.getAllMembers());
  };

  const handleRoleChange = async (id, role) => {
    await teamService.updateMemberRole(id, role);
    setMembers(await teamService.getAllMembers());
  };

  return (
    <div className="space-y-10">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2" style={{ color: t.text }}>Team</h1>
          <p style={{ color: t.textMuted }} className="font-medium">Add members and control what they can access.</p>
        </div>
        <button
          onClick={() => setAdding(!adding)}
          className="flex items-center gap-3 px-8 py-4 bg-[#6a35ff] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-purple-500/30 transition-all"
        >
          <Plus size={16} /> Add Member
        </button>
      </header>

      {/* Add Member Form */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-8 rounded-[2rem] border"
            style={{ background: t.card, borderColor: t.cardBorder }}
          >
            <h3 className="text-lg font-black mb-6" style={{ color: t.text }}>New Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="p-4 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6a35ff]"
                style={{ background: t.input, borderColor: t.inputBorder, color: t.text }}
              />
              <input
                placeholder="Email Address"
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="p-4 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6a35ff]"
                style={{ background: t.input, borderColor: t.inputBorder, color: t.text }}
              />
              <select
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                className="p-4 rounded-2xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#6a35ff]"
                style={{ background: t.input, borderColor: t.inputBorder, color: t.text }}
              >
                {Object.entries(ROLES).filter(([k]) => k !== 'super_admin').map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 p-4 rounded-xl text-xs font-bold" style={{ background: `${t.hover}`, color: t.textMuted }}>
              📧 A password setup email will be sent to the new member automatically.
              <br/>
              🔒 <strong>Blogger</strong> → Articles only. <strong>Manager</strong> → Projects + Leads. <strong>Support Agent</strong> → Chat + Leads.
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={loading}
                className="px-8 py-4 bg-[#6a35ff] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Create Account
              </button>
              <button onClick={() => setAdding(false)} className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all" style={{ background: t.hover, color: t.textMuted }}>
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members List */}
      <div className="rounded-[2rem] border overflow-hidden" style={{ background: t.card, borderColor: t.cardBorder }}>
        {members.length === 0 ? (
          <div className="p-20 text-center">
            <Users size={48} className="mx-auto mb-4 opacity-20" style={{ color: t.text }} />
            <p className="font-black" style={{ color: t.textMuted }}>No team members yet. Add your first collaborator!</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: t.cardBorder }}>
                {['Member', 'Role', 'Access Scope', 'Actions'].map(h => (
                  <th key={h} className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest" style={{ color: t.textMuted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b transition-colors" style={{ borderColor: t.cardBorder }}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6a35ff] to-[#8b5cf6] flex items-center justify-center text-white font-black text-sm">
                        {m.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-sm" style={{ color: t.text }}>{m.name}</div>
                        <div className="text-[10px] font-medium" style={{ color: t.textMuted }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <select
                      value={m.role}
                      onChange={e => handleRoleChange(m.id, e.target.value)}
                      className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border focus:outline-none focus:ring-2 focus:ring-[#6a35ff]"
                      style={{ background: t.input, borderColor: t.inputBorder, color: ROLE_COLORS[m.role] || t.text }}
                    >
                      {Object.entries(ROLES).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-1">
                      {(ROLES[m.role]?.allowedTabs || []).map(tab => (
                        <span key={tab} className="px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest" style={{ background: t.hover, color: t.textMuted }}>
                          {tab}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <button
                      onClick={() => handleRemove(m.id)}
                      className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// --- Main Dashboard Controller ---
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ totalVisits: 0, totalLeads: 0 });
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        fetchData();
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [postsData, projectsData, statsData, visitsData] = await Promise.all([
        blogService.getAllPosts(),
        projectService.getAllProjects(),
        statsService.getOverviewStats(),
        statsService.getLatestVisits(100)
      ]);
      setPosts(postsData);
      setProjects(projectsData);
      setStats(statsData);
      setVisits(visitsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await blogService.deletePost(id);
      await fetchData();
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/editor/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f8f9fc] space-y-6">
        <div className="w-12 h-12 border-4 border-[#6a35ff] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Loading Dashboard</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <DashboardLayout activeTab="overview" user={user}>
          <Overview posts={posts} projects={projects} stats={stats} visits={visits} />
        </DashboardLayout>
      } />
      <Route path="/projects" element={
        <DashboardLayout activeTab="projects" user={user}>
          <div className="space-y-12">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Portfolio</h1>
                <p className="text-gray-500 font-medium">Manage your featured projects.</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/dashboard/projects/editor/new')}
                  className="flex items-center gap-3 px-8 py-4 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-purple-500/30 transition-all active:scale-95"
                >
                  <Plus size={16} /> New Project
                </button>
              </div>
            </header>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Project</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                              <img src={proj.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="max-w-xs">
                              <div className="font-black text-gray-900 line-clamp-1">{proj.title}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">/{proj.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1.5 bg-purple-50 text-[10px] font-black uppercase tracking-widest text-[#6a35ff] rounded-full">
                            {proj.category}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-sm font-bold text-gray-600">{proj.order || 0}</td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => navigate(`/dashboard/projects/editor/${proj.id}`)}
                              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a35ff] hover:border-purple-100 transition-all"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={async () => {
                                if (window.confirm("Delete this project?")) {
                                  await projectService.deleteProject(proj.id);
                                  fetchData();
                                }
                              }}
                              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DashboardLayout>
      } />
      <Route path="/support" element={
        <DashboardLayout activeTab="support" user={user}>
          <LiveSupportPage />
        </DashboardLayout>
      } />
      <Route path="/subscribers" element={
        <DashboardLayout activeTab="subscribers" user={user}>
          <SubscribersPage />
        </DashboardLayout>
      } />
      <Route path="/posts" element={
        <DashboardLayout activeTab="posts" user={user}>
          <div className="space-y-12">
            <header className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Articles</h1>
                <p className="text-gray-500 font-medium">Manage and organize your blog posts.</p>
              </div>
              <button 
                onClick={() => navigate('/dashboard/editor/new')}
                className="flex items-center gap-3 px-8 py-4 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-purple-500/30 transition-all active:scale-95"
              >
                <Plus size={16} /> New Article
              </button>
            </header>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <div className="relative w-96">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-full focus:outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Article</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Views</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {posts.map((post) => (
                      <tr key={post.id} className="group hover:bg-gray-50/50 transition-all cursor-pointer">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                              <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="max-w-xs">
                              <div className="font-black text-gray-900 line-clamp-1">{post.title}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">/{post.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1.5 bg-purple-50 text-[10px] font-black uppercase tracking-widest text-[#6a35ff] rounded-full">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2 text-[#00c2cb] font-black text-xs">
                              <Search size={14} /> {post.views || 0}
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="text-sm font-bold text-gray-600">
                            {new Date(post.createdAt?.seconds * 1000).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => navigate(`/dashboard/editor/${post.id}`)}
                              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a35ff] hover:border-purple-100 transition-all"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DashboardLayout>
      } />
      <Route path="/clients" element={
        <DashboardLayout activeTab="clients" user={user}>
          <ClientsDashboardPage />
        </DashboardLayout>
      } />
      <Route path="/leads" element={
        <DashboardLayout activeTab="leads" user={user}>
          <LeadsPage />
        </DashboardLayout>
      } />
      <Route path="/subscribers" element={
        <DashboardLayout activeTab="subscribers" user={user}>
          <SubscribersPage />
        </DashboardLayout>
      } />
      <Route path="/analytics" element={
        <DashboardLayout activeTab="analytics" user={user}>
          <AnalyticsPage posts={posts} />
        </DashboardLayout>
      } />
      <Route path="/team" element={
        <DashboardLayout activeTab="team" user={user}>
          <TeamPage />
        </DashboardLayout>
      } />
      <Route path="/settings" element={
        <DashboardLayout activeTab="settings" user={user}>
          <SettingsPage />
        </DashboardLayout>
      } />
    </Routes>
  );
};

// --- Subscribers Page ---
const SubscribersPage = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsService.getAllSubscribers().then(data => {
      setSubs(data);
      setLoading(false);
    });
  }, []);

  const exportSubs = () => {
    const headers = ["Email", "Date Joined"];
    const rows = subs.map(s => [
      s.email,
      s.createdAt?.seconds ? new Date(s.createdAt.seconds * 1000).toLocaleDateString() : '—'
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Subscribers</h1>
          <p className="text-gray-500 font-medium">Manage your newsletter audience.</p>
        </div>
        <button onClick={exportSubs} className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-900 rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl transition-all">
          <Download size={16} /> Export List
        </button>
      </header>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#6a35ff]" size={40} /></div>
        ) : subs.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-bold">No subscribers yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest text-gray-400">Subscriber Email</th>
                  <th className="px-10 py-6 text-[9px] font-black uppercase tracking-widest text-gray-400">Subscription Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subs.map(sub => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-all">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500"><Mail size={18} /></div>
                        <div className="font-black text-gray-900">{sub.email}</div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-sm font-bold text-gray-400">
                      {sub.createdAt?.seconds ? new Date(sub.createdAt.seconds * 1000).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
