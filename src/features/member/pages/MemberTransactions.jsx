import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import membersData from '../data.json';
import {
  ArrowLeftIcon,
  SearchIcon,
  CalendarIcon,
  ChevronRightIcon,
  MoneyIcon,
  QrCodeIcon,
} from '../../../components/ui/icons';

const getMonthName = (monthIndex) => {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return months[monthIndex];
};

export default function MemberTransactions() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const member = membersData.find(m => m.id === parseInt(id));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(''); // Format: 'YYYY-MM'

  if (!member) {
    return <div className="p-8 text-center font-sans">Member not found</div>;
  }

  // Determine available months from user's transactions
  const availableMonths = useMemo(() => {
    if (!member.transactions) return [];
    const months = new Set();
    member.transactions.forEach(trx => {
      if (trx.isoDate) {
        const d = new Date(trx.isoDate);
        const yyyy_mm = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        months.add(yyyy_mm);
      }
    });
    return Array.from(months).sort((a, b) => b.localeCompare(a)); // Descending
  }, [member.transactions]);

  // Initially set selectedMonth to the latest available month, if empty string
  if (selectedMonth === '' && availableMonths.length > 0) {
    setSelectedMonth(availableMonths[0]);
  }

  // Filter transactions based on selectedMonth and searchQuery
  const filteredTransactions = useMemo(() => {
    if (!member.transactions) return [];
    let result = member.transactions;

    // Filter by Month
    if (selectedMonth) {
      result = result.filter(trx => {
        if (!trx.isoDate) return false;
        const d = new Date(trx.isoDate);
        const yyyy_mm = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        return yyyy_mm === selectedMonth;
      });
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(trx => trx.id.toLowerCase().includes(q));
    }

    // Group by month label for display (even if we filter by month, grouping is nice)
    const grouped = {};
    result.forEach(trx => {
      const d = new Date(trx.isoDate);
      const monthLabel = `${getMonthName(d.getMonth()).toUpperCase()} ${d.getFullYear()}`;
      if (!grouped[monthLabel]) grouped[monthLabel] = [];
      grouped[monthLabel].push(trx);
    });

    return grouped;
  }, [member.transactions, selectedMonth, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-[#F8FAFC] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5 bg-[#F8FAFC] sticky top-0 z-20">
          <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-slate-200 p-2 rounded-full transition-colors -ml-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-[17px] font-extrabold text-[#11263C]">Semua Transaksi</h1>
        </div>

        <div className="px-5 pb-10 flex flex-col gap-6">
          
          {/* Member Profile Card */}
          <div className="bg-[#0A6CBF] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-[10px] font-bold text-white/80 tracking-wider uppercase mb-1">MEMBER PROFILE</p>
                  <h2 className="text-[22px] font-extrabold tracking-tight leading-none">{member.name}</h2>
                  <p className="text-[12px] text-white/80 mt-1">{member.memberId}</p>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">{member.level} TIER</span>
                </div>
              </div>

              <div className="flex justify-between items-end mt-8">
                <div>
                  <p className="text-[9px] font-bold text-white/80 tracking-wider uppercase mb-0.5">ACTIVE SINCE</p>
                  <p className="text-[13px] font-bold">{member.joinedDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-white/80 tracking-wider uppercase mb-0.5">TOTAL POINTS</p>
                  <p className="text-[22px] font-extrabold leading-none">{member.points}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Cari ID transaksi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#EEF2F6] border-none rounded-xl text-[13px] font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D74C8]/20 transition-all"
              />
            </div>
            
            <div className="relative">
              <select 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Semua Bulan</option>
                {availableMonths.map(m => {
                  const [year, month] = m.split('-');
                  return <option key={m} value={m}>{getMonthName(parseInt(month)-1)} {year}</option>
                })}
              </select>
              <button className="flex items-center gap-2 bg-[#EEF2F6] px-4 py-2.5 rounded-xl text-[#0D74C8] hover:bg-[#E3F0FA] transition-colors h-full">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-[13px] font-bold whitespace-nowrap">
                  {selectedMonth ? (() => {
                    const [y, m] = selectedMonth.split('-');
                    return `${getMonthName(parseInt(m)-1).substring(0,3)} ${y}`;
                  })() : 'Filter Bulan'}
                </span>
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="flex flex-col gap-6 mt-2">
            {Object.keys(filteredTransactions).length > 0 ? (
              Object.keys(filteredTransactions).map(monthLabel => (
                <div key={monthLabel} className="flex flex-col gap-3">
                  <h3 className="text-[11px] font-bold text-[#5C7C9E] uppercase tracking-[0.15em] px-1">{monthLabel}</h3>
                  <div className="flex flex-col gap-3">
                    {filteredTransactions[monthLabel].map((trx, index) => (
                      <div 
                        key={index} 
                        onClick={() => navigate(`/transaction/${trx.trxId || trx.id}`)}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-bold text-[#0D74C8]">{trx.id}</span>
                          <span className="text-[14px] font-extrabold text-[#11263C]">{trx.displayDate}, {trx.time}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                              {trx.paymentMethod === 'Cash' ? <MoneyIcon className="w-3 h-3" /> : <QrcodeIcon className="w-3 h-3" />}
                              {trx.paymentMethod}
                            </span>
                            <span className="text-[8px] text-slate-300">•</span>
                            <span className={`text-[10px] font-bold tracking-wider uppercase ${trx.status === 'SUCCESS' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                              {trx.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] font-extrabold text-[#11263C]">{trx.amount}</span>
                          <ChevronRightIcon className="w-4 h-4 text-slate-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500 text-sm font-medium">
                Tidak ada transaksi pada bulan ini.
              </div>
            )}
            
            {/* End of History Label */}
            {Object.keys(filteredTransactions).length > 0 && (
              <div className="flex flex-col items-center justify-center gap-3 mt-6 mb-4 opacity-60">
                <div className="w-10 h-1 bg-[#D1E0ED] rounded-full"></div>
                <span className="text-[10px] font-bold text-[#5C7C9E] uppercase tracking-widest">END OF HISTORY</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
