import React, { useState } from 'react';

const KataSandiBaru = ({ onNavigate, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation checks
  const hasMinLength = password.length >= 8;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperAndLower = /[a-z]/.test(password) && /[A-Z]/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasMinLength || !hasSymbol || !hasUpperAndLower) {
      alert('Mohon penuhi semua persyaratan kata sandi.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Kata sandi tidak cocok.');
      return;
    }
    // TODO: Implement submit logic
    alert('Kata sandi berhasil diubah!');
    if (onSuccess) onSuccess();
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* Header */}
        <div className="w-full mb-6 flex items-center space-x-4">
          <button type="button" onClick={() => onNavigate && onNavigate('masuk')} className="p-1 -ml-1 text-slate-600 hover:text-slate-900 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Pengaturan Keamanan</h1>
        </div>

        {/* Main Card */}
        <div className="w-full">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative z-10">
            
            {/* Icon Box */}
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-700/10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M17 11V7A5 5 0 007 7v4H5v10h14V11h-2zm-8-4a3 3 0 116 0v4H9V7zm3 11a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-2">Buat Kata Sandi Baru</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">
                Kata sandi baru Anda harus berbeda dari kata sandi sebelumnya.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Input Kata Sandi Baru */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Kata Sandi Baru
                </label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 py-3.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all text-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-transparent border-none outline-none flex-1 ml-3 text-sm font-semibold text-slate-800 tracking-widest placeholder:tracking-normal placeholder:text-slate-400 placeholder:font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 -mr-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Input Konfirmasi Kata Sandi */}
            <div className="mb-6">
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 py-3.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all text-slate-800">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-transparent border-none outline-none flex-1 ml-3 text-sm font-semibold text-slate-800 tracking-widest placeholder:tracking-normal placeholder:text-slate-400 placeholder:font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1 -mr-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Persyaratan Kata Sandi Box */}
            <div className="bg-slate-50 rounded-xl p-5 mb-8 border border-slate-200">
              <div className="flex items-center space-x-2 mb-3 text-slate-800">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <h3 className="text-sm font-bold text-slate-700">Persyaratan Kata Sandi</h3>
              </div>
              
              <ul className="space-y-2.5">
                <li className="flex items-center space-x-2.5">
                  {hasMinLength ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" className="text-blue-600 flex-shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-slate-300">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  <span className="text-xs sm:text-sm font-medium text-slate-500">Minimal 8 karakter</span>
                </li>
                
                <li className="flex items-center space-x-2.5">
                  {hasSymbol ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" className="text-blue-600 flex-shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-slate-300">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  <span className="text-xs sm:text-sm font-medium text-slate-500">Sertakan setidaknya satu simbol (@, #, $)</span>
                </li>

                <li className="flex items-center space-x-2.5">
                  {hasUpperAndLower ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb" className="text-blue-600 flex-shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-slate-300">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  <span className="text-xs sm:text-sm font-medium text-slate-500">Satu huruf besar dan satu huruf kecil</span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm"
            >
              <span>Simpan Kata Sandi</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Footer Link */}
            <div className="mt-8 text-center pt-2">
              <button type="button" onClick={() => onNavigate && onNavigate('masuk')} className="text-slate-600 font-bold text-sm hover:text-slate-800 transition-colors">
                Kembali ke Masuk
              </button>
            </div>

          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KataSandiBaru;

export default KataSandiBaru;
