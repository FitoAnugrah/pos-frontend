import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import membersData from '../../mock/augmentedMemberData.js';
import {
  PlusIcon,
  SearchIcon,
  UsersIcon,
} from '../../components/ui/icons';

// ─── Level badge config ───────────────────────────────────────────────────────

function getLevelConfig(level) {
  switch (level) {
    case 'GOLD':
      return {
        badge: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200',
        avatar: 'bg-amber-50 text-amber-500',
        dot: 'bg-amber-400',
        ring: 'ring-amber-200',
      };
    case 'SILVER':
      return {
        badge: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
        avatar: 'bg-slate-100 text-slate-500',
        dot: 'bg-slate-400',
        ring: 'ring-slate-200',
      };
    case 'BRONZE':
      return {
        badge: 'bg-orange-50 text-orange-600 ring-1 ring-orange-200',
        avatar: 'bg-orange-50 text-orange-500',
        dot: 'bg-orange-400',
        ring: 'ring-orange-200',
      };
    default:
      return {
        badge: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
        avatar: 'bg-blue-50 text-blue-600',
        dot: 'bg-slate-400',
        ring: 'ring-slate-200',
      };
  }
}

// ─── Member Card ─────────────────────────────────────────────────────────────

function MemberCard({ member, onClick }) {
  const config = getLevelConfig(member.level);
  const txCount = member.transactions?.length ?? 0;

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer group"
    >
      {/* Card Top — Avatar + Level */}
      <div className="relative p-5 pb-4 flex items-center gap-4">
        <div
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center text-lg font-bold group-hover:scale-105 transition-transform ${config.avatar} ring-2 ${config.ring}`}
        >
          {member.avatarUrl ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{member.initials ?? member.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-base font-bold text-slate-800 leading-tight truncate">
              {member.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium truncate">{member.memberId}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${config.badge}`}>
              {member.level}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            <span className="text-[10px] font-semibold text-slate-400">
              {member.status ?? 'Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Bottom Stats — subtle separator */}
      <div className="border-t border-slate-50 px-5 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-slate-700">{member.points}</span>
          <span className="text-xs text-slate-400 font-medium">pts</span>
        </div>
        <div className="h-3.5 w-px bg-slate-100" />
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-blue-600">{txCount}</span>
          <span className="text-xs text-slate-400 font-medium">transaksi</span>
        </div>
        <div className="h-3.5 w-px bg-slate-100" />
        <span className="text-xs font-semibold text-slate-400">Sejak {member.joinedDate}</span>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MemberPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const totalMembers = membersData.length;
  const activeMembers = membersData.filter((m) => m.status === 'Active Account').length;
  const goldMembers = membersData.filter((m) => m.level === 'GOLD').length;

  const filtered = useMemo(() => {
    let result = membersData.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.memberId?.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'points-desc') {
      result = [...result].sort(
        (a, b) => parseInt(String(b.points).replace(/,/g, '')) - parseInt(String(a.points).replace(/,/g, ''))
      );
    } else if (sort === 'points-asc') {
      result = [...result].sort(
        (a, b) => parseInt(String(a.points).replace(/,/g, '')) - parseInt(String(b.points).replace(/,/g, ''))
      );
    }

    return result;
  }, [search, sort]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">

      {/* ── Desktop Page Header ── */}
      <div className="hidden md:flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Members</h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">Kelola dan pantau data pelanggan setia Anda</p>
        </div>
        <button
          onClick={() => navigate('/member/add')}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 text-sm"
        >
          <PlusIcon className="h-4 w-4" />
          Tambah Member
        </button>
      </div>

      {/* ── Mobile Page Header ── */}
      <div className="md:hidden flex items-center justify-between px-5 pt-4 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Members</h1>
          <p className="text-xs text-slate-500 mt-0.5">Kelola data pelanggan setia Anda</p>
        </div>
        <button
          onClick={() => navigate('/member/add')}
          className="bg-blue-600 text-white px-3.5 py-2 rounded-xl font-semibold text-sm flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Tambah
        </button>
      </div>

      <div className="px-4 md:px-8 pb-8 max-w-7xl mx-auto w-full">

        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-5 mt-2 md:mt-6">
          {/* Total member — highlighted */}
          <article className="col-span-1 bg-blue-600 text-white p-4 md:p-6 rounded-2xl shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
            <div className="relative z-10">
              <p className="text-[9px] md:text-xs font-semibold text-white/80 uppercase tracking-wider mb-1 leading-tight">
                Total Member
              </p>
              <p className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none">
                {totalMembers}
              </p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-[9px] md:text-[10px] font-bold text-white/70 uppercase tracking-wide">+45 bulan ini</span>
              </div>
            </div>
          </article>

          {/* Member Aktif */}
          <article className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-2">
              <UsersIcon className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div>
              <p className="text-[9px] md:text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Aktif</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-none">{activeMembers}</p>
            </div>
          </article>

          {/* Member Gold */}
          <article className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 mb-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true">
                <path d="M12 15.22l-4.7 2.47 1.8-5.32L4.5 8.78l5.5-.47L12 3l2 5.31 5.5.47-4.6 3.59 1.8 5.32L12 15.22z" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] md:text-xs font-semibold text-slate-400 uppercase tracking-wide leading-tight mb-0.5">Gold</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-none">{goldMembers}</p>
            </div>
          </article>
        </div>

        {/* ── Search & Sort Bar ── */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-100 mb-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau ID member..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide hidden sm:block">
              Urutkan:
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSort('newest')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  sort === 'newest' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Terbaru
              </button>
              <button
                onClick={() => setSort('name')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  sort === 'name' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Nama A–Z
              </button>
              <button
                onClick={() => {
                  if (sort === 'points-desc') setSort('points-asc');
                  else setSort('points-desc');
                }}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  sort.startsWith('points') ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Poin {sort === 'points-asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Section label ── */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Daftar Member
          </h2>
          <span className="text-xs font-bold text-blue-600">
            {filtered.length} ditemukan
          </span>
        </div>

        {/* ── Member Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => navigate(`/member/${member.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <UsersIcon className="h-10 w-10 text-slate-300 mb-3" />
            <p className="text-slate-500 font-semibold text-sm">Tidak ada member ditemukan</p>
            <p className="text-slate-400 text-xs mt-1">Coba gunakan kata kunci yang berbeda</p>
          </div>
        )}

      </div>
    </div>
  );
}
