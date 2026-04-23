import React from 'react';

export default function InputRow({ label, value, icon, onChange, type = "text", error }) {
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
