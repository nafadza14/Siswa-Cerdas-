
import React from 'react';
import { Users, UserCheck, GraduationCap, Award, ArrowUpRight, FileText, LayoutGrid } from 'lucide-react';
import { MOCK_SCHOOL_DATA } from '../../constants';

const SchoolDashboard: React.FC = () => {
  const school = MOCK_SCHOOL_DATA;
  
  const stats = [
    { label: 'Total Siswa', value: school.studentCount.toLocaleString(), sub: '+12% Thn ini', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Guru', value: school.teacherCount.toString(), sub: 'Aktif', icon: UserCheck, color: 'bg-green-50 text-green-600' },
    { label: 'Jumlah Kelas', value: school.classCount.toString(), sub: 'IPA & IPS', icon: LayoutGrid, color: 'bg-purple-50 text-purple-600' },
    { label: 'Alumni Terlacak', value: '1.204', sub: '85% Target', icon: GraduationCap, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <img src={school.logo} className="w-8 h-8 object-contain" />
             <h1 className="text-2xl font-bold text-dark">{school.name}</h1>
          </div>
          <p className="text-gray-500">NPSN: {school.npsn} • Akreditasi: {school.accreditation} • Kepala Sekolah: {school.principal}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 text-dark px-6 py-2 rounded-xl font-bold hover:bg-gray-50 transition">
            Lihat Jadwal Guru
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-teal-100">
            Export Dapodik
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between mb-4">
              <div className={`p-3 rounded-2xl ${s.color}`}><s.icon size={24} /></div>
              <ArrowUpRight className="text-gray-300" />
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{s.label}</h3>
            <p className="text-2xl font-bold text-dark">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Sebaran Siswa Per Angkatan</h2>
          <div className="h-64 flex items-end gap-12 justify-center">
             {[
               { label: 'Kelas 10', count: 215, color: 'bg-primary' },
               { label: 'Kelas 11', count: 208, color: 'bg-secondary' },
               { label: 'Kelas 12', count: 195, color: 'bg-blue-500' },
             ].map((g, i) => (
               <div key={i} className="flex-1 max-w-[100px] flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-50 rounded-t-xl relative group h-full">
                     <div 
                       className={`absolute bottom-0 w-full ${g.color} rounded-t-xl transition-all group-hover:brightness-110`} 
                       style={{ height: `${(g.count / 250) * 100}%` }} 
                     />
                  </div>
                  <span className="text-xs text-gray-400 font-bold">{g.label}</span>
                  <span className="text-sm font-bold text-dark">{g.count}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-xl font-bold mb-6">Status KTS Sekolah</h2>
          <div className="flex-1 flex flex-col justify-center space-y-6">
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500 font-medium">Sudah Cetak</span>
                   <span className="font-bold text-dark">542 Siswa</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                   <div className="bg-green-500 h-full w-[65%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500 font-medium">Proses Pengajuan</span>
                   <span className="font-bold text-dark">120 Siswa</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                   <div className="bg-blue-500 h-full w-[25%]"></div>
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500 font-medium">Belum Foto</span>
                   <span className="font-bold text-dark">180 Siswa</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                   <div className="bg-orange-500 h-full w-[10%]"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
