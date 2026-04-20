import React, { useState } from 'react';

const BuatAkun = ({ onNavigate, onSuccess }) => {
  const [formData, setFormData] = useState({
    nama: '',
    telepon: '',
    bisnis: '',
    industri: '',
    email: '',
    password: '',
    agree: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Anda harus menyetujui Ketentuan Layanan dan Kebijakan Privasi.');
      return;
    }
    // TODO: Implementasi logika registrasi
    alert(`Mendaftarkan bisnis: ${formData.bisnis}`);
    if (onSuccess) onSuccess(formData.email);
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="min-h-screen flex flex-col items-center justify-start w-full max-w-[440px] bg-[#F6F9FC] shadow-2xl overflow-y-auto px-5 py-8 relative">
        
        {/* Top Header outside card */}
        <div className="w-full flex items-center justify-between mb-6 px-1">
          <div>
            <h1 className="text-[17px] font-black text-[#0F2035] tracking-tight leading-tight">Digital Vault POS</h1>
            <p className="text-[11.5px] font-medium text-[#5B6D80] mt-0.5">Empowering your commerce</p>
          </div>
          <div className="flex items-center space-x-1.5 text-[#006ACC] bg-[#006ACC]/5 px-3 py-1.5 rounded-full border border-[#006ACC]/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <rect x="9" y="10" width="6" height="5" rx="1" />
              <path d="M12 10V8c0-1.1.9-2 2-2s2 .9 2 2" />
            </svg>
            <span className="text-[10px] font-extrabold tracking-wide">Secure Enrollment</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-[28px] p-6 sm:p-7 shadow-[0_18px_45px_rgba(115,152,181,0.08)] border border-gray-100 flex flex-col relative z-10 mb-8">
          
          <h2 className="text-[24px] font-black tracking-tight text-[#0F2035] mb-2">Buat Akun</h2>
          <p className="text-[13px] text-[#6A7F93] mb-8">Daftarkan bisnis Anda untuk memulai.</p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-5">
            
            {/* Nama Lengkap */}
            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#4B637B]">
                Nama Lengkap (Pemilik)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#8B9DB0]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className="w-full bg-[#DDEEF9] rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-semibold outline-none text-[#0F2035] placeholder-[#8B9DB0] focus:ring-2 focus:ring-[#006ACC]/30 transition-all border border-transparent focus:border-[#006ACC]/20" 
                  required
                />
              </div>
            </div>

            {/* Nomor Telepon */}
            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#4B637B]">
                Nomor Telepon
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#8B9DB0]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <input 
                  type="tel" 
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  placeholder="+62 812 3456 7890" 
                  className="w-full bg-[#DDEEF9] rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-semibold outline-none text-[#0F2035] placeholder-[#8B9DB0] focus:ring-2 focus:ring-[#006ACC]/30 transition-all border border-transparent focus:border-[#006ACC]/20" 
                  required
                />
              </div>
            </div>

            {/* Nama Bisnis */}
            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#4B637B]">
                Nama Bisnis
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#8B9DB0]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9V21h18V9" />
                    <path d="M3 9l2-4h14l2 4" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  name="bisnis"
                  value={formData.bisnis}
                  onChange={handleChange}
                  placeholder="Vault Coffee" 
                  className="w-full bg-[#DDEEF9] rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-semibold outline-none text-[#0F2035] placeholder-[#8B9DB0] focus:ring-2 focus:ring-[#006ACC]/30 transition-all border border-transparent focus:border-[#006ACC]/20" 
                  required
                />
              </div>
            </div>

            {/* Jenis Industri */}
            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#4B637B]">
                Jenis Industri
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#8B9DB0] pointer-events-none z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <circle cx="17.5" cy="17.5" r="3.5" />
                    <polygon points="10.5 3 4 11 17 11" />
                  </svg>
                </div>
                <select 
                  name="industri"
                  value={formData.industri}
                  onChange={handleChange}
                  className="w-full bg-[#DDEEF9] rounded-[14px] pl-11 pr-10 py-3.5 text-[14px] font-semibold outline-none text-[#0F2035] focus:ring-2 focus:ring-[#006ACC]/30 transition-all appearance-none cursor-pointer border border-transparent focus:border-[#006ACC]/20" 
                  required
                >
                  <option value="" disabled className="text-[#8B9DB0]">Pilih Industri</option>
                  <option value="fnb">Food & Beverage</option>
                  <option value="retail">Retail</option>
                  <option value="jasa">Jasa</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <div className="absolute right-4 text-[#8B9DB0] pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Bisnis */}
            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#4B637B]">
                Email Bisnis
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#8B9DB0]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M3 6l9 6 9-6" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="owner@business.com" 
                  className="w-full bg-[#DDEEF9] rounded-[14px] pl-11 pr-4 py-3.5 text-[14px] font-semibold outline-none text-[#0F2035] placeholder-[#8B9DB0] focus:ring-2 focus:ring-[#006ACC]/30 transition-all border border-transparent focus:border-[#006ACC]/20" 
                  required
                />
              </div>
            </div>

            {/* Kata Sandi Aman */}
            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#4B637B]">
                Kata Sandi Aman
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-[#8B9DB0]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••" 
                  className="w-full bg-[#DDEEF9] rounded-[14px] pl-11 pr-11 py-3.5 text-[14px] font-semibold outline-none text-[#0F2035] placeholder-[#8B9DB0] focus:ring-2 focus:ring-[#006ACC]/30 transition-all tracking-[0.2em] border border-transparent focus:border-[#006ACC]/20" 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#8B9DB0] hover:text-[#4B637B] transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox Persetujuan */}
            <div className="flex items-start space-x-3 mt-4 mb-2">
              <label className="relative flex cursor-pointer items-center rounded-full mt-0.5">
                <input 
                  type="checkbox" 
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="peer sr-only" 
                />
                <div className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-all duration-200 border-2 ${formData.agree ? 'bg-[#006ACC] border-[#006ACC]' : 'bg-[#DDEEF9] border-transparent peer-focus:ring-2 peer-focus:ring-[#006ACC]/30'}`}>
                  {formData.agree && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </label>
              <p className="text-[11.5px] leading-relaxed text-[#6A7F93]">
                Saya setuju dengan <a href="#" className="font-bold text-[#006ACC] hover:underline">Ketentuan Layanan</a> dan <a href="#" className="font-bold text-[#006ACC] hover:underline">Kebijakan Privasi</a> dari Digital Vault POS.
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#006ACC] hover:bg-[#005bb5] text-white font-bold py-4 px-4 rounded-[14px] transition-colors duration-200 shadow-[0_12px_24px_rgba(0,106,204,0.25)] flex items-center justify-center space-x-2 text-[15px] mt-2"
            >
              <span>Inisialisasi Akun Vault</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-7 text-center">
            <span className="text-[13px] text-[#6A7F93]">Sudah punya akun? </span>
            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('masuk')}
              className="text-[13px] font-bold text-[#006ACC] hover:underline"
            >
              Masuk
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <div className="text-center pb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#A0B1C0] leading-relaxed">
          © 2024 Digital Vault POS Architecture • Version<br/>2.0.4
        </div>

      </div>
    </div>
  );
};

export default BuatAkun;
