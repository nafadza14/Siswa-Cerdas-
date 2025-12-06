import React, { useState } from 'react';
import { MOCK_BLOG_POSTS } from '../../constants';
import { BlogPost } from '../../types';
import { Edit2, Trash2, Plus, X, Save } from 'lucide-react';

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentPost({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      author: 'Teacher',
      category: 'General'
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentPost.title || !currentPost.content) {
      alert("Title and Content are required");
      return;
    }

    if (posts.find(p => p.id === currentPost.id)) {
      setPosts(prev => prev.map(p => p.id === currentPost.id ? currentPost as BlogPost : p));
    } else {
      setPosts(prev => [currentPost as BlogPost, ...prev]);
    }
    setIsEditing(false);
    setCurrentPost({});
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold text-dark">Blog Manager</h1>
           <p className="text-gray-500">Create and edit articles for SMA 1 Sooko Sustainability Blog</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold shadow hover:bg-teal-600 transition"
        >
           <Plus size={18} /> New Article
        </button>
      </div>

      {/* Editor Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
           <div className="bg-white w-full max-w-3xl rounded-3xl p-8 shadow-2xl relative">
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-xl font-bold text-dark mb-6">
                {posts.find(p => p.id === currentPost.id) ? 'Edit Article' : 'New Article'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={currentPost.title || ''} 
                    onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <input 
                      type="text" 
                      value={currentPost.category || ''} 
                      onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={currentPost.imageUrl || ''} 
                      onChange={e => setCurrentPost({...currentPost, imageUrl: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt (Short Description)</label>
                  <textarea 
                    value={currentPost.excerpt || ''} 
                    onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                    rows={2}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                  <textarea 
                    value={currentPost.content || ''} 
                    onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                    rows={10}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                 <button onClick={() => setIsEditing(false)} className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl">Cancel</button>
                 <button onClick={handleSave} className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-teal-600 flex items-center gap-2">
                   <Save size={18} /> Save Article
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
           <thead>
             <tr className="bg-gray-50 border-b border-gray-100">
               <th className="p-4 font-semibold text-gray-600">Title</th>
               <th className="p-4 font-semibold text-gray-600 w-32">Category</th>
               <th className="p-4 font-semibold text-gray-600 w-32">Date</th>
               <th className="p-4 font-semibold text-gray-600 w-32">Author</th>
               <th className="p-4 font-semibold text-gray-600 w-32 text-center">Actions</th>
             </tr>
           </thead>
           <tbody>
             {posts.map(post => (
               <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                 <td className="p-4 font-bold text-dark">{post.title}</td>
                 <td className="p-4 text-sm text-gray-500">
                   <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase font-bold tracking-wide">{post.category}</span>
                 </td>
                 <td className="p-4 text-sm text-gray-500">{post.date}</td>
                 <td className="p-4 text-sm text-gray-500">{post.author}</td>
                 <td className="p-4">
                   <div className="flex justify-center gap-2">
                     <button onClick={() => handleEdit(post)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                     <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogManager;