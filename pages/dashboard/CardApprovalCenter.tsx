
import React, { useState } from 'react';
import { MOCK_CARD_APPLICATIONS } from '../../constants';
import { CreditCard, Download, CheckCircle2, Search, Clock, Printer, FileDown } from 'lucide-react';

const CardApprovalCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PENDING' | 'COMPLETED'>('PENDING');

  const filteredApps = MOCK_CARD_APPLICATIONS.filter(app => 
    activeTab === 'PENDING' ? app.status !== 'COMPLETED' : app.status === 'COMPLETED'
  );

  const handleDownload = (appName: string) => {
    alert(`Mempersiapkan File Cetak untuk: ${appName}\nFormat: PDF High Res + Data CSV\nStatus: Download Dimulai...`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark">Card Approval Center</h1>
          <p className="text-gray-500">Proses pengajuan cetak kartu dari sekolah-sekolah</p>
        </div>
        <div className="bg-white p-1 rounded-2xl border border-gray-100 flex shadow-sm">
           <button 
             onClick={() => setActiveTab('PENDING')}
             className={`px-6 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'PENDING' ? 'bg-primary text-white shadow-md shadow-teal-100' : 'text-gray-400 hover:text-dark'}`}
           >
             Antrian ({MOCK_CARD_APPLICATIONS.filter(a => a.status !== 'COMPLETED').length})
           </button>
           <button 
             onClick={() => setActiveTab('COMPLETED')}
             className={`px-6 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'COMPLETED' ? 'bg-primary text-white shadow-md shadow-teal-100' : 'text-gray-400 hover:text-dark'}`}
           >
             Selesai Cetak
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
         {filteredApps.length > 0 ? filteredApps.map(app => (
           <div key={app.id} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition">
                 <CreditCard size={40}/>
              </div>
              
              <div className="flex-1 space-y-2 text-center md:text-left">
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h3 className="text-xl font-black text-dark uppercase">{app.schoolName}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full uppercase">Batch: {app.batchName}</span>
                 </div>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2"><Clock size={16}/> Diajukan: {app.requestDate}</span>
                    <span className="flex items-center gap-2 font-bold text-primary"><Printer size={16}/> {app.studentCount} Kartu Siap Cetak</span>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                 <button 
                   onClick={() => handleDownload(app.batchName)}
                   className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-dark font-bold rounded-2xl hover:bg-gray-50 transition"
                 >
                    <FileDown size={18}/> Data CSV
                 </button>
                 <button 
                   onClick={() => handleDownload(app.batchName)}
                   className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-dark text-white font-bold rounded-2xl hover:bg-gray-800 shadow-xl shadow-gray-200 transition"
                 >
                    <Printer size={18}/> Download PDF Cetak
                 </button>
                 {app.status !== 'COMPLETED' && (
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-teal-600 shadow-xl shadow-teal-100 transition">
                       <CheckCircle2 size={18}/> Tandai Selesai
                    </button>
                 )}
              </div>
           </div>
         )) : (
            <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <CreditCard className="mx-auto text-gray-300 mb-4" size={64}/>
               <p className="text-gray-500 font-bold">Tidak ada pengajuan kartu {activeTab === 'PENDING' ? 'dalam antrian' : 'yang sudah selesai'}</p>
            </div>
         )}
      </div>

      <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl flex gap-4 items-start">
         <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Printer size={20}/></div>
         <div>
            <h4 className="font-bold text-orange-800">Panduan Pencetakan</h4>
            <p className="text-sm text-orange-700 mt-1">
               File cetak yang didownload sudah dalam format layout standar ID-Card (86x54mm) dengan 300 DPI. 
               Pastikan menggunakan printer thermal PVC card untuk hasil maksimal.
            </p>
         </div>
      </div>
    </div>
  );
};

export default CardApprovalCenter;
