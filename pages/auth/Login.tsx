
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Eye, EyeOff, ArrowRight, QrCode, X, Camera, ShieldCheck } from 'lucide-react';
import { UserRole } from '../../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Clean up camera stream
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, the backend returns the user role.
    // For this demo, we'll simulate a student login by default.
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const startScanning = async () => {
    setIsScanning(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Izin kamera diperlukan untuk scan barcode.");
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const handleSimulatedScan = () => {
    setIsLoading(true);
    stopScanning();
    // Simulate successful student login from barcode
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fffcf8] flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl shadow-orange-100 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding & Info */}
        <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full -ml-24 -mb-24 blur-3xl"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-primary font-black text-2xl">S</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">SiswaCerdas</span>
            </Link>
            
            <h1 className="text-4xl font-black mb-6 leading-tight">
              Satu Pintu <br/> Untuk Semua Akses Pendidikan.
            </h1>
            <p className="text-white/80 leading-relaxed max-w-sm">
              Gunakan akun Anda atau scan barcode pada Kartu Tanda Siswa (KTS) untuk masuk secara otomatis.
            </p>
          </div>

          <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
            <div className="flex items-center gap-3 mb-3">
               <ShieldCheck className="text-secondary" />
               <p className="text-sm font-bold">Keamanan Terjamin</p>
            </div>
            <p className="text-xs text-white/70">Data login Anda dienkripsi secara end-to-end sesuai standar keamanan data nasional.</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
          
          {/* Barcode Scanner Overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-white z-20 flex flex-col p-8 animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-dark">Scan Barcode Kartu</h3>
                <button onClick={stopScanning} className="p-2 bg-gray-100 rounded-full text-gray-400 hover:text-dark">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 relative bg-gray-900 rounded-[32px] overflow-hidden border-4 border-primary/20">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-[60px] border-black/40 flex items-center justify-center">
                  <div className="w-full h-48 border-2 border-white/50 rounded-2xl relative">
                    <div className="absolute inset-0 border-2 border-primary animate-pulse rounded-2xl"></div>
                  </div>
                </div>
                <div className="absolute bottom-6 w-full text-center text-white/80 text-xs px-6">
                  Posisikan Barcode atau QR Code Kartu Anda di dalam area kotak
                </div>
              </div>

              <button 
                onClick={handleSimulatedScan}
                className="mt-8 w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-teal-600 transition"
              >
                Simulasi Deteksi Berhasil
              </button>
            </div>
          )}

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-dark mb-2">Login Akun</h2>
            <p className="text-gray-400 font-medium">Silakan masuk untuk melanjutkan akses Anda.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email / NISN / NIP</label>
              <div className="relative">
                 <input 
                  required
                  type="text" 
                  placeholder="Masukkan identitas anda"
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary focus:bg-white transition"
                 />
                 <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300">
                    <User size={20} />
                 </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline">Lupa Password?</button>
              </div>
              <div className="relative">
                 <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-medium focus:ring-2 focus:ring-primary focus:bg-white transition"
                 />
                 <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition"
                 >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold shadow-xl shadow-teal-100 hover:bg-teal-600 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Masuk Sekarang <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">Atau</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <button 
              onClick={startScanning}
              className="mt-6 w-full bg-white border-2 border-primary text-primary py-4 rounded-2xl font-bold hover:bg-primary/5 transition flex items-center justify-center gap-3 active:scale-95 shadow-sm"
            >
              <QrCode size={20} />
              Login menggunakan Scan Barcode
            </button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm font-medium">
              Belum punya akun sekolah? <Link to="/register-school" className="text-secondary font-bold hover:underline">Daftarkan Sekolah</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
