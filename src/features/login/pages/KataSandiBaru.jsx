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
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="min-h-screen flex flex-col items-center w-full max-w-[440px] bg-[#F4F7FB] shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="w-full px-6 py-6 flex items-center space-x-4">
          <button type="button" onClick={() => onNavigate && onNavigate('masuk')} className="p-1 -ml-1 text-[#0057B3] hover:bg-blue-50 rounded-lg transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[18px] font-bold text-[#17324D]">Pengaturan Keamanan</h1>
        </div>

        {/* Main Card */}
        <div className="w-full px-5 pb-8">
          <div className="bg-white rounded-[26px] p-6 sm:p-8 shadow-[0_18px_45px_rgba(115,152,181,0.10)] border border-gray-100">
            
            {/* Icon Box */}
            <div className="w-16 h-16 bg-[#0E7BD3] rounded-[16px] flex items-center justify-center mx-auto mb-6 shadow-[0_14px_24px_rgba(14,123,211,0.25)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M17 11V7A5 5 0 007 7v4H5v10h14V11h-2zm-8-4a3 3 0 116 0v4H9V7zm3 11a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-[22px] font-black tracking-tight text-[#17324D] mb-3">Buat Kata Sandi Baru</h2>
              <p className="text-[13px] text-[#607C97] leading-relaxed px-2">
                Kata sandi baru Anda harus berbeda dari kata sandi sebelumnya.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Input Kata Sandi Baru */}
              <div className="mb-5">
                <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0A76CA]">
                  Kata Sandi Baru
                </label>
                <div className="bg-[#EAF4FB] rounded-[14px] flex items-center px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#0A76CA]/30 transition-all text-[#23425D]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5B6D80]">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none flex-1 ml-3 text-[#0F2035] font-medium placeholder-[#8B9DB0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 -mr-1 text-[#5B6D80] hover:text-[#0F2035] transition-colors"
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
              <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0A76CA]">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="bg-[#EAF4FB] rounded-[14px] flex items-center px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#0A76CA]/30 transition-all text-[#23425D]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5B6D80]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none flex-1 ml-3 text-[#0F2035] font-medium placeholder-[#8B9DB0]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1 -mr-1 text-[#5B6D80] hover:text-[#0F2035] transition-colors"
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
            <div className="bg-[#F0F6FB] rounded-2xl p-5 mb-8 border border-[#E1EAF2]">
              <div className="flex items-center space-x-2 mb-3 text-[#0F2035]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5B6D80]">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <h3 className="text-sm font-bold">Persyaratan Kata Sandi</h3>
              </div>
              
              <ul className="space-y-2.5">
                <li className="flex items-center space-x-2.5">
                  {hasMinLength ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0E7BD3" className="text-[#0E7BD3] flex-shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0AAB5" strokeWidth="2" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  <span className="text-xs sm:text-sm text-[#5B6D80]">Minimal 8 karakter</span>
                </li>
                
                <li className="flex items-center space-x-2.5">
                  {hasSymbol ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0E7BD3" className="text-[#0E7BD3] flex-shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0AAB5" strokeWidth="2" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  <span className="text-xs sm:text-sm text-[#5B6D80]">Sertakan setidaknya satu simbol (@, #, $)</span>
                </li>

                <li className="flex items-center space-x-2.5">
                  {hasUpperAndLower ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0E7BD3" className="text-[#0E7BD3] flex-shrink-0">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0AAB5" strokeWidth="2" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  <span className="text-xs sm:text-sm text-[#5B6D80]">Satu huruf besar dan satu huruf kecil</span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0E7BD3] hover:bg-[#0c6bb8] text-white font-bold py-4 px-4 rounded-[14px] transition-colors duration-200 shadow-[0_14px_24px_rgba(14,123,211,0.25)] flex items-center justify-center space-x-2"
            >
              <span>Simpan Kata Sandi</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Footer Link */}
            <div className="mt-6 text-center">
              <button type="button" onClick={() => onNavigate && onNavigate('masuk')} className="text-[#0A76CA] font-bold text-sm hover:underline">
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
