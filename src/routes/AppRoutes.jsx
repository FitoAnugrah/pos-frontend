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
import EditMember from '../features/member/pages/EditMember';
import AddMember from '../features/member/pages/AddMember';
import RiwayatTransaksi from '../features/riwayat';
import DetailTransaksi from '../features/riwayat/DetailTransaksi';
import Notifications from '../features/monitoring/Notifikasi';
import AktivitasTerkini from '../features/monitoring/Aktivitas';
import ScanBarang from '../features/kasir/ScanBarang';
import InputSKUManual from '../features/kasir/InputSKUManual';
import KeranjangBelanja from '../features/kasir/KeranjangBelanja';
import HalamanPembayaran from '../features/kasir/HalamanPembayaran';
import StrukDigital from '../features/kasir/StrukDigital';
import LoginFeature from '../features/login';
import PlaceholderPage from '../components/layout/PlaceholderPage';
import HalamanPengaturan from '../features/pengaturan/HalamanPengaturan';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('pos_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
      <Route path="/login" element={<LoginFeature onLoginSuccess={() => navigate('/')} />} />
      <Route path="/" element={<ProtectedRoute><Dashboard onQuickAccess={handleQuickAccess} /></ProtectedRoute>} />
      <Route path="/scan" element={<ProtectedRoute><ScanBarang /></ProtectedRoute>} />
      <Route path="/input-sku" element={<ProtectedRoute><InputSKUManual /></ProtectedRoute>} />
      <Route path="/keranjang" element={<ProtectedRoute><KeranjangBelanja /></ProtectedRoute>} />
      <Route path="/pembayaran" element={<ProtectedRoute><HalamanPembayaran /></ProtectedRoute>} />
      <Route path="/struk" element={<ProtectedRoute><StrukDigital /></ProtectedRoute>} />
      <Route path="/stok" element={<ProtectedRoute><StokFeature onMainTabChange={handleMainTabChange} /></ProtectedRoute>} />
      <Route path="/stok/manual-entry" element={<ProtectedRoute><ManualEntry /></ProtectedRoute>} />
      <Route path="/riwayat" element={<ProtectedRoute><RiwayatTransaksi onMainTabChange={handleMainTabChange} /></ProtectedRoute>} />
      <Route path="/riwayat/:id" element={<ProtectedRoute><DetailTransaksi /></ProtectedRoute>} />
      <Route path="/notifikasi" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/aktivitas" element={<ProtectedRoute><AktivitasTerkini /></ProtectedRoute>} />
      <Route path="/member" element={<ProtectedRoute><MemberPage /></ProtectedRoute>} />
      <Route path="/member/add" element={<ProtectedRoute><AddMember /></ProtectedRoute>} />
      <Route path="/member/:id" element={<ProtectedRoute><MemberDetail /></ProtectedRoute>} />
      <Route path="/member/:id/edit" element={<ProtectedRoute><EditMember /></ProtectedRoute>} />
      <Route path="/member/:id/transactions" element={<ProtectedRoute><MemberTransactions /></ProtectedRoute>} />
      <Route path="/laporan" element={<ProtectedRoute><LaporanPenjualan /></ProtectedRoute>} />
      <Route path="/produk-terlaris" element={<ProtectedRoute><ProdukTerlaris /></ProtectedRoute>} />
      <Route path="/profil" element={<ProtectedRoute><ProfilFeature onTabChange={handleMainTabChange} /></ProtectedRoute>} />
      <Route path="/pengaturan" element={<ProtectedRoute><HalamanPengaturan /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
