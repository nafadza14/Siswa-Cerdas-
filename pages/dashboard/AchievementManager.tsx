
import React from 'react';
import { Trophy, Star, Medal, Award } from 'lucide-react';
import { MOCK_ACHIEVEMENTS } from '../../constants';

const AchievementManager: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark">Prestasi Siswa</h1>
          <p className="text-gray-500">Pencatatan penghargaan akademik & non-akademik</p>
        </div>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-orange-100">
          + Tambah Prestasi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {MOCK_ACHIEVEMENTS.map(ac => (
           <div key={ac.id} className="bg-white rounded-3xl p-6 border border-gray-100 flex gap-6 relative overflow-hidden group">
              <div className="w-24 h-24 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                 <Trophy className="text-orange-500 group-hover:scale-110 transition" size={48} />
              </div>
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold uppercase">{ac.category}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase">{ac.rank}</span>
                 </div>
                 <h3 className="text-lg font-bold text-dark mb-1">{ac.title}</h3>
                 <p className="text-sm text-gray-500 mb-4">Siswa: Clara Setiana Dewi</p>
                 <div className="flex items-center gap-4">
                    <button className="text-primary text-xs font-bold hover:underline">Lihat Sertifikat</button>
                    <button className="text-gray-400 text-xs font-bold hover:text-dark">Edit</button>
                 </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition">
                 <Award size={120} />
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default AchievementManager;
