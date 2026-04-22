import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Barcode, 
  Info, 
  Search, 
  Delete,
  Home,
  Clock,
  Box,
  Settings
} from 'lucide-react';

const InputSKUManual = () => {
  const [sku, setSku] = useState('');
  const navigate = useNavigate();

  const handleNumberClick = (num) => {
    // Membatasi panjang SKU jika perlu (misal max 15 karakter)
    if (sku.length < 15) {
      setSku((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setSku((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setSku('');
  };

  const handleSearch = () => {
    if (!sku) return;
    
    // Logika pencarian produk nanti ditambahkan di sini
    console.log("Mencari produk dengan SKU:", sku);
    
    // Contoh untuk simulasi: bisa arahkan ke halaman hasil scan
    // navigate(`/scan-result?sku=${sku}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative pb-20 md:pb-0 font-sans">
      
      {/* Header (Top Bar) */}
      <div className="flex justify-between items-center p-4 md:px-8 md:pt-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 hover:bg-slate-200 rounded-full transition-colors active:bg-slate-300"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700 stroke-[2.5px]" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Input SKU Manual</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm border border-blue-200">
          U
        </div>
      </div>

      {/* Wrapper Konten Inti */}
      <div className="flex flex-col px-5 md:grid md:grid-cols-2 md:gap-16 md:max-w-5xl md:mx-auto md:w-full md:p-8 md:items-center flex-1 mt-2 md:mt-0">
        
        {/* Kolom Kiri (Desktop) / Atas (Mobile) */}
        <div className="flex flex-col w-full">
          <div className="mb-2.5">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Nomor SKU Produk</label>
          </div>
          
          {/* Input Box Besar */}
          <div className="bg-white rounded-2xl shadow-sm p-4.5 flex items-center gap-3.5 border border-slate-200/80 min-h-[72px]">
            <Barcode className="w-7 h-7 text-slate-400 shrink-0" />
            <div className="flex-1 overflow-hidden flex items-center h-full">
              {sku ? (
                <p className="text-2xl font-black tracking-widest text-slate-800 break-all">{sku}</p>
              ) : (
                <p className="text-lg font-medium tracking-wide text-slate-300">Contoh: SKU-10042</p>
              )}
            </div>
          </div>

          {/* Card Info */}
          <div className="bg-sky-50 text-slate-600 p-4.5 rounded-2xl flex gap-3.5 mt-6 items-start border border-sky-100/50">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">
              Ketik nomor SKU produk menggunakan tombol angka di bawah. Pastikan kode sesuai dengan label pada kemasan.
            </p>
          </div>

          {/* Tombol Cari */}
          <button 
            onClick={handleSearch}
            disabled={!sku}
            className={`w-full py-4.5 rounded-2xl font-bold text-[15px] flex justify-center items-center gap-2 mt-8 transition-all ${
              sku 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 active:scale-95 hover:bg-blue-700' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Search className="w-[18px] h-[18px] stroke-[2.5px]" />
            Cari Produk
          </button>
        </div>

        {/* Kolom Kanan (Desktop) / Bawah (Mobile) - Numpad */}
        <div className="mt-10 md:mt-0 w-full max-w-md mx-auto md:max-w-none">
          <div className="grid grid-cols-3 gap-3.5 md:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="bg-white shadow-sm border border-slate-100 rounded-3xl py-5 md:py-8 text-3xl font-black text-slate-800 hover:bg-slate-50 active:bg-slate-100 active:scale-95 transition-all"
              >
                {num}
              </button>
            ))}
            
            {/* Tombol Hapus / Backspace */}
            <button
              onClick={handleDelete}
              disabled={!sku}
              className="bg-orange-50 border border-orange-100 text-orange-600 rounded-3xl py-5 md:py-8 flex items-center justify-center hover:bg-orange-100 active:bg-orange-200 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
            >
              <Delete className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => handleNumberClick('0')}
              className="bg-white shadow-sm border border-slate-100 rounded-3xl py-5 md:py-8 text-3xl font-black text-slate-800 hover:bg-slate-50 active:bg-slate-100 active:scale-95 transition-all"
            >
              0
            </button>
            
            {/* Tombol Clear */}
            <button
              onClick={handleClear}
              disabled={!sku}
              className="bg-white shadow-sm border border-slate-100 text-blue-600 rounded-3xl py-5 md:py-8 flex items-center justify-center hover:bg-blue-50 active:bg-blue-100 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
            >
              <span className="text-3xl font-black tracking-tighter">C</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Navigation (Khusus Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-between items-center px-6 py-2.5 border-t border-slate-100 rounded-t-[28px] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] z-50 pb-safe">
        <button className="flex flex-col items-center space-y-1 w-16">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl">
            <Home className="w-[22px] h-[22px] stroke-[2.5px]" />
          </div>
          <span className="text-[10px] font-bold text-blue-600">Register</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 w-16 text-slate-400 hover:text-slate-600 transition-colors">
          <div className="p-1.5">
            <Clock className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">History</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 w-16 text-slate-400 hover:text-slate-600 transition-colors">
          <div className="p-1.5">
            <Box className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">Inventory</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 w-16 text-slate-400 hover:text-slate-600 transition-colors">
          <div className="p-1.5">
            <Settings className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">Settings</span>
        </button>
      </div>

    </div>
  );
};

export default InputSKUManual;
