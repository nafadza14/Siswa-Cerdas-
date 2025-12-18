
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, CheckCircle, ArrowRight, ShieldCheck, Mail, Phone, MapPin, Hash, User } from 'lucide-react';

const RegisterSchool: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 text-center">
        <div className="max-w-md w-full animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
            <CheckCircle size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-dark mb-4">Pendaftaran Berhasil!</h1>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Permohonan pendaftaran sekolah Anda sedang dalam proses verifikasi oleh tim Siswa Cerdas. Kami akan menghubungi Anda melalui email dalam 1x24 jam.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:bg-teal-600 transition">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcf8] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-dark">Siswa<span className="text-primary">Cerdas</span></span>
          </Link>
          <h1 className="text-4xl font-black text-dark mb-4">Daftarkan Sekolah Anda</h1>
          <p className="text-gray-500 font-medium">Bergabunglah dengan ekosistem pendidikan cerdas di Indonesia.</p>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-orange-100 border border-gray-100 overflow-hidden">
          <div className="bg-primary/5 p-6 border-b border-gray-100 flex items-center gap-3">
             <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center">
                <ShieldCheck size={20}/>
             </div>
             <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Informasi Keamanan</p>
                <p className="text-xs text-primary/70 font-medium">Semua data sekolah dienkripsi dan dilindungi oleh standar keamanan tinggi.</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                
                {/* School Basic Info */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-2">
                     <Building2 size={16} className="text-secondary" /> Data Institusi
                   </h3>
                   
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Nama Sekolah</label>
                      <div className="relative">
                         <input required type="text" placeholder="SMA Negeri 1 Jakarta" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:bg-white transition" />
                         <Building2 size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">NPSN</label>
                      <div className="relative">
                         <input required type="text" maxLength={8} placeholder="1080XXXX" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-mono focus:ring-2 focus:ring-primary focus:bg-white transition" />
                         <Hash size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Alamat Lengkap</label>
                      <div className="relative">
                         <textarea required rows={3} placeholder="Jl. Pendidikan No. 123..." className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:bg-white transition resize-none" />
                         <MapPin size={18} className="absolute right-5 top-6 text-gray-300" />
                      </div>
                   </div>
                </div>

                {/* Admin/Contact Info */}
                <div className="space-y-6">
                   <h3 className="text-sm font-black text-dark uppercase tracking-widest flex items-center gap-2">
                     <User size={16} className="text-secondary" /> Kontak & Admin
                   </h3>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Nama Kepala Sekolah</label>
                      <div className="relative">
                         <input required type="text" placeholder="Nama Lengkap & Gelar" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:bg-white transition" />
                         <User size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Email Sekolah</label>
                      <div className="relative">
                         <input required type="email" placeholder="admin@sekolah.sch.id" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:bg-white transition" />
                         <Mail size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase px-1">Nomor WhatsApp Sekolah</label>
                      <div className="relative">
                         <input required type="text" placeholder="62812XXXX" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:bg-white transition" />
                         <Phone size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-50">
                <div className="flex items-start gap-3 max-w-sm">
                   <input required type="checkbox" id="terms" className="mt-1 rounded text-primary focus:ring-primary" />
                   <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                     Saya menyetujui <button type="button" className="text-primary font-bold">Syarat & Ketentuan</button> serta <button type="button" className="text-primary font-bold">Kebijakan Privasi</button> Siswa Cerdas untuk pendaftaran sekolah.
                   </label>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full md:w-auto bg-primary text-white px-12 py-5 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:bg-teal-600 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Daftarkan Sekarang <ArrowRight size={20} />
                    </>
                  )}
                </button>
             </div>
          </form>
        </div>

        <div className="mt-8 text-center">
           <p className="text-gray-400 text-sm font-medium">
             Sudah memiliki akun? <Link to="/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>
           </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSchool;
