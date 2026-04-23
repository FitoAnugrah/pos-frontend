import React, { useState } from 'react';
import FAQItem from '../components/FAQItem';
import CategoryCard from '../components/CategoryCard';
import TransactionsHelp from './TransactionsHelp';

const faqData = [
  {
    question: 'Bagaimana cara reset PIN?',
    answer: 'Untuk mereset PIN Anda, pergi ke menu Pengaturan > Keamanan > Atur PIN. Ikuti langkah-langkah verifikasi identitas yang tersedia. Jika lupa PIN, Anda bisa menggunakan opsi "Lupa PIN" dan melakukan verifikasi melalui email atau nomor telepon terdaftar.'
  },
  {
    question: 'Cara tambah stok barang?',
    answer: 'Untuk menambah stok barang, masuk ke menu Stok > Tambah Produk Baru atau Perbarui Stok. Anda bisa menambahkan produk secara manual atau menggunakan fitur import CSV untuk menambahkan dalam jumlah besar. Pastikan nama produk dan SKU sudah sesuai dengan sistem inventory Anda.'
  },
  {
    question: 'Metode pembayaran apa saja?',
    answer: 'Sistem POS kami mendukung berbagai metode pembayaran termasuk: Tunai, Transfer Bank, E-wallet (OVO, GoPay, DANA), Kartu Kredit/Debit, dan QRIS. Setiap metode dapat dikonfigurasi sesuai kebutuhan bisnis Anda di menu Pengaturan > Pembayaran.'
  }
];

const categoriesData = [
  {
    id: 'transactions',
    title: 'Transactions',
    description: 'Panduan transaksi dan pembayaran',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'inventory',
    title: 'Inventory',
    description: 'Manajemen stok dan produk',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18L19.5 8.5v8.5c0 4.5-2.65 8.51-6.5 10.38-3.85-1.87-6.5-5.88-6.5-10.38V8.5L12 4.18zm0 5.82c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'account',
    title: 'Account',
    description: 'Kelola akun dan profil',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Keamanan dan privasi akun',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 11h-4v-2h4V6h2v4h4v2h-4v4h-2v-4z" fill="currentColor" />
      </svg>
    )
  }
];

export default function PusatBantuan({ onTabChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const handleBack = () => {
    if (onTabChange) {
      onTabChange();
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackFromCategory = () => {
    setSelectedCategory(null);
  };

  const handleHubungiDukungan = () => {
    window.location.href = 'https://wa.me/6285823629025';
  };

  const handleChatLangsung = () => {
    window.location.href = 'https://wa.me/6285823629025';
  };

  // Filter FAQ berdasarkan search query
  const filteredFaq = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show TransactionsHelp jika kategori transactions dipilih
  if (selectedCategory === 'transactions') {
    return <TransactionsHelp onTabChange={handleBackFromCategory} />;
  }

  return (
    <div className="flex-1 w-full bg-slate-50 h-full overflow-y-auto overflow-x-hidden">
      
      {/* Desktop Topbar */}
      <div className="hidden md:flex items-center justify-between px-8 lg:px-12 py-6 bg-white/80 backdrop-blur border-b border-slate-100 sticky top-0 z-20">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-2 -ml-2 rounded-lg transition-colors mr-4"
          title="Kembali ke Profil"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Pusat Bantuan</h1>
          <p className="text-sm text-slate-500">Temukan jawaban atas pertanyaan umum Anda</p>
        </div>
        <div className="flex-1" />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100 sticky top-0 z-20">
        <button 
          onClick={handleBack}
          className="text-blue-600 p-2 -ml-2 rounded-full hover:bg-blue-50 transition-colors"
          title="Kembali ke Profil"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-blue-700">Pusat Bantuan</h1>
        <div className="w-10"></div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8 lg:p-12 w-full max-w-screen-xl mx-auto flex flex-col">
        
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari bantuan atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400 text-sm md:text-base"
            />
          </div>
        </div>
        
        {/* Help Categories Section */}
        <div className="mb-12">
          <div className="mb-4 hidden md:block">
            <h2 className="text-xl font-semibold text-slate-600 tracking-wide uppercase text-xs">HELP CATEGORIES</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categoriesData.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="text-left hover:scale-105 transition-transform duration-200 cursor-pointer"
                type="button"
              >
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                />
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-slate-600 tracking-wide uppercase text-xs">PERTANYAAN POPULER</h2>
          </div>
          {filteredFaq.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              {filteredFaq.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 text-center">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-600 font-medium">Tidak ada hasil untuk "{searchQuery}"</p>
              <p className="text-slate-500 text-sm mt-1">Coba cari dengan kata kunci yang berbeda</p>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="bg-gradient-to-br from-blue-50 via-blue-50/50 to-transparent rounded-2xl border border-blue-100/50 p-6 md:p-8 text-center mb-8 shadow-sm">
          <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white border-4 border-blue-100 text-blue-600 shadow-sm mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h10v2H7z" fill="currentColor" />
            </svg>
          </div>
          
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">Butuh bantuan lebih lanjut?</h3>
          <p className="text-sm md:text-[15px] text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">
            Tim dukungan kami siap membantu Anda kapan saja. Hubungi kami melalui WhatsApp untuk respon yang lebih cepat.
          </p>
          
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
            <button
              onClick={handleHubungiDukungan}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm md:text-[15px] font-bold rounded-xl transition-colors duration-200 shadow-md shadow-blue-200/50"
            >
              Hubungi Dukungan
            </button>
            <button
              onClick={handleChatLangsung}
              className="w-full md:w-auto px-8 py-3 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 text-slate-800 text-sm md:text-[15px] font-bold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
              </svg>
              Chat Langsung
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
