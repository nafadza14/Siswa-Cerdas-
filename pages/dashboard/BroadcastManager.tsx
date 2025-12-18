
import React, { useState } from 'react';
import { Megaphone, Send, Users, UserCheck } from 'lucide-react';

const BroadcastManager: React.FC = () => {
  const [target, setTarget] = useState<'ALL' | 'STUDENTS' | 'TEACHERS'>('ALL');

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-dark">Broadcast Center</h1>
        <p className="text-gray-500">Kirim pengumuman penting ke seluruh aplikasi user</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex gap-4">
           {[
             { id: 'ALL', label: 'Semua User', icon: Megaphone },
             { id: 'STUDENTS', label: 'Khusus Siswa', icon: Users },
             { id: 'TEACHERS', label: 'Khusus Guru', icon: UserCheck },
           ].map(t => (
             <button 
               key={t.id}
               onClick={() => setTarget(t.id as any)}
               className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                 target === t.id ? 'bg-primary/5 border-primary text-primary' : 'bg-gray-50 border-transparent text-gray-400'
               }`}
             >
               <t.icon size={20} />
               <span className="text-xs font-bold">{t.label}</span>
             </button>
           ))}
        </div>

        <div className="space-y-4">
           <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Judul Pengumuman</label>
              <input 
                type="text" 
                placeholder="Contoh: Info Libur Semester..." 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary focus:bg-white transition" 
              />
           </div>
           <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Konten Pesan</label>
              <textarea 
                rows={5}
                placeholder="Tulis detail pengumuman di sini..." 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary focus:bg-white transition" 
              />
           </div>
           <div className="flex items-center gap-2">
              <input type="checkbox" id="wa" className="rounded text-primary focus:ring-primary" />
              <label htmlFor="wa" className="text-sm text-gray-600">Teruskan ke WhatsApp Orang Tua (Webhooks)</label>
           </div>
        </div>

        <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-100 flex items-center justify-center gap-2 hover:bg-teal-600 transition">
          <Send size={18} />
          Sebarkan Pengumuman Sekarang
        </button>
      </div>
    </div>
  );
};

export default BroadcastManager;
