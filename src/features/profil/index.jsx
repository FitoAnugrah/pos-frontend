import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profilText from './text';
import EditInformasiAkun from './pages/EditInformasiAkun';
import AturKeamanan from './pages/AturKeamanan';
import Bahasa from './pages/Bahasa';
import KebijakanPrivasi from './pages/KebijakanPrivasi';
import PusatBantuan from './pages/PusatBantuan';

const Profil = ({ activeTab, onTabChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isBahasaOpen, setIsBahasaOpen] = useState(false);
  const [isKebijakanPrivasiOpen, setIsKebijakanPrivasiOpen] = useState(false);
  const [isPusatBantuanOpen, setIsPusatBantuanOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('id');
  const navigate = useNavigate();
  
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

  if (isPusatBantuanOpen) {
    return <PusatBantuan onTabChange={() => setIsPusatBantuanOpen(false)} />;
  }

  if (isKebijakanPrivasiOpen) {
    return <KebijakanPrivasi onBack={() => setIsKebijakanPrivasiOpen(false)} />;
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
      />
    );
  }

  return (
    <div className="flex-1 w-full bg-slate-50 h-full overflow-y-auto overflow-x-hidden">
        
        {/* Desktop Topbar */}
        <div className="hidden md:flex items-center justify-between px-8 lg:px-12 py-6 bg-white/80 backdrop-blur border-b border-slate-100 sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{profilText.header.title}</h1>
            <p className="text-sm text-slate-500">Kelola pengaturan preferensi dan informasi akun Anda.</p>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
            <button 
              onClick={() => onTabChange && onTabChange('terminal')}
              className="text-blue-600 p-2 -ml-2 rounded-full hover:bg-blue-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <h1 className="text-lg font-bold text-blue-700">{profilText.header.title}</h1>
            <div className="w-10"></div> {/* Spacer balance */}
        </div>

        {/* Main Content Padding */}
        <div className="p-4 md:p-8 lg:p-12 w-full max-w-screen-xl mx-auto flex flex-col">
          
          <div className="mb-8 hidden md:block">
            <h2 className="text-3xl font-semibold text-slate-800">{profilText.header.title}</h2>
          </div>

          {/* Profile Content Grid */}
          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 lg:gap-12 items-start w-full">
            
            {/* LEFT COLUMN: Central Profile Card */}
            <div className="w-full md:col-span-5 lg:col-span-4 flex-shrink-0">
               <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center relative w-full">
                 
                 <div className="relative mb-6">
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100">
                     <img src={profileData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                   </div>
                   <button 
                     onClick={() => setIsEditing(true)} 
                     className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 md:p-2.5 rounded-full shadow-md border border-slate-100 hover:bg-blue-50 hover:scale-105 transition-all"
                   >
                     <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                   </button>
                 </div>

                 <div className="flex flex-col items-center gap-1 text-center mb-8 w-full">
                   <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{profileData.namaLengkap}</h2>
                   <p className="text-sm md:text-[15px] font-medium text-slate-400">{profileData.role}</p>
                 </div>

                 {/* Stats Cards */}
                 <div className="grid grid-cols-2 gap-4 w-full">
                   <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-sm transition-shadow">
                     <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{profilText.stats.totalShift.label}</p>
                     <p className="text-2xl md:text-3xl font-bold text-slate-800">{profilText.stats.totalShift.value}</p>
                   </div>
                   <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-sm transition-shadow">
                     <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{profilText.stats.peringkat.label}</p>
                     <div className="flex items-center gap-1.5 text-yellow-500 drop-shadow-sm">
                       <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                       <span className="text-2xl md:text-3xl font-bold text-slate-800">{profilText.stats.peringkat.value}</span>
                     </div>
                   </div>
                 </div>

               </div>
            </div>

            {/* RIGHT COLUMN: Info & Settings Panels */}
            <div className="w-full md:col-span-7 lg:col-span-8 flex flex-col gap-6 md:gap-8 mt-6 md:mt-0">
              
              {/* Informasi Akun */}
              <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs md:text-sm font-bold text-slate-400 tracking-wider uppercase">{profilText.sections.informasiAkun.title}</h3>
                  <button onClick={() => setIsEditing(true)} className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 md:pb-6 border-b border-slate-50 last:border-0 last:pb-0 gap-1">
                    <span className="text-xs md:text-sm text-slate-500 font-medium">{profilText.sections.informasiAkun.items.namaLengkap.label}</span>
                    <span className="text-sm md:text-base font-bold text-slate-800">{profileData.namaLengkap}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 md:pb-6 border-b border-slate-50 last:border-0 last:pb-0 gap-1">
                    <span className="text-xs md:text-sm text-slate-500 font-medium">{profilText.sections.informasiAkun.items.email.label}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-sm md:text-base font-bold text-slate-800">{profileData.email}</span>
                       <div className="text-emerald-500 bg-emerald-50 rounded-full p-1 border border-emerald-100 shadow-sm ml-1"><svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 md:pb-6 border-b border-slate-50 last:border-0 last:pb-0 gap-1">
                    <span className="text-xs md:text-sm text-slate-500 font-medium">{profilText.sections.informasiAkun.items.noTelepon.label}</span>
                    <span className="text-sm md:text-base font-bold text-slate-800">{profileData.noTelepon}</span>
                  </div>
                </div>
              </section>

              {/* Keamanan */}
              <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xs md:text-sm font-bold text-slate-400 tracking-wider uppercase mb-4 md:mb-6">{profilText.sections.keamanan.title}</h3>
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigate('/login', { state: { view: 'sandi-baru' } })} className="flex items-center justify-between p-3 -mx-3 hover:bg-slate-50 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <span className="text-sm md:text-[15px] font-semibold text-slate-700">{profilText.sections.keamanan.items.ubahPassword}</span>
                    </div>
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  
                  <button onClick={() => setIsSecurityOpen(true)} className="flex items-center justify-between p-3 -mx-3 hover:bg-slate-50 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <span className="text-sm md:text-[15px] font-semibold text-slate-700">{profilText.sections.keamanan.items.aturPin}</span>
                    </div>
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </section>

              {/* Pengaturan Aplikasi */}
              <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xs md:text-sm font-bold text-slate-400 tracking-wider uppercase mb-4 md:mb-6">{profilText.sections.pengaturanAplikasi.title}</h3>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setIsBahasaOpen(true)} className="flex items-center justify-between p-3 -mx-3 hover:bg-slate-50 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      </div>
                      <span className="text-sm md:text-[15px] font-semibold text-slate-700">{profilText.sections.pengaturanAplikasi.items.bahasa.label}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                       <span className="text-xs md:text-[13px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                         {currentLang === 'id' ? 'Indonesia' : currentLang === 'en' ? 'English' : currentLang === 'ms' ? 'Malay' : 'Chinese'}
                       </span>
                       <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </button>

                  <div className="flex items-center justify-between p-3 -mx-3 hover:bg-slate-50 rounded-xl transition-colors group cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
                    <div className="flex items-center gap-3 md:gap-4">
                       <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                         <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                       </div>
                       <span className="text-sm md:text-[15px] font-semibold text-slate-700">{profilText.sections.pengaturanAplikasi.items.modeGelap}</span>
                    </div>
                    <div>
                       <button className={`w-10 h-5 md:w-11 md:h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${isDarkMode ? 'bg-blue-600' : 'bg-slate-200'}`}>
                         <div className={`bg-white w-3.5 h-3.5 md:w-4 md:h-4 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5 md:translate-x-6' : 'translate-x-[3px] md:translate-x-[4px]'}`}></div>
                       </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bantuan & Privasi */}
              <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex flex-col gap-2">
                  <button onClick={() => setIsPusatBantuanOpen(true)} className="flex items-center justify-between p-3 -mx-3 hover:bg-slate-50 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <span className="text-sm md:text-[15px] font-semibold text-slate-700">{profilText.sections.bantuanPrivasi.pusatBantuan}</span>
                    </div>
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  
                  <button onClick={() => setIsKebijakanPrivasiOpen(true)} className="flex items-center justify-between p-3 -mx-3 hover:bg-slate-50 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                      </div>
                      <span className="text-sm md:text-[15px] font-semibold text-slate-700">{profilText.sections.bantuanPrivasi.kebijakanPrivasi}</span>
                    </div>
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </section>

              {/* Logout Button */}
              <div className="mt-8 mb-6 md:mt-10 md:mb-0">
                <button 
                  onClick={() => navigate('/login')}
                  className="w-full bg-red-50 text-red-600 font-semibold py-3.5 md:py-4 rounded-xl border border-red-200 transition-all shadow-sm hover:bg-red-100 active:scale-[0.98] text-sm md:text-base"
                >
                  {profilText.logout}
                </button>
              </div>

              {/* Footer Version */}
              <div className="text-center pb-8 md:pb-12">
                <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase">{profilText.footer}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
