import { useState } from 'react'
import BottomNav from './features/dashboard/components/BottomNav'
import Dashboard from './features/dashboard'
import ProfilFeature from './features/profil'
import StokFeature from './features/stok'

function PlaceholderPage({ activeTab, title, description, onTabChange }) {
  return (
    <div className="min-h-screen bg-[#1A1D20] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] bg-[#F4F8FA] min-h-screen relative shadow-2xl overflow-x-hidden">
        <div className="px-6 pt-8 pb-32">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,#0d74c8_0%,#7bc6ff_100%)] px-6 py-8 text-white shadow-[0_18px_40px_rgba(13,116,200,0.22)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/75">POS AI</p>
            <h1 className="mt-3 text-[28px] font-black tracking-tight">{title}</h1>
            <p className="mt-3 max-w-[26ch] text-sm leading-6 text-white/85">{description}</p>
          </div>

          <div className="mt-5 rounded-[24px] border border-[#edf4fa] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(111,152,193,0.1)]">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#6f8daa]">Status Halaman</p>
            <p className="mt-3 text-[15px] font-semibold text-[#17324d]">
              Tab ini sudah tersambung ke navbar, tapi konten lengkapnya belum kita buat.
            </p>
          </div>
        </div>

        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('terminal')

  function handleNavigation(nextTab) {
    if (nextTab === 'riwayat') {
      return
    }

    setActiveTab(nextTab)
  }

  function handleQuickAccess(itemId) {
    if (itemId === 'stok') {
      setActiveTab('stok')
      return
    }

    if (itemId === 'panel') {
      setActiveTab('pengaturan')
      return
    }

    if (itemId === 'laporan') {
      return
    }
  }

  if (activeTab === 'stok') {
    return <StokFeature onMainTabChange={handleNavigation} />
  }

  if (activeTab === 'pengaturan') {
    return <ProfilFeature activeTab={activeTab} onTabChange={handleNavigation} />
  }

  return <Dashboard activeTab={activeTab} onTabChange={handleNavigation} onQuickAccess={handleQuickAccess} />
}

export default App
