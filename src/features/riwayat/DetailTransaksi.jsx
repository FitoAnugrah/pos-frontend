import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import {
  ArrowLeftIcon,
  PrinterIcon,
  ShareIcon,
  WalletIcon,
  BankIcon,
  QrCodeIcon
} from '../../components/ui/icons';
import { Loader } from 'lucide-react';

export default function DetailTransaksi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(`/transactions/${id}`);
        setTransaction(res.data);
      } catch (error) {
        console.error('Failed to fetch transaction details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center w-full font-sans">
        <Loader className="w-8 h-8 text-[#0D74C8] animate-spin" />
      </div>
    );
  }

  if (!transaction) {
    return <div className="p-8 text-center font-sans">Transaksi tidak ditemukan</div>;
  }
  
  // Format mata uang
  const formatRp = (num) => `Rp ${num.toLocaleString('id-ID')}`;
  
  const subtotalStr = formatRp(transaction.subtotal);
  const diskonStr = formatRp(transaction.discount);
  const pajakStr = formatRp(transaction.tax_amount);
  const totalAkhir = formatRp(transaction.total);
  const uangDiterimaStr = formatRp(transaction.cash_received || transaction.total);
  const kembaliStr = formatRp(transaction.change || 0);

  const items = transaction.items || [];
  const isRefund = transaction.status === 'REFUND';
  const isMember = transaction.member ? true : false;
  const memberName = transaction.member?.name || 'Pelanggan';
  const cashierName = transaction.cashier || 'Admin';

  const getPaymentIcon = (paymentMethod) => {
    switch(paymentMethod) {
      case 'Tunai': return <WalletIcon className="w-4 h-4" />;
      case 'SeaBank': return <BankIcon className="w-4 h-4" />;
      case 'QRIS': 
      case 'ShopeePay': return <QrCodeIcon className="w-4 h-4" />;
      default: return <WalletIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-slate-50 min-h-screen relative shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-slate-200 p-2 rounded-full transition-colors -ml-2">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-[17px] font-extrabold text-[#0D74C8]">Detail Transaksi</h1>
          </div>
          <span className="font-extrabold text-[17px] text-slate-800">POS A'i</span>
        </div>

        <div className="px-5 pb-8 flex-grow">
          {/* Top Info Card */}
          <div className="bg-white rounded-[20px] p-5 mb-5 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NOMOR TRANSAKSI</p>
                <p className="text-[20px] font-extrabold text-slate-800 leading-none">{transaction.invoice_number}</p>
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${isRefund ? 'bg-[#F1F5F9] text-slate-500' : 'bg-[#D1FAE5] text-[#10B981]'}`}>
                {transaction.status}
              </span>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal & Waktu</p>
                <p className="text-[13px] font-bold text-slate-800">{new Date(transaction.created_at).toLocaleDateString('id-ID')}, {new Date(transaction.created_at).toLocaleTimeString('id-ID')}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{isMember ? 'Nama Member' : 'Nama Kasir'}</p>
                <p className={`text-[13px] font-bold ${isMember ? 'text-blue-600' : 'text-slate-800'}`}>{isMember ? memberName : cashierName}</p>
              </div>
            </div>
          </div>

          <h2 className="text-[15px] font-extrabold text-slate-800 mb-3 px-1">Rincian Produk</h2>

          {/* Details Card */}
          <div className="bg-white rounded-[20px] p-5 shadow-sm flex flex-col gap-5">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-extrabold text-slate-800">{item.product_name}</span>
                  <span className="text-[12px] font-medium text-slate-500">x{item.qty} • {formatRp(item.unit_price)}</span>
                </div>
                <span className="text-[14px] font-extrabold text-slate-800">{formatRp(item.subtotal)}</span>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-slate-50 rounded-[20px] p-5 mt-5 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-slate-500">Total Belanja</span>
              <span className="font-extrabold text-slate-800">{subtotalStr}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-slate-500">Diskon {isMember ? '(Member)' : ''}</span>
              <span className="font-extrabold text-[#D97706]">{diskonStr}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-slate-500">Pajak (10%)</span>
              <span className="font-extrabold text-slate-800">{pajakStr}</span>
            </div>
            
            <div className="w-full border-t border-blue-100 my-2"></div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-[16px] font-extrabold text-slate-800">Total Akhir</span>
              <span className="text-[22px] font-extrabold text-blue-600">{totalAkhir}</span>
            </div>

            <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">METODE PEMBAYARAN</span>
                <div className="flex items-center gap-1.5 text-slate-800 text-[11px] font-extrabold uppercase">
                  {getPaymentIcon(transaction.payment_method)}
                  <span>{transaction.payment_method}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-medium text-slate-500">Uang Diterima</span>
                <span className="font-extrabold text-slate-800">{uangDiterimaStr}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-medium text-slate-500">Kembali</span>
                <span className="font-extrabold text-[#10B981]">{kembaliStr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 left-0 right-0 w-full flex justify-center z-20 pb-safe mt-auto">
          <div className="w-full px-5 py-4 flex gap-3 bg-gradient-to-t from-[#F4F8FB] via-[#F4F8FB] to-transparent">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Tautan struk disalin ke clipboard!");
              }}
              className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <ShareIcon className="w-5 h-5" />
              Bagikan Struk
            </button>
            <button 
              onClick={() => {
                if(window.confirm('Unduh struk ini?')) {
                  window.print();
                }
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
              <PrinterIcon className="w-5 h-5" />
              Cetak Struk
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
