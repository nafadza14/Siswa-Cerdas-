
import React, { useState } from 'react';
import { Save, Building2, MapPin, Hash, Phone, Mail, Award, User } from 'lucide-react';
import { MOCK_SCHOOL_DATA } from '../../constants';
import { SchoolProfile as SchoolProfileType } from '../../types';

const SchoolProfile: React.FC = () => {
  const [profile, setProfile] = useState<SchoolProfileType>(MOCK_SCHOOL_DATA);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profil Sekolah berhasil diperbarui!');
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-dark">Profil Sekolah</h1>
        <p className="text-gray-500">Kelola informasi dasar sekolah untuk identitas platform</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-gray-50 pb-8">
           <div className="relative">
              <img src={profile.logo} className="w-32 h-32 rounded-3xl object-contain border-2 border-gray-100 bg-gray-50" />
              <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg">
                <Building2 size={16} />
              </button>
           </div>
           <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Building2 size={10}/> Nama Sekolah</label>
                    <input 
                      type="text" 
                      value={profile.name} 
                      onChange={e => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 font-bold text-dark focus:ring-2 focus:ring-primary" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Hash size={10}/> NPSN</label>
                    <input 
                      type="text" 
                      value={profile.npsn} 
                      onChange={e => setProfile({...profile, npsn: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 font-mono text-dark focus:ring-2 focus:ring-primary" 
                    />
                 </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><MapPin size={10}/> Alamat Lengkap</label>
                <textarea 
                  value={profile.address} 
                  onChange={e => setProfile({...profile, address: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-dark focus:ring-2 focus:ring-primary" 
                  rows={2}
                />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Mail size={10}/> Email Sekolah</label>
              <input 
                type="email" 
                value={profile.email} 
                onChange={e => setProfile({...profile, email: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-dark focus:ring-2 focus:ring-primary" 
              />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Phone size={10}/> Nomor Telepon</label>
              <input 
                type="text" 
                value={profile.phone} 
                onChange={e => setProfile({...profile, phone: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-dark focus:ring-2 focus:ring-primary" 
              />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><User size={10}/> Kepala Sekolah</label>
              <input 
                type="text" 
                value={profile.principal} 
                onChange={e => setProfile({...profile, principal: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-dark focus:ring-2 focus:ring-primary" 
              />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Award size={10}/> Akreditasi</label>
              <input 
                type="text" 
                value={profile.accreditation} 
                onChange={e => setProfile({...profile, accreditation: e.target.value})}
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-dark focus:ring-2 focus:ring-primary" 
              />
           </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-100 flex items-center justify-center gap-2 hover:bg-teal-600 transition"
        >
          <Save size={20} />
          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
};

export default SchoolProfile;
