import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const MoreVerticalIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
);
const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const CameraIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
);
const RibbonStarIcon = (props) => ( // Gold
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 15.22l-4.7 2.47 1.8-5.32L4.5 8.78l5.5-.47L12 3l2 5.31 5.5.47-4.6 3.59 1.8 5.32L12 15.22z"></path></svg>
);
const CircleStarIcon = (props) => ( // Silver
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5l-3.09 1.63.59-3.45L7 12.22l3.46-.5L12 8.5l1.54 3.22 3.46.5-2.5 2.46.59 3.45L12 16.5z"></path></svg>
);
const MedalIcon = (props) => ( // Bronze
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L9 8l3 3 3-3-3-6zm0 10c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zM6 8L3 13c1.23 2.13 3.5 3.5 6 3.5v-2c-1.54 0-2.92-.77-3.75-1.95L6 11.5V8zm12 0v3.5l.75 1.05C19.58 13.73 18.2 14.5 16.66 14.5v2c2.5 0 4.77-1.37 6-3.5L18 8z"></path></svg>
);
const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const QrCodeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const UserPlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
);
const CheckCircleMiniIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
);

export default function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    level: 'SILVER' // Default based on image
  });

  const handleSave = () => {
    console.log('Saving new member:', formData);
    navigate('/member');
  };

  const InputField = ({ label, placeholder, value, onChange, type = "text", prefix }) => (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-[9px] font-bold text-[#0A6CBF] uppercase tracking-wider pl-1">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-[13px] font-bold text-[#11263C]">{prefix}</span>
        )}
        <input 
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full py-3.5 bg-[#D5EAF8]/40 border-none rounded-xl text-[14px] font-medium text-[#11263C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D74C8]/30 transition-all ${prefix ? 'pl-11 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-[#F4F8FB] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col pb-24">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 sticky top-0 z-10 bg-[#F4F8FB]/90 backdrop-blur-sm">
          <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-slate-200 p-2 rounded-full transition-colors -ml-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-[17px] font-extrabold text-[#0D74C8] flex-1 text-center">Add Member</h1>
          <button className="text-[#0D74C8] hover:bg-slate-200 p-2 rounded-full transition-colors -mr-2">
            <MoreVerticalIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col px-5 pt-2 pb-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-[#D5EAF8] flex items-center justify-center border-[3px] border-white shadow-sm">
                <UserIcon className="w-10 h-10 text-[#8FA5B8]" />
              </div>
              <button className="absolute bottom-0 right-0 bg-[#0D74C8] text-white p-2 rounded-full border-2 border-white hover:bg-[#0A6CBF] transition-colors">
                <CameraIcon className="w-4 h-4" />
              </button>
            </div>
            <button className="text-[11px] font-bold text-[#0D74C8] tracking-widest uppercase hover:underline">
              TAMBAH FOTO
            </button>
          </div>

          <h3 className="text-[14px] font-bold text-[#11263C] mb-3 px-1">Informasi Pribadi</h3>

          {/* Form Card */}
          <div className="w-full bg-white rounded-[20px] p-5 shadow-sm border border-slate-100 mb-6">
            <InputField 
              label="NAMA LENGKAP" 
              placeholder="Masukkan nama lengkap"
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            <InputField 
              label="NOMOR TELEPON" 
              placeholder="812 3456 7890"
              prefix="+62"
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              type="tel"
            />
            <InputField 
              label="ALAMAT EMAIL" 
              placeholder="nama@email.com"
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              type="email"
            />
          </div>

          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[14px] font-bold text-[#11263C]">Tingkatan Member</h3>
            <span className="text-[12px] font-medium text-[#5C7C9E]">Pilih satu</span>
          </div>

          {/* Tier Selection */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button 
              onClick={() => setFormData({...formData, level: 'GOLD'})}
              className={`relative flex flex-col items-center justify-center gap-2 py-4 rounded-xl transition-all border-2 ${
                formData.level === 'GOLD' 
                  ? 'bg-[#F0F5F9] border-[#0A6CBF]' 
                  : 'bg-white border-transparent shadow-sm'
              }`}
            >
              <RibbonStarIcon className={`w-6 h-6 ${formData.level === 'GOLD' ? 'text-[#D97706]' : 'text-[#D97706]'}`} />
              <span className={`text-[12px] font-extrabold ${formData.level === 'GOLD' ? 'text-[#0A6CBF]' : 'text-[#11263C]'}`}>Gold</span>
              {formData.level === 'GOLD' && <CheckCircleMiniIcon className="w-4 h-4 text-[#0A6CBF] absolute top-1.5 right-1.5" />}
            </button>

            <button 
              onClick={() => setFormData({...formData, level: 'SILVER'})}
              className={`relative flex flex-col items-center justify-center gap-2 py-4 rounded-xl transition-all border-2 ${
                formData.level === 'SILVER' 
                  ? 'bg-[#F0F5F9] border-[#0A6CBF]' 
                  : 'bg-white border-transparent shadow-sm'
              }`}
            >
              <CircleStarIcon className={`w-6 h-6 ${formData.level === 'SILVER' ? 'text-[#5C7C9E]' : 'text-[#5C7C9E]'}`} />
              <span className={`text-[12px] font-extrabold ${formData.level === 'SILVER' ? 'text-[#0A6CBF]' : 'text-[#11263C]'}`}>Silver</span>
              {formData.level === 'SILVER' && <CheckCircleMiniIcon className="w-4 h-4 text-[#0A6CBF] absolute top-1.5 right-1.5" />}
            </button>

            <button 
              onClick={() => setFormData({...formData, level: 'BRONZE'})}
              className={`relative flex flex-col items-center justify-center gap-2 py-4 rounded-xl transition-all border-2 ${
                formData.level === 'BRONZE' 
                  ? 'bg-[#F0F5F9] border-[#0A6CBF]' 
                  : 'bg-white border-transparent shadow-sm'
              }`}
            >
              <MedalIcon className={`w-6 h-6 ${formData.level === 'BRONZE' ? 'text-[#11263C]' : 'text-[#11263C]'}`} />
              <span className={`text-[12px] font-extrabold ${formData.level === 'BRONZE' ? 'text-[#0A6CBF]' : 'text-[#11263C]'}`}>Bronze</span>
              {formData.level === 'BRONZE' && <CheckCircleMiniIcon className="w-4 h-4 text-[#0A6CBF] absolute top-1.5 right-1.5" />}
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#EAF3FA]/60 rounded-2xl p-4 flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg text-[#0A6CBF] shadow-sm">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-[#5C7C9E] uppercase tracking-wider mb-0.5">JOINED</span>
                <span className="text-[13px] font-extrabold text-[#11263C]">Oct 2023</span>
              </div>
            </div>
            <div className="bg-[#EAF3FA]/60 rounded-2xl p-4 flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg text-[#0A6CBF] shadow-sm">
                <QrCodeIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-[#5C7C9E] uppercase tracking-wider mb-0.5">ID CODE</span>
                <span className="text-[13px] font-extrabold text-[#11263C]">AI-2940</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Fixed Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center bg-transparent z-20 pointer-events-none">
          <div className="w-full max-w-[440px] md:max-w-3xl px-5 py-6 flex pointer-events-auto bg-gradient-to-t from-[#F4F8FB] via-[#F4F8FB] to-transparent">
            <button 
              onClick={handleSave}
              className="w-full bg-[#0A6CBF] hover:bg-[#095BA3] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#0A6CBF]/30"
            >
              <UserPlusIcon className="w-5 h-5" />
              Simpan Member
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
