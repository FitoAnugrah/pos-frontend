import React, { useState } from 'react';

const Masuk = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Silakan lengkapi email dan kata sandi.');
      return;
    }
    // TODO: Implementasi logika login
    alert(`Mencoba masuk dengan: ${email}`);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="min-h-screen flex flex-col items-center justify-center w-full max-w-[440px] bg-[#F4F7FB] shadow-2xl overflow-y-auto px-5 py-10 relative">
        
        {/* Top Header outside card */}
        <div className="flex flex-col items-center mb-8">
          {/* Logo Box */}
          <div className="w-[52px] h-[52px] bg-[#006ACC] rounded-[16px] flex items-center justify-center mb-5 shadow-[0_10px_20px_rgba(0,106,204,0.2)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6ZM7 10C6.44772 10 6 10.4477 6 11V13C6 13.5523 6.44772 14 7 14H10C10.5523 14 11 13.5523 11 13V11C11 10.4477 10.5523 10 10 10H7ZM18 12C18 12.5523 17.5523 13 17 13C16.4477 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12Z"/>
            </svg>
          </div>
          
          <h1 className="text-[26px] font-black text-[#0F2035] tracking-tight mb-1">POS A'I</h1>
          <p className="text-[14px] font-medium text-[#4B637B]">Kasir Online Membantu Penjualan</p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_18px_45px_rgba(115,152,181,0.08)] border border-gray-100 flex flex-col relative z-10">
          
          <form onSubmit={handleLogin} className="w-full flex flex-col">
            {/* Input Email Pedagang */}
            <div className="mb-5">
              <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#6A7F93]">
                Email Pedagang
              </label>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@bisnis.com" 
                  className="w-full bg-[#F0F6FB] rounded-[16px] px-5 py-4 text-[14.5px] font-medium outline-none pr-12 text-[#0F2035] placeholder-[#A0B1C0] focus:ring-2 focus:ring-[#006ACC]/30 transition-all" 
                  required
                />
                <div className="absolute right-4 text-[#A0B1C0]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M3 6l9 6 9-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input Kunci Keamanan */}
            <div className="mb-8">
              <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#6A7F93]">
                Kunci Keamanan
              </label>
              <div className="relative flex items-center">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full bg-[#F0F6FB] rounded-[16px] px-5 py-4 text-[14.5px] font-medium outline-none pr-12 text-[#0F2035] placeholder-[#A0B1C0] focus:ring-2 focus:ring-[#006ACC]/30 transition-all tracking-[0.2em]" 
                  required
                />
                <div className="absolute right-4 text-[#A0B1C0]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Submit Button (Gradient) */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#015db8] to-[#01b5e3] hover:opacity-90 text-white font-bold py-4 px-4 rounded-[16px] transition-opacity duration-200 shadow-[0_12px_24px_rgba(1,148,220,0.3)] flex items-center justify-center space-x-2 text-[15.5px]"
            >
              <span>Masuk</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          {/* Lupa Kata Sandi */}
          <div className="mt-6 text-center">
            <button 
              type="button" 
              onClick={() => onNavigate && onNavigate('lupa-sandi')}
              className="text-[12px] font-extrabold text-[#006ACC] uppercase tracking-wide hover:underline"
            >
              Lupa Kata Sandi?
            </button>
          </div>

          {/* Divider Line */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-100"></div>
            <span className="px-4 text-[11px] font-extrabold text-[#A0B1C0] uppercase tracking-[0.1em]">Atau</span>
            <div className="flex-1 border-t border-gray-100"></div>
          </div>
          
          {/* Buat Akun Button */}
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('buat-akun')}
            className="w-full bg-white text-[#006ACC] font-extrabold py-3.5 px-4 rounded-[16px] border border-[#006ACC]/20 hover:bg-[#F0F6FB] transition-colors text-[14px]"
          >
            BUAT AKUN
          </button>
        </div>
        
        {/* Footer Security Badge */}
        <div className="mt-8 bg-white px-5 py-3 rounded-full flex items-center space-x-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-gray-50">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#006ACC" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z"/>
          </svg>
          <span className="text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#4B637B]">
            Node Terenkripsi End-To-End
          </span>
        </div>

      </div>
    </div>
  );
};

export default Masuk;
