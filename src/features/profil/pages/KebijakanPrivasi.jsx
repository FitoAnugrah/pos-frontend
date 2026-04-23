import React, { useState } from 'react';
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
  const [isDownloading, setIsDownloading] = useState(false);

  const handleHubungiSupport = () => {
    // Open an External Link via the device's system handler
    window.location.href = 'https://wa.me/6285823629025';
  };

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    try {
      const plainHtml = `
        <div style="font-family: 'Courier New', Courier, monospace; color: #000; padding: 20px; font-size: 11px; line-height: 1.6; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
          <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
            <h1 style="font-size: 20px; margin: 0 0 5px 0;">KEBIJAKAN PRIVASI & PENGELOLAAN DATA</h1>
            <h2 style="font-size: 16px; margin: 0 0 10px 0;">Sistem Point of Sale (POS) A'i</h2>
            <p style="margin: 0; font-size: 10px;">Status Dokumen: AKTIF & BERLAKU SEJAK 24 MEI 2024</p>
          </div>
          
          <p>Sistem POS A'i menghargai privasi dan kerahasiaan data operasional bisnis Anda. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menyimpan, dan memproses data dari perangkat Kasir dan Terminal Anda.</p>
          
          <h2 style="font-size: 13px; margin-top: 20px; border-bottom: 1px solid #000; padding-bottom: 3px;">1. DATA YANG DIKUMPULKAN</h2>
          <p>Saat Anda menggunakan layanan Point of Sale kami, kami mengumpulkan jenis data berikut secara otomatis maupun manual:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; border: 1px solid #000; text-align: left;">
            <thead>
              <tr style="background-color: #f0f0f0;">
                <th style="border: 1px solid #000; padding: 8px; width: 30%;">Tipe Data</th>
                <th style="border: 1px solid #000; padding: 8px;">Detail & Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Data Master (Produk/Stok)</td>
                <td style="border: 1px solid #000; padding: 8px;">Informasi SKU, Harga Modal, Harga Jual, Margin, dan Jumlah Stok tersisa di gudang/toko.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Data Transaksi & Finansial</td>
                <td style="border: 1px solid #000; padding: 8px;">Riwayat penjualan, perhitungan pajak (PPN), diskon, dan metode pembayaran pelanggan.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Data Member / Pelanggan</td>
                <td style="border: 1px solid #000; padding: 8px;">Nama pelanggan, nomor telepon, histori transaksi, dan poin keanggotaan (jika diaktifkan).</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Data Karyawan / Shift</td>
                <td style="border: 1px solid #000; padding: 8px;">Log aktivitas kasir, rekap jam kerja (shift), dan otoritas pembatalan transaksi.</td>
              </tr>
            </tbody>
          </table>

          <h2 style="font-size: 13px; margin-top: 20px; border-bottom: 1px solid #000; padding-bottom: 3px;">2. TUJUAN PENGGUNAAN DATA</h2>
          <p>Seluruh data yang tersimpan di dalam terminal POS digunakan khusus untuk:</p>
          <ul style="margin-top: 5px; padding-left: 20px;">
            <li><strong>Operasional Kasir:</strong> Sinkronisasi pemotongan stok otomatis setiap kali transaksi berhasil dilakukan.</li>
            <li><strong>Analitik & Pelaporan:</strong> Menyusun ringkasan omset harian, produk terlaris, dan kalkulasi profit secara akurat.</li>
            <li><strong>Audit Internal:</strong> Menyediakan rekam jejak (log) untuk mengidentifikasi selisih kas atau transaksi yang dibatalkan (void).</li>
          </ul>

          <h2 style="font-size: 13px; margin-top: 20px; border-bottom: 1px solid #000; padding-bottom: 3px;">3. PENYIMPANAN LOKAL (LOCALSTORAGE) & KEAMANAN</h2>
          <p>Untuk mendukung performa yang sangat cepat dan kapabilitas luring (offline), POS A'i secara default menyimpan data esensial di penyimpanan lokal perangkat (Local Storage & IndexedDB) dengan lapisan perlindungan berikut:</p>
          <ul style="margin-top: 5px; padding-left: 20px;">
            <li>Semua kalkulasi nilai finansial diproses murni secara lokal di perangkat yang ditugaskan.</li>
            <li>Data tidak akan dikirimkan ke pihak ketiga manapun untuk tujuan periklanan atau pemasaran silang (cross-marketing).</li>
            <li>Kami menyarankan pengguna untuk membersihkan cache browser hanya setelah proses tutup buku/tutup shift selesai dilakukan.</li>
          </ul>

          <h2 style="font-size: 13px; margin-top: 20px; border-bottom: 1px solid #000; padding-bottom: 3px;">4. HAK PENGHAPUSAN & KENDALI PENUH</h2>
          <p>Pemilik toko memegang kendali 100% atas basis datanya. Anda memiliki kewenangan tak terbatas untuk melakukan pembersihan data transaksi historis, mengoreksi data inventaris (stock opname), hingga menghapus catatan database anggota secara sepihak.</p>

          <div style="margin-top: 40px; text-align: center; border-top: 1px dashed #000; padding-top: 15px;">
            <p style="margin: 0; font-weight: bold; font-size: 14px;">POS A'i © 2024 Dikal Lampa Solutions</p>
            <p style="margin: 5px 0 0 0; font-size: 10px;">Dokumen legal ini dicetak langsung dari Sistem Kasir Internal.</p>
          </div>
        </div>
      `;

      const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');

      if (!printWindow) {
        throw new Error('Popup blocked');
      }

      printWindow.document.open();
      printWindow.document.write(`<!doctype html>
        <html>
          <head>
            <title>Kebijakan Privasi POS AI</title>
            <meta charset="utf-8" />
            <style>
              @page { size: letter; margin: 0.5in; }
              html, body { margin: 0; padding: 0; background: #fff; }
            </style>
          </head>
          <body>
            ${plainHtml}
          </body>
        </html>`);
      printWindow.document.close();

      await new Promise(resolve => setTimeout(resolve, 250));
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal membuka mode cetak PDF. Coba izinkan pop-up lalu ulangi.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F6FAFE] font-sans w-full justify-center md:justify-start overflow-hidden">
      <div className="flex-1 w-full md:w-3/4 lg:w-2/3 mx-auto bg-[#F6FAFE] h-screen overflow-y-auto overflow-x-hidden shadow-2xl md:shadow-none relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-5 sticky top-0 z-20 bg-[#F6FAFE]/90 backdrop-blur-md">
          <button onClick={onBack} className="text-blue-600 p-1 -ml-1 rounded-full hover:bg-blue-50 transition-colors">
            <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <h1 className="text-sm font-bold text-slate-800">Kebijakan Privasi</h1>
        </div>

        <div className="px-4 md:px-8 pb-12 md:pb-16">
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
            <div id="pdf-exclude-buttons" className="space-y-3 md:space-y-0 md:gap-4 flex flex-col md:flex-row items-center justify-center">
              <button 
                onClick={handleHubungiSupport}
                className="w-full md:w-auto md:px-8 bg-[#0066FF] hover:bg-blue-700 text-white text-[13px] font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-200"
              >
                Hubungi Support
              </button>
              <button 
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className={`w-full md:w-auto md:px-8 bg-white hover:bg-slate-50 text-[#0066FF] text-[13px] font-bold py-3 rounded-xl border border-blue-100 transition-all shadow-sm flex justify-center items-center gap-2 ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses PDF...
                  </>
                ) : (
                  'Download PDF'
                )}
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
