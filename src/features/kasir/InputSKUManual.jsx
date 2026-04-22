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
  Settings,
  AlertCircle,
  ShoppingCart,
  Tag,
  Check
} from 'lucide-react';
import { getProducts } from '../../utils/productStorage';



const InputSKUManual = () => {
  const [sku, setSku] = useState('');
  const [foundProduct, setFoundProduct] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(false);
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
    setSearchError('');
    setFoundProduct(null);
    setAddedFeedback(false);

    // Cari di database: exact match atau partial match
    const normalized = sku.trim().toUpperCase();
    const product = getProducts().find(p =>
      p.sku === sku || p.sku === normalized || (p.sku && p.sku.toUpperCase().includes(normalized))
    );

    if (product) {
      setFoundProduct(product);
    } else {
      setSearchError('Produk dengan SKU "' + sku + '" tidak ditemukan dalam sistem.');
    }
  };

  const handleAddFoundToCart = () => {
    if (!foundProduct) return;

    // Validasi stok
    if (foundProduct.stock < 1) {
      alert(`Stok tidak mencukupi. Sisa stok: ${foundProduct.stock} unit`);
      return;
    }

    // Show feedback, then navigate to cart (or back to scan)
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      setFoundProduct(null);
      setSku('');
    }, 1200);
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
              <input
                type="text"
                autoFocus
                placeholder="Contoh: SKU-10042"
                value={sku}
                onChange={(e) => setSku(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="w-full bg-transparent text-2xl font-black tracking-widest text-slate-800 outline-none placeholder:text-lg placeholder:font-medium placeholder:tracking-wide placeholder:text-slate-300"
              />
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
            className={`w-full py-4.5 rounded-2xl font-bold text-[15px] flex justify-center items-center gap-2 mt-8 transition-all ${sku
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 active:scale-95 hover:bg-blue-700'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            <Search className="w-[18px] h-[18px] stroke-[2.5px]" />
            Cari Produk
          </button>

          {/* Error Message */}
          {searchError && (
            <div className="flex items-start gap-3 mt-4 bg-red-50 border border-red-100 rounded-2xl p-4 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-red-600 leading-relaxed">{searchError}</p>
            </div>
          )}

          {/* Found Product Card */}
          {foundProduct && (
            <div className="mt-4 bg-white rounded-2xl border border-emerald-200 shadow-sm p-5 animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="flex items-center gap-2 mb-3">
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Produk Ditemukan</span>
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">{foundProduct.name}</h3>
              <div className="flex items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Barcode className="w-3.5 h-3.5" />
                  <span className="font-semibold">{foundProduct.sku}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Tag className="w-3.5 h-3.5" />
                  <span className="font-semibold">{foundProduct.category}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Harga</p>
                  <p className="text-xl font-black text-blue-700 tracking-tight">Rp {foundProduct.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">Stok</p>
                  <p className="text-lg font-black text-slate-800">{foundProduct.stock} unit</p>
                </div>
              </div>
              <button
                onClick={handleAddFoundToCart}
                className={`w-full mt-4 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${addedFeedback
                  ? 'bg-emerald-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30'
                  }`}
              >
                {addedFeedback ? (
                  <><Check className="w-4 h-4" /> Ditambahkan ke Keranjang!</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Tambah ke Keranjang</>
                )}
              </button>
            </div>
          )}
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
        <button onClick={() => navigate('/')} className="flex flex-col items-center space-y-1 w-16">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl">
            <Home className="w-[22px] h-[22px] stroke-[2.5px]" />
          </div>
          <span className="text-[10px] font-bold text-blue-600">Terminal</span>
        </button>

        <button onClick={() => navigate('/riwayat')} className="flex flex-col items-center space-y-1 w-16 text-slate-400 hover:text-slate-600 transition-colors">
          <div className="p-1.5">
            <Clock className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">Riwayat</span>
        </button>

        <button onClick={() => navigate('/stok')} className="flex flex-col items-center space-y-1 w-16 text-slate-400 hover:text-slate-600 transition-colors">
          <div className="p-1.5">
            <Box className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">Stok</span>
        </button>

        <button onClick={() => navigate('/pengaturan')} className="flex flex-col items-center space-y-1 w-16 text-slate-400 hover:text-slate-600 transition-colors">
          <div className="p-1.5">
            <Settings className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">Pengaturan</span>
        </button>
      </div>

    </div>
  );
};

export default InputSKUManual;
