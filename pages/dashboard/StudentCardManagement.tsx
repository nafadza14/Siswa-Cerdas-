
import React, { useState, useRef } from 'react';
import { CreditCard, Plus, Search, Camera, Upload, CheckCircle2, FileText, ChevronRight, X, Printer, Send, Layout, MessageCircle } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_CLASSES, MOCK_SCHOOL_DATA } from '../../constants';
import { Student } from '../../types';

const StudentCardManagement: React.FC = () => {
  const [view, setView] = useState<'classes' | 'students' | 'form' | 'template_selection'>('classes');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({ name: '', nisn: '', classId: '', whatsapp: '', parentWhatsapp: '' });
  const [selectedTemplate, setSelectedTemplate] = useState('modern_teal');
  const videoRef = useRef<HTMLVideoElement>(null);

  const stats = {
    total: students.length,
    printed: students.filter(s => s.cardStatus === 'PRINTED').length,
    pending: students.filter(s => s.cardStatus === 'PENDING').length,
    approved: students.filter(s => s.cardStatus === 'APPROVED').length,
  };

  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Kamera tidak dapat diakses.");
      setIsCameraOpen(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setCapturedPhoto(canvas.toDataURL('image/jpeg'));
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(t => t.stop());
      setIsCameraOpen(false);
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: Math.random().toString(36),
      name: newStudent.name,
      nisn: newStudent.nisn,
      classId: newStudent.classId || selectedClass || '',
      avatar: capturedPhoto || 'https://i.pravatar.cc/150',
      role: 3 as any,
      email: '',
      whatsapp: newStudent.whatsapp,
      parentWhatsapp: newStudent.parentWhatsapp,
      parentPhone: newStudent.parentWhatsapp,
      cardStatus: 'PENDING'
    };
    setStudents([student, ...students]);
    setNewStudent({ name: '', nisn: '', classId: '', whatsapp: '', parentWhatsapp: '' });
    setCapturedPhoto(null);
    setView('students');
  };

  const handleSchoolSubmitBatch = () => {
    if (stats.pending === 0) {
      alert("Tidak ada data baru yang perlu diajukan.");
      return;
    }
    setView('template_selection');
  };

  const confirmFinalSubmission = () => {
    if (confirm(`Ajukan cetak untuk SELURUH ${stats.pending} kartu siswa ${MOCK_SCHOOL_DATA.name} ke Super Admin?`)) {
      setStudents(prev => prev.map(s => s.cardStatus === 'PENDING' ? { ...s, cardStatus: 'APPROVED' } : s));
      alert(`Berhasil! Pengajuan seluruh sekolah telah dikirim dengan desain ${selectedTemplate}.`);
      setView('classes');
    }
  };

  const templates = [
    { id: 'modern_teal', name: 'Modern Teal', color: 'bg-teal-600' },
    { id: 'classic_blue', name: 'Classic Blue', color: 'bg-blue-800' },
    { id: 'eco_green', name: 'Eco Green', color: 'bg-green-700' },
    { id: 'premium_dark', name: 'Premium Dark', color: 'bg-gray-900' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Manajemen Kartu Siswa</h1>
          <p className="text-gray-500">Kelola database foto dan ajukan cetak batch sekolah</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleSchoolSubmitBatch}
             className="bg-dark text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-black flex items-center gap-2"
           >
             <Send size={18} /> Ajukan Cetak Sekolah ({stats.pending})
           </button>
           <button 
             onClick={() => setView('form')}
             className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-teal-100 flex items-center gap-2"
           >
             <Plus size={18} /> Tambah Siswa Baru
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
           <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><CreditCard size={24}/></div>
           <div><p className="text-[10px] font-bold text-gray-400 uppercase">Total Siswa</p><p className="text-xl font-bold text-dark">{stats.total}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
           <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><FileText size={24}/></div>
           <div><p className="text-[10px] font-bold text-gray-400 uppercase">Perlu Foto</p><p className="text-xl font-bold text-dark">{stats.pending}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
           <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><CheckCircle2 size={24}/></div>
           <div><p className="text-[10px] font-bold text-gray-400 uppercase">Proses Cetak</p><p className="text-xl font-bold text-dark">{stats.approved}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
           <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Printer size={24}/></div>
           <div><p className="text-[10px] font-bold text-gray-400 uppercase">Selesai</p><p className="text-xl font-bold text-dark">{stats.printed}</p></div>
        </div>
      </div>

      {view === 'classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {MOCK_CLASSES.map(cls => {
             const classStudents = students.filter(s => s.classId === cls.id);
             const pendingCount = classStudents.filter(s => s.cardStatus === 'PENDING').length;
             return (
               <div 
                 key={cls.id} 
                 className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col hover:border-primary/30 transition-all cursor-pointer"
                 onClick={() => { setSelectedClass(cls.id); setView('students'); }}
               >
                  <div className="flex justify-between items-start mb-4">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                       cls.major === 'IPA' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                     }`}>
                       {cls.name.split(' ')[0]}
                     </div>
                     <div className="text-gray-300 group-hover:text-primary"><ChevronRight size={20} /></div>
                  </div>
                  <h3 className="font-bold text-dark">{cls.name}</h3>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider truncate">{cls.homeroomTeacher}</p>
                  
                  <div className="mt-4 flex flex-col gap-1">
                     <p className="text-[10px] font-bold text-gray-500 uppercase">Status Kelengkapan</p>
                     <p className="text-sm font-black text-dark">{classStudents.length - pendingCount} / {classStudents.length} Siap</p>
                  </div>
               </div>
             );
           })}
        </div>
      )}

      {view === 'template_selection' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm animate-fade-in">
           <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setView('classes')} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><X/></button>
              <h2 className="text-2xl font-bold text-dark">Pilih Template Kartu Sekolah</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {templates.map(t => (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${
                    selectedTemplate === t.id ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                   <div className={`w-full aspect-[86/54] ${t.color} rounded-xl shadow-lg mb-4 flex items-center justify-center`}>
                      <Layout className="text-white/50" size={32}/>
                   </div>
                   <p className="font-bold text-center text-dark">{t.name}</p>
                </div>
              ))}
           </div>

           <div className="flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-3xl text-center">
              <p className="text-gray-500 max-w-md">Setelah mengajukan, data tidak dapat diubah hingga proses cetak oleh Super Admin selesai. Barcode unique akan digenerate otomatis untuk akses login student.</p>
              <button 
                onClick={confirmFinalSubmission}
                className="bg-primary text-white px-12 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:scale-105 transition"
              >
                 Konfirmasi & Ajukan Sekarang
              </button>
           </div>
        </div>
      )}

      {view === 'students' && selectedClass && (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm animate-fade-in">
           <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <button onClick={() => setView('classes')} className="text-sm text-primary font-bold flex items-center gap-2">
                <ChevronRight size={16} className="rotate-180" /> Kembali ke Daftar Kelas
              </button>
              <h2 className="font-bold text-dark text-lg">Siswa Kelas {MOCK_CLASSES.find(c => c.id === selectedClass)?.name}</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
                <input type="text" placeholder="Cari Siswa..." className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-xl text-xs border-none focus:ring-2 focus:ring-primary" />
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <tr>
                       <th className="px-6 py-4">Foto</th>
                       <th className="px-6 py-4">Nama Siswa</th>
                       <th className="px-6 py-4">NISN / Unique ID</th>
                       <th className="px-6 py-4">WhatsApp (S/O)</th>
                       <th className="px-6 py-4">Status KTS</th>
                       <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {students.filter(s => s.classId === selectedClass).map(s => (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition">
                         <td className="px-6 py-3">
                            <img src={s.avatar} className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm" />
                         </td>
                         <td className="px-6 py-3">
                            <p className="font-bold text-dark text-sm leading-none mb-1">{s.name}</p>
                            <p className="text-[10px] text-gray-400">SMA CERDAS MULIA</p>
                         </td>
                         <td className="px-6 py-3">
                            <p className="text-sm text-gray-500 font-mono">{s.nisn}</p>
                            <span className="text-[8px] bg-gray-100 text-gray-400 px-1 rounded uppercase">QR Enabled</span>
                         </td>
                         <td className="px-6 py-3">
                            <p className="text-xs text-dark flex items-center gap-1"><MessageCircle size={10} className="text-green-500"/> {s.whatsapp}</p>
                            <p className="text-[10px] text-gray-400 flex items-center gap-1"><MessageCircle size={10} className="text-green-500"/> {s.parentWhatsapp}</p>
                         </td>
                         <td className="px-6 py-3">
                            <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${
                               s.cardStatus === 'PRINTED' ? 'bg-green-100 text-green-600' : 
                               s.cardStatus === 'APPROVED' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                            }`}>{s.cardStatus || 'PENDING'}</span>
                         </td>
                         <td className="px-6 py-3 text-center">
                            <button className="text-primary p-2 hover:bg-primary/10 rounded-xl transition">
                               <Printer size={16}/>
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {view === 'form' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative animate-fade-in-up">
              <button onClick={() => setView('classes')} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition"><X/></button>
              <h2 className="text-2xl font-bold text-dark mb-6">Input Data & Foto Siswa</h2>
              <form onSubmit={handleAddStudent} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                          <input required type="text" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="Budi Pratama" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Unique ID / NISN</label>
                          <input required type="text" maxLength={10} value={newStudent.nisn} onChange={e => setNewStudent({...newStudent, nisn: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary font-mono" placeholder="0056123456" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">WhatsApp Siswa</label>
                          <input required type="text" value={newStudent.whatsapp} onChange={e => setNewStudent({...newStudent, whatsapp: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="628..." />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">WhatsApp Orang Tua</label>
                          <input required type="text" value={newStudent.parentWhatsapp} onChange={e => setNewStudent({...newStudent, parentWhatsapp: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="628..." />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pilih Kelas</label>
                          <select required value={newStudent.classId} onChange={e => setNewStudent({...newStudent, classId: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary">
                             <option value="">Pilih Kelas</option>
                             {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pas Foto KTS</label>
                       <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative flex items-center justify-center border-2 border-dashed border-gray-200">
                          {capturedPhoto ? (
                             <>
                                <img src={capturedPhoto} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => setCapturedPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg"><X size={14}/></button>
                             </>
                          ) : isCameraOpen ? (
                             <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                          ) : (
                             <div className="text-center p-6">
                                <Camera className="mx-auto text-gray-300 mb-2" size={40} />
                                <p className="text-xs text-gray-400">Ambil selfie atau upload foto</p>
                             </div>
                          )}
                       </div>
                       <div className="flex gap-2">
                          {!isCameraOpen && !capturedPhoto ? (
                             <>
                               <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 py-3 bg-dark text-white rounded-xl text-xs font-bold hover:bg-black transition"><Camera size={14}/> Buka Kamera</button>
                               <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition"><Upload size={14}/> Upload</button>
                             </>
                          ) : isCameraOpen ? (
                             <button type="button" onClick={takePhoto} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-teal-100">Jepret Foto</button>
                          ) : null}
                       </div>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-gray-50">
                    <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:bg-teal-600 transition flex items-center justify-center gap-2">
                       <CheckCircle2 size={20}/> Simpan Data & Foto
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default StudentCardManagement;
