import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, AlignLeft, 
  AlignCenter, AlignRight, Link as LinkIcon, Undo, Redo, RemoveFormatting 
} from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const btnClass = (active) => `p-2 rounded hover:bg-gray-100 transition-colors ${active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200 rounded-t-xl">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold">
        <Bold size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic">
        <Italic size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Underline">
        <UnderlineIcon size={16} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Heading 1">
        <Heading1 size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Heading 2">
        <Heading2 size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))} title="Heading 3">
        <Heading3 size={16} />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
      
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet List">
        <List size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Numbered List">
        <ListOrdered size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Quote">
        <Quote size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Align Left">
        <AlignLeft size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Align Center">
        <AlignCenter size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Align Right">
        <AlignRight size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      <button type="button" onClick={setLink} className={btnClass(editor.isActive('link'))} title="Add Link">
        <LinkIcon size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} className={btnClass(false)} title="Clear Formatting">
        <RemoveFormatting size={16} />
      </button>

      <div className="flex-1" />

      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 text-gray-500 hover:text-gray-900 disabled:opacity-30" title="Undo">
        <Undo size={16} />
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 text-gray-500 hover:text-gray-900 disabled:opacity-30" title="Redo">
        <Redo size={16} />
      </button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder = 'Write something amazing...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className: 'prose prose-sm sm:prose-base focus:outline-none min-h-[250px] max-w-none p-4'
      }
    }
  });

  // Keep editor content in sync with external value if it changes drastically (like initial load)
  useEffect(() => {
    if (editor && value !== editor.getHTML() && value !== undefined) {
       if (value === '' && editor.getHTML() === '<p></p>') return;
       editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-300 rounded-xl bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
      <MenuBar editor={editor} />
      <div className="px-2 pb-2 overflow-y-auto max-h-[600px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
