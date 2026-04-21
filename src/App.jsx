import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import BottomNav from './features/dashboard/components/BottomNav'
import Dashboard from './features/dashboard'
import LaporanPenjualan from './features/laporan'
import ProfilFeature from './features/profil'
import ProdukTerlaris from './features/produk-terlaris'
import StokFeature from './features/stok'
import ManualEntry from './features/stok/pages/ManualEntry'
import MemberPage from './features/member'
import MemberDetail from './features/member/pages/MemberDetail'
import MemberTransactions from './features/member/pages/MemberTransactions'
import TransactionDetail from './features/member/pages/TransactionDetail'
import EditMember from './features/member/pages/EditMember'
import AddMember from './features/member/pages/AddMember'
import RiwayatTransaksi from './features/riwayat'
import Notifications from './features/notifikasi'
import AktivitasTerkini from './features/aktivitas'
import ScanBarang from './features/kasir/ScanBarang'

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
            <p className="mt-3 text-[15px] font-semibold text-[#17324d]">{description}</p>
          </div>
        </div>

        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}

function tabToPath(tab) {
  switch (tab) {
    case 'stok':
      return '/stok'
    case 'pengaturan':
      return '/pengaturan'
    case 'profil':
      return '/profil'
    case 'riwayat':
      return '/riwayat'
    case 'terminal':
    default:
      return '/'
  }
}

function getActiveTab(pathname) {
  if (pathname.startsWith('/stok')) return 'stok'
  if (pathname.startsWith('/profil')) return 'profil'
  if (pathname.startsWith('/pengaturan')) return 'pengaturan'
  if (pathname.startsWith('/riwayat')) return 'riwayat'
  return 'terminal'
}

function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = getActiveTab(location.pathname)

  function handleNavigation(nextTab) {
    navigate(tabToPath(nextTab))
  }

  function handleQuickAccess(itemId) {
    if (itemId === 'stok') {
      navigate('/stok')
      return
    }

    if (itemId === 'member') {
      navigate('/member')
      return
    }

    if (itemId === 'laporan') {
      navigate('/laporan')
      return
    }

    if (itemId === 'panel') {
      navigate('/pengaturan')
      return
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard activeTab={activeTab} onTabChange={handleNavigation} onQuickAccess={handleQuickAccess} />}
      />
      <Route path="/scan" element={<ScanBarang />} />
      <Route path="/stok" element={<StokFeature onMainTabChange={handleNavigation} />} />
      <Route path="/stok/manual-entry" element={<ManualEntry />} />
      <Route path="/riwayat" element={<RiwayatTransaksi onMainTabChange={handleNavigation} />} />
      <Route path="/notifikasi" element={<Notifications />} />
      <Route path="/aktivitas" element={<AktivitasTerkini />} />
      <Route path="/member" element={<MemberPage />} />
      <Route path="/member/add" element={<AddMember />} />
      <Route path="/member/:id" element={<MemberDetail />} />
      <Route path="/member/:id/edit" element={<EditMember />} />
      <Route path="/member/:id/transactions" element={<MemberTransactions />} />
      <Route path="/transaction/:trxId" element={<TransactionDetail />} />
      <Route path="/laporan" element={<LaporanPenjualan />} />
      <Route path="/produk-terlaris" element={<ProdukTerlaris />} />
      <Route path="/profil" element={<ProfilFeature activeTab={activeTab} onTabChange={handleNavigation} />} />
      <Route
        path="/pengaturan"
        element={
          <PlaceholderPage
            activeTab="pengaturan"
            title="Pengaturan"
            description="Halaman pengaturan belum tersedia."
            onTabChange={handleNavigation}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return <AppShell />
}
