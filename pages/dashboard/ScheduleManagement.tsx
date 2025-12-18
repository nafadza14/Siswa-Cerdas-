
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Settings, 
  Save, 
  ChevronRight,
  BookOpen,
  User
} from 'lucide-react';
import { MOCK_CLASSES } from '../../constants';

interface ScheduleItem {
  id: string;
  day: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  color: string;
}

const ScheduleManagement: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0].id);
  const [activeDay, setActiveDay] = useState('Senin');
  const [isAdding, setIsAdding] = useState(false);
  const [academicYear, setAcademicYear] = useState('2024/2025');
  const [semester, setSemester] = useState('Ganjil');

  // Local state for schedule mock (simulating DB)
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: '1', day: 'Senin', subject: 'Matematika', teacher: 'Drs. Bambang', room: 'Lab 1', startTime: '07:30', endTime: '09:00', color: 'bg-blue-50 text-blue-600' },
    { id: '2', day: 'Senin', subject: 'Fisika', teacher: 'Siti Aminah, S.Pd', room: 'R. 101', startTime: '09:00', endTime: '10:30', color: 'bg-purple-50 text-purple-600' },
    { id: '3', day: 'Selasa', subject: 'Bahasa Inggris', teacher: 'Agus Setiawan', room: 'Lab Bahasa', startTime: '08:00', endTime: '09:30', color: 'bg-orange-50 text-orange-600' },
  ]);

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const handleDelete = (id: string) => {
    if(confirm('Hapus jadwal ini?')) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  const currentDaySchedules = schedules
    .filter(s => s.day === activeDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Academic Config */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <Calendar size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-dark">Manajemen Jadwal Pelajaran</h1>
            <p className="text-sm text-gray-500">Tahun Ajaran {academicYear} • Semester {semester}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block px-1">Tahun Ajaran</label>
            <select 
              value={academicYear} 
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full lg:w-40 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary"
            >
              <option>2023/2024</option>
              <option>2024/2025</option>
              <option>2025/2026</option>
            </select>
          </div>
          <div className="flex-1 lg:flex-none">
            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block px-1">Semester</label>
            <select 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)}
              className="w-full lg:w-32 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary"
            >
              <option>Ganjil</option>
              <option>Genap</option>
            </select>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 bg-dark text-white rounded-xl text-sm font-bold hover:bg-black transition self-end h-[38px]">
            <Settings size={16} /> Config
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Class Selection */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
            <h2 className="font-bold text-dark mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-primary" /> Daftar Kelas
            </h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {MOCK_CLASSES.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                    selectedClass === cls.id 
                      ? 'bg-primary text-white shadow-lg shadow-teal-100' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-bold">{cls.name}</span>
                  <ChevronRight size={16} className={selectedClass === cls.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content: Schedule Plotting */}
        <div className="lg:col-span-3 space-y-6">
          {/* Day Selector Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-gray-100 flex overflow-x-auto gap-1 hide-scrollbar shadow-sm">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`flex-1 py-2 px-6 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeDay === day 
                    ? 'bg-primary text-white' 
                    : 'text-gray-400 hover:text-dark hover:bg-gray-50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-bold text-dark">Jadwal Hari {activeDay}</h3>
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all"
              >
                <Plus size={16} /> Tambah Slot
              </button>
            </div>

            {currentDaySchedules.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {currentDaySchedules.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-all">
                    <div className={`px-4 py-2 rounded-2xl font-mono font-bold text-sm ${item.color} min-w-[120px] text-center`}>
                      {item.startTime} - {item.endTime}
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                       <h4 className="font-black text-dark text-lg uppercase leading-tight">{item.subject}</h4>
                       <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-1">
                          <span className="flex items-center gap-1.5 text-xs text-gray-400">
                             <User size={12}/> {item.teacher}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-400">
                             <MapPin size={12}/> {item.room}
                          </span>
                       </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition">
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/50 border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center">
                <Clock className="mx-auto text-gray-200 mb-4" size={48} />
                <p className="text-gray-400 font-medium">Belum ada jadwal untuk hari {activeDay}</p>
                <button onClick={() => setIsAdding(true)} className="mt-4 text-primary text-sm font-bold hover:underline">
                  Klik untuk menambahkan jadwal baru
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal (Mockup) */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[40px] p-8 shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-bold text-dark">Tambah Slot Pelajaran</h2>
               <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition">
                  <Plus className="rotate-45" size={24} />
               </button>
            </div>

            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsAdding(false); }}>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2 px-1">Mata Pelajaran</label>
                    <input type="text" placeholder="Contoh: Biologi" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2 px-1">Ruangan</label>
                    <input type="text" placeholder="Contoh: R. 302" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" />
                  </div>
               </div>

               <div>
                 <label className="text-xs font-bold text-gray-400 uppercase block mb-2 px-1">Guru Pengajar</label>
                 <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary">
                    <option>Pilih Guru</option>
                    <option>Drs. Bambang Wijaya</option>
                    <option>Siti Aminah, S.Pd</option>
                    <option>Agus Setiawan, M.Pd</option>
                 </select>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2 px-1">Jam Mulai</label>
                    <input type="time" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-2 px-1">Jam Selesai</label>
                    <input type="time" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary" />
                  </div>
               </div>

               <div className="pt-4">
                  <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 flex items-center justify-center gap-2 hover:bg-teal-600 transition">
                     <Save size={20} /> Simpan Plotting Jadwal
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-3 uppercase tracking-widest">Sinkronisasi otomatis ke seluruh akun siswa terkait</p>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;
