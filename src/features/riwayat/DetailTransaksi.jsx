import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import riwayatData from '../../mock/riwayatData.json';
import {
  ArrowLeftIcon,
  PrinterIcon,
  ShareIcon,
  WalletIcon,
  BankIcon,
  QrCodeIcon
} from '../../components/ui/icons';

export default function DetailTransaksi() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find transaction
  const transaction = riwayatData.find(t => t.id === id || t.id.replace('#', '') === id.replace('#', ''));

  if (!transaction) {
    return <div className="p-8 text-center font-sans">Transaksi tidak ditemukan</div>;
  }

  const rawTotal = parseInt(String(transaction.amount).replace(/[^0-9]/g, '')) || 0;
  const isTargetTrx = transaction.id === '#TRX-9981' || transaction.id === 'TRX-9981';

  let calculatedSubtotal, calculatedPajak, calculatedDiskon, calculatedUangDiterima, calculatedKembali, isMember;

  if (isTargetTrx) {
    calculatedSubtotal = 154000;
    calculatedPajak = 1000;
    calculatedDiskon = 0;
    calculatedUangDiterima = 200000;
    calculatedKembali = 45000;
    isMember = false;
  } else {
    isMember = (parseInt(transaction.id.replace(/[^0-9]/g, '')) || 0) % 2 === 0;
    const multiplier = isMember ? 1.05 : 1.10;
    calculatedSubtotal = Math.floor(rawTotal / multiplier);
    calculatedPajak = Math.floor(calculatedSubtotal * 0.10);
    calculatedDiskon = isMember ? Math.floor(calculatedSubtotal * 0.05) : 0;
    
    let denom = rawTotal > 100000 ? 100000 : 50000;
    calculatedUangDiterima = Math.ceil(rawTotal / denom) * denom;
    if (calculatedUangDiterima === rawTotal) calculatedUangDiterima += denom;
    calculatedKembali = calculatedUangDiterima - rawTotal;
  }

  const subtotalStr = `Rp ${calculatedSubtotal.toLocaleString('id-ID')}`;
  const diskonStr = calculatedDiskon > 0 ? `- Rp ${calculatedDiskon.toLocaleString('id-ID')}` : '- Rp 0';
  const pajakStr = `Rp ${calculatedPajak.toLocaleString('id-ID')}`;
  const totalAkhir = transaction.amount;
  const uangDiterimaStr = `Rp ${calculatedUangDiterima.toLocaleString('id-ID')}`;
  const kembaliStr = `Rp ${calculatedKembali.toLocaleString('id-ID')}`;

  const items = isTargetTrx ? [
    { name: 'Minyak Goreng 1L', qty: 1, price: 'Rp 25.000', total: 'Rp 25.000' },
    { name: 'Beras Premium 5kg', qty: 1, price: 'Rp 82.500', total: 'Rp 82.500' },
    { name: 'Gula Pasir 1kg', qty: 3, price: 'Rp 15.500', total: 'Rp 46.500' }
  ] : [
    { name: 'Produk Retail', qty: 1, price: subtotalStr, total: subtotalStr }
  ];

  const isRefund = transaction.status === 'REFUND';

  const getPaymentIcon = (iconStr) => {
    switch(iconStr) {
      case 'wallet': return <WalletIcon className="w-4 h-4" />;
      case 'bank': return <BankIcon className="w-4 h-4" />;
      case 'qr': return <QrCodeIcon className="w-4 h-4" />;
      default: return <WalletIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-[#F4F8FB] min-h-screen relative shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#F4F8FB] sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-slate-200 p-2 rounded-full transition-colors -ml-2">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-[17px] font-extrabold text-[#0D74C8]">Detail Transaksi</h1>
          </div>
          <span className="font-extrabold text-[17px] text-[#11263C]">POS A'i</span>
        </div>

        <div className="px-5 pb-8 flex-grow">
          {/* Top Info Card */}
          <div className="bg-white rounded-[20px] p-5 mb-5 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider mb-1">NOMOR TRANSAKSI</p>
                <p className="text-[20px] font-extrabold text-[#11263C] leading-none">{transaction.id}</p>
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${isRefund ? 'bg-[#F1F5F9] text-[#8FA5B8]' : 'bg-[#D1FAE5] text-[#10B981]'}`}>
                {transaction.status}
              </span>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider mb-1">Tanggal & Waktu</p>
                <p className="text-[13px] font-bold text-[#11263C]">{isTargetTrx ? '24 Okt, 14:02' : `${transaction.displayDate}, ${transaction.time}`}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider mb-1">{isMember ? 'Nama Member' : 'Nama Kasir'}</p>
                <p className={`text-[13px] font-bold ${isMember ? 'text-[#0A6CBF]' : 'text-[#11263C]'}`}>{isMember ? 'Pelanggan Setia' : 'Admin Ali'}</p>
              </div>
            </div>
          </div>

          <h2 className="text-[15px] font-extrabold text-[#11263C] mb-3 px-1">Rincian Produk</h2>

          {/* Details Card */}
          <div className="bg-white rounded-[20px] p-5 shadow-sm flex flex-col gap-5">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-extrabold text-[#11263C]">{item.name}</span>
                  <span className="text-[12px] font-medium text-[#8FA5B8]">x{item.qty} • {item.price}</span>
                </div>
                <span className="text-[14px] font-extrabold text-[#11263C]">{item.total}</span>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-[#EAF3FA] rounded-[20px] p-5 mt-5 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-[#5C7C9E]">Total Belanja</span>
              <span className="font-extrabold text-[#11263C]">{subtotalStr}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-[#5C7C9E]">Diskon {isMember ? '(Member)' : ''}</span>
              <span className="font-extrabold text-[#D97706]">{diskonStr}</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="font-medium text-[#5C7C9E]">Pajak (10%)</span>
              <span className="font-extrabold text-[#11263C]">{pajakStr}</span>
            </div>
            
            <div className="w-full border-t border-[#D1E4F5] my-2"></div>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-[16px] font-extrabold text-[#11263C]">Total Akhir</span>
              <span className="text-[22px] font-extrabold text-[#0A6CBF]">{totalAkhir}</span>
            </div>

            <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider">METODE PEMBAYARAN</span>
                <div className="flex items-center gap-1.5 text-[#11263C] text-[11px] font-extrabold uppercase">
                  {getPaymentIcon(transaction.paymentIcon)}
                  <span>{transaction.paymentMethod}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-medium text-[#5C7C9E]">Uang Diterima</span>
                <span className="font-extrabold text-[#11263C]">{uangDiterimaStr}</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-medium text-[#5C7C9E]">Kembali</span>
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
              className="flex-1 bg-[#C9E0F5] hover:bg-[#B3D4EF] text-[#0A6CBF] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <ShareIcon className="w-5 h-5" />
              Bagikan Struk
            </button>
            <button 
              onClick={() => {
                if(window.confirm('Unduh struk ini?')) {
                  window.print();
                }
              }}
              className="flex-1 bg-[#0A6CBF] hover:bg-[#095BA3] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm">
              <PrinterIcon className="w-5 h-5" />
              Cetak Struk
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
