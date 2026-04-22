import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  History, 
  Receipt, 
  Banknote, 
  QrCode, 
  Wallet, 
  Landmark, 
  Loader, 
  Printer 
} from 'lucide-react';

const HalamanPembayaran = () => {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState('QRIS');
  const [nominalDiterima, setNominalDiterima] = useState('');
  
  const totalTagihan = 155000;

  // Format ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const calculateKembalian = () => {
    const nominal = parseInt(nominalDiterima.replace(/[^0-9]/g, ''), 10) || 0;
    const kembalian = nominal - totalTagihan;
    return kembalian > 0 ? kembalian : 0;
  };

  const handleNominalChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setNominalDiterima(val);
  };

  const handleQuickNominal = (amount) => {
    setNominalDiterima(amount.toString());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative pb-8 md:pb-0">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:px-8 md:pt-8 bg-slate-50 sticky top-0 z-20 md:bg-transparent">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white md:bg-slate-200 hover:bg-slate-100 md:hover:bg-slate-300 rounded-full shadow-sm md:shadow-none transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700 stroke-[2.5px]" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Pembayaran</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center hover:bg-blue-100 transition-colors">
          <History className="w-5 h-5" />
        </button>
      </div>

      {/* Wrapper Utama (Responsive Grid) */}
      <div className="flex-1 md:grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr] md:gap-8 max-w-5xl mx-auto w-full px-4 md:px-8 pb-8 mt-2 items-start">
        
        {/* Kolom Kiri: Tagihan & Metode Pembayaran */}
        <div className="flex flex-col">
          {/* Card Total Tagihan */}
          <div className="bg-white rounded-3xl p-6 shadow-sm text-center border border-slate-100 flex flex-col items-center">
            <p className="text-xs font-bold text-slate-500 tracking-widest mb-2 uppercase">Total Tagihan</p>
            <div className="flex items-start justify-center gap-1 mb-4">
              <span className="text-2xl font-black text-blue-600 mt-1">Rp</span>
              <span className="text-4xl font-black text-slate-900 tracking-tighter">155.000</span>
            </div>
            <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-blue-100">
              <Receipt className="w-3.5 h-3.5" />
              <span>#INV-20231027-0042</span>
            </div>
          </div>

          {/* Grid Metode Pembayaran */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={() => setActiveMethod('Tunai')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2.5 font-semibold transition-all active:scale-95 ${
                activeMethod === 'Tunai' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border-none' 
                  : 'bg-sky-100/50 text-slate-700 hover:bg-sky-100 border border-transparent'
              }`}
            >
              <Banknote className="w-7 h-7" />
              <span>Tunai</span>
            </button>
            <button 
              onClick={() => setActiveMethod('QRIS')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2.5 font-semibold transition-all active:scale-95 ${
                activeMethod === 'QRIS' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border-none' 
                  : 'bg-sky-100/50 text-slate-700 hover:bg-sky-100 border border-transparent'
              }`}
            >
              <QrCode className="w-7 h-7" />
              <span>QRIS</span>
            </button>
            <button 
              onClick={() => setActiveMethod('ShopeePay')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2.5 font-semibold transition-all active:scale-95 ${
                activeMethod === 'ShopeePay' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border-none' 
                  : 'bg-sky-100/50 text-slate-700 hover:bg-sky-100 border border-transparent'
              }`}
            >
              <Wallet className="w-7 h-7" />
              <span>ShopeePay</span>
            </button>
            <button 
              onClick={() => setActiveMethod('SeaBank')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2.5 font-semibold transition-all active:scale-95 ${
                activeMethod === 'SeaBank' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border-none' 
                  : 'bg-sky-100/50 text-slate-700 hover:bg-sky-100 border border-transparent'
              }`}
            >
              <Landmark className="w-7 h-7" />
              <span>SeaBank</span>
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Card Dinamis & Tombol Aksi */}
        <div className="flex flex-col h-full mt-6 md:mt-0">
          <div className="bg-sky-50 rounded-3xl p-6 flex-1 flex flex-col items-center justify-center text-center border border-sky-100 shadow-inner">
            
            {activeMethod !== 'Tunai' ? (
              // Mode Non-Tunai (QR / Transfer)
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300 w-full">
                <div className="bg-white p-4 rounded-3xl shadow-sm border-[3px] border-dashed border-sky-200 mb-6">
                  {/* Placeholder QR Code */}
                  <div className="w-48 h-48 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                    <QrCode className="w-16 h-16 text-slate-300" />
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 font-medium px-4 mb-8 leading-relaxed">
                  Silakan arahkan pelanggan untuk memindai kode <strong className="text-slate-700">{activeMethod}</strong> di atas atau pada terminal pemindai di meja kasir.
                </p>

                <div className="bg-sky-100 text-blue-700 px-5 py-2.5 rounded-full flex gap-2.5 items-center font-bold text-sm">
                  <Loader className="w-4 h-4 animate-spin" />
                  Menunggu pembayaran...
                </div>
              </div>
            ) : (
              // Mode Tunai
              <div className="w-full flex flex-col h-full animate-in fade-in zoom-in duration-300">
                <h3 className="text-left font-bold text-slate-700 mb-4">Input Nominal Diterima</h3>
                
                {/* Input Text */}
                <div className="relative mb-5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-slate-400">Rp</span>
                  <input 
                    type="text" 
                    value={nominalDiterima ? parseInt(nominalDiterima).toLocaleString('id-ID') : ''}
                    onChange={handleNominalChange}
                    placeholder="0"
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-2xl font-black text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-right shadow-sm"
                  />
                </div>

                {/* Quick Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <button 
                    onClick={() => handleQuickNominal(totalTagihan)}
                    className="bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-blue-300 transition-colors active:scale-95 shadow-sm"
                  >
                    Uang Pas
                  </button>
                  <button 
                    onClick={() => handleQuickNominal(160000)}
                    className="bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-blue-300 transition-colors active:scale-95 shadow-sm"
                  >
                    160.000
                  </button>
                  <button 
                    onClick={() => handleQuickNominal(200000)}
                    className="bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-blue-300 transition-colors active:scale-95 shadow-sm"
                  >
                    200.000
                  </button>
                </div>

                {/* Kembalian */}
                <div className="mt-auto bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <span className="font-bold text-slate-500 text-sm">Kembalian</span>
                  <span className="font-black text-2xl text-emerald-500 tracking-tight">{formatRupiah(calculateKembalian())}</span>
                </div>
              </div>
            )}

          </div>

          {/* Tombol Action / Konfirmasi */}
          <div className="mt-6">
            <button 
              onClick={() => alert('Struk sedang dicetak...')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-2xl font-bold text-[15px] flex justify-center items-center gap-2.5 shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all h-14"
            >
              <Printer className="w-[18px] h-[18px] stroke-[2.5px]" />
              Konfirmasi & Cetak Struk
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HalamanPembayaran;
