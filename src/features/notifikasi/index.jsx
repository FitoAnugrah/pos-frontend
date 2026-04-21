import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
);
const WarningIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const CheckCircleSolidIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
);
const InfoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const ChartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="17" x2="8" y2="13"></line><line x1="12" y1="17" x2="12" y2="9"></line><line x1="16" y1="17" x2="16" y2="11"></line></svg>
);

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F8FB] flex justify-center w-full font-sans">
      <div className="w-full max-w-[440px] md:max-w-3xl lg:max-w-4xl bg-[#F4F8FB] min-h-screen relative shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col pb-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 sticky top-0 z-20 bg-[#F4F8FB]/90 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[#0A6CBF] hover:bg-[#D1E4F5] p-2 rounded-full transition-colors -ml-2">
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-[18px] font-extrabold text-[#0A6CBF]">Notifications</h1>
          </div>
          <button className="text-[14px] font-bold text-[#0A6CBF] hover:opacity-80 transition-opacity">
            Clear All
          </button>
        </div>

        <div className="px-5 pt-2">
          
          {/* Section: HARI INI */}
          <div className="mb-6">
            <h2 className="text-[12px] font-extrabold text-[#5C7C9E] tracking-wider uppercase mb-3 px-1">HARI INI</h2>
            <div className="flex flex-col gap-3">
              
              {/* Warning Card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-4">
                <div className="bg-[#FDE6D5] text-[#D97706] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <WarningIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-extrabold text-[#11263C]">Peringatan Stok Rendah</h3>
                    <span className="text-[11px] font-medium text-[#5C7C9E] mt-0.5">14:02</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#5C7C9E] leading-relaxed">
                    Minyak Goreng 1L sisa 2 unit. Segera lakukan restock untuk menghindari kehabisan barang.
                  </p>
                </div>
              </div>

              {/* Success Card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-4">
                <div className="bg-[#D1E4F5] text-[#0A6CBF] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <CheckCircleSolidIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-extrabold text-[#11263C]">Transaksi Berhasil</h3>
                    <span className="text-[11px] font-medium text-[#5C7C9E] mt-0.5">10:30</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#5C7C9E] leading-relaxed">
                    Pembayaran #TRX-9981 selesai diproses. Total Rp 450.000 telah masuk ke saldo.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Section: KEMARIN */}
          <div className="mb-6">
            <h2 className="text-[12px] font-extrabold text-[#5C7C9E] tracking-wider uppercase mb-3 px-1">KEMARIN</h2>
            <div className="flex flex-col gap-3">
              
              {/* Info Card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex gap-4">
                <div className="bg-[#D1E4F5] text-[#5C7C9E] w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <InfoIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-[15px] font-extrabold text-[#11263C]">Pembaruan Sistem</h3>
                    <span className="text-[11px] font-medium text-[#5C7C9E] mt-0.5">Yesterday</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#5C7C9E] leading-relaxed">
                    Versi 2.1 tersedia dengan fitur integrasi e-wallet baru. Perbarui aplikasi sekarang.
                  </p>
                </div>
              </div>

              {/* Insight Card */}
              <div className="bg-[#0A6CBF] rounded-[28px] p-6 shadow-lg shadow-[#0A6CBF]/20 flex flex-col mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center">
                    <ChartIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#D1E4F5] tracking-widest uppercase">INSIGHT HARIAN</span>
                </div>
                
                <h3 className="text-[18px] font-extrabold text-white mb-2 leading-tight">
                  Performa Penjualan Naik 12%
                </h3>
                
                <p className="text-[13px] font-medium text-[#D1E4F5] leading-relaxed mb-6">
                  Analisis data menunjukkan peningkatan transaksi di kategori sembako selama 24 jam terakhir.
                </p>

                <button 
                  onClick={() => navigate('/laporan')}
                  className="bg-white text-[#0A6CBF] rounded-full py-3 px-6 text-[12px] font-extrabold tracking-wider w-fit hover:bg-[#F4F8FB] transition-colors"
                >
                  LIHAT LAPORAN
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
