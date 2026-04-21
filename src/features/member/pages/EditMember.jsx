import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import membersData from '../data.json';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const PencilIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
);
const TrashIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const StarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
);

export default function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = membersData.find(m => m.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: member?.name || '',
    phone: member?.phone || '',
    email: member?.email || '',
    level: member?.level || 'BRONZE'
  });

  if (!member) {
    return <div className="p-8 text-center font-sans">Member not found</div>;
  }

  const handleSave = () => {
    // In a real app, this would dispatch an action or call an API
    console.log('Saving member details:', formData);
    navigate(-1);
  };

  const handleRemove = () => {
    // In a real app, this would show a confirmation modal and then delete
    console.log('Removing member account:', member.id);
    navigate('/member');
  };

  const InputField = ({ label, value, onChange, type = "text" }) => (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider pl-1">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-[#EAF3FA] border-none rounded-xl text-[14px] font-medium text-[#11263C] focus:outline-none focus:ring-2 focus:ring-[#0D74C8]/30 transition-all"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-[#F4F8FB] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 sticky top-0 z-10 bg-[#F4F8FB]/90 backdrop-blur-sm">
          <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-slate-200 p-2 rounded-full transition-colors -ml-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-[17px] font-extrabold text-[#11263C] flex-1 text-center">Edit Member</h1>
          <button onClick={handleSave} className="text-[15px] font-bold text-[#0D74C8] hover:opacity-80 transition-opacity">
            Save
          </button>
        </div>

        <div className="flex flex-col items-center px-5 pt-4 pb-12">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-[104px] h-[104px] rounded-full overflow-hidden bg-[#C8E0F4] border-4 border-white shadow-sm mb-3">
              {member.avatarUrl ? (
                <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#0A6CBF] font-bold text-3xl flex h-full items-center justify-center">{member.initials}</span>
              )}
            </div>
            <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#0D74C8] hover:underline">
              <PencilIcon className="w-3.5 h-3.5" />
              Change Photo
            </button>
          </div>

          {/* Form Card */}
          <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
            <InputField 
              label="NAMA LENGKAP" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
            <InputField 
              label="NOMOR TELEPON" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              type="tel"
            />
            <InputField 
              label="ALAMAT EMAIL" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              type="email"
            />
            
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider pl-1 mb-1">MEMBERSHIP TIER</label>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => setFormData({...formData, level: 'GOLD'})}
                  className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl transition-all ${
                    formData.level === 'GOLD' 
                      ? 'bg-[#0A6CBF] text-white shadow-md' 
                      : 'bg-[#EAF3FA] text-[#0A6CBF] hover:bg-[#D1E4F5]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.level === 'GOLD' ? 'bg-white text-[#0A6CBF]' : 'bg-[#0A6CBF] text-white'}`}>
                    <StarIcon className="w-3 h-3" />
                  </div>
                  <span className="text-[12px] font-bold">Gold</span>
                </button>

                <button 
                  onClick={() => setFormData({...formData, level: 'SILVER'})}
                  className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl transition-all ${
                    formData.level === 'SILVER' 
                      ? 'bg-[#0A6CBF] text-white shadow-md' 
                      : 'bg-[#EAF3FA] text-[#11263C] hover:bg-[#D1E4F5]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.level === 'SILVER' ? 'bg-white text-[#0A6CBF]' : 'bg-[#5C7C9E] text-white'}`}>
                    <StarIcon className="w-3 h-3" />
                  </div>
                  <span className="text-[12px] font-bold">Silver</span>
                </button>

                <button 
                  onClick={() => setFormData({...formData, level: 'BRONZE'})}
                  className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl transition-all ${
                    formData.level === 'BRONZE' 
                      ? 'bg-[#0A6CBF] text-white shadow-md' 
                      : 'bg-[#EAF3FA] text-[#11263C] hover:bg-[#D1E4F5]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.level === 'BRONZE' ? 'bg-white text-[#0A6CBF]' : 'bg-[#5C7C9E] text-white'}`}>
                    <StarIcon className="w-3 h-3" />
                  </div>
                  <span className="text-[12px] font-bold">Bronze</span>
                </button>
              </div>
            </div>
          </div>

          {/* Remove Member Button */}
          <button 
            onClick={handleRemove}
            className="flex items-center justify-center gap-2 text-[#EF4444] hover:opacity-80 transition-opacity font-bold text-[14px]"
          >
            <TrashIcon className="w-4 h-4" />
            Remove Member Account
          </button>

        </div>
      </div>
    </div>
  );
}
