import React, { useState } from 'react';

const LupaKataSandi = ({ onNavigate, onSuccess }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Silakan masukkan alamat email.');
      return;
    }
    // TODO: Implementasi logika kirim tautan reset password
    alert(`Tautan atur ulang kata sandi telah dikirim ke: ${email}`);
    if (onSuccess) onSuccess(email);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        
        {/* Main Card */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center relative z-10">
          
          {/* Logo Box */}
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-blue-700/10">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M2.5 12C2.5 7.52166 5.81606 3.82841 10.1371 3.53508C10.5369 3.50793 10.8841 3.80946 10.9113 4.20926C10.9384 4.60907 10.6369 4.95624 10.2371 4.98339C6.54924 5.23376 3.75 8.29177 3.75 12C3.75 15.866 6.88401 19 10.75 19C14.616 19 17.75 15.866 17.75 12V11.25H16C15.5858 11.25 15.25 10.9142 15.25 10.5C15.25 10.0858 15.5858 9.75 16 9.75H19.5C19.9142 9.75 20.25 10.0858 20.25 10.5V14C20.25 14.4142 19.9142 14.75 19.5 14.75C19.0858 14.75 18.75 14.4142 18.75 14V12.186C18.75 16.6212 15.1683 20.25 10.75 20.25C6.19365 20.25 2.5 16.5563 2.5 12Z" fill="currentColor"/>
              <rect x="10" y="10.5" width="5" height="5.5" rx="1" fill="currentColor"/>
              <path d="M10.5 10.5V9C10.5 7.89543 11.3954 7 12.5 7C13.6046 7 14.5 7.89543 14.5 9V10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1 className="text-lg font-bold text-slate-800 tracking-tight mb-2">POS A'I</h1>
          
          <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-2 text-center">Atur Ulang Kata Sandi</h2>
          
          <p className="text-center text-sm font-medium text-slate-500 leading-relaxed mb-8 px-2 max-w-[280px]">
            Masukkan alamat email aman Anda dan kami akan mengirimkan tautan pemulihan akses vault.
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Alamat Email Bisnis
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 py-3.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all text-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@bisnis.com" 
                  className="bg-transparent border-none outline-none flex-1 ml-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-medium" 
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm"
            >
              <span>Kirim Tautan Atur Ulang</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </button>
          </form>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-slate-100 my-7"></div>
          
          {/* Back to Login */}
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('masuk')}
            className="flex items-center text-slate-600 font-bold text-sm hover:text-slate-800 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="ml-2">Kembali ke Masuk</span>
          </button>
        </div>
        
        {/* Footer Security Badge */}
        <div className="mt-8 flex items-center space-x-2 text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Protokol Keamanan Perusahaan</span>
        </div>

      </div>
    </div>
  );
};

export default LupaKataSandi;
