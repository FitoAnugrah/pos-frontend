import React from 'react';
import dashboardText from '../text';

// Helper component for icons
const Icon = ({ name }) => {
  switch (name) {
    case 'member':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
          <path d="M16 11C17.65 11 19 9.65 19 8C19 6.35 17.65 5 16 5C14.35 5 13 6.35 13 8C13 9.65 14.35 11 16 11ZM8 11C9.65 11 11 9.65 11 8C11 6.35 9.65 5 8 5C6.35 5 5 6.35 5 8C5 9.65 6.35 11 8 11ZM16 13C13.67 13 9 14.17 9 16.5V19H23V16.5C23 14.17 18.33 13 16 13ZM8 13C7.75 13 7.46 13.04 7.16 13.09C8.32 13.75 9 14.54 9 15.5V19H1V16.5C1 14.17 5.67 13 8 13Z" fill="currentColor"/>
        </svg>
      );
    case 'stok':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
          <path d="M20 4H16V2H8V4H4C2.9 4 2 4.9 2 6V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V6C22 4.9 21.1 4 20 4ZM14 10H10V8H14V10ZM18 10H16V8H18V10ZM12 4H10V2H14V4H12ZM8 10H6V8H8V10Z" fill="currentColor"/>
        </svg>
      );
    case 'laporan':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 17H9V11H7V17ZM11 17H13V7H11V17ZM15 17H17V14H15V17Z" fill="currentColor"/>
        </svg>
      );
    case 'panel':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
          <path d="M19.14 12.936C19.224 12.636 19.284 12.324 19.284 12C19.284 11.676 19.224 11.364 19.14 11.064L21.096 9.528C21.276 9.384 21.324 9.132 21.204 8.928L19.356 5.724C19.236 5.52 18.984 5.436 18.768 5.532L16.464 6.468C15.984 6.096 15.468 5.796 14.904 5.556L14.556 3.096C14.52 2.856 14.316 2.676 14.076 2.676H10.38 5.724C5.52 5.844 5.436 6.096 5.532 6.312L6.468 9.948C6.096 10.428 5.796 10.944 5.556 11.508L3.096 11.856C2.856 11.892 2.676 12.096 2.676 12.336V16.032C2.676 16.272 2.856 16.476 3.096 16.512L5.556 16.86C5.796 17.424 6.096 17.94 6.468 18.42L5.532 20.724C5.436 20.94 5.52 21.192 5.724 21.312L9.42 23.16C9.624 23.28 9.876 23.232 10.056 23.052L11.592 21.096C11.892 21.18 12.204 21.24 12.528 21.24C12.852 21.24 13.164 21.18 13.464 21.096L15 23.052C15.18 23.232 15.432 23.28 15.636 23.16L19.332 21.312C19.536 21.192 19.62 20.94 19.524 20.724L18.588 18.42C19.068 17.94 19.368 17.424 19.608 16.86L22.068 16.512C22.308 16.476 22.488 16.272 22.488 16.032V12.336C22.5 12.096 22.32 11.892 22.08 11.856L19.14 12.936ZM12.084 15.54C10.128 15.54 8.544 13.956 8.544 12C8.544 10.044 10.128 8.46 12.084 8.46C14.04 8.46 15.624 10.044 15.624 12C15.624 13.956 14.04 15.54 12.084 15.54Z" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function QuickAccess() {
  return (
    <div className="px-6 py-4">
      <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3 px-1">{dashboardText.quickAccess.title}</p>
      <div className="grid grid-cols-2 gap-3">
        {dashboardText.quickAccess.items.map((item) => (
          <button 
            key={item.id} 
            className="flex items-center gap-3 bg-white p-4 rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-[#F0F4F8] hover:bg-blue-50/50 transition-colors duration-200 active:scale-95"
          >
            <div className="bg-blue-50/50 p-2.5 rounded-xl">
              <Icon name={item.id} />
            </div>
            <span className="text-[13px] font-bold text-[#032537]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
