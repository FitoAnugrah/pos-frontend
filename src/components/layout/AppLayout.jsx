import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';

function tabToPath(tab) {
  switch (tab) {
    case 'stok':
      return '/stok';
    case 'pengaturan':
      return '/pengaturan';
    case 'profil':
      return '/profil';
    case 'riwayat':
      return '/riwayat';
    case 'terminal':
    default:
      return '/';
  }
}

function getActiveTab(pathname) {
  if (pathname.startsWith('/stok')) return 'stok';
  if (pathname.startsWith('/profil')) return 'profil';
  if (pathname.startsWith('/pengaturan')) return 'pengaturan';
  if (pathname.startsWith('/riwayat')) return 'riwayat';
  if (pathname.startsWith('/member')) return 'member';
  return 'terminal';
}

// Sub-pages that have their own header nav — hide AppLayout's BottomNav
function isSubPage(pathname) {
  return (
    /^\/member\/\d/.test(pathname) ||   // /member/1, /member/1/edit, etc.
    /^\/transaction\//.test(pathname) || // /transaction/:id
    /^\/laporan/.test(pathname) ||
    /^\/scan/.test(pathname) ||
    /^\/input-sku/.test(pathname) ||
    /^\/keranjang/.test(pathname) ||
    /^\/pembayaran/.test(pathname) ||
    /^\/struk/.test(pathname) ||
    /^\/profil/.test(pathname) ||
    /^\/login/.test(pathname)
  );
}

export default function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = getActiveTab(location.pathname);
  const subPage = isSubPage(location.pathname);

  const handleTabChange = (nextTab) => {
    navigate(tabToPath(nextTab));
  };

  // Login page — no layout at all
  if (location.pathname.startsWith('/login')) {
    return children;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans w-full justify-center md:justify-start">
      {/* Desktop Sidebar — hidden on sub-pages on mobile */}
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[440px] md:max-w-none bg-[#F4F8FA] md:bg-transparent overflow-y-auto overflow-x-hidden flex flex-col shadow-2xl md:shadow-none relative">
        
        {/* Mobile App Header — hidden on sub-pages (they have their own) */}
        {!subPage && (
          <div className="md:hidden">
            <Header onProfileClick={() => handleTabChange('profil')} />
          </div>
        )}
        
        {/* Content Container */}
        <div className={`flex-1 w-full flex flex-col ${subPage ? '' : 'pb-24 md:pb-8'}`}>
          {children}
        </div>
        
        {/* Mobile Bottom Navigation — hidden on sub-pages */}
        {!subPage && (
          <div className="md:hidden">
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        )}
      </div>
    </div>
  );
}
