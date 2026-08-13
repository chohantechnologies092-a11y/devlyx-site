import React, { useState, useEffect } from 'react';
import { Save, Loader2, Image as ImageIcon, Plus, Trash2, User, Users, FileText } from 'lucide-react';
import { aboutService } from '../services/aboutService';

const CLOUDINARY_CLOUD_NAME = "dvjpw2pqh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

const AboutSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await aboutService.getAboutData();
      setFormData(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load about data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await aboutService.updateAboutData(formData);
      alert('About page updated successfully!');
    } catch (err) {
      alert('Error saving data: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e, fieldPath, teamIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: uploadData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      const imageUrl = data.secure_url;

      if (teamIndex !== null) {
        const newTeam = [...formData.teamMembers];
        newTeam[teamIndex].image = imageUrl;
        setFormData(prev => ({ ...prev, teamMembers: newTeam }));
      } else {
        setFormData(prev => ({ ...prev, [fieldPath]: imageUrl }));
      }
    } catch (err) {
      console.error(err);
      alert('Image upload failed!');
    } finally {
      setSaving(false);
    }
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...(prev.teamMembers || []), { id: Date.now().toString(), name: '', role: '', image: '', linkedin: '' }]
    }));
  };

  const removeTeamMember = (index) => {
    const newTeam = [...formData.teamMembers];
    newTeam.splice(index, 1);
    setFormData(prev => ({ ...prev, teamMembers: newTeam }));
  };

  const handleTeamChange = (index, field, value) => {
    const newTeam = [...formData.teamMembers];
    newTeam[index][field] = value;
    setFormData(prev => ({ ...prev, teamMembers: newTeam }));
  };

  if (loading || !formData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#6a35ff]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">About Page</h1>
          <p className="text-gray-500 font-medium">Manage content, team members, and CEO message.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-8 py-4 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-purple-500/30 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </header>

      <div className="space-y-10">
        {/* CEO Message Section */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
          <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <User size={24} className="text-[#6a35ff]" />
            CEO Message
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">CEO Portrait</label>
              <div className="aspect-[3/4] rounded-3xl bg-gray-50 border border-gray-100 overflow-hidden relative group">
                {formData.ceoImage ? (
                  <img src={formData.ceoImage} alt="CEO" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={48} /></div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="px-6 py-3 bg-white rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer hover:scale-105 transition-all">
                    Upload
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'ceoImage')} disabled={saving} />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Name</label>
                  <input 
                    type="text" 
                    value={formData.ceoName || ''}
                    onChange={(e) => setFormData(p => ({ ...p, ceoName: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#6a35ff]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Role</label>
                  <input 
                    type="text" 
                    value={formData.ceoRole || ''}
                    onChange={(e) => setFormData(p => ({ ...p, ceoRole: e.target.value }))}
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#6a35ff]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">SEO Message</label>
                <textarea 
                  value={formData.ceoMessage || ''}
                  onChange={(e) => setFormData(p => ({ ...p, ceoMessage: e.target.value }))}
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#6a35ff] min-h-[200px] resize-none"
                  placeholder="A strong, SEO-optimized message from the CEO..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <Users size={24} className="text-[#00c2cb]" />
              The Team
            </h2>
            <button 
              onClick={addTeamMember}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#6a35ff] transition-all"
            >
              <Plus size={14} /> Add Member
            </button>
          </div>
          
          {(!formData.teamMembers || formData.teamMembers.length === 0) ? (
            <div className="text-center py-12 text-gray-400 font-bold">No team members added yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.teamMembers.map((member, index) => (
                <div key={member.id || index} className="p-6 border border-gray-100 rounded-3xl bg-gray-50/50 relative group">
                  <button 
                    onClick={() => removeTeamMember(index)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 z-10"
                  >
                    <Trash2 size={14} />
                  </button>
                  
                  <div className="aspect-square rounded-2xl bg-gray-100 mb-6 overflow-hidden relative group/img">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={32} /></div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="px-4 py-2 bg-white rounded-full text-[9px] font-black uppercase tracking-widest cursor-pointer hover:scale-105 transition-all">
                        Upload
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'teamImage', index)} disabled={saving} />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => handleTeamChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:border-[#6a35ff]"
                    />
                    <input 
                      type="text" 
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => handleTeamChange(index, 'role', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 focus:outline-none focus:border-[#6a35ff]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
          <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <FileText size={24} className="text-emerald-500" />
            Hero & Mission
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Hero Title</label>
              <input 
                type="text" 
                value={formData.heroTitle || ''}
                onChange={(e) => setFormData(p => ({ ...p, heroTitle: e.target.value }))}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-lg font-black text-gray-900 focus:ring-2 focus:ring-[#6a35ff]"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Hero Subtitle</label>
              <textarea 
                value={formData.heroSubtitle || ''}
                onChange={(e) => setFormData(p => ({ ...p, heroSubtitle: e.target.value }))}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#6a35ff] min-h-[100px]"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Our Story (Narrative)</label>
              <textarea 
                value={formData.companyStory || ''}
                onChange={(e) => setFormData(p => ({ ...p, companyStory: e.target.value }))}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#6a35ff] min-h-[150px] resize-none"
                placeholder="Write the history or main narrative of your company..."
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Hero Background Image URL</label>
              <input 
                type="text" 
                value={formData.heroBackground || ''}
                onChange={(e) => setFormData(p => ({ ...p, heroBackground: e.target.value }))}
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#6a35ff]"
              />
              <div className="mt-4 w-full h-40 rounded-2xl overflow-hidden bg-gray-100 relative group">
                 {formData.heroBackground && <img src={formData.heroBackground} className="w-full h-full object-cover" alt="Hero background preview" />}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="px-6 py-3 bg-white rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer hover:scale-105 transition-all">
                      Upload New Background
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'heroBackground')} disabled={saving} />
                    </label>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutSettingsPage;
