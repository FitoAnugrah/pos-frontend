import React, { useState } from 'react';
import { SearchIcon } from '../../../components/ui/icons';

const rewardProducts = [
  { id: 1, name: 'Voucher Belanja Rp 10.000', category: 'Voucher', points: 1000, thumb: '🎟️' },
  { id: 2, name: 'Kopi Kapal Api 165g', category: 'Minuman', points: 1200, thumb: '☕' },
  { id: 3, name: 'Gula Pasir 1Kg', category: 'Sembako', points: 1500, thumb: '🧂' },
  { id: 4, name: 'Beras Premium 5Kg', category: 'Sembako', points: 6500, thumb: '🍚' },
  { id: 5, name: 'Minyak Goreng 2L', category: 'Sembako', points: 3000, thumb: '🍾' },
  { id: 6, name: 'Voucher Belanja Rp 50.000', category: 'Voucher', points: 4500, thumb: '🎟️' },
  { id: 7, name: 'Set Panci Dapur', category: 'Peralatan', points: 15000, thumb: '🍲' },
  { id: 8, name: 'Mesin Cuci Mini', category: 'Elektronik', points: 50000, thumb: '🧺' },
];

export default function TukarPoinModal({ isOpen, onClose, memberPoints, onExchange }) {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  if (!isOpen) return null;

  const filteredRewards = rewardProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:px-8 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Katalog Tukar Poin</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Pilih hadiah sesuai dengan jumlah poin yang tersedia.</p>
          </div>
          <div className="text-right bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Poin Anda</p>
            <p className="text-xl font-extrabold text-blue-600 leading-none">{memberPoints.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 md:px-8 pt-6 pb-2">
           <div className="flex items-center gap-3 w-full bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl px-4 py-3 transition-all text-slate-700">
             <span className="text-slate-400 shrink-0">
               <SearchIcon className="w-5 h-5" />
             </span>
             <input
               type="text"
               value={query}
               onChange={(event) => setQuery(event.target.value)}
               placeholder="Cari hadiah (contoh: Voucher, Minyak)..."
               className="w-full bg-transparent outline-none text-sm font-bold placeholder:font-medium placeholder:text-slate-400"
             />
           </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:px-8 pt-4 pb-8 bg-white [scrollbar-width:thin]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRewards.map((product) => {
              const isAffordable = memberPoints >= product.points;
              
              return (
                <div 
                  key={product.id}
                  className={`flex flex-col text-left bg-white p-5 rounded-2xl border transition-all relative overflow-hidden group ${isAffordable ? 'border-slate-200 hover:border-blue-300 hover:shadow-lg' : 'border-slate-100 opacity-70 grayscale-[20%]'}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm text-2xl ${isAffordable ? 'bg-blue-50' : 'bg-slate-50'}`}>
                      {product.thumb}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-800 font-bold text-[15px] leading-snug group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1.5">{product.category}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100/80 flex items-center justify-between gap-3">
                    <p className={`text-base font-extrabold tracking-tight ${isAffordable ? 'text-amber-500' : 'text-slate-400'}`}>
                      {product.points.toLocaleString('id-ID')} <span className="text-[10px] font-bold text-slate-400 uppercase">pts</span>
                    </p>
                    
                    <button
                      onClick={() => isAffordable ? setSelectedProduct(product) : alert('Poin tidak mencukupi untuk item ini.')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isAffordable 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isAffordable ? 'Tukar Poin' : 'Poin Kurang'}
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredRewards.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 px-5 py-12 text-center">
                <p className="text-base font-bold text-slate-700">Hadiah tidak ditemukan</p>
                <p className="mt-1 text-sm text-slate-500">Coba kata kunci pencarian yang lain.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:px-8 border-t border-slate-100 bg-white flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>

      {/* Confirmation Overlay */}
      {selectedProduct && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200 rounded-3xl">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-blue-50 text-3xl flex items-center justify-center rounded-2xl mx-auto mb-4 border border-slate-100">
              {selectedProduct.thumb}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Konfirmasi Penukaran</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Apakah benar ingin menukar <strong className="text-slate-700">{selectedProduct.points.toLocaleString('id-ID')} pts</strong> dengan <strong className="text-slate-700">{selectedProduct.name}</strong>?
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Tidak
              </button>
              <button 
                onClick={() => {
                  onExchange(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md transition-all active:scale-95"
              >
                Ya, Tukar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
