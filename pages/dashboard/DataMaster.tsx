
import React, { useState } from 'react';
import { Search, Plus, Download, Upload, Edit, Trash2 } from 'lucide-react';
import { MOCK_STUDENTS } from '../../constants';

const DataMaster: React.FC = () => {
  const [tab, setTab] = useState<'siswa' | 'guru'>('siswa');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-dark">Manajemen Data Master</h1>
          <p className="text-gray-500">Kelola basis data Siswa & Guru terpusat</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium">
            <Upload size={16} /> Import Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold shadow-lg shadow-teal-100 text-sm">
            <Plus size={16} /> Tambah Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
           <button 
             onClick={() => setTab('siswa')} 
             className={`px-8 py-4 font-bold text-sm transition-all border-b-2 ${tab === 'siswa' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-400 hover:text-dark'}`}
           >
             Data Siswa (842)
           </button>
           <button 
             onClick={() => setTab('guru')} 
             className={`px-8 py-4 font-bold text-sm transition-all border-b-2 ${tab === 'guru' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-400 hover:text-dark'}`}
           >
             Data Guru (56)
           </button>
        </div>

        <div className="p-6">
           <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder={`Cari ${tab}...`} 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                       <th className="pb-4 px-4">Nama Lengkap</th>
                       <th className="pb-4 px-4">{tab === 'siswa' ? 'NISN' : 'NIP'}</th>
                       <th className="pb-4 px-4">{tab === 'siswa' ? 'Kelas' : 'Mapel'}</th>
                       <th className="pb-4 px-4">Kontak</th>
                       <th className="pb-4 px-4 text-center">Aksi</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {MOCK_STUDENTS.map(s => (
                      <tr key={s.id} className="group hover:bg-gray-50/50 transition">
                         <td className="py-4 px-4 flex items-center gap-3">
                            <img src={s.avatar} className="w-8 h-8 rounded-full object-cover" />
                            <span className="font-bold text-dark text-sm">{s.name}</span>
                         </td>
                         <td className="py-4 px-4 text-sm text-gray-500 font-mono">{s.nisn}</td>
                         <td className="py-4 px-4 text-sm text-gray-500">{tab === 'siswa' ? '10 IPA 1' : 'Matematika'}</td>
                         <td className="py-4 px-4 text-sm text-gray-500">{s.email}</td>
                         <td className="py-4 px-4">
                            <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                               <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                               <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DataMaster;
