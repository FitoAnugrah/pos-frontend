import React from 'react';
import appText from '../../constants/appText';
import { IconTerminal, IconRiwayat, IconStok, IconPengaturan } from '../ui/icons';

// Helper component for nav icons
const NavIcon = ({ name, active }) => {
  const colorClass = active ? "text-blue-600" : "text-slate-400";
  switch (name) {
    case 'terminal':
      return <IconTerminal className={`w-5 h-5 ${colorClass}`} />;
    case 'riwayat':
      return <IconRiwayat className={`w-5 h-5 ${colorClass}`} />;
    case 'stok':
      return <IconStok className={`w-5 h-5 ${colorClass}`} />;
    case 'pengaturan':
      return <IconPengaturan className={`w-5 h-5 ${colorClass}`} />;
    default:
      return null;
  }
}

export default function Sidebar({ activeTab = 'terminal', onTabChange, user }) {
  return (
    <aside className="hidden md:flex flex-col w-72 h-screen bg-white border-r border-slate-100 flex-shrink-0 p-6 pt-8 z-30">
      {/* Brand / Logo Area */}
      <button 
        onClick={() => onTabChange?.('profil')}
        className="flex items-center gap-3 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-10"
      >
        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-xl shadow-sm flex items-center justify-center text-white font-bold text-lg">
          {user?.name ? user.name.charAt(0).toUpperCase() : appText.brand.charAt(0)}
        </div>
        <div>
          <h2 className="text-slate-800 font-bold text-sm leading-tight truncate w-32">{user?.name || appText.brand}</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">{user?.role === 'admin' ? 'Pemilik Toko' : (user?.role || appText.brandSub)}</span>
          </div>
        </div>
      </button>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 flex-grow">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2 pl-3">Menu Utama</p>
        
        {appText.bottomNav.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50/70 border border-blue-100/50 shadow-sm' 
                  : 'bg-transparent border border-transparent hover:bg-slate-50'
              }`}
            >
              <NavIcon name={item.id} active={isActive} />
              <span 
                className={`text-sm font-bold tracking-wide ${
                  isActive ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Option / Logout or Help */}
      <div className="mt-auto">
        <button onClick={() => onTabChange && onTabChange('profil')} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors duration-200 border border-transparent hover:border-slate-100">
          <IconPengaturan className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-semibold text-slate-600">Pengaturan Akun</span>
        </button>
      </div>
    </aside>
  );
}
