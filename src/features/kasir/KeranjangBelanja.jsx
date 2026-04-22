import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Search, 
  Minus, 
  Plus, 
  Banknote,
  ImageIcon
} from 'lucide-react';

const KeranjangBelanja = () => {
  const navigate = useNavigate();

  // State untuk data dummy keranjang
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Minyak Goreng 1L",
      price: 25000,
      qty: 2,
      image: "/images/products/cooking_oil.png"
    },
    {
      id: 2,
      name: "Beras Premium 5kg",
      price: 68000,
      qty: 1,
      image: "/images/products/premium_rice.png"
    },
    {
      id: 3,
      name: "Kopi Arabika 250g",
      price: 45000,
      qty: 1,
      image: "/images/products/arabica_coffee.png"
    }
  ]);

  // Fungsi untuk update kuantitas
  const updateQuantity = (id, increment) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + increment;
          // Batasi minimal 1 (jangan sampai minus)
          return { ...item, qty: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  // Kalkulasi dinamis
  const totalTagihan = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const totalPoin = Math.floor(totalTagihan / 1000);

  // Format ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative pb-52 md:pb-0">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 md:px-8 md:pt-8 bg-slate-50 md:bg-transparent sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white md:bg-slate-200 hover:bg-slate-100 md:hover:bg-slate-300 rounded-full shadow-sm md:shadow-none transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700 stroke-[2.5px]" />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Keranjang Belanja</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-sm border border-blue-200 overflow-hidden">
          <User className="w-5 h-5" />
        </div>
      </div>

      {/* Wrapper Utama (Grid di Desktop, Stack di Mobile) */}
      <div className="flex-1 md:grid md:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] md:gap-8 max-w-6xl mx-auto w-full px-4 md:px-8 pb-8 mt-2 md:mt-4 items-start">
        
        {/* Kolom Kiri: Form & Daftar Item */}
        <div className="flex flex-col gap-6">
          
          {/* Card Identifikasi Pelanggan */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-slate-500" />
              <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase">Identifikasi Pelanggan</h2>
            </div>
            
            <div className="space-y-4">
              {/* Input ID Member */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">ID Member (Opsional)</label>
                <div className="flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <CreditCard className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Masukkan ID Member..."
                      className="w-full bg-slate-100/50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold px-5 rounded-xl transition-colors text-sm active:scale-95 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Cari
                  </button>
                </div>
              </div>

              {/* Input Nama Customer */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">Nama Customer</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-slate-100/50 border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Item Keranjang */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">Item Keranjang</h2>
              <div className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full border border-blue-200/50">
                {cart.length} Produk
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center gap-3 md:gap-4 transition-all hover:shadow-md">
                  {/* Gambar Produk */}
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/50 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>

                  {/* Info Produk */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-[15px] truncate">{item.name}</h3>
                    <p className="font-bold text-blue-600 text-[14px] mt-0.5 tracking-tight">{formatRupiah(item.price)}</p>
                  </div>

                  {/* Kontrol Qty */}
                  <div className="bg-slate-50 border border-blue-100 rounded-full flex items-center p-1 shrink-0 shadow-inner">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm border border-slate-100 hover:bg-blue-50 active:scale-90 transition-all"
                    >
                      <Minus className="w-4 h-4 stroke-[3px]" />
                    </button>
                    <span className="w-10 text-center font-black text-slate-800 text-[15px] tabular-nums">
                      {item.qty}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 active:scale-90 transition-all"
                    >
                      <Plus className="w-4 h-4 stroke-[3px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* Kolom Kanan: Ringkasan Pembayaran */}
        {/* Posisinya fixed di bawah untuk mobile, tapi relative/sticky untuk desktop */}
        <div className="fixed bottom-[90px] left-4 right-4 bg-white border border-slate-100 rounded-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.12)] p-5 z-40 md:relative md:w-full md:left-auto md:right-auto md:bottom-auto md:border-none md:rounded-3xl md:shadow-lg md:p-6 md:sticky md:top-24 md:flex md:flex-col md:bg-white md:z-10">
          
          {/* Header Ringkasan (Hanya Desktop) */}
          <div className="hidden md:flex items-center gap-2 mb-6">
            <Banknote className="w-5 h-5 text-slate-500" />
            <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase">Ringkasan Pembayaran</h2>
          </div>

          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs font-bold text-slate-500 tracking-wider mb-1">TOTAL TAGIHAN</p>
              <p className="font-black text-3xl text-slate-800 tracking-tighter">
                {formatRupiah(totalTagihan)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-medium text-slate-400 mb-1">Termasuk PPN 11%</p>
              <div className="bg-orange-50 inline-block px-2.5 py-1 rounded-lg border border-orange-100">
                <p className="text-[13px] font-bold text-orange-600">Poin: +{totalPoin}</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/pembayaran')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-[15px] flex justify-center items-center gap-2.5 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
          >
            <Banknote className="w-5 h-5 stroke-[2.5px]" />
            Lanjut Pembayaran
          </button>
          
        </div>

      </div>

    </div>
  );
};

export default KeranjangBelanja;
