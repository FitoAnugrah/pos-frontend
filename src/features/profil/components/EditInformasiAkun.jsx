import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InputRow({ label, value, icon, onChange, type = "text", error }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-slate-600">{label}</p>
      {/* Jika ada error, ring biru berubah jadi ring merah */}
      <div className={`flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3.5 text-slate-800 transition-all w-full focus-within:bg-white focus-within:outline-none focus-within:ring-2 ${error ? 'ring-2 ring-red-500 bg-red-50' : 'focus-within:ring-blue-500'}`}>
        <span className={`flex h-5 w-5 items-center justify-center shrink-0 ${error ? 'text-red-400' : 'text-slate-400'}`}>{icon}</span>
        <input 
          type={type}
          value={value}
          onChange={onChange}
          className="bg-transparent text-sm font-semibold w-full outline-none placeholder:font-medium placeholder:text-slate-400"
          placeholder={`Masukkan ${label.toLowerCase()}`}
        />
      </div>
      {/* Munculin teks error kecil di bawah input kalo ada error */}
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}

export default function EditInformasiAkun({ onBack, onSave, onOpenSecurity, initialData }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {
    namaLengkap: 'Budi Santoso',
    email: 'budi@posai.com',
    noTelepon: '+62 812 3456 7890',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    role: 'Store Manager • POS Terminal #04'
  });

  // State baru untuk nyimpen pesan error email
  const [emailError, setEmailError] = useState('');

  const handleChange = (field, value) => {
    // Kalo yang diubah adalah email, kita jalankan validasi Regex
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (value === '') {
        setEmailError(''); // Jangan kasih error kalo kosong (opsional, tergantung lu mau required atau ngga)
      } else if (!emailRegex.test(value)) {
        setEmailError('Format email tidak valid (harus ada @ dan domain)');
      } else {
        setEmailError(''); // Email benar, hilangkan error
      }
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleSave = () => {
    // Tombol save gak akan nge-trigger fungsi ini kalo tombolnya lagi disabled
    if (onSave && !emailError && formData.email !== '') {
      onSave(formData);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans p-4 md:p-12 overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto flex flex-col pb-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 mb-8 md:mb-10 w-full">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-200/50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Edit Account
          </button>

          <button 
            type="button" 
            onClick={handleSave} 
            // Kalo ada emailError, rubah warna tombol jadi abu-abu dan bikin cursornya not-allowed
            disabled={!!emailError || formData.email === ''}
            className={`w-full md:w-auto px-6 py-2.5 rounded-xl transition-all font-semibold shadow-sm text-center ${
              (!!emailError || formData.email === '') 
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            Save Changes
          </button>
        </div>

        {/* Profile Picture Section (TIDAK ADA PERUBAHAN) */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8 mb-8">
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-slate-200 bg-white shadow-sm overflow-hidden">
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>

            <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-slate-50 bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 20H8L18.5 9.5C19.0304 8.96957 19.3284 8.25022 19.3284 7.5C19.3284 6.74978 19.0304 6.03043 18.5 5.5C17.9696 4.96957 17.2502 4.67157 16.5 4.67157C15.7498 4.67157 15.0304 4.96957 14.5 5.5L4 16V20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          </div>

          <div className="mt-5 md:mt-0 flex flex-col items-center md:items-start justify-center flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 text-center md:text-left">{formData.namaLengkap}</h1>
            <p className="mt-1 text-[15px] font-medium text-slate-500 text-center md:text-left">{formData.role}</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <InputRow
              label="Nama Lengkap"
              value={formData.namaLengkap}
              onChange={(e) => handleChange('namaLengkap', e.target.value)}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
                </svg>
              }
            />

            <InputRow
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              // Passing state error ke komponen InputRow khusus buat email
              error={emailError}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20 6H4C2.9 6 2.01 6.9 2.01 8L2 20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM20 10L12 15L4 10V8L12 13L20 8V10Z" fill="currentColor" />
                </svg>
              }
            />

            <InputRow
              label="No. Telepon"
              type="tel"
              value={formData.noTelepon}
              onChange={(e) => handleChange('noTelepon', e.target.value)}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Action Cards (TIDAK ADA PERUBAHAN) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div onClick={onOpenSecurity} className="w-full flex justify-between items-center p-4 md:p-5 rounded-xl border transition-all cursor-pointer hover:shadow-md bg-blue-50/50 border-blue-100 text-blue-700 hover:bg-blue-50">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm border border-blue-100/50">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 17C13.66 17 14.99 15.66 14.99 14C14.99 12.34 13.66 11 12 11C10.34 11 9 12.34 9 14C9 15.66 10.34 17 12 17ZM18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6H9C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8Z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-bold">Atur Keamanan</p>
                <p className="mt-0.5 text-xs font-medium text-blue-600/80">Ganti PIN & Autentikasi</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100/50 text-blue-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div onClick={() => navigate('/login', { state: { view: 'sandi-baru' } })} className="w-full flex justify-between items-center p-4 md:p-5 rounded-xl border transition-all cursor-pointer hover:shadow-md bg-red-50/50 border-red-100 text-red-600 hover:bg-red-50">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm border border-red-100/50">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 17V11M12 7H12.01M5.07183 19C3.96627 19 3.27552 17.8048 3.82823 16.8466L10.7564 4.84664C11.3091 3.88843 12.6909 3.88843 13.2436 4.84664L20.1718 16.8466C20.7245 17.8048 20.0337 19 18.9282 19H5.07183Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[15px] font-bold">Reset Password</p>
                <p className="mt-0.5 text-xs font-medium text-red-600/80">Ubah kata sandi akun</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100/50 text-red-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400 max-w-md mx-auto font-medium">
          Perubahan informasi akun akan diverifikasi melalui email untuk menjaga keamanan instrumen finansial Anda.
        </p>
        
      </div>
    </div>
  )
}