import React, { useState } from 'react';
import dashboardText from '../text';

// Helper component for nav icons
const NavIcon = ({ name, active }) => {
  const colorClass = active ? "text-[#0677CD]" : "text-[#B5C1CE]";
  switch (name) {
    case 'terminal':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={colorClass}>
          <path d="M4 6H20V16H4V6ZM4 4C2.9 4 2 4.9 2 6V16C2 17.1 2.9 18 4 18H14V20H10V22H14H18V20H16V18H20C21.1 18 22 17.1 22 16V6C22 4.9 21.1 4 20 4H4Z" fill="currentColor" />
        </svg>
      );
    case 'riwayat':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={colorClass}>
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V12.25L15.6 15L16.35 13.77L12.5 11.47V7Z" fill="currentColor"/>
        </svg>
      );
    case 'stok':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={colorClass}>
          <path d="M20 4H16V2H8V4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V6C22 4.9 21.1 4 20 4ZM14 10H10V8H14V10ZM18 10H16V8H18V10ZM12 4H10V2H14V4H12ZM8 10H6V8H8V10Z" fill="currentColor" />
        </svg>
      );
    case 'pengaturan':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={colorClass}>
          <path d="M19.14 12.94C19.22 12.64 19.28 12.33 19.28 12C19.28 11.67 19.22 11.36 19.14 11.06L21.09 9.53C21.27 9.39 21.32 9.13 21.2 8.93L19.35 5.73C19.23 5.53 18.98 5.44 18.77 5.54L16.46 6.47C15.98 6.1 15.47 5.8 14.9 5.56L14.56 3.1C14.52 2.86 14.32 2.68 14.08 2.68H10.38C10.14 2.68 9.94 2.85 9.9 3.09L9.56 5.55C8.99 5.79 8.48 6.09 8.01 6.46L5.72 5.53C5.51 5.45 5.25 5.51 5.14 5.72L3.29 8.91C3.17 9.11 3.22 9.37 3.4 9.51L5.35 11.04C5.27 11.34 5.21 11.66 5.21 11.98C5.21 12.3 5.27 12.62 5.35 12.92L3.4 14.45C3.22 14.59 3.17 14.85 3.29 15.05L5.14 18.25C5.25 18.45 5.51 18.53 5.72 18.44L8.01 17.51C8.49 17.88 9 18.18 9.56 18.42L9.9 20.88C9.94 21.12 10.14 21.3 10.38 21.3H14.08C14.32 21.3 14.52 21.13 14.56 20.89L14.9 18.43C15.47 18.19 15.98 17.89 16.45 17.52L18.74 18.45C18.95 18.53 19.21 18.47 19.32 18.26L21.17 15.06C21.29 14.86 21.24 14.6 21.06 14.46L19.14 12.94ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('terminal');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[440px] bg-white border-t border-[#f0f4f8] py-3 px-6 pb-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-t-[20px]">
        <div className="flex justify-between items-center">
          {dashboardText.bottomNav.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center gap-1.5 min-w-[64px]"
              >
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-50' : 'bg-transparent'}`}>
                  <NavIcon name={item.id} active={isActive} />
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-[#0677CD]' : 'text-[#B5C1CE]'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
