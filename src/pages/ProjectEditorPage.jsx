import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  ArrowLeft, Save, Loader2, Image as ImageIcon, 
  Type, Tag, Palette, Link as LinkIcon, Plus, Trash2, Hash
} from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = "dvjpw2pqh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

const ProjectEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Technology',
    desc: '',
    longDescription: '',
    color: '#6a35ff',
    image: '',
    mockupImage: '',
    gallery: [],
    order: 0,
    features: [''],
    techStack: [''],
    stats: [{ label: '', value: '' }],
    links: [{ type: 'web', label: 'View Project', url: '' }]
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        if (id && id !== 'new') {
          fetchProject();
        } else {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [id, navigate]);

  const fetchProject = async () => {
    try {
      const projects = await projectService.getAllProjects();
      const proj = projects.find(p => p.id === id);
      if (proj) {
        // Ensure arrays exist
        setFormData({
          ...proj,
          longDescription: proj.longDescription || '',
          mockupImage: proj.mockupImage || '',
          gallery: proj.gallery?.length ? proj.gallery : [],
          features: proj.features?.length ? proj.features : [''],
          techStack: proj.techStack?.length ? proj.techStack : [''],
          stats: proj.stats?.length ? proj.stats : [{ label: '', value: '' }],
          links: proj.links?.length ? proj.links : [{ type: 'web', label: 'View Project', url: '' }]
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      title, 
      slug: id && id !== 'new' ? prev.slug : generateSlug(title) 
    }));
  };

  const handleArrayChange = (field, index, value, subfield = null) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      if (subfield) {
        newArray[index] = { ...newArray[index], [subfield]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field, defaultItem) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], defaultItem] }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleImageUpload = async (e, type = 'image') => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: fd
      });

      if (!response.ok) throw new Error('Image upload failed');
      
      const data = await response.json();
      if (type === 'gallery') {
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, data.secure_url] }));
      } else if (type === 'mockup') {
        setFormData(prev => ({ ...prev, mockupImage: data.secure_url }));
      } else {
        setFormData(prev => ({ ...prev, image: data.secure_url }));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed!");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("Please enter title and slug");
      return;
    }

    // Clean empty items before saving
    const cleanedData = {
      ...formData,
      gallery: formData.gallery.filter(g => g.trim() !== ''),
      features: formData.features.filter(f => f.trim() !== ''),
      techStack: formData.techStack.filter(t => t.trim() !== ''),
      stats: formData.stats.filter(s => s.label.trim() !== '' && s.value.trim() !== ''),
      links: formData.links.filter(l => l.url.trim() !== ''),
      order: Number(formData.order) || 0
    };

    setSaving(true);
    try {
      if (id && id !== 'new') {
        await projectService.updateProject(id, cleanedData);
      } else {
        await projectService.createProject(cleanedData);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving project: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader2 size={40} className="animate-spin text-[#6a35ff]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar */}
      <header className="h-20 border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-8 w-[1px] bg-gray-200" />
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Project Editor</h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-8 py-3 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-purple-500/30 transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {id && id !== 'new' ? 'Update Project' : 'Publish Project'}
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2"><Type size={18} className="text-[#6a35ff]"/> Basic Info</h2>
            
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Project Title"
              className="w-full text-4xl font-black text-gray-900 border-none bg-transparent focus:ring-0 placeholder:text-gray-300 px-0"
            />
            
            <textarea
              value={formData.desc}
              onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
              placeholder="Short Description..."
              className="w-full text-gray-900 font-medium border-none bg-transparent focus:ring-0 resize-none px-0 min-h-[80px]"
            />
            
            <textarea
              value={formData.longDescription || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
              placeholder="Long Article / Editorial Description..."
              className="w-full text-gray-900 font-medium border-t border-gray-100 pt-4 bg-transparent focus:ring-0 resize-y px-0 min-h-[200px]"
            />
          </div>

          {/* Features & Tech */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Key Features</h2>
              <div className="space-y-3">
                {formData.features.map((feat, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={feat} onChange={(e) => handleArrayChange('features', i, e.target.value)} className="flex-1 text-sm p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#6a35ff] text-gray-900" placeholder="E.g. Real-time sync" />
                    <button onClick={() => removeArrayItem('features', i)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button onClick={() => addArrayItem('features', '')} className="text-xs font-bold text-[#6a35ff] flex items-center gap-1 mt-2 hover:underline"><Plus size={14}/> Add Feature</button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Tech Stack</h2>
              <div className="space-y-3">
                {formData.techStack.map((tech, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={tech} onChange={(e) => handleArrayChange('techStack', i, e.target.value)} className="flex-1 text-sm p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#6a35ff] text-gray-900" placeholder="E.g. React.js" />
                    <button onClick={() => removeArrayItem('techStack', i)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button onClick={() => addArrayItem('techStack', '')} className="text-xs font-bold text-[#6a35ff] flex items-center gap-1 mt-2 hover:underline"><Plus size={14}/> Add Tech</button>
              </div>
            </div>
          </div>

          {/* Links & Stats */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Project Links</h2>
             <div className="space-y-4">
                {formData.links.map((link, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <select value={link.type} onChange={(e) => handleArrayChange('links', i, e.target.value, 'type')} className="p-3 bg-gray-50 rounded-xl border-none text-sm font-bold w-28 text-gray-900">
                      <option value="web">Web</option>
                      <option value="apple">Apple</option>
                      <option value="google">Google</option>
                    </select>
                    <input type="text" value={link.label} onChange={(e) => handleArrayChange('links', i, e.target.value, 'label')} className="w-32 text-sm p-3 bg-gray-50 rounded-xl border-none text-gray-900" placeholder="Label" />
                    <input type="text" value={link.url} onChange={(e) => handleArrayChange('links', i, e.target.value, 'url')} className="flex-1 text-sm p-3 bg-gray-50 rounded-xl border-none text-gray-900" placeholder="URL" />
                    <button onClick={() => removeArrayItem('links', i)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button onClick={() => addArrayItem('links', { type: 'web', label: 'View', url: '' })} className="text-xs font-bold text-[#6a35ff] flex items-center gap-1 hover:underline"><Plus size={14}/> Add Link</button>
             </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Impact Stats</h2>
             <div className="space-y-4">
                {formData.stats.map((stat, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={stat.label} onChange={(e) => handleArrayChange('stats', i, e.target.value, 'label')} className="flex-1 text-sm p-3 bg-gray-50 rounded-xl border-none text-gray-900" placeholder="Label (e.g. Active Users)" />
                    <input type="text" value={stat.value} onChange={(e) => handleArrayChange('stats', i, e.target.value, 'value')} className="w-32 text-sm p-3 bg-gray-50 rounded-xl border-none font-black text-gray-900" placeholder="Value (e.g. 1M+)" />
                    <button onClick={() => removeArrayItem('stats', i)} className="p-3 text-red-400 hover:bg-red-50 rounded-xl"><Trash2 size={16}/></button>
                  </div>
                ))}
                <button onClick={() => addArrayItem('stats', { label: '', value: '' })} className="text-xs font-bold text-[#6a35ff] flex items-center gap-1 hover:underline"><Plus size={14}/> Add Stat</button>
             </div>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">Details</h2>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><LinkIcon size={12}/> Slug</label>
              <input type="text" value={formData.slug} onChange={e => setFormData(p => ({...p, slug: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border-none text-sm font-bold text-gray-900" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Tag size={12}/> Category</label>
              <input type="text" value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border-none text-sm font-bold text-gray-900" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Palette size={12}/> Theme Color</label>
              <div className="flex gap-3">
                <input type="color" value={formData.color} onChange={e => setFormData(p => ({...p, color: e.target.value}))} className="w-12 h-12 rounded-xl border-none p-0 bg-transparent cursor-pointer" />
                <input type="text" value={formData.color} onChange={e => setFormData(p => ({...p, color: e.target.value}))} className="flex-1 p-3 bg-gray-50 rounded-xl border-none text-sm font-mono uppercase text-gray-900" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><Hash size={12}/> Display Order (Lower is first)</label>
              <input type="number" value={formData.order} onChange={e => setFormData(p => ({...p, order: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border-none text-sm font-bold text-gray-900" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Cover Image (Landscape)</h2>
            <div className="aspect-[4/3] rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden group relative flex items-center justify-center">
              {formData.image ? (
                <img src={formData.image} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-gray-400">No Image</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="px-4 py-2 bg-white rounded-full text-[9px] font-black uppercase tracking-widest text-gray-900 cursor-pointer shadow-xl">
                  {saving ? 'Uploading...' : 'Upload Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} disabled={saving} />
                </label>
              </div>
            </div>
            <input type="text" value={formData.image} onChange={e => setFormData(p => ({...p, image: e.target.value}))} className="w-full p-2 bg-gray-50 rounded-lg border-none text-[10px] text-gray-900" placeholder="Or paste image URL" />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Mobile Mockup (Portrait)</h2>
            <div className="aspect-[1/2] w-32 mx-auto rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden group relative flex items-center justify-center">
              {formData.mockupImage ? (
                <img src={formData.mockupImage} alt="Mockup" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-gray-400 text-center px-2">No Mockup</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="px-3 py-1.5 bg-white rounded-full text-[8px] font-black uppercase tracking-widest text-gray-900 cursor-pointer shadow-xl">
                  {saving ? 'Wait...' : 'Upload'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'mockup')} disabled={saving} />
                </label>
              </div>
            </div>
            <input type="text" value={formData.mockupImage || ''} onChange={e => setFormData(p => ({...p, mockupImage: e.target.value}))} className="w-full p-2 bg-gray-50 rounded-lg border-none text-[10px] text-gray-900" placeholder="Or paste image URL" />
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Gallery Images</h2>
              <label className="text-[10px] bg-[#6a35ff] text-white px-2 py-1 rounded cursor-pointer hover:bg-purple-600 transition-colors">
                <Plus size={12} className="inline mr-1" /> Add
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} disabled={saving} />
              </label>
            </div>
            {formData.gallery.length === 0 ? (
              <div className="text-xs text-gray-400 italic">No gallery images uploaded.</div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {formData.gallery.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={url} className="w-full h-full object-cover" alt="Gallery" />
                    <button 
                      onClick={() => removeArrayItem('gallery', i)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

      </main>
    </div>
  );
};

export default ProjectEditorPage;
