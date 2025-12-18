
import React from 'react';
import { MOCK_SCHOOLS } from '../../constants';
import { Search, Plus, Filter, FileText, CheckCircle, MoreHorizontal } from 'lucide-react';

const SchoolManagement: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Manajemen Sekolah</h1>
          <p className="text-gray-500">Kelola database sekolah dan verifikasi dokumen</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-teal-100 flex items-center gap-2">
          <Plus size={20}/> Daftarkan Sekolah Baru
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              <input type="text" placeholder="Cari nama sekolah atau NPSN..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary"/>
           </div>
           <div className="flex gap-2">
              <button className="p-2 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50"><Filter size={18}/></button>
              <select className="px-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-500">
                 <option>Semua Status</option>
                 <option>Aktif</option>
                 <option>Pending</option>
              </select>
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 <tr>
                    <th className="px-6 py-4">Sekolah & NPSN</th>
                    <th className="px-6 py-4">Kepala Sekolah</th>
                    <th className="px-6 py-4">Siswa</th>
                    <th className="px-6 py-4">Kebutuhan Data (Dokumen)</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {MOCK_SCHOOLS.map(sch => (
                   <tr key={sch.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <img src={sch.logo} className="w-10 h-10 rounded-xl object-contain bg-white border border-gray-100 p-1" />
                            <div>
                               <p className="font-bold text-dark text-sm">{sch.name}</p>
                               <p className="text-xs text-gray-400 font-mono">{sch.npsn}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{sch.principal}</td>
                      <td className="px-6 py-4 text-sm font-bold text-dark">{sch.studentCount}</td>
                      <td className="px-6 py-4">
                         <div className="flex gap-2">
                            <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 text-[10px] font-bold ${sch.documents.skOperasional ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-500'}`}>
                               <FileText size={12}/> SK Operasional
                            </div>
                            <div className={`p-1.5 rounded-lg border flex items-center gap-1.5 text-[10px] font-bold ${sch.documents.skAkreditasi ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-500'}`}>
                               <FileText size={12}/> Akreditasi
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                            <CheckCircle size={14}/> AKTIF
                         </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                         <button className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-lg transition">
                            <MoreHorizontal size={18}/>
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolManagement;
