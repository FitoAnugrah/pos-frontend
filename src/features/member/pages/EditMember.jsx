import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import membersData from '../../../mock/memberData.json';
import {
  ArrowLeftIcon,
  TrashIcon,
  StarIcon,
  UserPlusIcon,
  CameraIcon,
} from '../../../components/ui/icons';

export default function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = membersData.find(m => m.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: member?.name || '',
    phone: member?.phone || '',
    email: member?.email || '',
    level: member?.level || 'BRONZE',
  });
  const [errors, setErrors] = useState({});

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-500">
        <p className="font-semibold">Member tidak ditemukan.</p>
        <button onClick={() => navigate('/member')} className="text-blue-600 font-bold text-sm">Kembali</button>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Nama wajib diisi';
    if (!formData.phone.trim()) e.phone = 'Nomor telepon wajib diisi';
    if (!formData.email.trim()) e.email = 'Email wajib diisi';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    console.log('Saving member details:', formData);
    navigate(-1);
  };

  const set = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  const TIERS = [
    { id: 'GOLD', label: 'Gold', color: 'text-amber-500' },
    { id: 'SILVER', label: 'Silver', color: 'text-slate-400' },
    { id: 'BRONZE', label: 'Bronze', color: 'text-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Desktop Top Bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-semibold text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Kembali
        </button>
        <h1 className="text-lg font-bold text-slate-800">Edit Member</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
        >
          <UserPlusIcon className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-slate-50 sticky top-0 z-20 border-b border-slate-200/50">
        <button onClick={() => navigate(-1)} className="text-blue-600 p-2 -ml-2 rounded-full hover:bg-blue-50">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-800">Edit Member</h1>
        <button onClick={handleSave} className="text-sm font-bold text-blue-600 hover:text-blue-700 pr-1">
          Simpan
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-8 py-5 md:py-8 pb-32 md:pb-10">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-blue-50 border-2 border-white shadow-sm">
              {member.avatarUrl ? (
                <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-blue-600 font-bold text-3xl flex h-full items-center justify-center">
                  {member.initials}
                </span>
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full border-2 border-white hover:bg-blue-700 transition-colors shadow-sm">
              <CameraIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase">Ganti Foto</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 mb-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-5">Informasi Pribadi</h3>

          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              value={formData.name}
              onChange={set('name')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 bg-slate-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-300' : 'border-slate-200 focus:border-blue-400'}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Nomor Telepon</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm font-bold text-slate-400 select-none">+62</span>
              <input
                type="tel"
                value={formData.phone}
                onChange={set('phone')}
                className={`w-full pl-14 pr-4 py-3 rounded-xl text-sm font-medium text-slate-800 bg-slate-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.phone ? 'border-red-300' : 'border-slate-200 focus:border-blue-400'}`}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Alamat Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={set('email')}
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-800 bg-slate-50 border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-300' : 'border-slate-200 focus:border-blue-400'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Tier Card */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 mb-5">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Tingkatan Member</h3>
          <div className="grid grid-cols-3 gap-3">
            {TIERS.map(({ id, label, color }) => {
              const active = formData.level === id;
              return (
                <button
                  key={id}
                  onClick={() => setFormData((p) => ({ ...p, level: id }))}
                  className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all border-2 ${
                    active ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-slate-50 border-transparent hover:border-slate-200'
                  }`}
                >
                  <StarIcon className={`w-5 h-5 ${active ? 'text-blue-600' : color}`} />
                  <span className={`text-xs font-bold ${active ? 'text-blue-700' : 'text-slate-600'}`}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100">
          <h3 className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-3">Zona Berbahaya</h3>
          <button
            onClick={() => { console.log('Removing:', member.id); navigate('/member'); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
            Hapus Member Ini
          </button>
        </div>

      </div>

      {/* Mobile Fixed Save */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-[440px] px-4 py-4 pointer-events-auto bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent">
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 text-sm"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

    </div>
  );
}
