
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { MOCK_STUDENTS } from '../constants';
import { CreditCard, CheckCircle2, Send } from 'lucide-react';

const CardGenerator: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [orderSent, setOrderSent] = useState(false);
  const [previewOpacity, setPreviewOpacity] = useState(1);

  // Standard QR Code Component (Simpler & Cleaner)
  const StandardQRCode = () => (
    <div className="w-full h-full relative">
       {/* Finder Patterns */}
       <div className="absolute top-0 left-0 w-[35%] h-[35%] border-[2.5px] border-black flex items-center justify-center">
          <div className="w-[60%] h-[60%] bg-black"></div>
       </div>
       <div className="absolute top-0 right-0 w-[35%] h-[35%] border-[2.5px] border-black flex items-center justify-center">
          <div className="w-[60%] h-[60%] bg-black"></div>
       </div>
       <div className="absolute bottom-0 left-0 w-[35%] h-[35%] border-[2.5px] border-black flex items-center justify-center">
          <div className="w-[60%] h-[60%] bg-black"></div>
       </div>

       {/* Simplified Data Area (Static for clean look) */}
       <div className="absolute top-[42%] left-[42%] w-[12%] h-[12%] bg-black"></div>
       <div className="absolute top-[42%] right-[10%] w-[12%] h-[12%] bg-black"></div>
       <div className="absolute bottom-[10%] right-[42%] w-[12%] h-[12%] bg-black"></div>
       <div className="absolute bottom-[10%] right-[10%] w-[20%] h-[20%] bg-black"></div>
       <div className="absolute top-[10%] left-[42%] w-[12%] h-[12%] bg-black"></div>
    </div>
  );

  // Component that renders the card based on index
  const CardTemplate = ({ index, student }: { index: number, student: typeof selectedStudent }) => {
    // Styles for 18 variants
    const getStyle = (i: number) => {
      const styles = [
        // 1-6: Gradients & Clean
        "bg-gradient-to-r from-blue-600 to-cyan-500 text-white",
        "bg-gradient-to-br from-indigo-700 to-purple-700 text-white",
        "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white",
        "bg-gradient-to-r from-orange-500 to-pink-600 text-white",
        "bg-gray-900 text-white",
        "bg-gradient-to-r from-blue-800 to-indigo-900 text-white",
        // 7-12: Light & Patterned
        "bg-white border border-gray-200 text-dark",
        "bg-orange-50 border border-orange-200 text-dark",
        "bg-blue-50 border border-blue-200 text-dark",
        "bg-[#fffcf8] border border-gray-200 text-dark",
        "bg-gradient-to-br from-gray-100 to-gray-200 text-dark border border-gray-300",
        "bg-white border-l-8 border-primary text-dark",
        // 13-18: Modern & Corporate
        "bg-slate-800 border-b-8 border-secondary text-white",
        "bg-teal-700 border-r-8 border-yellow-400 text-white",
        "bg-white border-2 border-dashed border-gray-300 text-dark",
        "bg-gradient-to-r from-slate-900 to-black text-white border border-gray-700",
        "bg-indigo-600 text-white",
        "bg-gradient-to-tr from-yellow-500 to-orange-600 text-white"
      ];
      return styles[i % styles.length];
    };

    const SCHOOL_NAME = "SMA Xaverius Bandar Lampung";
    const containerClasses = `w-full h-full p-[6%] relative flex flex-col overflow-hidden shadow-sm ${getStyle(index)}`;

    // UNIFIED LAYOUT for all models
    // Layout: Header Top, Content Vertically Centered
    return (
      <div className={containerClasses}>
          {/* Header */}
          <div className="flex justify-between items-start z-10 mb-2">
             <div className="flex items-center gap-1.5">
               <div className="w-4 h-4 bg-white/20 backdrop-blur-md rounded flex items-center justify-center font-bold text-[6px]">S</div>
               <span className="font-bold text-[7px] uppercase tracking-wider">{SCHOOL_NAME}</span>
             </div>
             <span className="text-[5px] font-mono opacity-60 border border-current px-1 rounded">KTS</span>
          </div>

          {/* Main Content - Centered in remaining space */}
          <div className="flex-1 flex items-center z-10 relative">
              <div className="w-full flex items-center gap-3">
                 {/* Photo (Left) */}
                 <div className="w-[28%] aspect-[3/4] rounded-sm bg-gray-200 overflow-hidden shadow-sm shrink-0 border-[1.5px] border-white/40">
                    <img src={student.avatar} className="w-full h-full object-cover" alt="Student" referrerPolicy="no-referrer" />
                 </div>

                 {/* Identity Info (Middle) */}
                 <div className="flex-1 min-w-0 flex flex-col justify-center">
                     <h3 className="font-bold text-[10px] leading-tight truncate mb-0.5">{student.name}</h3>
                     <p className="text-[7px] opacity-80 font-mono mb-1">{student.nisn}</p>
                     <div className="h-[0.5px] w-full bg-current opacity-30 my-1"></div>
                     <p className="text-[6px] font-bold">KELAS 10 IPA 1</p>
                     <p className="text-[5px] opacity-70">VALID THRU: 2026</p>
                 </div>

                 {/* QR Code (Right) */}
                 <div className="w-[22%] aspect-square bg-white p-1.5 rounded-sm shadow-sm shrink-0">
                    <StandardQRCode />
                 </div>
              </div>
          </div>

          {/* Decorative Background Elements based on index to keep variety */}
          {index < 6 && (
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>
          )}
          {index >= 12 && index < 15 && (
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          )}
      </div>
    );
  };

  const handleDesignSelect = (index: number) => {
    // Smooth transition effect
    setPreviewOpacity(0.5);
    setTimeout(() => {
        setSelectedDesign(index);
        setPreviewOpacity(1);
    }, 150);
  };

  const handleRequestDesign = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
    setTimeout(() => {
      alert("Permintaan desain berhasil dikirim ke Admin Sekolah!");
      setOrderSent(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
           <h1 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">
             Pilih Desain <span className="text-primary">Kartu Tanda Siswa</span>
           </h1>
           <p className="text-gray-500 max-w-2xl mx-auto">
             18 Pilihan desain eksklusif standar ISO. Sekolah dapat memilih desain resmi untuk dicetak secara massal oleh Admin.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
           {/* Left: Preview & Request Panel */}
           <div className="w-full lg:w-1/3 sticky top-24">
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-dark text-xl flex items-center gap-2">
                      <CreditCard className="text-primary" /> Preview
                    </h3>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-mono">Model #{selectedDesign + 1}</span>
                 </div>
                 
                 {/* Main Preview Container - Enforcing Aspect Ratio */}
                 <div className="bg-gray-200 p-6 rounded-xl mb-6 flex justify-center items-center shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    
                    {/* The Card Itself - ID-1 Size Ratio */}
                    <div 
                        className="w-full max-w-[340px] aspect-[86/54] shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300"
                        style={{ opacity: previewOpacity, transition: 'opacity 0.2s ease-in-out' }}
                    >
                       <CardTemplate index={selectedDesign} student={selectedStudent} />
                    </div>
                 </div>

                 {/* Request Form */}
                 <form onSubmit={handleRequestDesign} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Simulasi Data Siswa</label>
                      <select 
                        className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-gray-50"
                        onChange={(e) => {
                          const s = MOCK_STUDENTS.find(st => st.id === e.target.value);
                          if (s) setSelectedStudent(s);
                        }}
                        value={selectedStudent.id}
                      >
                         {MOCK_STUDENTS.map(s => <option key={s.id} value={s.id}>{s.name} - {s.classId === 'c1' ? '10 IPA 1' : '10 IPS 2'}</option>)}
                      </select>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-bold text-dark text-sm mb-3">Request Cetak (Sekolah)</h4>
                      <p className="text-xs text-gray-500 mb-4">
                        Pilih desain ini sebagai template resmi sekolah Anda. Admin akan memproses pencetakan massal.
                      </p>
                      
                      <button 
                        type="submit"
                        disabled={orderSent}
                        className="w-full bg-secondary text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {orderSent ? <CheckCircle2 /> : <Send size={18} />}
                        {orderSent ? 'Terkirim' : 'Ajukan Desain ke Admin'}
                      </button>
                    </div>
                 </form>
              </div>
           </div>

           {/* Right: Grid Selection */}
           <div className="w-full lg:w-2/3">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-dark text-lg">Katalog Desain (18 Model)</h3>
                    <div className="flex gap-2">
                       <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                       <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                       <span className="w-3 h-3 rounded-full bg-gray-800"></span>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 18 }).map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleDesignSelect(idx)}
                        className={`group relative rounded-xl transition-all duration-200 overflow-hidden text-left focus:outline-none ${
                          selectedDesign === idx 
                            ? 'ring-4 ring-primary ring-offset-2 shadow-xl scale-[1.02]' 
                            : 'hover:ring-2 hover:ring-gray-200 hover:shadow-lg'
                        }`}
                      >
                         <div className="aspect-[86/54] w-full">
                            <CardTemplate index={idx} student={selectedStudent} />
                         </div>
                         
                         {/* Overlay on hover/select */}
                         <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors ${selectedDesign === idx ? 'bg-transparent' : ''}`} />
                         
                         {selectedDesign === idx && (
                           <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow-sm z-10">
                             <CheckCircle2 size={12} />
                           </div>
                         )}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CardGenerator;
