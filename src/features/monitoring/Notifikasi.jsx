import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  WarningIcon,
  CheckCircleIcon,
  CheckCircleSolidIcon,
  InfoIcon,
  ChartIcon,
} from '../../components/ui/icons';

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
