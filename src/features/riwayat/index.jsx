import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../features/dashboard/components/BottomNav';
import Sidebar from '../../features/dashboard/components/Sidebar';
import riwayatData from './data.json';

const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const BellIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
const WalletIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
);
const BankIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="10" width="18" height="12" rx="2"></rect><rect x="5" y="14" width="2" height="4"></rect><rect x="11" y="14" width="2" height="4"></rect><rect x="17" y="14" width="2" height="4"></rect><path d="M3 10L12 3l9 7"></path></svg>
);
const QrCodeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const BagIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
);
const ReceiptSheetIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const RefundIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
);
const VaultLogo = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path></svg>
);
const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);

export default function RiwayatTransaksi({ onMainTabChange }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Hari Ini'); 
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  // Use 21 April 2026 as the mock "today" 
  const today = new Date('2026-04-21T23:59:59');
  
  const filteredData = useMemo(() => {
    return riwayatData.filter(trx => {
      // 1. Search Filter
      const matchesSearch = trx.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            trx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Date Filter
      const trxDate = new Date(trx.isoDate);
      const diffTime = today.getTime() - trxDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      let matchesDate = true;
      if (filter === 'Hari Ini') matchesDate = diffDays <= 1;
      if (filter === '7 Hari Terakhir') matchesDate = diffDays <= 7;
      if (filter === '30 Hari Terakhir') matchesDate = diffDays <= 30;
      
      return matchesSearch && matchesDate;
    });
  }, [filter, searchQuery]);

  const visibleTransactions = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const getTrxIcon = (type) => {
    switch(type) {
      case 'bag': return <BagIcon className="w-5 h-5 text-[#0A6CBF]" />;
      case 'receipt': return <ReceiptSheetIcon className="w-5 h-5 text-[#0A6CBF]" />;
      case 'qr': return <QrCodeIcon className="w-5 h-5 text-[#0A6CBF]" />;
      case 'refund': return <RefundIcon className="w-5 h-5 text-[#EF4444]" />;
      default: return <BagIcon className="w-5 h-5 text-[#0A6CBF]" />;
    }
  };

  const getPaymentIcon = (iconStr) => {
    switch(iconStr) {
      case 'wallet': return <WalletIcon className="w-3.5 h-3.5" />;
      case 'bank': return <BankIcon className="w-3.5 h-3.5" />;
      case 'qr': return <QrCodeIcon className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F8FB] w-full font-sans">
      <Sidebar activeTab="riwayat" onTabChange={onMainTabChange} />

      <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col w-full bg-[#F4F8FB]">
        <div className="w-full max-w-[440px] md:max-w-3xl lg:max-w-4xl mx-auto flex flex-col pb-24 md:pb-10">
          
          {/* Top Bar (Mobile/Desktop) */}
          <div className="flex items-center justify-between px-6 pt-8 pb-4 bg-[#F4F8FB] sticky top-0 z-20">
            <div className="flex items-center gap-2 text-[#0A6CBF]">
              <VaultLogo className="w-6 h-6" />
              <span className="font-extrabold text-[15px] tracking-tight">The Digital Vault</span>
            </div>
            <div className="flex items-center gap-4 text-[#5C7C9E]">
              <button 
                onClick={() => navigate('/notifikasi')}
                className="hover:text-[#0A6CBF] transition-colors"
              >
                <BellIcon className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#D1E4F5] border border-white shadow-sm">
                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="px-5">
            <h1 className="text-2xl md:text-[26px] font-extrabold text-[#11263C] mb-5">Riwayat Transaksi</h1>

            {/* Search Bar */}
            <div className="flex items-center gap-3 w-full bg-[#E3EAF2] rounded-[14px] px-4 py-3 mb-4 text-[#5C7C9E]">
              <SearchIcon className="w-5 h-5" />
              <input
                type="text"
                placeholder="Cari ID transaksi atau pelanggan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-[13px] font-medium placeholder:text-[#5C7C9E]/70"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {['Hari Ini', '7 Hari Terakhir', '30 Hari Terakhir'].map(f => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setVisibleCount(5);
                  }}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-sm ${
                    filter === f 
                      ? 'bg-[#0A6CBF] text-white' 
                      : 'bg-[#E3EAF2] text-[#5C7C9E] hover:bg-[#D1E4F5]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider">SEMUA TRANSAKSI</span>
              <span className="text-[12px] font-bold text-[#0A6CBF]">{filteredData.length} Transaksi</span>
            </div>

            {/* Transaction List */}
            <div className="flex flex-col gap-3">
              {visibleTransactions.map((trx, idx) => {
                const isRefund = trx.status === 'REFUND';
                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-sm border border-slate-50 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isRefund ? 'bg-[#FEF2F2]' : 'bg-[#F0F5F9]'}`}>
                        {getTrxIcon(trx.iconType)}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[15px] font-extrabold text-[#11263C] leading-none">{trx.id}</span>
                        <span className="text-[11px] font-medium text-[#8FA5B8]">{trx.displayDate}, {trx.time}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 items-start px-2 w-[110px]">
                      <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-[6px] ${isRefund ? 'bg-[#F1F5F9] text-[#8FA5B8]' : 'bg-[#D1FAE5] text-[#10B981]'}`}>
                        {trx.status}
                      </span>
                      <div className="flex items-center gap-1.5 text-[#5C7C9E]">
                        <span className="w-1 h-1 rounded-full bg-[#D1E4F5]"></span>
                        {getPaymentIcon(trx.paymentIcon)}
                        <span className="text-[11px] font-bold">{trx.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 min-w-[80px]">
                      <span className={`text-[16px] font-extrabold leading-none ${isRefund ? 'text-[#EF4444]' : 'text-[#11263C]'}`}>
                        {trx.amount}
                      </span>
                      <span className="text-[9px] font-bold text-[#8FA5B8] uppercase tracking-wider">
                        {isRefund ? 'DANA KEMBALI' : 'LIHAT DETAIL'}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredData.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-500 font-medium text-[14px]">Tidak ada transaksi ditemukan.</p>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-6 mb-8 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  className="bg-[#E3EAF2] hover:bg-[#D1E4F5] text-[#0A6CBF] px-6 py-3.5 rounded-full text-[13px] font-bold transition-colors flex items-center justify-center gap-2 w-[220px]"
                >
                  Muat Lebih Banyak
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
      
      <BottomNav activeTab="riwayat" onTabChange={onMainTabChange} />
    </div>
  );
}
