import React from 'react';
import dashboardText from '../text';

export default function TerminalCard() {
  return (
    <div className="px-6 py-2">
      <button className="w-full text-left relative overflow-hidden bg-gradient-to-br from-[#1B57CE] to-[#1FB1EC] rounded-[24px] p-6 shadow-[0_20px_40px_-15px_rgba(27,87,206,0.5)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full blur-xl -ml-10 -mb-10"></div>

        <div className="flex flex-col items-center justify-center h-40 text-center relative z-10 w-full">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="2" fill="white" />
              <rect x="14" y="3" width="7" height="7" rx="2" fill="white" />
              <rect x="14" y="14" width="7" height="7" rx="2" fill="white" />
              <rect x="3" y="14" width="7" height="7" rx="2" fill="white" />
             </svg>
          </div>
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{dashboardText.terminal.badge}</p>
          <h3 className="text-white text-[18px] font-bold tracking-tight">{dashboardText.terminal.cta}</h3>
        </div>
      </button>
    </div>
  );
}
