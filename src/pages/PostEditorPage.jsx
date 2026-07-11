import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Typography from '@tiptap/extension-typography';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { 
  ArrowLeft, 
  Save, 
  Settings, 
  Image as ImageIcon, 
  Type, 
  Tag, 
  Clock, 
  ChevronRight,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Loader2,
  X,
  Plus,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { blogService } from '../services/blogService';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const CLOUDINARY_CLOUD_NAME = "dvjpw2pqh";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

const PostEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072',
    readingTime: '5 min read',
    excerpt: '',
    content: ''
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),
      Underline,
      Typography,
      TextStyle,
      Color,
      ImageResize.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full h-auto my-8 transition-all duration-500',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#6a35ff] underline font-bold',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Placeholder.configure({
        placeholder: 'Write your story...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const [initialContentLoaded, setInitialContentLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        if (id && id !== 'new') {
          fetchPost();
        } else {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [id, navigate]);

  const fetchPost = async () => {
    try {
      const posts = await blogService.getAllPosts();
      const post = posts.find(p => p.id === id);
      if (post) {
        setFormData(post);
        // We removed editor?.commands.setContent here because editor might be null at this exact moment.
        // It's handled by the useEffect below.
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Robustly load content into the editor once both the editor and the data are ready
  useEffect(() => {
    if (editor && formData.content && !initialContentLoaded && id !== 'new') {
      editor.commands.setContent(formData.content);
      setInitialContentLoaded(true);
    }
  }, [editor, formData.content, initialContentLoaded, id]);

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

  const handleSave = async () => {
    if (!formData.title) {
      alert("Please enter a title");
      return;
    }

    // Safety check: Ensure no base64 images remain
    if (formData.content.includes('data:image/')) {
      alert("Images are still uploading. Please wait a moment.");
      return;
    }

    setSaving(true);
    console.log("Saving post...");
    try {
      if (id && id !== 'new') {
        await blogService.updatePost(id, formData);
      } else {
        await blogService.createPost(formData);
      }
      console.log("Save successful");
      navigate('/dashboard/posts');
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving post! " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    setSaving(true);
    console.log("Starting Cloudinary upload...");

    // Immediate Base64 Preview
    const reader = new FileReader();
    reader.onload = async (readerEvent) => {
      const base64 = readerEvent.target.result;
      if (editor) {
        editor.chain().focus().setImage({ src: base64 }).run();
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error('Cloudinary upload failed');
        
        const data = await response.json();
        const url = data.secure_url;
        console.log("Cloudinary Upload successful:", url);
        
        // Swap base64 for real URL
        if (editor) {
          editor.commands.command(({ tr }) => {
            let swapped = false;
            tr.doc.descendants((node, pos) => {
              if (
                (node.type.name === 'image' || node.type.name === 'imageResize') && 
                node.attrs.src && node.attrs.src.startsWith('data:image/')
              ) {
                console.log("Swapping base64 for URL at pos:", pos);
                tr.setNodeMarkup(pos, undefined, { ...node.attrs, src: url });
                swapped = true;
              }
            });
            return swapped;
          });
          // Force an update to formData just in case the transaction doesn't trigger onUpdate
          setFormData(prev => ({ ...prev, content: editor.getHTML() }));
        }
      } catch (err) {
        console.error("Cloudinary error:", err);
        alert("Upload failed! Please ensure your Cloudinary preset is set to 'Unsigned'.");
      } finally {
        setSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Cover upload failed');
      
      const data = await response.json();
      setFormData(prev => ({ ...prev, coverImage: data.secure_url }));
    } catch (err) {
      console.error("Cover upload error:", err);
      alert("Cover upload failed!");
    } finally {
      setSaving(false);
    }
  };

  const addImageUrl = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowUrlInput(false);
    }
  };

  // Removed legacy addImage in favor of new URL input UI

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <Loader2 size={40} className="animate-spin text-[#6a35ff]" />
        <div className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Initializing WordPress-Style Editor</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Bar */}
      <header className="h-20 border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard/posts')}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-8 w-[1px] bg-gray-100" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status:</span>
            <span className="px-3 py-1 bg-green-50 text-[10px] font-black uppercase tracking-widest text-green-600 rounded-full">Draft</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showSettings ? 'bg-[#6a35ff] text-white' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-3 px-8 py-3 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-purple-500/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {id && id !== 'new' ? 'Update Post' : 'Publish'}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-[#fdfdfd] py-20 px-8">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Title Input */}
            <textarea
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Post Title"
              className="w-full text-5xl font-black text-gray-900 border-none bg-transparent focus:ring-0 resize-none placeholder:text-gray-100 tracking-tighter leading-tight"
              rows={1}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />

            {/* TipTap Editor */}
            <div className="prose prose-lg max-w-none wordpress-editor">
              {/* Quick Toolbar (Fixed for convenience) */}
              {editor && (
                <div className="sticky top-24 z-20 mb-8 flex flex-col gap-2 max-w-fit">
                  <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl shadow-purple-500/5">
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-3 rounded-xl transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><Heading1 size={18}/></button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-3 rounded-xl transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><Heading2 size={18}/></button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-3 rounded-xl transition-all ${editor.isActive('heading', { level: 3 }) ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><Heading3 size={18}/></button>
                    <div className="w-[1px] h-6 bg-gray-100 mx-1" />
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-3 rounded-xl transition-all ${editor.isActive('bold') ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><Bold size={18}/></button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-3 rounded-xl transition-all ${editor.isActive('italic') ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><Italic size={18}/></button>
                    <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-3 rounded-xl transition-all ${editor.isActive('underline') ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><UnderlineIcon size={18}/></button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-3 rounded-xl transition-all ${editor.isActive('bulletList') ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><List size={18}/></button>
                    <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-3 rounded-xl transition-all ${editor.isActive('codeBlock') ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><Code size={18}/></button>
                    <div className="w-[1px] h-6 bg-gray-100 mx-1" />
                    <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-3 rounded-xl transition-all ${editor.isActive({ textAlign: 'left' }) ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><AlignLeft size={18}/></button>
                    <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-3 rounded-xl transition-all ${editor.isActive({ textAlign: 'center' }) ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><AlignCenter size={18}/></button>
                    <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-3 rounded-xl transition-all ${editor.isActive({ textAlign: 'right' }) ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50'}`}><AlignRight size={18}/></button>
                    <div className="w-[1px] h-6 bg-gray-100 mx-1" />
                    <label className="p-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-cyan-500 transition-all cursor-pointer">
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18}/>}
                      <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={saving} />
                    </label>
                    <button 
                      onClick={() => setShowUrlInput(!showUrlInput)} 
                      className={`p-3 rounded-xl transition-all ${showUrlInput ? 'bg-purple-50 text-[#6a35ff]' : 'text-gray-400 hover:bg-gray-50 hover:text-[#6a35ff]'}`}
                    >
                      <Plus size={18}/>
                    </button>
                  </div>

                  {showUrlInput && (
                    <div className="flex items-center gap-2 p-2 bg-white border border-gray-100 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
                      <input 
                        type="text" 
                        placeholder="Paste image URL..." 
                        className="px-4 py-2 bg-gray-50 border-none focus:ring-0 text-sm font-bold text-gray-900 rounded-xl min-w-[240px]"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addImageUrl()}
                        autoFocus
                      />
                      <button 
                        onClick={addImageUrl}
                        className="p-2 bg-[#6a35ff] text-white rounded-xl hover:bg-[#5829d6] transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                      <button 
                        onClick={() => setShowUrlInput(false)}
                        className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <EditorContent editor={editor} className="min-h-[500px]" />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        {showSettings && (
          <aside className="w-96 border-l border-gray-100 overflow-y-auto bg-white p-8 space-y-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Post Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-900"><X size={18}/></button>
            </div>

            <div className="space-y-6">
              {/* URL Slug */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <LinkIcon size={12} className="text-cyan-500" /> URL Slug
                </label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-[#6a35ff] transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Tag size={12} className="text-purple-500" /> Category
                </label>
                <input 
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-[#6a35ff] transition-all"
                />
              </div>

              {/* Reading Time */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Clock size={12} className="text-orange-500" /> Reading Time
                </label>
                <input 
                  type="text" 
                  value={formData.readingTime}
                  onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-[#6a35ff] transition-all"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <ImageIcon size={12} className="text-blue-500" /> Cover Image
                </label>
                <div className="aspect-video rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden group relative">
                  <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="px-4 py-2 bg-white rounded-full text-[9px] font-black uppercase tracking-widest text-gray-900 shadow-xl cursor-pointer hover:scale-105 transition-all">
                      {saving ? 'Uploading...' : 'Change Image'}
                      <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} disabled={saving} />
                    </label>
                  </div>
                </div>
                <input 
                  type="text" 
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-medium text-gray-400 focus:outline-none focus:border-[#6a35ff] transition-all"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Type size={12} className="text-emerald-500" /> SEO Excerpt
                </label>
                <textarea 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 focus:outline-none focus:border-[#6a35ff] transition-all min-h-[120px] resize-none"
                  placeholder="Summary for search results..."
                />
              </div>
            </div>
          </aside>
        )}
      </main>

      <style>{`
        .wordpress-editor .ProseMirror:focus {
          outline: none;
        }
        .wordpress-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .wordpress-editor .ProseMirror {
          min-height: 500px;
          font-size: 1.25rem;
          line-height: 1.8;
          color: #1f2937;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .wordpress-editor .ProseMirror p {
          margin-bottom: 1.5rem;
        }
        .wordpress-editor .ProseMirror h1 { font-weight: 900; font-size: 3rem; letter-spacing: -0.05em; margin-bottom: 2rem; color: #111827; }
        .wordpress-editor .ProseMirror h2 { font-weight: 900; font-size: 2rem; letter-spacing: -0.02em; margin-top: 3.5rem; margin-bottom: 1.5rem; color: #111827; }
        .wordpress-editor .ProseMirror h3 { font-weight: 800; font-size: 1.5rem; letter-spacing: -0.01em; margin-top: 2.5rem; margin-bottom: 1rem; color: #111827; }
        .wordpress-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 1.5rem;
          margin: 3rem 0;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
        .wordpress-editor .ProseMirror blockquote {
          border-left: 6px solid #6a35ff;
          padding-left: 2rem;
          font-style: italic;
          font-size: 1.5rem;
          color: #4b5563;
          margin: 3rem 0;
          background: #f9fafb;
          padding-top: 2rem;
          padding-bottom: 2rem;
          border-top-right-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
        }
        .wordpress-editor .ProseMirror code {
          background: #f3f4f6;
          color: #6a35ff;
          padding: 0.3rem 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.9em;
          font-weight: 600;
        }
        .wordpress-editor .ProseMirror pre {
          background: #111827;
          color: #f3f4f6;
          padding: 2rem;
          border-radius: 1.5rem;
          margin: 2.5rem 0;
          font-family: 'JetBrains Mono', monospace;
          overflow-x: auto;
        }

        /* Image Resize Handles */
        .wordpress-editor .ProseMirror .image-resizer {
          display: inline-block;
          position: relative;
          line-height: 0;
        }
        .wordpress-editor .ProseMirror .image-resizer img {
          display: block;
          margin: 0;
        }
        .wordpress-editor .ProseMirror [data-text-align="left"] { text-align: left; }
        .wordpress-editor .ProseMirror [data-text-align="center"] { text-align: center; }
        .wordpress-editor .ProseMirror [data-text-align="right"] { text-align: right; }
        
        .wordpress-editor .ProseMirror .image-resizer:hover::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid #6a35ff;
          pointer-events: none;
          border-radius: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default PostEditorPage;
