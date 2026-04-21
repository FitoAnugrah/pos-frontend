import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import membersData from './data.json';
import {
  PlusIcon,
  SearchIcon,
  UsersIcon,
  ChevronRightIcon,
} from '../../components/ui/icons';

// ─── Level badge config ───────────────────────────────────────────────────────

function getLevelConfig(level) {
  switch (level) {
    case 'GOLD':
      return {
        badge: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200',
        avatar: 'bg-amber-50 text-amber-500',
        dot: 'bg-amber-400',
      };
    case 'SILVER':
      return {
        badge: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
        avatar: 'bg-slate-100 text-slate-500',
        dot: 'bg-slate-400',
      };
    case 'BRONZE':
      return {
        badge: 'bg-orange-50 text-orange-600 ring-1 ring-orange-200',
        avatar: 'bg-orange-50 text-orange-500',
        dot: 'bg-orange-400',
      };
    default:
      return {
        badge: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
        avatar: 'bg-blue-50 text-blue-600',
        dot: 'bg-slate-400',
      };
  }
}

// ─── TrendingUp Icon (not yet in shared lib) ─────────────────────────────────

function TrendingUpIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

// ─── Member Card ─────────────────────────────────────────────────────────────

function MemberCard({ member, onClick }) {
  const config = getLevelConfig(member.level);
  const txCount = member.transactions?.length ?? 0;

  return (
    <article
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div
        className={`w-20 h-20 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-105 transition-transform ${config.avatar}`}
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

      {/* Name */}
      <h3 className="text-lg font-bold text-slate-800 leading-tight truncate w-full mb-1">
        {member.name}
      </h3>

      {/* Member ID */}
      <p className="text-sm text-slate-500 mb-4">{member.memberId}</p>

      {/* Metrics row */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Level badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.badge}`}>
          {member.level}
        </span>

        {/* Points pill */}
        <span className="bg-slate-50 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600">
          {member.points} pts
        </span>

        {/* Transaction count */}
        <span className="bg-blue-50 px-4 py-1.5 rounded-full text-xs font-bold text-blue-600">
          {txCount} trx
        </span>
      </div>

      {/* Status dot */}
      <div className="flex items-center gap-1.5 mt-4">
        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
        <span className="text-xs font-semibold text-slate-500">
          {member.status ?? 'Active'}
        </span>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: 'name', label: 'Nama A–Z' },
  { value: 'points', label: 'Poin Tertinggi' },
  { value: 'newest', label: 'Terbaru' },
];

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
    } else if (sort === 'points') {
      result = [...result].sort(
        (a, b) => parseInt(b.points.replace(/,/g, '')) - parseInt(a.points.replace(/,/g, ''))
      );
    }
    // 'newest' — keep original JSON order

    return result;
  }, [search, sort]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="w-full max-w-6xl mx-auto p-10">

        {/* ── Page Header ── */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Members</h1>
            <p className="text-sm text-slate-500 mt-1">
              Kelola dan pantau data pelanggan setia Anda
            </p>
          </div>

          <button
            onClick={() => navigate('/member/add')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Tambah Member
          </button>
        </div>

        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          <article className="bg-blue-600 text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">Total Member</p>
                <p className="text-4xl font-extrabold tracking-tight leading-none">
                  {totalMembers.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 mt-1">
                <div className="bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                  <TrendingUpIcon className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">+45</span>
                </div>
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Aktif Bulan Ini
                </p>
              </div>
            </div>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0">
              <UsersIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Member Aktif</p>
              <p className="text-3xl font-extrabold text-slate-800 leading-none">
                {activeMembers}
              </p>
            </div>
          </article>

          <article className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                <path d="M12 15.22l-4.7 2.47 1.8-5.32L4.5 8.78l5.5-.47L12 3l2 5.31 5.5.47-4.6 3.59 1.8 5.32L12 15.22z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Member Gold</p>
              <p className="text-3xl font-extrabold text-slate-800 leading-none">
                {goldMembers}
              </p>
            </div>
          </article>
        </div>

        {/* ── Search & Sort Bar ── */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau ID member..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Urutkan:
            </span>
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    sort === opt.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section label ── */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Daftar Member
          </h2>
          <span className="text-xs font-bold text-blue-600">
            {filtered.length} member ditemukan
          </span>
        </div>

        {/* ── Member Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => navigate(`/member/${member.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
            <UsersIcon className="h-12 w-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-semibold text-base">
              Tidak ada member ditemukan
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Coba gunakan kata kunci yang berbeda
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
