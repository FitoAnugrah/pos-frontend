import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Dashboard from '../features/dashboard';
import LaporanPenjualan from '../features/laporan';
import ProfilFeature from '../features/profil';
import ProdukTerlaris from '../features/produk-terlaris';
import StokFeature from '../features/stok';
import ManualEntry from '../features/stok/pages/ManualEntry';
import MemberPage from '../features/member';
import MemberDetail from '../features/member/pages/MemberDetail';
import MemberTransactions from '../features/member/pages/MemberTransactions';
import TransactionDetail from '../features/member/pages/TransactionDetail';
import EditMember from '../features/member/pages/EditMember';
import AddMember from '../features/member/pages/AddMember';
import RiwayatTransaksi from '../features/riwayat';
import DetailTransaksi from '../features/riwayat/DetailTransaksi';
import Notifications from '../features/monitoring/Notifikasi';
import AktivitasTerkini from '../features/monitoring/Aktivitas';
import ScanBarang from '../features/kasir/ScanBarang';
import LoginFeature from '../features/login';
import PlaceholderPage from '../components/layout/PlaceholderPage';

export default function AppRoutes() {
  const navigate = useNavigate();

  function handleQuickAccess(itemId) {
    if (itemId === 'stok') return navigate('/stok');
    if (itemId === 'member') return navigate('/member');
    if (itemId === 'laporan') return navigate('/laporan');
    if (itemId === 'panel') return navigate('/pengaturan');
  }

  function handleMainTabChange(nextTab) {
    // some features passed this to go to other main tabs
    if (nextTab === 'stok') return navigate('/stok');
    if (nextTab === 'pengaturan') return navigate('/pengaturan');
    if (nextTab === 'profil') return navigate('/profil');
    if (nextTab === 'riwayat') return navigate('/riwayat');
    return navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard onQuickAccess={handleQuickAccess} />} />
      <Route path="/scan" element={<ScanBarang />} />
      <Route path="/stok" element={<StokFeature onMainTabChange={handleMainTabChange} />} />
      <Route path="/stok/manual-entry" element={<ManualEntry />} />
      <Route path="/riwayat" element={<RiwayatTransaksi onMainTabChange={handleMainTabChange} />} />
      <Route path="/riwayat/:id" element={<DetailTransaksi />} />
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
      <Route path="/profil" element={<ProfilFeature onTabChange={handleMainTabChange} />} />
      <Route path="/login" element={<LoginFeature onLoginSuccess={() => navigate('/')} />} />
      <Route
        path="/pengaturan"
        element={
          <PlaceholderPage
            title="Pengaturan"
            description="Halaman pengaturan belum tersedia."
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
