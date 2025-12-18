
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { MOCK_STUDENTS, MOCK_SCHOOL_DATA } from '../constants';
import { Eye, ShieldCheck, Printer, QrCode } from 'lucide-react';

const CardGenerator: React.FC = () => {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const student = MOCK_STUDENTS[0];
  const school = MOCK_SCHOOL_DATA;

  // Function to simulate a unique QR pattern based on student ID
  const UniqueQR = ({ size = "w-10 h-10", id = "" }) => {
    // We use the ID to slightly change the "pixel" pattern for demo
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (
      <div className={`${size} bg-white p-1 rounded-sm shrink-0 flex items-center justify-center border border-gray-100`}>
         <div className="grid grid-cols-4 grid-rows-4 gap-[1px] w-full h-full bg-black p-[1px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`${(seed + i) % 3 === 0 ? 'bg-black' : 'bg-white'}`} />
            ))}
         </div>
      </div>
    );
  };

  const FrontCard = () => (
    <div className="w-full h-full bg-gradient-to-br from-teal-600 to-primary text-white p-6 relative overflow-hidden flex flex-col">
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
       <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
       
       <div className="flex items-center gap-3 border-b border-white/20 pb-4 mb-4 z-10">
          <img src={school.logo} className="w-10 h-10 object-cover bg-white rounded-lg shadow-sm" />
          <div className="min-w-0">
             <h2 className="font-extrabold text-[12px] uppercase leading-tight">{school.name}</h2>
             <p className="text-[8px] opacity-80 uppercase tracking-widest">NPSN: {school.npsn}</p>
          </div>
       </div>

       <div className="flex-1 flex gap-4 items-center z-10">
          <div className="w-1/3 aspect-[3/4] border-2 border-white/50 rounded-lg overflow-hidden shadow-xl shrink-0">
             <img src={student.avatar} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
             <p className="text-[8px] text-teal-100 uppercase font-bold tracking-wider mb-1">Kartu Tanda Siswa</p>
             <h3 className="text-lg font-black uppercase leading-none mb-1 truncate">{student.name}</h3>
             <p className="text-xs font-mono opacity-90 mb-2">{student.nisn}</p>
             
             <div className="mt-2">
                <p className="text-[6px] opacity-60 uppercase">Berlaku S/D</p>
                <p className="text-[8px] font-bold">2027</p>
             </div>
          </div>
       </div>

       <div className="mt-4 flex justify-between items-end z-10">
          <UniqueQR id={student.nisn} />
          <div className="text-right">
             <p className="text-[6px] font-mono italic opacity-50 tracking-tighter">SiswaCerdas ID System</p>
          </div>
       </div>
    </div>
  );

  const BackCard = () => (
    <div className="w-full h-full bg-white text-dark p-6 relative flex flex-col border-2 border-gray-100 shadow-inner">
       <div className="bg-dark text-white p-3 -mx-6 -mt-6 mb-6">
          <h4 className="text-[10px] font-bold text-center uppercase tracking-widest">Akses Akun Digital & Tata Tertib</h4>
       </div>
       
       <div className="flex-1 flex gap-4">
          <div className="flex-1 space-y-3">
             {[
               'Gunakan QR Code untuk akses akun di Siswa Cerdas App.',
               'Wajib dibawa selama berada di lingkungan sekolah.',
               'Kartu ini berfungsi sebagai kartu akses & identitas.',
               'Kehilangan kartu harap lapor ke bagian Tata Usaha.',
             ].map((text, i) => (
               <div key={i} className="flex gap-2 items-start">
                  <span className="text-[8px] font-bold text-primary">{i+1}.</span>
                  <p className="text-[8px] text-gray-500 leading-tight">{text}</p>
               </div>
             ))}
          </div>
          
          <div className="w-20 flex flex-col items-center justify-start gap-2 pt-2">
             <UniqueQR size="w-16 h-16" id={student.nisn + "-unique"} />
             <p className="text-[6px] font-bold text-dark uppercase text-center leading-tight">Digital Access ID</p>
             <p className="text-[5px] text-gray-400 font-mono">SN-{student.nisn.slice(-4)}</p>
          </div>
       </div>

       <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-6">
          <div className="text-center w-1/2">
             <p className="text-[6px] text-gray-400 mb-4 uppercase tracking-tighter">Pemegang Kartu</p>
             <div className="h-[0.5px] w-16 mx-auto bg-gray-200"></div>
             <p className="text-[7px] font-bold mt-1 uppercase truncate px-2">{student.name}</p>
          </div>
          <div className="text-center w-1/2">
             <p className="text-[6px] text-gray-400 mb-4 uppercase tracking-tighter">Kepala Sekolah</p>
             <div className="h-[0.5px] w-16 mx-auto bg-gray-200"></div>
             <p className="text-[7px] font-bold mt-1 uppercase truncate px-2">{school.principal}</p>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffcf8]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
           <div className="flex-1 space-y-8">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold">New Version: Cerdas v3.0</div>
              <h1 className="text-4xl md:text-6xl font-black text-dark leading-tight">
                Kartu Digital <br/> <span className="text-primary">Terintegrasi</span>
              </h1>
              <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
                Setiap kartu memiliki <strong>Unique Access ID</strong> dalam bentuk QR Code untuk login mandiri siswa di platform Siswa Cerdas.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-2 bg-green-50 rounded-lg"><QrCode className="text-green-500" size={24} /></div>
                    <div><p className="font-bold text-sm">Unique QR</p><p className="text-xs text-gray-400">1 Kartu 1 Identitas</p></div>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="p-2 bg-blue-50 rounded-lg"><Printer className="text-blue-500" size={24} /></div>
                    <div><p className="font-bold text-sm">Cetak Batch</p><p className="text-xs text-gray-400">Support Seluruh Sekolah</p></div>
                 </div>
              </div>
           </div>

           <div className="w-full max-w-[500px] space-y-6">
              <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
                 <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-2xl">
                    <button onClick={() => setSide('front')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${side === 'front' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-dark'}`}>Tampak Depan</button>
                    <button onClick={() => setSide('back')} className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${side === 'back' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-dark'}`}>Tampak Belakang</button>
                 </div>

                 <div className="aspect-[86/54] w-full bg-gray-50 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border border-gray-200">
                    {side === 'front' ? <FrontCard /> : <BackCard />}
                 </div>

                 <div className="mt-8 flex justify-between items-center text-xs text-gray-400">
                    <span className="flex items-center gap-1 font-medium"><Eye size={12}/> Preview Card Mode</span>
                    <span className="font-mono">SMA CERDAS MULIA</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
