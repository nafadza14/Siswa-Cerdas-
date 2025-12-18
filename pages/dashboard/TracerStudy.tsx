
import React from 'react';
import { GraduationCap, Briefcase, School, Users } from 'lucide-react';
import { MOCK_ALUMNI } from '../../constants';

const TracerStudy: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-dark">Tracer Study Alumni</h1>
        <p className="text-gray-500">Pelacakan karir dan studi lanjut lulusan untuk Akreditasi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Kuliah', val: '72%', icon: School, color: 'text-blue-600' },
          { label: 'Kerja', val: '18%', icon: Briefcase, color: 'text-green-600' },
          { label: 'Wirausaha', val: '5%', icon: Users, color: 'text-purple-600' },
          { label: 'Lainnya', val: '5%', icon: GraduationCap, color: 'text-gray-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
             <div className="p-3 bg-gray-50 rounded-2xl"><s.icon className={s.color} size={24} /></div>
             <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase">{s.label}</p>
               <p className="text-xl font-bold text-dark">{s.val}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-dark">Database Alumni Terlacak</h2>
            <button className="text-primary font-bold text-sm">+ Add Alumni Data</button>
         </div>
         <div className="p-6">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                     <th className="pb-4">Nama Alumni</th>
                     <th className="pb-4">Angkatan</th>
                     <th className="pb-4">Status</th>
                     <th className="pb-4">Instansi/Perusahaan</th>
                  </tr>
               </thead>
               <tbody>
                  {MOCK_ALUMNI.map(a => (
                    <tr key={a.id} className="border-t border-gray-50">
                       <td className="py-4 font-bold text-sm text-dark">{a.name}</td>
                       <td className="py-4 text-sm text-gray-500">{a.graduationYear}</td>
                       <td className="py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            a.status === 'Kuliah' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                          }`}>{a.status}</span>
                       </td>
                       <td className="py-4 text-sm text-gray-500">{a.institution}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default TracerStudy;
