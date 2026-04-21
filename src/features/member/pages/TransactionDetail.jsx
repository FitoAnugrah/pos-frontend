import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import membersData from '../../../mock/augmentedMemberData.js';
import {
  ArrowLeftIcon,
  CheckIcon,
  StarIcon,
  WalletIcon,
  ShareIcon,
  PrinterIcon,
} from '../../../components/ui/icons';

export default function TransactionDetail() {
  const { trxId } = useParams();
  const navigate = useNavigate();

  // Find the transaction across all members
  let transaction = null;
  let memberOwner = null;

  for (const m of membersData) {
    if (m.transactions) {
      const found = m.transactions.find(t => t.trxId === trxId || t.id === trxId); // Support both ID types
      if (found) {
        transaction = found;
        memberOwner = m;
        break;
      }
    }
  }

  // If we don't have detailed data for this transaction, we mock it or show empty
  const isDetailed = transaction?.items && transaction?.summary;

  if (!transaction) {
    return <div className="p-8 text-center font-sans">Transaction not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl bg-[#F4F8FB] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col pb-24">
        
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5 sticky top-0 z-10 bg-[#F4F8FB]/90 backdrop-blur-sm">
          <button onClick={() => navigate(-1)} className="text-[#0D74C8] hover:bg-slate-200 p-2 rounded-full transition-colors -ml-2">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-[17px] font-extrabold text-[#11263C]">Detail Transaksi</h1>
        </div>

        <div className="flex flex-col items-center mt-2 px-5">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-4 ${transaction.status === 'SUCCESS' ? 'bg-[#0A6CBF] shadow-[0_10px_20px_rgba(10,108,191,0.3)]' : 'bg-red-500 shadow-[0_10px_20px_rgba(239,68,68,0.3)]'}`}>
            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
              {transaction.status === 'SUCCESS' ? (
                <CheckIcon className="w-6 h-6 text-[#0A6CBF]" />
              ) : (
                <span className="text-red-500 font-bold text-xl">X</span>
              )}
            </div>
          </div>
          
          <p className="text-[15px] font-semibold text-[#5C7C9E] mb-1">
            {transaction.status === 'SUCCESS' ? 'Pembayaran Berhasil' : 'Pembayaran Gagal'}
          </p>
          <h2 className="text-[36px] font-extrabold text-[#11263C] tracking-tight">{transaction.amount}</h2>

          {/* Receipt Card */}
          <div className="w-full bg-white rounded-3xl p-6 mt-8 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            {/* Top Info Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div>
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider mb-1">TRANSACTION ID</p>
                <p className="text-[13px] font-bold text-[#11263C]">{transaction.trxId || transaction.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider mb-1">DATE & TIME</p>
                <p className="text-[13px] font-bold text-[#11263C]">{transaction.displayDate}, {transaction.time}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider mb-1">CASHIER</p>
                <p className="text-[13px] font-bold text-[#11263C]">{transaction.cashier || 'Admin'}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider mb-1">MEMBER NAME</p>
                <p className="text-[13px] font-bold text-[#0A6CBF]">{memberOwner.name}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-dashed border-slate-200 mb-6"></div>

            {/* Purchase Details */}
            {isDetailed && (
              <div className="flex flex-col gap-4 mb-6">
                <p className="text-[10px] font-bold text-[#8FA5B8] uppercase tracking-wider">PURCHASE DETAILS</p>
                
                {/* Items List */}
                <div className="flex flex-col gap-4">
                  {transaction.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-extrabold text-[#11263C]">{item.name}</span>
                        <span className="text-[12px] font-medium text-[#8FA5B8]">{item.price} × {item.qty}</span>
                      </div>
                      <span className="text-[13px] font-extrabold text-[#11263C]">{item.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Points Earned Banner */}
            {isDetailed && transaction.points && (
              <div className="bg-[#EAF3FA] rounded-xl p-4 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#D1E4F5] w-8 h-8 rounded-full flex items-center justify-center">
                    <StarIcon className="w-4 h-4 text-[#0A6CBF]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-extrabold text-[#11263C]">Poin Didapat</span>
                    <span className="text-[10px] font-medium text-[#5C7C9E]">Saldo: {transaction.points.balance}</span>
                  </div>
                </div>
                <span className="text-[18px] font-extrabold text-[#0A6CBF]">{transaction.points.earned}</span>
              </div>
            )}

            {/* Subtotal & Totals */}
            {isDetailed && (
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#5C7C9E]">Subtotal</span>
                  <span className="font-bold text-[#11263C]">{transaction.summary.subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#5C7C9E]">PPN (11%)</span>
                  <span className="font-bold text-[#11263C]">{transaction.summary.tax}</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-medium text-[#5C7C9E]">Diskon Member</span>
                  <span className="font-bold text-[#D97706]">{transaction.summary.discount}</span>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-full border-t border-dashed border-slate-200 mb-6"></div>

            {/* Grand Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[16px] font-extrabold text-[#11263C]">Total</span>
              <span className="text-[24px] font-extrabold text-[#0A6CBF]">{transaction.amount}</span>
            </div>
            
            {/* Divider */}
            <div className="w-full border-t border-dashed border-slate-200 mb-5"></div>

            {/* Payment Method Footer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#5C7C9E]">
                <WalletIcon className="w-4 h-4" />
                <span className="text-[12px] font-medium">Metode: {isDetailed ? transaction.payment.method : transaction.paymentMethod}</span>
              </div>
              {isDetailed && transaction.payment.change && (
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-medium text-[#5C7C9E]">Kembalian</span>
                  <span className="text-[12px] font-bold text-[#11263C]">{transaction.payment.change}</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Fixed Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center bg-transparent z-20 pointer-events-none">
          <div className="w-full max-w-[440px] md:max-w-3xl px-5 py-6 flex gap-3 pointer-events-auto bg-gradient-to-t from-[#F4F8FB] via-[#F4F8FB] to-transparent">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Tautan struk disalin ke clipboard!");
              }}
              className="flex-1 bg-[#C9E0F5] hover:bg-[#B3D4EF] text-[#0A6CBF] font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors">
              <ShareIcon className="w-4 h-4" />
              Bagikan Struk
            </button>
            <button 
              onClick={() => {
                if(window.confirm('Unduh struk ini?')) {
                  window.print();
                }
              }}
              className="flex-1 bg-[#0A6CBF] hover:bg-[#095BA3] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#0A6CBF]/20">
              <PrinterIcon className="w-4 h-4" />
              Cetak Struk
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

