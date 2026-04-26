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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Anda harus menyetujui Ketentuan Layanan dan Kebijakan Privasi.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Import api at the top if not there
      const api = (await import('../../../utils/api')).default;
      
      const res = await api.post('/auth/register', {
        name: formData.nama,
        email: formData.email,
        password: formData.password
      });
      
      // Store token automatically
      if (res.data && res.data.token) {
        localStorage.setItem('pos_token', res.data.token);
      }
      
      if (onSuccess) onSuccess(formData.email);
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mendaftar. Silakan periksa kembali data Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        
        {/* Top Header */}
        <div className="w-full flex items-center justify-between mb-8 px-1">
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-tight">Digital Vault POS</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">Empowering your commerce</p>
          </div>
          <div className="flex items-center space-x-1.5 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <rect x="9" y="10" width="6" height="5" rx="1" />
              <path d="M12 10V8c0-1.1.9-2 2-2s2 .9 2 2" />
            </svg>
            <span className="text-[10px] font-bold tracking-wide uppercase">Secure</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col relative z-10 mb-8">
          
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 mb-2">Buat Akun</h2>
          <p className="text-sm text-slate-500 mb-8 font-medium">Daftarkan bisnis Anda untuk memulai.</p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-5">
            
            {/* Nama Lengkap */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Nama Lengkap (Pemilik)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-full bg-slate-50 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 transition-all border border-slate-200 focus:border-blue-500" 
                  required
                />
              </div>
            </div>

            {/* Nomor Telepon */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Nomor Telepon
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <input 
                  type="tel" 
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  placeholder="+62 812 3456 7890" 
                  className="w-full bg-slate-50 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 transition-all border border-slate-200 focus:border-blue-500" 
                  required
                />
              </div>
            </div>

            {/* Nama Bisnis */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Nama Bisnis
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-full bg-slate-50 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 transition-all border border-slate-200 focus:border-blue-500" 
                  required
                />
              </div>
            </div>

            {/* Jenis Industri */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Jenis Industri
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400 pointer-events-none z-10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <circle cx="17.5" cy="17.5" r="3.5" />
                    <polygon points="10.5 3 4 11 17 11" />
                  </svg>
                </div>
                <select 
                  name="industri"
                  value={formData.industri}
                  onChange={handleChange}
                  className="w-full bg-slate-50 rounded-xl pl-11 pr-10 py-3 text-sm font-semibold outline-none text-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer border border-slate-200 focus:border-blue-500" 
                  required
                >
                  <option value="" disabled className="text-slate-400">Pilih Industri</option>
                  <option value="fnb">Food & Beverage</option>
                  <option value="retail">Retail</option>
                  <option value="jasa">Jasa</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <div className="absolute right-4 text-slate-400 pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Bisnis */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Email Bisnis
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-full bg-slate-50 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 transition-all border border-slate-200 focus:border-blue-500" 
                  required
                />
              </div>
            </div>

            {/* Kata Sandi Aman */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-600">
                Kata Sandi Aman
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className={`w-full bg-slate-50 rounded-xl pl-11 pr-11 py-3 text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-blue-500/20 transition-all border border-slate-200 focus:border-blue-500 ${!showPassword ? 'tracking-widest' : ''}`} 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox Persetujuan */}
            <div className="flex items-start space-x-3 mt-4 mb-2">
              <label className="relative flex cursor-pointer items-center rounded-sm mt-0.5">
                <input 
                  type="checkbox" 
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="peer sr-only" 
                />
                <div className={`w-[18px] h-[18px] rounded flex items-center justify-center transition-all duration-200 border-2 ${formData.agree ? 'bg-blue-600 border-blue-600' : 'bg-slate-50 border-slate-300 peer-focus:ring-2 peer-focus:ring-blue-500/30'}`}>
                  {formData.agree && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </label>
              <p className="text-xs leading-relaxed text-slate-500 font-medium w-full">
                Saya setuju dengan <a href="#" className="font-bold text-blue-600 hover:underline">Ketentuan Layanan</a> dan <a href="#" className="font-bold text-blue-600 hover:underline">Kebijakan Privasi</a> dari Digital Vault POS.
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm mt-2"
            >
              <span>Inisialisasi Akun Vault</span>
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-8 text-center pt-2">
            <span className="text-sm font-medium text-slate-500">Sudah punya akun? </span>
            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('masuk')}
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              Masuk
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <div className="text-center pb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed">
          © 2024 Digital Vault POS Architecture • Version<br/>2.0.4
        </div>

      </div>
    </div>
  );
};

export default BuatAkun;
