import React, { useState, useEffect } from 'react';
import {
  BagIcon,
  ReceiptIcon,
  IconPanel,
  CheckCircleSolidIcon,
  PrinterIcon,
  ScanIcon
} from '../../components/ui/icons';

export default function HalamanPengaturan() {
  const [settings, setSettings] = useState({
    namaToko: 'Vault POS',
    alamatToko: 'Jl. Contoh No. 123',
    teleponToko: '08123456789',
    pajakAktif: true,
    nilaiPajak: 11,
    pesanStruk: 'Terima kasih telah berbelanja di toko kami!'
  });
  const [activeTab, setActiveTab] = useState('toko');

  useEffect(() => {
    const saved = localStorage.getItem('pos_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (err) {
        console.error('Gagal membaca pengaturan', err);
      }
    } else {
      localStorage.setItem('pos_settings', JSON.stringify(settings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTogglePajak = () => {
    setSettings((prev) => ({
      ...prev,
      pajakAktif: !prev.pajakAktif
    }));
  };

  const handleSave = () => {
    localStorage.setItem('pos_settings', JSON.stringify(settings));
    alert('Pengaturan berhasil disimpan!');
  };

  const tabs = [
    { id: 'toko', label: 'Informasi Toko', icon: <BagIcon className="w-5 h-5" /> },
    { id: 'transaksi', label: 'Pengaturan Transaksi', icon: <ReceiptIcon className="w-5 h-5" /> },
    { id: 'sistem', label: 'Sistem & Perangkat', icon: <IconPanel className="w-5 h-5" /> }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen font-sans pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pengaturan</h1>
        <p className="text-slate-500 font-medium mt-1">Kelola konfigurasi toko dan transaksi kasir Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Navigasi Tab */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-bold transition-all text-left ${activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
              >
                <div className={`${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {tab.icon}
                </div>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Konten Aktif */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col min-h-[500px]">
            <div className="flex-1">

              {/* Tab 1: Informasi Toko */}
              {activeTab === 'toko' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-xl font-extrabold text-slate-800 mb-6">Informasi Toko</h2>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Nama Toko</label>
                      <input
                        type="text"
                        name="namaToko"
                        value={settings.namaToko}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Nomor Telepon</label>
                      <input
                        type="text"
                        name="teleponToko"
                        value={settings.teleponToko}
                        onChange={handleChange}
                        className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Alamat Lengkap</label>
                      <textarea
                        name="alamatToko"
                        value={settings.alamatToko}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Pengaturan Transaksi */}
              {activeTab === 'transaksi' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-xl font-extrabold text-slate-800 mb-6">Pengaturan Transaksi</h2>
                  <div className="flex flex-col gap-6">
                    {/* Toggle Pajak */}
                    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                      <div>
                        <h3 className="font-bold text-slate-800">Aktifkan Pajak (PPN)</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Terapkan pajak otomatis pada setiap transaksi.</p>
                      </div>
                      <button
                        onClick={handleTogglePajak}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-300 outline-none ${settings.pajakAktif ? 'bg-blue-600' : 'bg-slate-200'}`}
                      >
                        <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${settings.pajakAktif ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>

                    {/* Persentase Pajak */}
                    {settings.pajakAktif && (
                      <div className="animate-in fade-in duration-300 slide-in-from-top-2">
                        <label className="block text-sm font-bold text-slate-600 mb-2">Persentase Pajak (%)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="nilaiPajak"
                            value={settings.nilaiPajak}
                            onChange={handleChange}
                            className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                        </div>
                      </div>
                    )}

                    {/* Pesan Struk */}
                    <div>
                      <label className="block text-sm font-bold text-slate-600 mb-2">Pesan Bawah Struk</label>
                      <textarea
                        name="pesanStruk"
                        value={settings.pesanStruk}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 text-slate-800 font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                      />
                      <p className="text-xs text-slate-400 mt-2 font-medium">Ditampilkan pada bagian kaki struk digital maupun cetak.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Sistem & Perangkat */}
              {activeTab === 'sistem' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h2 className="text-xl font-extrabold text-slate-800 mb-6">Sistem & Perangkat</h2>
                  <div className="flex flex-col gap-5">
                    {/* Printer Status */}
                    <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
                        <PrinterIcon className="w-6 h-6 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-[15px]">Printer Thermal</h3>
                        <p className="text-sm text-slate-500 mt-1">Digunakan untuk mencetak struk fisik.</p>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                          <CheckCircleSolidIcon className="w-4 h-4 text-emerald-500" />
                          Terhubung (POS-58)
                        </div>
                      </div>
                      <button className="text-blue-600 text-sm font-bold px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors">Test Print</button>
                    </div>

                    {/* Scanner Mode */}
                    <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
                        <ScanIcon className="w-6 h-6 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-[15px]">Mode Scanner</h3>
                        <p className="text-sm text-slate-500 mt-1 mb-3">Sumber alat untuk membaca barcode / SKU.</p>
                        <select className="w-full md:w-auto min-w-[200px] border border-slate-200 bg-slate-50 rounded-xl px-4 py-2.5 text-slate-700 font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer">
                          <option value="camera">Kamera Perangkat</option>
                          <option value="usb">Barcode Scanner USB</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Tombol Simpan */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
