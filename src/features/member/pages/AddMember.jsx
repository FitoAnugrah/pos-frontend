import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import {
  ArrowLeftIcon,
  UserIcon,
  CameraIcon,
  RibbonStarIcon,
  CircleStarIcon,
  MedalIcon,
  UserPlusIcon,
  CheckCircleSolidIcon,
} from '../../../components/ui/icons';

export default function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    level: 'SILVER',
    avatarUrl: null,
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Nama lengkap wajib diisi';
    if (!formData.phone.trim()) e.phone = 'Nomor telepon wajib diisi';
    if (!formData.email.trim()) e.email = 'Email wajib diisi';
    return e;
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    
    setIsSaving(true);
    try {
      await api.post('/members', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        level: formData.level,
        avatar_url: formData.avatarUrl,
      });
      navigate('/member');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan member.');
    } finally {
      setIsSaving(false);
    }
  };

  const set = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const TIERS = [
    { id: 'GOLD',   label: 'Gold',   Icon: RibbonStarIcon,  color: 'text-amber-500' },
    { id: 'SILVER', label: 'Silver', Icon: CircleStarIcon,  color: 'text-slate-400' },
    { id: 'BRONZE', label: 'Bronze', Icon: MedalIcon,        color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Desktop Top Bar ── */}
      <div className="hidden md:flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-semibold text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Kembali
        </button>
        <h1 className="text-lg font-bold text-slate-800">Tambah Member Baru</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm active:scale-95 ${isSaving ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          <UserPlusIcon className="w-4 h-4" />
          {isSaving ? 'Menyimpan...' : 'Simpan Member'}
        </button>
      </div>

      {/* ── Mobile Header ── */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-slate-50 sticky top-0 z-20 border-b border-slate-200/50">
        <button onClick={() => navigate(-1)} className="text-blue-600 p-2 -ml-2 rounded-full hover:bg-blue-50">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-800">Tambah Member</h1>
        <div className="w-9" />
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-5 md:py-8 pb-32 md:pb-10">

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-blue-50 flex items-center justify-center border-2 border-white shadow-sm">
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-10 h-10 text-blue-300" />
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full border-2 border-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              <CameraIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase">Tambah Foto</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 mb-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Informasi Pribadi</h3>

          {/* Nama */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={set('name')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-300 bg-red-50 focus:ring-red-400' : 'border-slate-200 focus:border-blue-400'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Nomor Telepon <span className="text-red-500">*</span></label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm font-bold text-slate-500 select-none">+62</span>
              <input
                type="tel"
                placeholder="812 3456 7890"
                value={formData.phone}
                onChange={set('phone')}
                className={`w-full pl-14 pr-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.phone ? 'border-red-300 bg-red-50 focus:ring-red-400' : 'border-slate-200 focus:border-blue-400'}`}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Alamat Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={set('email')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-300 bg-red-50 focus:ring-red-400' : 'border-slate-200 focus:border-blue-400'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>}
          </div>
        </div>

        {/* Tier Selection */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tingkatan Member</h3>
            <span className="text-[10px] font-semibold text-slate-400">Pilih satu</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {TIERS.map(({ id, label, Icon, color }) => {
              const active = formData.level === id;
              return (
                <button
                  key={id}
                  onClick={() => setFormData((p) => ({ ...p, level: id }))}
                  className={`relative flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all border-2 ${
                    active
                      ? 'bg-blue-50 border-blue-500 shadow-sm'
                      : 'bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-200'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                  <span className={`text-xs font-bold ${active ? 'text-blue-700' : 'text-slate-600'}`}>{label}</span>
                  {active && (
                    <div className="absolute top-2 right-2">
                      <CheckCircleSolidIcon className="w-4 h-4 text-blue-500" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Mobile Fixed Save Button ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-[440px] px-4 py-4 pointer-events-auto bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full active:scale-[0.98] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg text-sm ${isSaving ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'}`}
          >
            <UserPlusIcon className="w-5 h-5" />
            {isSaving ? 'Menyimpan...' : 'Simpan Member'}
          </button>
        </div>
      </div>

    </div>
  );
}
