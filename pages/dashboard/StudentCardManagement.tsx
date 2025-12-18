
import React, { useState, useRef } from 'react';
import { CreditCard, Plus, Search, Camera, Upload, CheckCircle2, FileText, ChevronRight, X, Printer, Send } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_CLASSES, MOCK_SCHOOL_DATA } from '../../constants';
import { Student } from '../../types';

const StudentCardManagement: React.FC = () => {
  const [view, setView] = useState<'classes' | 'students' | 'form'>('classes');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({ name: '', nisn: '', classId: '' });
  const videoRef = useRef<HTMLVideoElement>(null);

  const stats = {
    total: students.length,
    printed: students.filter(s => s.cardStatus === 'PRINTED').length,
    pending: students.filter(s => s.cardStatus === 'PENDING').length,
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
      role: 3 as any, // STUDENT
      email: '',
      parentPhone: '',
      cardStatus: 'PENDING'
    };
    setStudents([student, ...students]);
    setNewStudent({ name: '', nisn: '', classId: '' });
    setCapturedPhoto(null);
    setView('students');
  };

  const handleSubmitBatch = (classId: string) => {
    const className = MOCK_CLASSES.find(c => c.id === classId)?.name;
    const count = students.filter(s => s.classId === classId && s.cardStatus === 'PENDING').length;
    
    if (count === 0) {
      alert("Tidak ada pengajuan kartu baru di kelas ini.");
      return;
    }

    if (confirm(`Ajukan cetak untuk ${count} kartu di kelas ${className} ke Super Admin?`)) {
      alert(`Berhasil! Pengajuan Batch ${className} telah dikirim ke Card Approval Center.`);
      // Update local state to show as 'APPROVED' (waiting for print)
      setStudents(prev => prev.map(s => s.classId === classId && s.cardStatus === 'PENDING' ? {...s, cardStatus: 'APPROVED'} : s));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Manajemen Kartu Siswa</h1>
          <p className="text-gray-500">Kelola pengajuan, pemotretan, dan cetak KTS {MOCK_SCHOOL_DATA.name}</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setView('form')}
             className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-teal-100 flex items-center gap-2"
           >
             <Plus size={18} /> Tambah Data Siswa
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
           <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><CreditCard size={24}/></div>
           <div><p className="text-[10px] font-bold text-gray-400 uppercase">Total Pengajuan</p><p className="text-xl font-bold text-dark">{stats.total}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
           <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><CheckCircle2 size={24}/></div>
           <div><p className="text-[10px] font-bold text-gray-400 uppercase">Sudah Dicetak</p><p className="text-xl font-bold text-dark">{stats.printed}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
           <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><FileText size={24}/></div>
           <div><p className="text-[10px] font-bold text-gray-400 uppercase">Antrian Foto</p><p className="text-xl font-bold text-dark">{stats.pending}</p></div>
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
                 className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col group transition-all"
               >
                  <div className="flex justify-between items-start mb-4">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                       cls.major === 'IPA' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                     }`}>
                       {cls.name.split(' ')[0]}
                     </div>
                     <button 
                       onClick={() => { setSelectedClass(cls.id); setView('students'); }}
                       className="text-gray-300 hover:text-primary p-1"
                     >
                       <ChevronRight size={20} />
                     </button>
                  </div>
                  <h3 className="font-bold text-dark">{cls.name}</h3>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">Wali Kelas: {cls.homeroomTeacher}</p>
                  
                  <div className="mt-4 flex-1">
                     <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Progres KTS</span>
                        <span className="font-bold text-dark">{Math.round(((cls.studentCount - pendingCount) / cls.studentCount) * 100)}%</span>
                     </div>
                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${((cls.studentCount - pendingCount) / cls.studentCount) * 100}%` }}></div>
                     </div>
                  </div>

                  <button 
                    onClick={() => handleSubmitBatch(cls.id)}
                    className={`mt-6 w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                      pendingCount > 0 ? 'bg-dark text-white hover:bg-black' : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Send size={14}/> Ajukan Batch ({pendingCount})
                  </button>
               </div>
             );
           })}
        </div>
      )}

      {view === 'students' && selectedClass && (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
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
                       <th className="px-6 py-4">NISN</th>
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
                            <p className="text-[10px] text-gray-400">Terakhir Update: {new Date().toLocaleDateString()}</p>
                         </td>
                         <td className="px-6 py-3 text-sm text-gray-500 font-mono">{s.nisn}</td>
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
              <h2 className="text-2xl font-bold text-dark mb-6">Tambah Data Siswa & Foto</h2>
              <form onSubmit={handleAddStudent} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nama Lengkap Siswa</label>
                          <input required type="text" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="Budi Pratama" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">NISN (10 Digit)</label>
                          <input required type="text" maxLength={10} value={newStudent.nisn} onChange={e => setNewStudent({...newStudent, nisn: e.target.value})} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary font-mono" placeholder="0056123456" />
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
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Foto KTS (3x4)</label>
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
                                <p className="text-xs text-gray-400">Pilih metode pengambilan gambar</p>
                             </div>
                          )}
                       </div>
                       <div className="flex gap-2">
                          {!isCameraOpen && !capturedPhoto ? (
                             <>
                               <button type="button" onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 py-3 bg-dark text-white rounded-xl text-xs font-bold hover:bg-black transition"><Camera size={14}/> Buka Kamera</button>
                               <button type="button" className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition"><Upload size={14}/> Upload File</button>
                             </>
                          ) : isCameraOpen ? (
                             <button type="button" onClick={takePhoto} className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-teal-100">Ambil Foto Sekarang</button>
                          ) : null}
                       </div>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-gray-50">
                    <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:bg-teal-600 transition flex items-center justify-center gap-2">
                       <CheckCircle2 size={20}/>
                       Simpan & Verifikasi Data Siswa
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
