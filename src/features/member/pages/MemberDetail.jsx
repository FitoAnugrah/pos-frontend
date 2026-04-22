import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMembers } from '../../../utils/memberStorage';
import {
  ArrowLeftIcon,
  PhoneIcon,
  MailIcon,
  ReceiptIcon,
  GiftIcon,
  CheckCircleIcon,
  EditIcon,
} from '../../../components/ui/icons';

function getLevelStyle(level) {
  switch (level) {
    case 'GOLD':   return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
    case 'SILVER': return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
    case 'BRONZE': return 'bg-orange-100 text-orange-700 ring-1 ring-orange-200';
    default:       return 'bg-slate-100 text-slate-600 ring-1 ring-slate-200';
  }
}

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = getMembers().find(m => m.id === parseInt(id));

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-slate-500">
        <p className="font-semibold">Member tidak ditemukan.</p>
        <button onClick={() => navigate('/member')} className="text-blue-600 font-bold text-sm">
          Kembali ke daftar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F5F9] font-sans">

      {/* ── Desktop Top Bar ── */}
      <div className="hidden md:flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
        <button
          onClick={() => navigate('/member')}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-semibold text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Kembali ke Members
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/member/${member.id}/edit`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors"
          >
            <EditIcon className="w-4 h-4" />
            Edit Member
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <GiftIcon className="w-4 h-4" />
            Tukar Poin
          </button>
        </div>
      </div>

      {/* ── Mobile Header ── */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#F0F5F9] sticky top-0 z-20 border-b border-slate-200/50">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors -ml-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-800">Detail Member</h1>
        <button
          onClick={() => navigate(`/member/${member.id}/edit`)}
          className="text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors -mr-2"
        >
          <EditIcon className="w-5 h-5" />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-5 md:py-8 pb-28 md:pb-10">
        <div className="md:grid md:grid-cols-12 md:gap-8 flex flex-col gap-5">

          {/* LEFT — Profile Card */}
          <div className="md:col-span-4 flex flex-col gap-4">

            {/* Profile */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-[#C8E0F4] flex items-center justify-center border-2 border-white shadow-sm">
                    {member.avatarUrl ? (
                      <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#0A6CBF] font-bold text-2xl">{member.initials}</span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 border-2 border-white">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-extrabold text-slate-800 leading-tight truncate">{member.name}</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{member.memberId}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${getLevelStyle(member.level)}`}>
                      {member.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-600">Aktif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-600 rounded-2xl p-4 text-white">
                <p className="text-[9px] font-bold uppercase tracking-wider text-white/70 mb-1">Total Poin</p>
                <p className="text-2xl font-extrabold">{member.points}</p>
                <p className="text-[10px] text-white/70 font-medium mt-0.5">pts</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Member Sejak</p>
                <p className="text-base font-extrabold text-slate-800 leading-tight">{member.joinedDate}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{member.transactions?.length ?? 0} transaksi</p>
              </div>
            </div>

            {/* Contact Info — only desktop side column */}
            <div className="hidden md:block bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Kontak</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Telepon</p>
                    <p className="text-sm font-bold text-slate-800">{member.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-bold text-slate-800 break-all">{member.email}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT — Contact (mobile) + Transactions */}
          <div className="md:col-span-8 flex flex-col gap-4">

            {/* Contact Info — mobile only */}
            <div className="md:hidden bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Informasi Kontak</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 flex-shrink-0">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Telepon</p>
                    <p className="text-sm font-bold text-slate-800">{member.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600 flex-shrink-0">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-bold text-slate-800 break-all">{member.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Riwayat Transaksi</h3>
                <button
                  onClick={() => navigate(`/member/${member.id}/transactions`)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Lihat Semua →
                </button>
              </div>

              {member.transactions && member.transactions.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {member.transactions.slice(0, 3).map((trx, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/transaction/${trx.trxId || trx.id}`)}
                      className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 w-10 h-10 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                          <ReceiptIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{trx.id}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{trx.displayDate} · {trx.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-slate-800">{trx.amount}</p>
                        <p className={`text-[9px] font-bold uppercase tracking-wide ${trx.status === 'SUCCESS' ? 'text-emerald-500' : 'text-red-500'}`}>
                          {trx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ReceiptIcon className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-medium">Belum ada transaksi</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile Bottom Actions ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="w-full max-w-[440px] px-4 py-4 pointer-events-auto bg-gradient-to-t from-[#F0F5F9] via-[#F0F5F9]/95 to-transparent">
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/member/${member.id}/edit`)}
              className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <EditIcon className="w-4 h-4" />
              Edit Member
            </button>
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-colors shadow-lg shadow-blue-600/30"
            >
              <GiftIcon className="w-4 h-4" />
              Tukar Poin
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
