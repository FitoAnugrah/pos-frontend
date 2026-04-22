import React, { useRef } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  PieChart, 
  Shield, 
  UserCog, 
  CheckCircle2, 
  Lock, 
  Database,
  User,
  Briefcase,
  Monitor
} from 'lucide-react';

const KebijakanPrivasi = ({ onBack }) => {
  const contentRef = useRef(null);

  const handleHubungiSupport = () => {
    // Open an External Link via the device's system handler
    window.location.href = 'https://wa.me/6285823629025';
  };

  const handleDownloadPDF = async () => {
    try {
      const element = contentRef.current;
      if (!element) {
        window.print();
        return;
      }

      const printWindow = window.open('', '_blank', 'width=900,height=700');
      if (!printWindow) {
        window.print();
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="id">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Kebijakan Privasi POS AI</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 24px;
                color: #1e293b;
                line-height: 1.6;
                background: #ffffff;
              }
              button {
                display: none !important;
              }
            </style>
          </head>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    } catch (error) {
      console.error('Error generating PDF:', error);
      window.print();
    }
  };

  return (
    <div className="flex h-screen bg-[#F6FAFE] font-sans w-full justify-center md:justify-start overflow-hidden">
      <div className="flex-1 w-full md:w-3/4 lg:w-2/3 mx-auto bg-[#F6FAFE] h-screen overflow-y-auto overflow-x-hidden shadow-2xl md:shadow-none relative">
        
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5 sticky top-0 z-20 bg-[#F6FAFE]/90 backdrop-blur-md">
          <button onClick={onBack} className="text-blue-600 p-1 -ml-1 rounded-full hover:bg-blue-50 transition-colors">
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <h1 className="text-sm font-bold text-slate-800">Kebijakan Privasi</h1>
        </div>

        <div className="px-4 md:px-8 pb-12 md:pb-16" ref={contentRef}>
          {/* Top Banner section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-2 mb-8">
            <div className="inline-flex items-center gap-1.5 bg-blue-100/50 text-blue-500 px-3 py-1 rounded-full text-[10px] font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Keamanan Data Terjamin
            </div>
            <h2 className="text-[22px] font-extrabold text-slate-800 mb-3 leading-tight tracking-tight">
              Komitmen Kami pada<br />Privasi Anda
            </h2>
            <p className="text-[11px] md:text-sm text-slate-500 leading-relaxed max-w-[280px] md:max-w-md">
              Kami di POS AI menghargai kepercayaan Anda dan berkomitmen untuk melindungi data bisnis serta pelanggan Anda dengan standar keamanan perbankan tertinggi.
            </p>
          </div>

          {/* Document Status */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-8 flex justify-between items-center">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">STATUS DOKUMEN</p>
              <p className="text-[13px] font-bold text-slate-800">Aktif & Berlaku</p>
            </div>
            <div className="text-left">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">TERAKHIR DIPERBARUI</p>
              <p className="text-[13px] font-bold text-slate-800">24 Mei 2024</p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="mb-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
            <div className="mt-1 md:mt-0 flex-shrink-0">
              <div className="bg-[#1D60D8] text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
                <FileText className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 mb-2">1. Pengumpulan Informasi</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed mb-4">
                POS AI mengumpulkan informasi yang Anda berikan saat mendaftar akun, seperti nama bisnis, alamat email, nomor telepon, dan detail pembayaran. Kami juga mengumpulkan data transaksi yang diproses melalui sistem kami untuk fungsionalitas operasional.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-[11px] text-slate-500">
                  <div className="text-blue-500 mt-0.5"><User className="w-3.5 h-3.5" /></div>
                  <span className="leading-relaxed"><strong className="text-slate-700">Data Identitas:</strong> Nama pemilik dan informasi kontak legal.</span>
                </li>
                <li className="flex items-start gap-2.5 text-[11px] text-slate-500">
                  <div className="text-blue-500 mt-0.5"><Briefcase className="w-3.5 h-3.5" /></div>
                  <span className="leading-relaxed"><strong className="text-slate-700">Data Bisnis:</strong> Inventaris produk, harga, dan laporan penjualan.</span>
                </li>
                <li className="flex items-start gap-2.5 text-[11px] text-slate-500">
                  <div className="text-blue-500 mt-0.5"><Monitor className="w-3.5 h-3.5" /></div>
                  <span className="leading-relaxed"><strong className="text-slate-700">Data Teknis:</strong> Alamat IP, jenis perangkat, dan log aktivitas aplikasi.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
            <div className="mt-1 md:mt-0 flex-shrink-0">
              <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <PieChart className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 mb-2">2. Penggunaan Data</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed mb-4">
                Informasi yang kami kumpulkan digunakan secara eksplisit untuk menyediakan, memelihara, dan meningkatkan layanan POS AI. Ini termasuk:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-left">
                <div className="bg-[#EAF3FF] p-3.5 rounded-xl border border-blue-50">
                  <h4 className="text-[11px] md:text-sm font-bold text-[#1D60D8] mb-1">Operasional</h4>
                  <p className="text-[10px] md:text-xs text-blue-800/70 leading-relaxed">Memproses transaksi secara real-time dan sinkronisasi inventaris antar perangkat.</p>
                </div>
                <div className="bg-[#EAF3FF] p-3.5 rounded-xl border border-blue-50">
                  <h4 className="text-[11px] md:text-sm font-bold text-[#1D60D8] mb-1">Analitik Bisnis</h4>
                  <p className="text-[10px] md:text-xs text-blue-800/70 leading-relaxed">Menyediakan laporan performa penjualan yang akurat untuk membantu keputusan bisnis Anda.</p>
                </div>
              </div>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed">
                Kami tidak akan pernah menjual, menyewakan, atau menukar data pribadi Anda atau data pelanggan Anda kepada pihak ketiga untuk tujuan pemasaran tanpa izin eksplisit Anda.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
            <div className="mt-1 md:mt-0 flex-shrink-0">
              <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 mb-2">3. Keamanan Informasi</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed mb-4">
                Kami menerapkan lapisan keamanan ganda untuk melindungi infrastruktur data kami:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/60 shadow-sm bg-white">
                  <div className="text-slate-700 mt-0.5"><Lock className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-[11px] md:text-sm font-bold text-slate-800 mb-1">Enkripsi End-to-End</h4>
                    <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">Semua transmisi data antara perangkat Anda dan server kami dilindungi dengan enkripsi TLS 1.3 standar industri.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/60 shadow-sm bg-white">
                  <div className="text-blue-500 mt-0.5"><Database className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-[11px] md:text-sm font-bold text-slate-800 mb-1">Pencadangan Otomatis</h4>
                    <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">Data Anda dicadangkan setiap jam di beberapa lokasi server yang aman untuk mencegah kehilangan data.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
            <div className="mt-1 md:mt-0 flex-shrink-0">
              <div className="bg-orange-100 text-[#E07A5F] w-8 h-8 rounded-lg flex items-center justify-center">
                <UserCog className="w-4 h-4" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 mb-2">4. Hak Pengguna</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed mb-4">
                Sebagai pengguna POS AI, Anda memiliki kendali penuh atas data Anda. Hak Anda meliputi:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-slate-600 bg-white py-2 px-3 rounded-lg border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>Hak untuk mengakses data</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-slate-600 bg-white py-2 px-3 rounded-lg border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>Hak untuk mengoreksi data</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-slate-600 bg-white py-2 px-3 rounded-lg border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>Hak untuk menghapus data</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-slate-600 bg-white py-2 px-3 rounded-lg border border-slate-100 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>Hak untuk portabilitas data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-[#EAF3FF] rounded-2xl p-6 text-center mb-8 border border-blue-50/50">
            <p className="text-[11px] font-medium text-slate-600 mb-4">Punya pertanyaan mengenai privasi Anda?</p>
            <div className="space-y-3 md:space-y-0 md:gap-4 flex flex-col md:flex-row items-center justify-center">
              <button 
                onClick={handleHubungiSupport}
                className="w-full md:w-auto md:px-8 bg-[#0066FF] hover:bg-blue-700 text-white text-[13px] font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-200"
              >
                Hubungi Support
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="w-full md:w-auto md:px-8 bg-white hover:bg-slate-50 text-[#0066FF] text-[13px] font-bold py-3 rounded-xl border border-blue-100 transition-all shadow-sm"
              >
                Download PDF
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <h4 className="text-sm font-bold text-slate-300 mb-1 tracking-widest">POS AI</h4>
            <p className="text-[9px] text-slate-400">© 2024 Dikal Lampa Solutions. Seluruh hak cipta dilindungi undang-undang.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KebijakanPrivasi;
