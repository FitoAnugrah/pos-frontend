import React from 'react';
import { useNavigate } from 'react-router-dom';
import membersData from './data.json';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const UsersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>
);
const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const ChevronRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const TrendingUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default function MemberPage() {
  const navigate = useNavigate();

  const getLevelStyle = (level) => {
    switch(level) {
      case 'GOLD': return 'bg-[#FDF2E9] text-[#D97706]'; // Based on image
      case 'SILVER': return 'bg-[#EBF2FC] text-[#5C7C9E]'; // Based on image
      case 'BRONZE': return 'bg-[#E0F2FE] text-[#0284C7]'; // Based on image
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5F9] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-[#F0F5F9] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-100 sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-slate-50 p-2 rounded-full transition-colors -ml-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 flex-1 justify-center -ml-2">
            <UsersIcon className="w-5 h-5 text-[#17324D]" />
            <h1 className="text-[19px] font-bold text-[#17324D]">Members</h1>
          </div>
          <button 
            onClick={() => navigate('/member/add')}
            className="text-[#0D74C8] hover:bg-slate-50 p-2 rounded-full transition-colors -mr-2"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Cari nama member..." 
              className="w-full pl-11 pr-4 py-3.5 bg-white border-none rounded-xl text-[15px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D74C8]/20 transition-all shadow-sm"
            />
          </div>

          {/* Stats Card */}
          <div className="bg-[#0A6CBF] rounded-3xl p-6 text-white shadow-[0_12px_24px_rgba(10,108,191,0.25)] relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-white/80 text-[13px] font-medium mb-1">Total Member</p>
                <h2 className="text-[38px] font-extrabold tracking-tight leading-none mt-1">1,240</h2>
              </div>
              <div className="flex flex-col items-end">
                <div className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm mt-1">
                  <TrendingUpIcon className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-bold text-white">+45</span>
                </div>
                <p className="text-[10px] font-bold text-white/90 uppercase tracking-wider mt-4">AKTIF BULAN INI</p>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1 px-1">
              <h3 className="text-sm font-bold text-[#5C7C9E] uppercase tracking-wider">Daftar Member</h3>
              <button className="text-[13px] font-semibold text-[#0A6CBF] bg-[#E3F0FA] px-3.5 py-1.5 rounded-full hover:bg-[#D1E7F8] transition-colors">
                Urutkan: Terbaru
              </button>
            </div>

            {/* List Items */}
            <div className="flex flex-col gap-4">
              {membersData.map((member) => (
                <div 
                  key={member.id} 
                  onClick={() => navigate(`/member/${member.id}`)}
                  className="bg-white rounded-[20px] p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#C8E0F4] flex items-center justify-center">
                    {member.avatarUrl ? (
                      <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#0A6CBF] font-bold text-[19px]">{member.initials}</span>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                    <h4 className="text-[16px] font-bold text-slate-800 leading-none truncate">{member.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getLevelStyle(member.level)}`}>
                        {member.level}
                      </span>
                      <span className="text-[13px] text-slate-500 font-medium">
                        Poin: {member.points}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRightIcon className="w-5 h-5 text-slate-300 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
