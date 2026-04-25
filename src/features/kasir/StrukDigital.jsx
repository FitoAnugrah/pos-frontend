import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Share2, Check, Store, Sparkles, Printer, Home, Loader } from 'lucide-react';
import api from '../../utils/api';

const StrukDigital = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const id = location.state?.transactionId;
        if (!id) {
          navigate('/'); // redirect home if no ID
          return;
        }
        const res = await api.get(`/transactions/${id}`);
        setTransaction(res.data);
      } catch (error) {
        console.error("Gagal memuat struk", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [location.state, navigate]);

  // Format ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-50 flex justify-center items-center font-sans">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!transaction) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sky-50 flex justify-center font-sans">
      {/* Wrapper pembatas lebar untuk desktop */}
      <div className="w-full max-w-md bg-sky-50 flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.05)] min-h-screen">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-2">
          <button 
            onClick={() => navigate('/')}
            className="p-2.5 rounded-full hover:bg-sky-100 transition-colors active:scale-95 bg-white shadow-sm border border-slate-100"
          >
            <X className="w-5 h-5 text-slate-700 stroke-[3px]" />
          </button>
          <h1 className="text-[17px] font-black text-slate-800 tracking-tight">Transaction Receipt</h1>
          <button 
            onClick={() => alert('Membuka menu bagikan...')}
            className="p-2.5 rounded-full hover:bg-blue-100 transition-colors active:scale-95 bg-blue-50 text-blue-600 shadow-sm"
          >
            <Share2 className="w-5 h-5 stroke-[2.5px]" />
          </button>
        </div>

        {/* Konten Utama */}
        <div className="flex-1 flex flex-col px-6 pb-8">
          
          {/* Status Pembayaran (Atas) */}
          <div className="flex flex-col items-center mt-6">
            <div className="w-20 h-20 bg-blue-100/80 rounded-full flex justify-center items-center">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex justify-center items-center shadow-lg shadow-blue-600/40">
                <Check className="w-7 h-7 text-white stroke-[3.5px]" />
              </div>
            </div>
            <p className="text-[11px] font-extrabold text-slate-400 tracking-[0.2em] mt-5 uppercase">Pembayaran Berhasil</p>
            <p className="text-[40px] font-black text-slate-900 mt-1 tracking-tighter">{formatRupiah(transaction.total)}</p>
          </div>

          {/* Card Struk (Kertas Tiket) */}
          <div className="bg-white rounded-[28px] p-6 relative shadow-sm border border-slate-100 mt-8 w-full shrink-0">
            {/* Efek Potongan Tiket (Kiri & Kanan) */}
            <div className="absolute w-8 h-8 rounded-full bg-sky-50 -left-4 top-[108px] shadow-inner"></div>
            <div className="absolute w-8 h-8 rounded-full bg-sky-50 -right-4 top-[108px] shadow-inner"></div>

            {/* Header Struk */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Merchant</p>
                <h2 className="text-xl font-black text-slate-800 mt-0.5">Vault POS A'I</h2>
              </div>
              <div className="bg-slate-800 rounded-xl p-2.5 shadow-md">
                <Store className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Info Transaksi (Grid 2 Kolom) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1 uppercase">No. Referensi</p>
                <p className="text-sm font-bold text-slate-700">{transaction.invoice_number}</p>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1 uppercase mt-4">Waktu</p>
                <p className="text-sm font-bold text-slate-700">{new Date(transaction.created_at).toLocaleString('id-ID')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1 uppercase">Pembayaran</p>
                <p className="text-sm font-bold text-slate-700">{transaction.payment_method}</p>
              </div>
            </div>

            {/* Garis Pemisah (Tepat di antara potongan tiket) */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-[2px] border-dashed border-slate-200"></div>
              </div>
            </div>

            {/* Daftar Item */}
            <div className="flex flex-col gap-4">
              {transaction.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{item.product_name}</p>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      {item.qty}x @ {formatRupiah(item.unit_price)}
                    </p>
                  </div>
                  <p className="font-bold text-slate-800 text-sm">
                    {formatRupiah(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-t-[2px] border-solid border-slate-100 my-6" />

            {/* Summary Akhir */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-slate-500 text-sm">Total Belanja</span>
              <span className="font-bold text-slate-800 text-sm">{formatRupiah(transaction.subtotal)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-slate-500 text-sm">Pajak (PPN)</span>
              <span className="font-bold text-slate-800 text-sm">{formatRupiah(transaction.tax_amount)}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-slate-500 text-sm mt-0.5">Poin Diperoleh</span>
              <div className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-black inline-flex items-center gap-1.5 border border-orange-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+{transaction.points_earned} Poin</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-sky-50 p-4 rounded-2xl border border-sky-100">
              <span className="font-black text-slate-800 text-[15px]">Total Akhir</span>
              <span className="font-black text-xl text-blue-700 tracking-tight">{formatRupiah(transaction.total)}</span>
            </div>

          </div>

          {/* Action Buttons (Bawah Struk) */}
          <div className="mt-auto pt-8 flex flex-col gap-3">
            <button 
              onClick={() => window.print()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-[15px] flex justify-center items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Printer className="w-5 h-5 stroke-[2.5px]" />
              Cetak Struk
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-transparent hover:bg-blue-50 text-blue-600 py-4 rounded-2xl font-bold text-[15px] flex justify-center items-center gap-2 active:scale-95 transition-all"
            >
              <Home className="w-5 h-5 stroke-[2.5px]" />
              Kembali ke Beranda
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StrukDigital;
