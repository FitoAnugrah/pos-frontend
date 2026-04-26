import React, { useState } from 'react';

import api from '../../../utils/api';

const Masuk = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Silakan lengkapi email dan kata sandi.');
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('pos_token', res.data.token);
      localStorage.setItem('pos_user', JSON.stringify(res.data.user));
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      alert(err.response?.data?.message || 'Login gagal, periksa kredensial Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        
        {/* Top Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-blue-700/10">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6ZM7 10C6.44772 10 6 10.4477 6 11V13C6 13.5523 6.44772 14 7 14H10C10.5523 14 11 13.5523 11 13V11C11 10.4477 10.5523 10 10 10H7ZM18 12C18 12.5523 17.5523 13 17 13C16.4477 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12Z"/>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1.5">POS A'I</h1>
          <p className="text-sm font-medium text-slate-500">Kasir Online Membantu Penjualan</p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
          
          <form onSubmit={handleLogin} className="w-full flex flex-col">
            {/* Input Email Pedagang */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Email Pedagang
              </label>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@bisnis.com" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold outline-none pr-12 text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                  required
                />
                <div className="absolute right-4 text-slate-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M3 6l9 6 9-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input Kunci Keamanan */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold outline-none pr-12 text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${!showPassword ? 'tracking-widest' : ''}`} 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Lupa Kata Sandi */}
            <div className="mb-8 flex justify-end">
              <button 
                type="button" 
                onClick={() => onNavigate && onNavigate('lupa-sandi')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
              >
                Lupa Kata Sandi?
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Masuk...' : 'Masuk Sekarang'}</span>
            </button>
          </form>

          {/* Divider Line */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-100"></div>
            <span className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Atau</span>
            <div className="flex-1 border-t border-slate-100"></div>
          </div>
          
          {/* Buat Akun Button */}
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('buat-akun')}
            className="w-full bg-white text-slate-600 font-bold py-3.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] transition-all text-sm"
          >
            Buat Akun Baru
          </button>
        </div>
        
        {/* Footer Security Badge */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full flex items-center space-x-2 border border-slate-200/60 shadow-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0ea5e9" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm-2 16l-4-4 1.41-1.41L10 15.17l6.59-6.59L18 10l-8 8z"/>
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Enkripsi End-To-End
          </span>
        </div>

      </div>
    </div>
  );
};

export default Masuk;

