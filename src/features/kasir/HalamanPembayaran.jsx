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
  Printer,
  Info,
  Copy,
  Hourglass
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import api from '../../utils/api';

const HalamanPembayaran = () => {
  const navigate = useNavigate();
  const { total: totalTagihan, cart, clearCart } = useCart();
  const [activeMethod, setActiveMethod] = useState('QRIS');
  const [uangDiterima, setUangDiterima] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const kembalian = parseInt(uangDiterima || '0', 10) - totalTagihan;
  const displayKembalian = kembalian > 0 ? kembalian : 0;

  // Format ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleNumpadClick = (num) => {
    setUangDiterima((prev) => prev + num);
  };

  const handleClear = () => {
    setUangDiterima('');
  };

  const handleQuickSelect = (val) => {
    setUangDiterima(val.toString());
  };

  const handleProsesPembayaran = async () => {
    if (activeMethod === 'Tunai' && parseInt(uangDiterima || '0', 10) < totalTagihan) {
      alert('Uang diterima kurang dari total tagihan.');
      return;
    }

    setIsProcessing(true);
    try {
      // Siapkan payload untuk dikirim ke backend
      const payload = {
        payment_method: activeMethod,
        cash_received: activeMethod === 'Tunai' ? parseInt(uangDiterima, 10) : null,
        items: cart.map(item => ({
          product_id: item.id,
          qty: item.qty
        }))
      };

      const res = await api.post('/transactions', payload);
      const invoiceNumber = res.data.invoice_number;
      const transactionId = res.data.transaction_id;
      
      // Kosongkan keranjang
      clearCart();
      
      // Berpindah ke struk dengan bawa ID transaksi
      navigate('/struk', { state: { transactionId, invoiceNumber } });
    } catch (error) {
      console.error('Gagal memproses transaksi:', error);
      alert(error.response?.data?.message || 'Gagal memproses transaksi. Cek stok atau server.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-8 md:pb-0">
      
      {/* Header (Top Bar) */}
      <div className="flex justify-between items-center p-4 md:px-8 md:pt-8 bg-slate-50 md:bg-transparent">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white md:bg-slate-200 hover:bg-slate-100 md:hover:bg-slate-300 rounded-full shadow-sm md:shadow-none transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700 stroke-[2.5px]" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            {['SeaBank', 'ShopeePay'].includes(activeMethod) ? `Pembayaran ${activeMethod}` : 'Pembayaran'}
          </h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center hover:bg-blue-100 transition-colors">
          <History className="w-5 h-5" />
        </button>
      </div>

      {/* Wrapper Utama */}
      <div className="flex-1 flex flex-col md:grid md:grid-cols-2 md:gap-8 max-w-5xl mx-auto w-full px-4 md:px-8 pb-8 mt-2 items-start">
        
        {/* Kolom Kiri */}
        <div className="flex flex-col w-full">
          {/* Card Total Tagihan */}
          <div className="bg-white rounded-3xl p-6 shadow-sm text-center border border-slate-100 flex flex-col items-center">
            <p className="text-xs font-bold text-slate-500 tracking-widest mb-1 uppercase">Total Tagihan</p>
            <div className="flex items-start justify-center gap-1">
              <span className="text-3xl font-black text-blue-600 mt-1.5">Rp</span>
              <span className="text-5xl font-black text-slate-900 tracking-tighter">{totalTagihan.toLocaleString('id-ID')}</span>
            </div>
            {['SeaBank', 'ShopeePay'].includes(activeMethod) ? (
              <div className="bg-sky-100/50 rounded-xl p-4 mt-4 text-left relative w-full">
                <p className="text-[10px] font-bold text-slate-500 tracking-widest mb-1 uppercase">Nomor Virtual Account {activeMethod}</p>
                <p className="text-xl font-bold text-blue-700 tracking-[0.2em] mt-1">
                  {activeMethod === 'ShopeePay' ? '8 9 3 0   1 2 3 4   5 6 7 8' : '9 0 1 2   3 4 5 6   7 8 9 0'}
                </p>
                <button 
                  onClick={() => navigator.clipboard.writeText(activeMethod === 'ShopeePay' ? '893012345678' : '901234567890')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                  title="Salin VA"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="bg-sky-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 mt-4">
                <Receipt className="w-4 h-4" />
                <span>Transaksi Baru</span>
              </div>
            )}
          </div>

          {/* Grid Metode Pembayaran */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={() => setActiveMethod('Tunai')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2 font-semibold transition-all active:scale-95 ${
                activeMethod === 'Tunai' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-sky-100/50 text-slate-600 hover:bg-sky-100'
              }`}
            >
              <Banknote className="w-7 h-7" />
              <span>Tunai</span>
            </button>
            <button 
              onClick={() => setActiveMethod('QRIS')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2 font-semibold transition-all active:scale-95 ${
                activeMethod === 'QRIS' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-sky-100/50 text-slate-600 hover:bg-sky-100'
              }`}
            >
              <QrCode className="w-7 h-7" />
              <span>QRIS</span>
            </button>
            <button 
              onClick={() => setActiveMethod('ShopeePay')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2 font-semibold transition-all active:scale-95 ${
                activeMethod === 'ShopeePay' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-sky-100/50 text-slate-600 hover:bg-sky-100'
              }`}
            >
              <Wallet className="w-7 h-7" />
              <span>ShopeePay</span>
            </button>
            <button 
              onClick={() => setActiveMethod('SeaBank')}
              className={`rounded-2xl py-5 flex flex-col items-center gap-2 font-semibold transition-all active:scale-95 ${
                activeMethod === 'SeaBank' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-sky-100/50 text-slate-600 hover:bg-sky-100'
              }`}
            >
              <Landmark className="w-7 h-7" />
              <span>SeaBank</span>
            </button>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="flex flex-col h-full mt-6 md:mt-0 w-full">
          <div className="bg-sky-50 rounded-3xl p-5 md:p-6 flex flex-col gap-4 flex-1 items-center justify-center text-center min-h-[300px]">
            
            {['SeaBank', 'ShopeePay'].includes(activeMethod) ? (
              // Mode Virtual Account (SeaBank / ShopeePay)
              <div className="flex flex-col gap-6 w-full animate-in fade-in zoom-in duration-300">
                <div className="flex flex-col items-center text-center mt-4 md:mt-0">
                  <div className="relative w-28 h-28 flex justify-center items-center mb-6 mt-2">
                    {/* Efek Glow di Belakang */}
                    <div className={`absolute inset-0 ${activeMethod === 'ShopeePay' ? 'bg-orange-400/20' : 'bg-blue-400/20'} rounded-full blur-xl animate-pulse`}></div>
                    
                    {/* Ring Luar Berputar (Searah Jarum Jam) */}
                    <div className={`absolute inset-0 rounded-full border-[3px] ${activeMethod === 'ShopeePay' ? 'border-orange-100 border-t-orange-500' : 'border-sky-100 border-t-blue-600'} animate-[spin_1.5s_linear_infinite]`}></div>
                    
                    {/* Ring Dalam Berputar (Berlawanan Arah) */}
                    <div className={`absolute inset-1.5 rounded-full border-[3px] border-transparent ${activeMethod === 'ShopeePay' ? 'border-b-orange-400' : 'border-b-sky-400'} animate-[spin_2s_linear_infinite_reverse]`}></div>
                    
                    {/* Wadah Tengah Putih */}
                    <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center relative shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10">
                      <Hourglass className={`w-8 h-8 ${activeMethod === 'ShopeePay' ? 'text-orange-500' : 'text-blue-600'} animate-pulse`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Menunggu Pembayaran...</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">Sistem Menunggu Konfirmasi dari Anda Untuk Pembayaran Masuk</p>
                </div>

                <div className="bg-sky-50 rounded-2xl p-5 md:p-6 text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-100 text-blue-600 p-1.5 rounded-full"><Info className="w-4 h-4" /></div>
                    <span className="font-bold text-slate-800 text-sm">Cara Pembayaran</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${activeMethod === 'ShopeePay' ? 'bg-orange-500' : 'bg-blue-700'}`}>1</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Buka aplikasi <span className={`font-semibold ${activeMethod === 'ShopeePay' ? 'text-orange-500' : 'text-blue-600'}`}>{activeMethod}</span> di ponsel Anda.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className={`text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${activeMethod === 'ShopeePay' ? 'bg-orange-500' : 'bg-blue-700'}`}>2</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Pilih menu Transfer & klik <span className={`font-semibold ${activeMethod === 'ShopeePay' ? 'text-orange-500' : 'text-blue-600'}`}>Virtual Account</span>.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className={`text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${activeMethod === 'ShopeePay' ? 'bg-orange-500' : 'bg-blue-700'}`}>3</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Masukkan nomor VA di atas dan masukkan nominal yang sesuai.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeMethod !== 'Tunai' ? (
              // Mode Non-Tunai
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300 w-full">
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
                  {/* Gambar QR Code Dinamis */}
                  <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center overflow-hidden p-2">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT_${activeMethod}_155000`}
                      alt={`QR Code ${activeMethod}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 mt-4 leading-relaxed max-w-[250px]">
                  Silakan arahkan pelanggan untuk memindai kode QR di atas atau pada terminal QRIS meja.
                </p>

                <div className="bg-sky-100 text-blue-700 px-5 py-2 rounded-full flex gap-2 items-center font-medium mt-6">
                  <Loader className="w-4 h-4 animate-spin" />
                  Menunggu pembayaran...
                </div>
              </div>
            ) : (
              // Mode Tunai
              <div className="w-full flex flex-col h-full animate-in fade-in zoom-in duration-300">
                {/* Display Uang Diterima */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 tracking-widest mb-2 text-left uppercase">Uang Diterima</p>
                  <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center border border-slate-100">
                    <span className="text-xl font-bold text-blue-600">Rp</span>
                    <span className="text-3xl font-black text-slate-800 tracking-tight">
                      {uangDiterima ? parseInt(uangDiterima, 10).toLocaleString('id-ID') : '0'}
                    </span>
                  </div>
                </div>

                {/* Tombol Nominal Cepat (Quick Select) */}
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
                  <button onClick={() => handleQuickSelect(20000)} className="shrink-0 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">Rp 20.000</button>
                  <button onClick={() => handleQuickSelect(50000)} className="shrink-0 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">Rp 50.000</button>
                  <button onClick={() => handleQuickSelect(100000)} className="shrink-0 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">Rp 100.000</button>
                  <button onClick={() => handleQuickSelect(totalTagihan)} className="shrink-0 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">Uang Pas</button>
                </div>

                {/* Numpad (Grid Angka) */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button 
                      key={num} 
                      onClick={() => handleNumpadClick(num.toString())}
                      className="bg-white rounded-2xl py-4 shadow-sm text-xl font-bold text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-colors border border-slate-100"
                    >
                      {num}
                    </button>
                  ))}
                  <button 
                    onClick={handleClear}
                    className="bg-orange-100 rounded-2xl py-4 text-xl font-bold text-orange-600 hover:bg-orange-200 active:bg-orange-300 transition-colors"
                  >
                    C
                  </button>
                  <button 
                    onClick={() => handleNumpadClick('0')}
                    className="bg-white rounded-2xl py-4 shadow-sm text-xl font-bold text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-colors border border-slate-100"
                  >
                    0
                  </button>
                  <button 
                    onClick={() => handleNumpadClick('000')}
                    className="bg-white rounded-2xl py-4 shadow-sm text-xl font-bold text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-colors border border-slate-100"
                  >
                    000
                  </button>
                </div>

                {/* Kembalian */}
                <div className="bg-sky-100/80 rounded-xl p-4 flex justify-between items-center mb-6 border border-sky-200">
                  <span className="font-semibold text-slate-500">Uang Kembali</span>
                  <span className="font-black text-xl text-amber-700">{formatRupiah(displayKembalian)}</span>
                </div>
                
                {/* Info Card */}
                <div className="bg-white border border-blue-100 rounded-xl p-3 flex gap-3 items-start text-left mt-auto shadow-sm">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Pastikan jumlah uang tunai yang diterima dari pelanggan sudah sesuai sebelum mencetak struk.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Tombol Konfirmasi */}
          <button 
            onClick={handleProsesPembayaran}
            disabled={isProcessing || (activeMethod === 'Tunai' && parseInt(uangDiterima || '0', 10) < totalTagihan)}
            className={`w-full text-white py-4 rounded-xl font-bold text-[15px] flex justify-center items-center gap-2 mt-4 shadow-lg shadow-blue-600/30 transition-transform ${isProcessing ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
          >
            {isProcessing ? <Loader className="w-5 h-5 animate-spin" /> : <Printer className="w-5 h-5" />}
            {isProcessing ? 'Memproses...' : 'Proses & Cetak Struk'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default HalamanPembayaran;
