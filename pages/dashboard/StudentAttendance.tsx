import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Camera, RefreshCw, CheckCircle, Clock, X } from 'lucide-react';
import { MOCK_STUDENTS } from '../../constants';

const StudentAttendance: React.FC = () => {
  // State for flow
  const [step, setStep] = useState<'idle' | 'locating' | 'camera' | 'success'>('idle');
  const [locationStatus, setLocationStatus] = useState<'waiting' | 'valid' | 'invalid'>('waiting');
  const [photo, setPhoto] = useState<string | null>(null);
  
  // Realtime clock for display
  const [currentTime, setCurrentTime] = useState(new Date());
  // Timestamp captured when attendance is submitted
  const [submittedTime, setSubmittedTime] = useState<Date | null>(null);

  // Camera Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startAttendance = () => {
    setStep('locating');
    // Simulate Geolocation Check (2 seconds)
    setTimeout(() => {
      setLocationStatus('valid');
      // After location valid, wait 1s then open camera
      setTimeout(() => {
        openCamera();
      }, 1000);
    }, 2000);
  };

  const openCamera = async () => {
    setStep('camera');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Please allow camera permissions or try uploading a file.");
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageSrc = canvas.toDataURL('image/jpeg');
        setPhoto(imageSrc);
        
        // Capture the exact moment of submission
        setSubmittedTime(new Date());
        
        // Stop stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        setStep('success');
      }
    }
  };

  const resetProcess = () => {
    setStep('idle');
    setPhoto(null);
    setSubmittedTime(null);
    setLocationStatus('waiting');
  };

  return (
    <div className="max-w-md mx-auto min-h-[calc(100vh-100px)] flex flex-col relative">
      
      {/* Header Info */}
      <div className="bg-white p-6 rounded-b-3xl shadow-sm border-b border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-dark">Presensi Harian</h1>
            <p className="text-gray-500 text-sm">{currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
          <div className="text-right">
             <div className="text-2xl font-mono font-bold text-primary">
               {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace('.', ':').replace('.', ':')}
             </div>
             <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">WIB</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
           step === 'success' 
             ? 'bg-green-50 border-green-200 text-green-700' 
             : 'bg-gray-50 border-gray-100 text-gray-500'
        }`}>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              step === 'success' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
           }`}>
              <CheckCircle size={20} />
           </div>
           <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-0.5">Status Kehadiran</p>
              <p className="font-bold text-lg leading-none">
                {step === 'success' ? 'Sudah Presensi' : 'Belum Presensi'}
              </p>
           </div>
        </div>
      </div>

      {/* Main Action Area */}
      <div className="flex-1 px-6 pb-6 flex flex-col justify-center">
        
        {step === 'idle' && (
          <div className="space-y-6 text-center">
            <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center mx-auto relative">
               <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
               <MapPin size={64} className="text-primary relative z-10" />
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-dark">Siap untuk Presensi?</h2>
              <p className="text-gray-500 text-sm mt-2">
                Pastikan kamu berada di lingkungan sekolah. Sistem akan mendeteksi lokasimu.
              </p>
            </div>

            <button 
              onClick={startAttendance}
              className="w-full bg-primary hover:bg-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 text-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Camera size={24} />
              Ambil Foto Selfie
            </button>
          </div>
        )}

        {step === 'locating' && (
          <div className="text-center space-y-6">
             <div className="w-24 h-24 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto"></div>
             <div>
               <h3 className="font-bold text-lg text-dark">Mendeteksi Lokasi...</h3>
               <p className="text-gray-500 text-sm">Mohon tunggu sebentar</p>
             </div>
             {locationStatus === 'valid' && (
                <div className="animate-fade-in text-green-600 font-bold flex items-center justify-center gap-2">
                   <CheckCircle size={16}/> Lokasi Valid: SMA Xaverius
                </div>
             )}
          </div>
        )}

        {step === 'camera' && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col">
             {/* Camera Header */}
             <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10 text-white">
                <span className="font-bold text-lg">Ambil Selfie</span>
                <button onClick={resetProcess} className="p-2 bg-white/20 rounded-full"><X/></button>
             </div>

             {/* Viewfinder */}
             <div className="flex-1 relative bg-gray-900 overflow-hidden">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Guides */}
                <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none">
                   <div className="w-full h-full border-2 border-white/50 rounded-3xl relative">
                      <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                        Posisikan wajah di dalam kotak
                      </span>
                   </div>
                </div>
             </div>

             {/* Capture Button */}
             <div className="h-32 bg-black flex items-center justify-center">
                <button 
                  onClick={takePhoto}
                  className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center active:scale-90 transition"
                >
                   <div className="w-16 h-16 bg-white rounded-full border-2 border-black"></div>
                </button>
             </div>
          </div>
        )}

        {step === 'success' && photo && submittedTime && (
           <div className="text-center space-y-6 animate-fade-in-up">
              <div className="w-full aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-lg border-4 border-white mx-auto max-w-[280px] relative">
                 <img src={photo} alt="Selfie" className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white text-left">
                    <p className="font-bold text-lg">{submittedTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':')} WIB</p>
                    <p className="text-xs opacity-80">SMA Xaverius • Valid</p>
                 </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-dark">Presensi Berhasil!</h2>
                <p className="text-gray-500">Data kehadiranmu telah tersimpan.</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-left space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Nama</span>
                    <span className="font-bold text-dark">Clara Setiana Dewi</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Waktu</span>
                    <span className="font-bold text-dark">{submittedTime.toLocaleTimeString('id-ID')}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Metode</span>
                    <span className="font-bold text-primary flex items-center gap-1"><MapPin size={12}/> Geotagging</span>
                 </div>
              </div>

              <button onClick={() => window.location.href = '#/dashboard'} className="text-gray-400 hover:text-dark text-sm font-medium">
                Kembali ke Dashboard
              </button>
           </div>
        )}

      </div>
    </div>
  );
};

export default StudentAttendance;