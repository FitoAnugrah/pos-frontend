import React from 'react';
import dashboardText from '../text';

export default function StatsRow() {
  return (
    <div className="flex gap-4 px-6 py-4">
      {/* Omset Card */}
      <button className="text-left flex-1 bg-white rounded-[24px] p-5 shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-[#F0F4F8] transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{dashboardText.stats.omset.label}</p>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19L19 5M19 5V13.5M19 5H10.5" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h4 className="text-[#032537] font-bold text-[16px] tracking-tight mb-4">{dashboardText.stats.omset.value}</h4>
        
        {/* Mini Bar Chart */}
        <div className="flex items-end gap-[4px] h-6">
          <div className="w-1/5 bg-blue-100 h-[60%] rounded-sm"></div>
          <div className="w-1/5 bg-blue-200 h-[70%] rounded-sm"></div>
          <div className="w-1/5 bg-blue-300 h-[65%] rounded-sm"></div>
          <div className="w-1/5 bg-blue-500 h-[90%] rounded-sm"></div>
          <div className="w-1/5 bg-blue-600 h-[100%] rounded-sm"></div>
        </div>
      </button>

      {/* Transaksi Card */}
      <button className="text-left flex-1 bg-white rounded-[24px] p-5 shadow-[0_10px_20px_rgba(0,0,0,0.02)] border border-[#F0F4F8] transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{dashboardText.stats.transaksi.label}</p>
        </div>
        <h4 className="text-[#0677CD] font-bold text-[28px] tracking-tight leading-none mb-3">{dashboardText.stats.transaksi.value}</h4>
        
        <div className="flex items-center gap-1.5 text-gray-400 mt-auto">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[9px] font-medium">{dashboardText.stats.transaksi.sub}</span>
        </div>
      </button>
    </div>
  );
}
