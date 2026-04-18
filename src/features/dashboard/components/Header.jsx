import React from 'react';
import dashboardText from '../text';

export default function Header() {
  return (
    <div className="flex items-center justify-between px-6 pt-8 pb-4 bg-white">
      <button className="flex items-center gap-3 text-left transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
        <div className="relative">
          <div className="h-10 w-10 bg-[#0A2A3D] rounded-full flex items-center justify-center">
            {/* Simple User Icon SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#38Bdf8" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="text-[#032537] font-bold text-sm leading-tight">{dashboardText.brand}</h2>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span className="text-gray-400 text-[10px] uppercase font-semibold tracking-wider font-medium">{dashboardText.brandSub}</span>
          </div>
        </div>
      </button>
      <button className="relative w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-blue-100 active:scale-95">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor" />
        </svg>
        <span className="absolute top-2.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </button>
    </div>
  );
}
