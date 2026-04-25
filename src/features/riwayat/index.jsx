import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import {
  SearchIcon,
  BellIcon,
  WalletIcon,
  BankIcon,
  QrCodeIcon,
  BagIcon,
  ReceiptSheetIcon,
  RefundIcon,
  VaultLogoIcon,
  ChevronDownIcon,
} from '../../components/ui/icons';

export default function RiwayatTransaksi({ onMainTabChange }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Hari Ini'); 
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const today = new Date();
  
  const filteredData = useMemo(() => {
    return transactions.filter(trx => {
      // 1. Search Filter
      const invoiceNumber = trx.invoice_number || '';
      const paymentMethod = trx.payment_method || '';
      const matchesSearch = invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Date Filter
      const trxDate = new Date(trx.created_at);
      const diffTime = today.getTime() - trxDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      let matchesDate = true;
      if (filter === 'Hari Ini') matchesDate = diffDays <= 1;
      if (filter === '7 Hari Terakhir') matchesDate = diffDays <= 7;
      if (filter === '30 Hari Terakhir') matchesDate = diffDays <= 30;
      
      return matchesSearch && matchesDate;
    });
  }, [filter, searchQuery, transactions]);

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
    <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col w-full bg-[#F4F8FB]">
        <div className="w-full max-w-[440px] md:max-w-3xl lg:max-w-4xl mx-auto flex flex-col pb-24 md:pb-10">
          
          {/* Top Bar (Mobile/Desktop) */}
          <div className="flex items-center justify-between px-6 pt-8 pb-4 bg-[#F4F8FB] sticky top-0 z-20">
            <div className="flex items-center gap-2 text-[#0A6CBF]">
              <VaultLogoIcon className="w-6 h-6" />
              <span className="font-extrabold text-[15px] tracking-tight">The Digital Vault</span>
            </div>
            <div className="flex items-center gap-4 text-[#5C7C9E]">
              <button 
                onClick={() => navigate('/notifikasi')}
                className="hover:text-[#0A6CBF] transition-colors"
              >
                <BellIcon className="w-5 h-5" />
              </button>
              <div 
                onClick={() => navigate('/profil')}
                className="w-8 h-8 rounded-full overflow-hidden bg-[#D1E4F5] border border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-[#0A6CBF] transition-all"
              >
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
                    onClick={() => navigate(`/riwayat/${trx.id}`)}
                    className="bg-white rounded-3xl p-5 flex items-center justify-between shadow-sm border border-slate-50 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isRefund ? 'bg-[#FEF2F2]' : 'bg-[#F0F5F9]'}`}>
                        {getTrxIcon('bag')}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-[15px] text-[#11263C]">{trx.invoice_number}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[12px] font-bold text-[#8FA5B8]">
                            {new Date(trx.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#D1E4F5]"></span>
                          <span className="text-[12px] font-bold text-[#8FA5B8]">
                            {new Date(trx.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`font-black text-[15px] ${isRefund ? 'text-[#EF4444]' : 'text-[#11263C]'}`}>
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(trx.total)}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="text-[#8FA5B8]">
                          {getPaymentIcon(trx.payment_method === 'Tunai' ? 'wallet' : 'qr')}
                        </div>
                        <span className="text-[11px] font-extrabold text-[#5C7C9E] uppercase tracking-wider">
                          {trx.payment_method}
                        </span>
                      </div>
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
  );
}
