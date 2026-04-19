import React, { useState } from 'react';
import profilText from './text';
import EditInformasiAkun from './components/EditInformasiAkun';
import AturKeamanan from './components/AturKeamanan';
import Bahasa from './components/Bahasa';

const Profil = ({ activeTab, onTabChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isBahasaOpen, setIsBahasaOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('id');
  
  const [profileData, setProfileData] = useState({
    namaLengkap: profilText.sections.informasiAkun.items.namaLengkap.value,
    email: profilText.sections.informasiAkun.items.email.value,
    noTelepon: profilText.sections.informasiAkun.items.noTelepon.value,
    avatarUrl: profilText.profile.avatarUrl,
    role: profilText.profile.role,
  });

  const handleSaveProfile = (newData) => {
    setProfileData(newData);
    setIsEditing(false);
  };

  if (isBahasaOpen) {
    return (
      <Bahasa 
        currentLang={currentLang}
        onBack={() => setIsBahasaOpen(false)}
        onSave={(lang) => {
          setCurrentLang(lang);
          setIsBahasaOpen(false);
        }}
      />
    );
  }

  if (isSecurityOpen) {
    return <AturKeamanan onBack={() => setIsSecurityOpen(false)} />;
  }

  if (isEditing) {
    return (
      <EditInformasiAkun 
        initialData={profileData}
        onBack={() => setIsEditing(false)}
        onSave={handleSaveProfile}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        onOpenResetPassword={() => alert('Halaman Reset Password belum tersedia')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1D20] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] bg-[#f4f7fb] min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col font-sans text-slate-800 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <button 
            onClick={() => onTabChange && onTabChange('terminal')}
            className="text-blue-600 p-1 -ml-1 rounded-full hover:bg-blue-50 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-blue-700">{profilText.header.title}</h1>
        <button className="text-blue-600 p-1 -mr-1 rounded-full hover:bg-blue-50 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center mt-2">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-sm overflow-hidden">
            <img src={profileData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button onClick={() => setIsEditing(true)} className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <h2 className="text-xl font-bold mt-3 text-slate-800">{profileData.namaLengkap}</h2>
        <p className="text-sm text-slate-500">{profileData.role}</p>
      </div>

      {/* Stats Cards */}
      <div className="flex px-4 mt-6 space-x-3">
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{profilText.stats.totalShift.label}</p>
          <p className="text-2xl font-bold text-blue-600">{profilText.stats.totalShift.value}</p>
        </div>
        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{profilText.stats.peringkat.label}</p>
          <div className="flex items-center text-[#c28e0e]">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xl font-bold">{profilText.stats.peringkat.value}</span>
          </div>
        </div>
      </div>

      {/* Menus */}
      <div className="px-4 mt-6 space-y-4">
        
        {/* Informasi Akun */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#eef5fc] px-4 py-3 flex justify-between items-center">
            <h3 className="text-[11px] font-semibold text-blue-500">{profilText.sections.informasiAkun.title}</h3>
            <button onClick={() => setIsEditing(true)} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {/* Item */}
            <div className="flex items-center p-4">
              <div className="text-slate-500 mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-400 mb-0.5">{profilText.sections.informasiAkun.items.namaLengkap.label}</p>
                <p className="text-[13px] font-medium text-slate-700">{profileData.namaLengkap}</p>
              </div>
            </div>
            {/* Item */}
            <div className="flex items-center p-4">
              <div className="text-slate-500 mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-400 mb-0.5">{profilText.sections.informasiAkun.items.email.label}</p>
                <p className="text-[13px] font-medium text-slate-700">{profileData.email}</p>
              </div>
              <div className="text-green-500 bg-green-100 rounded-full p-0.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
            {/* Item */}
            <div className="flex items-center p-4">
              <div className="text-slate-500 mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-slate-400 mb-0.5">{profilText.sections.informasiAkun.items.noTelepon.label}</p>
                <p className="text-[13px] font-medium text-slate-700">{profileData.noTelepon}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keamanan */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#eef5fc] px-4 py-3">
            <h3 className="text-[11px] font-semibold text-blue-500">{profilText.sections.keamanan.title}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <button className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors">
              <div className="text-slate-500 mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[13px] font-medium text-slate-700">{profilText.sections.keamanan.items.ubahPassword}</p>
              </div>
              <div className="text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
            <button 
              onClick={() => setIsSecurityOpen(true)}
              className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="text-slate-500 mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[13px] font-medium text-slate-700">{profilText.sections.keamanan.items.aturPin}</p>
              </div>
              <div className="text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          </div>
        </section>

        {/* Pengaturan Aplikasi */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#eef5fc] px-4 py-3">
            <h3 className="text-[11px] font-semibold text-blue-500">{profilText.sections.pengaturanAplikasi.title}</h3>
          </div>
          <div className="divide-y divide-slate-100">
            <button 
              onClick={() => setIsBahasaOpen(true)}
              className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="text-slate-500 mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[13px] font-medium text-slate-700">{profilText.sections.pengaturanAplikasi.items.bahasa.label}</p>
              </div>
              <div className="text-blue-600 text-[13px] font-bold flex items-center">
                {currentLang === 'id' ? 'Indonesia' : currentLang === 'en' ? 'English' : currentLang === 'ms' ? 'Malay' : 'Chinese'}
              </div>
            </button>
            <div className="w-full flex items-center p-4">
              <div className="text-slate-500 mr-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[13px] font-medium text-slate-700">{profilText.sections.pengaturanAplikasi.items.modeGelap}</p>
              </div>
              <div>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-10 h-5 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${isDarkMode ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bantuan & Privasi */}
        <section className="bg-white rounded-xl shadow-sm divide-y divide-slate-100 overflow-hidden">
          <button className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors">
            <div className="text-slate-500 mr-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[13px] font-medium text-slate-700">{profilText.sections.bantuanPrivasi.pusatBantuan}</p>
            </div>
          </button>
          <button className="w-full flex items-center p-4 hover:bg-slate-50 transition-colors">
            <div className="text-slate-500 mr-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[13px] font-medium text-slate-700">{profilText.sections.bantuanPrivasi.kebijakanPrivasi}</p>
            </div>
          </button>
        </section>

        {/* Logout Button */}
        <button className="w-full bg-[#fce8e8] text-red-600 font-bold py-3.5 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors mt-2">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          {profilText.logout}
        </button>

      </div>

      {/* Footer Version */}
      <div className="mt-8 text-center pb-4">
        <p className="text-[10px] text-slate-400">{profilText.footer}</p>
      </div>

      </div>
    </div>
  );
};

export default Profil;
