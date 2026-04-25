import React, { useState } from 'react';
import FAQItem from '../components/FAQItem';

const accountFaqData = [
  {
    question: 'Cara ubah profil kasir',
    answer: [
      'Buka menu Profil.',
      'Pilih Edit Informasi Akun.',
      'Lakukan perubahan yang diperlukan.',
      'Klik Simpan untuk menyimpan perubahan.'
    ]
  },
  {
    question: 'Lupa PIN keamanan',
    answer: [
      'Gunakan fitur "Lupa PIN" pada halaman login atau pengaturan keamanan.',
      'Ikuti instruksi verifikasi yang diberikan.',
      'Buat PIN baru setelah verifikasi berhasil.'
    ]
  },
  {
    question: 'Cara ganti kata sandi',
    answer: [
      'Buka menu Profil.',
      'Pilih Keamanan, lalu Reset Password.',
      'Masukkan sandi lama dan sandi baru Anda.',
      'Simpan perubahan untuk memperbarui sandi.'
    ]
  },
  {
    question: 'Pengaturan akses perangkat',
    answer: [
      'Buka menu Pengaturan.',
      'Pilih Keamanan, lalu Perangkat.',
      'Lihat daftar perangkat yang terhubung ke akun Anda.',
      'Hapus akses perangkat yang tidak dikenal atau tidak digunakan lagi.'
    ]
  },
  {
    question: 'Sinkronisasi data akun',
    answer: [
      'Pastikan koneksi internet Anda stabil.',
      'Buka menu Profil.',
      'Pilih Sinkronisasi.',
      'Tekan tombol "Sinkronkan Sekarang" untuk memperbarui data.'
    ]
  }
];

export default function AccountHelp({ onTabChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaq = accountFaqData.filter(faq => {
    const qMatch = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    const aMatch = Array.isArray(faq.answer) 
      ? faq.answer.some(step => step.toLowerCase().includes(searchQuery.toLowerCase()))
      : faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return qMatch || aMatch;
  });

  const handleBack = () => {
    if (onTabChange) onTabChange();
  };

  const handleHubungiDukungan = () => {
    window.location.href = 'https://wa.me/6285823629025';
  };

  return (
    <div className="flex-1 w-full bg-slate-50 h-full overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <button
          onClick={handleBack}
          className="text-blue-600 p-2 -ml-2 rounded-full hover:bg-blue-50 transition-colors"
          title="Kembali ke Pusat Bantuan"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-blue-700">Account Help</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search for specific account issues..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 text-sm"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' fill=\'none\' stroke=\'%239CA3AF\' viewBox=\'0 0 24 24\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: '12px center' }}
        />
      </div>

      {/* FAQ */}
      <div className="px-4">
        <div className="mb-4 text-xs font-semibold text-slate-600 uppercase">Popular Topics</div>
        <div className="space-y-3">
          {filteredFaq.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} isExpanded={searchQuery.length > 0} />
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="bg-gradient-to-br from-blue-50 via-blue-50/50 to-transparent rounded-2xl border border-blue-100/50 p-6 md:p-8 text-center m-4 mt-8 shadow-sm">
        <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white border-4 border-blue-100 text-blue-600 shadow-sm mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h10v2H7z" fill="currentColor" />
          </svg>
        </div>
        <h3 className="text-base md:text-xl font-bold text-slate-800 mb-2">Masih butuh bantuan?</h3>
        <p className="text-sm md:text-[15px] text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">Tim dukungan kami siap membantu menyelesaikan kendala akun Anda 24/7.</p>
        <button
          onClick={handleHubungiDukungan}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm md:text-[15px] font-bold rounded-xl transition-colors duration-200 shadow-md shadow-blue-200/50"
        >
          Hubungi Dukungan
        </button>
      </div>
    </div>
  );
}
