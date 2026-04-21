import React from 'react';
import appText from '../../constants/appText';
import { IconTerminal, IconRiwayat, IconStok, IconPengaturan } from '../ui/icons';

// Helper component for nav icons
const NavIcon = ({ name, active }) => {
  const colorClass = active ? "text-[#0677CD]" : "text-[#B5C1CE]";
  switch (name) {
    case 'terminal':
      return <IconTerminal className={`w-6 h-6 ${colorClass}`} />;
    case 'riwayat':
      return <IconRiwayat className={`w-6 h-6 ${colorClass}`} />;
    case 'stok':
      return <IconStok className={`w-6 h-6 ${colorClass}`} />;
    case 'pengaturan':
      return <IconPengaturan className={`w-6 h-6 ${colorClass}`} />;
    default:
      return null;
  }
}

export default function BottomNav({ activeTab = 'terminal', onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:hidden">
      <div className="w-full max-w-[440px] bg-white border-t border-[#f0f4f8] py-3 px-6 pb-6 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] rounded-t-[20px]">
        <div className="flex justify-between items-center">
          {appText.bottomNav.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange?.(item.id)}
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
    </nav>
  );
}


