import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appText from '../../../constants/appText';
import api from '../../../utils/api';
import { useLanguage } from '../../../contexts/LanguageContext';

export default function StatsRow() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ total_penjualan: 0, total_transaksi: 0 });

  useEffect(() => {
    api.get('/reports/summary?period=hari')
      .then(res => setSummary(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex gap-4 w-full">
      {/* Omset Card */}
      <button
        type="button"
        onClick={() => navigate('/laporan')}
        className="text-left flex-1 bg-white rounded-xl p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2 relative z-10">
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{t('dashboard.turnoverToday')}</p>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19L19 5M19 5V13.5M19 5H10.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h4 className="text-slate-800 font-bold text-2xl tracking-tight mb-4 min-h-[32px] flex items-center relative z-10">
          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(summary.total_penjualan)}
        </h4>
        
        {/* Sleek Rounded Mini Bar Chart */}
        <div className="flex items-end gap-1.5 h-8 relative z-10 w-24">
          <div className="w-full bg-emerald-400 h-[60%] rounded-t-sm opacity-80"></div>
          <div className="w-full bg-emerald-400 h-[70%] rounded-t-sm opacity-90"></div>
          <div className="w-full bg-emerald-500 h-[65%] rounded-t-sm opacity-80"></div>
          <div className="w-full bg-emerald-500 h-[90%] rounded-t-sm opacity-90"></div>
          <div className="w-full bg-emerald-500 h-[100%] rounded-t-sm"></div>
        </div>
      </button>

      {/* Transaksi Card */}
      <button
        type="button"
        onClick={() => navigate('/riwayat')}
        className="text-left flex-1 bg-white rounded-xl p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2 relative z-10">
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{t('dashboard.activeTx')}</p>
        </div>
        <h4 className="text-blue-600 font-bold text-2xl tracking-tight leading-none mb-3 min-h-[32px] flex items-center relative z-10">
          {summary.total_transaksi}
        </h4>
        
        <div className="flex items-center gap-1.5 text-slate-500 mt-auto relative z-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-medium">Transaksi Selesai Hari Ini</span>
        </div>
      </button>
    </div>
  );
}


