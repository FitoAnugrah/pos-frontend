import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import aktivitasData from '../../mock/aktivitasData.json';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const WarningIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const ReceiptIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const BoxIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);
const PromoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 19 2 12 11 5 11 19"></polygon><path d="M22 12A10 10 0 0 0 12 2v20a10 10 0 0 0 10-10z"></path></svg>
);
const RefundIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><polyline points="11 16 7 12 11 8"></polyline><line x1="17" y1="12" x2="7" y2="12"></line></svg>
);

export default function AktivitasTerkini() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Semua');

  const filteredData = useMemo(() => {
    if (filter === 'Semua') return aktivitasData;
    return aktivitasData.filter(item => item.category === filter);
  }, [filter]);

  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <div className="bg-[#FDE6D5] text-[#D97706] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"><WarningIcon className="w-6 h-6" /></div>;
      case 'member': return <div className="bg-[#D1E4F5] text-[#0A6CBF] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"><UserIcon className="w-6 h-6" /></div>;
      case 'receipt': return <div className="bg-[#D1E4F5] text-[#0A6CBF] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"><ReceiptIcon className="w-6 h-6" /></div>;
      case 'box': return <div className="bg-[#D1E4F5] text-[#0A6CBF] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"><BoxIcon className="w-6 h-6" /></div>;
      case 'promo': return <div className="bg-[#FDE6D5] text-[#D97706] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"><PromoIcon className="w-6 h-6" /></div>;
      case 'refund': return <div className="bg-[#FEF2F2] text-[#EF4444] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"><RefundIcon className="w-6 h-6" /></div>;
      default: return <div className="bg-[#D1E4F5] text-[#0A6CBF] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"><UserIcon className="w-6 h-6" /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl lg:max-w-4xl bg-[#F4F8FB] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col pb-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5 sticky top-0 z-20 bg-[#F4F8FB]/90 backdrop-blur-sm">
          <button onClick={() => navigate(-1)} className="text-[#0A6CBF] hover:bg-[#D1E4F5] p-2 rounded-full transition-colors -ml-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-[18px] font-extrabold text-[#11263C]">Aktivitas Terkini</h1>
        </div>

        <div className="px-5 pt-2">
          
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {['Semua', 'Stok', 'Member', 'Transaksi'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-sm ${
                  filter === f 
                    ? 'bg-[#0A6CBF] text-white shadow-[#0A6CBF]/30' 
                    : 'bg-[#E3EAF2] text-[#5C7C9E] hover:bg-[#D1E4F5]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Activity List */}
          <div className="flex flex-col gap-3">
            {filteredData.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-50 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                {getIcon(item.type)}
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-extrabold text-[#11263C] leading-none mt-1">{item.title}</h3>
                    <span className="text-[11px] font-medium text-[#5C7C9E] mt-1">{item.time}</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#5C7C9E] leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-500 font-medium text-[14px]">Tidak ada aktivitas.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
