import React, { useState, useEffect } from 'react';
import { clientService } from '../services/clientService';
import { Plus, Edit3, Trash2, Loader2, UploadCloud, X, Check, Globe, Image as ImageIcon } from 'lucide-react';
import { useDashboardTheme } from '../hooks/useDashboardTheme';

export default function ClientsDashboardPage() {
  const { t } = useDashboardTheme();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({ id: null, name: '', websiteUrl: '', testimonial: '', isActive: true });
  const [logoFile, setLogoFile] = useState(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleOpenModal = (client = null) => {
    if (client) {
      setFormData({ 
        id: client.id, 
        name: client.name, 
        websiteUrl: client.websiteUrl || '', 
        testimonial: client.testimonial || '',
        isActive: client.isActive 
      });
      setExistingLogoUrl(client.logoUrl);
    } else {
      setFormData({ id: null, name: '', websiteUrl: '', testimonial: '', isActive: true });
      setExistingLogoUrl('');
    }
    setLogoFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      console.log("Saving client...", formData, logoFile);
      if (formData.id) {
        await clientService.updateClient(formData.id, formData, logoFile, existingLogoUrl);
      } else {
        await clientService.addClient(formData, logoFile);
      }
      console.log("Client saved successfully!");
      setIsModalOpen(false);
      loadClients();
    } catch (e) {
      console.error("Error saving client:", e);
      alert('Failed to save client: ' + (e.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, logoUrl) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      await clientService.deleteClient(id, logoUrl);
      loadClients();
    }
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2" style={{ color: t?.text || '#111' }}>Clients</h1>
          <p className="font-medium" style={{ color: t?.textMuted || '#666' }}>Manage your client portfolio and testimonials.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 px-6 py-3 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl transition-all"
        >
          <Plus size={16} /> Add Client
        </button>
      </header>

      {/* List */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden" style={{ background: t?.cardBg || '#fff', borderColor: t?.cardBorder || '#eee' }}>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#6a35ff]" size={40} /></div>
        ) : clients.length === 0 ? (
          <div className="text-center py-20 font-bold" style={{ color: t?.textMuted || '#999' }}>No clients found. Click 'Add Client' to start.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b" style={{ borderColor: t?.cardBorder || '#eee', background: t?.hover || '#f9f9f9' }}>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: t?.textMuted || '#999' }}>Client</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: t?.textMuted || '#999' }}>Website</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest" style={{ color: t?.textMuted || '#999' }}>Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-right" style={{ color: t?.textMuted || '#999' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: t?.cardBorder || '#eee' }}>
                {clients.map(client => (
                  <tr key={client.id} className="transition-all" style={{ hover: { background: t?.hover || '#f9f9f9' } }}>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border flex items-center justify-center p-2">
                          {client.logoUrl ? (
                            <img src={client.logoUrl} alt={client.name} className="w-full h-full object-contain" />
                          ) : (
                            <ImageIcon size={20} className="text-gray-300" />
                          )}
                        </div>
                        <div>
                          <div className="font-black" style={{ color: t?.text || '#111' }}>{client.name}</div>
                          {client.testimonial && <div className="text-[10px] text-gray-400 mt-1 line-clamp-1 max-w-[200px]">{client.testimonial}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      {client.websiteUrl ? (
                        <a href={client.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#00c2cb] hover:underline">
                          <Globe size={12} /> Visit
                        </a>
                      ) : <span className="text-gray-400 text-xs">—</span>}
                    </td>
                    <td className="px-10 py-6">
                      {client.isActive ? (
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">Active</span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-50 text-gray-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-200">Hidden</span>
                      )}
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal(client)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-50 hover:text-[#6a35ff] transition-all">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDelete(client.id, client.logoUrl)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto" style={{ background: t?.cardBg || '#fff', color: t?.text || '#111' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">{formData.id ? 'Edit Client' : 'Add New Client'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: t?.textMuted || '#999' }}>Client Name *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-medium outline-none focus:border-[#6a35ff]/30 transition-all"
                  style={{ background: t?.inputBg, borderColor: t?.cardBorder, color: t?.text }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: t?.textMuted || '#999' }}>Website URL</label>
                <input 
                  type="url" 
                  value={formData.websiteUrl} 
                  onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-medium outline-none focus:border-[#6a35ff]/30 transition-all"
                  style={{ background: t?.inputBg, borderColor: t?.cardBorder, color: t?.text }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: t?.textMuted || '#999' }}>Client Logo *</label>
                <div className="flex items-center gap-4">
                  {(existingLogoUrl || logoFile) && (
                    <div className="w-16 h-16 rounded-xl border p-2 flex items-center justify-center bg-white" style={{ borderColor: t?.cardBorder }}>
                      <img src={logoFile ? URL.createObjectURL(logoFile) : existingLogoUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    className="flex-1"
                    required={!formData.id && !existingLogoUrl}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: t?.textMuted || '#999' }}>Testimonial (Optional)</label>
                <textarea 
                  rows={3}
                  value={formData.testimonial} 
                  onChange={(e) => setFormData({...formData, testimonial: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-medium outline-none focus:border-[#6a35ff]/30 transition-all"
                  style={{ background: t?.inputBg, borderColor: t?.cardBorder, color: t?.text }}
                  placeholder="What did they say about Devlyx?"
                />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 accent-[#6a35ff]"
                />
                <label htmlFor="isActive" className="text-sm font-bold" style={{ color: t?.text }}>Show on public site</label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-full text-sm font-bold"
                  style={{ color: t?.textMuted }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:bg-[#5b2ee0] transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
