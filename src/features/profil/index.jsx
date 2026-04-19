import { useState } from 'react'
import BottomNav from '../dashboard/components/BottomNav'
import AturKeamanan from './components/AturKeamanan'
import EditInformasiAkun from './components/EditInformasiAkun'

const quickStats = [
  { label: 'Shift Aktif', value: '08 Jam', tone: 'blue' },
  { label: 'Transaksi Hari Ini', value: '128', tone: 'emerald' },
  { label: 'Performa Toko', value: 'Stabil', tone: 'amber' },
]

const profileMenus = [
  {
    id: 'akun',
    title: 'Informasi Akun',
    description: 'Kelola data pribadi, email, dan nomor yang terhubung.',
  },
  {
    id: 'toko',
    title: 'Profil Toko',
    description: 'Atur identitas outlet, alamat, dan jam operasional kasir.',
  },
  {
    id: 'keamanan',
    title: 'Keamanan',
    description: 'Ubah PIN, kata sandi, dan pantau perangkat yang masuk.',
  },
  {
    id: 'bantuan',
    title: 'Bantuan Cepat',
    description: 'Lihat panduan singkat dan hubungi admin POS A\'I.',
  },
]

const activityItems = [
  { title: 'Login terakhir', value: 'Hari ini, 08.12 WIB' },
  { title: 'Outlet aktif', value: 'POS A\'I Merdeka 01' },
  { title: 'Role pengguna', value: 'Supervisor Kasir' },
]

function StatCard({ label, value, tone }) {
  const toneClass = {
    blue: 'from-[#0C7AD8] to-[#55B8FF] text-white shadow-[0_16px_30px_rgba(12,122,216,0.22)]',
    emerald:
      'from-[#0E8A67] to-[#52D6A7] text-white shadow-[0_16px_30px_rgba(14,138,103,0.22)]',
    amber: 'from-[#B86A13] to-[#F4B15A] text-white shadow-[0_16px_30px_rgba(184,106,19,0.22)]',
  }

  return (
    <div className={`rounded-[24px] bg-gradient-to-br px-4 py-4 ${toneClass[tone]}`}>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/70">{label}</p>
      <p className="mt-3 text-[22px] font-black tracking-tight">{value}</p>
    </div>
  )
}

function MenuRow({ title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-[22px] border border-[#E9F0F6] bg-white px-4 py-4 text-left transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#EAF6FF] text-[#0B75C9]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3L4 7V11C4 16 7.41 20.74 12 22C16.59 20.74 20 16 20 11V7L12 3ZM10.91 15.59L7.83 12.5L9.24 11.09L10.91 12.76L14.76 8.91L16.17 10.32L10.91 15.59Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-[15px] font-bold text-[#13314B]">{title}</p>
        <p className="mt-1 text-[12px] leading-5 text-[#6C859E]">{description}</p>
      </div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#8BA2B8]">
        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function ProfilFeature({ activeTab = 'pengaturan', onTabChange }) {
  const [page, setPage] = useState('overview')

  if (page === 'edit-akun') {
    return (
      <EditInformasiAkun
        onBack={() => setPage('overview')}
        onSave={() => setPage('overview')}
        onOpenSecurity={() => setPage('keamanan')}
      />
    )
  }

  if (page === 'keamanan') {
    return <AturKeamanan onBack={() => setPage('overview')} />
  }

  return (
    <div className="min-h-screen w-full bg-[#1A1D20] font-sans flex justify-center">
      <div className="relative min-h-screen w-full max-w-[440px] overflow-x-hidden bg-[#F4F8FA] shadow-2xl">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(131,208,255,0.38),_transparent_48%),linear-gradient(160deg,#062B45_0%,#0F5F9B_58%,#7ED3FF_120%)] px-6 pb-8 pt-8 text-white">
          <div className="absolute -right-12 top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute left-[-28px] top-24 h-24 w-24 rounded-full bg-[#8FE0FF]/20 blur-2xl" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-white/70">Profil Saya</p>
              <h1 className="mt-3 text-[30px] font-black tracking-tight">POS A&apos;I Account</h1>
              <p className="mt-2 max-w-[28ch] text-sm leading-6 text-white/85">
                Ringkasan identitas kasir, informasi outlet, dan akses cepat pengaturan akun.
              </p>
            </div>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative mt-7 rounded-[30px] border border-white/15 bg-white/12 p-5 backdrop-blur-md shadow-[0_20px_60px_rgba(4,26,43,0.28)]">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[linear-gradient(145deg,#F7FBFF_0%,#B8E5FF_100%)] text-[#0A5D91] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-[23px] font-black tracking-tight">Aisyah Rahma</p>
                <p className="mt-1 text-[13px] font-medium text-white/78">Supervisor Kasir • POS A&apos;I Merdeka 01</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/90">
                  <span className="h-2 w-2 rounded-full bg-[#8DFFB8]" />
                  Online dan sinkron
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[22px] bg-white/10 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Email</p>
                <p className="mt-2 text-[13px] font-semibold text-white/92">aisyah@posai.id</p>
              </div>
              <div className="rounded-[22px] bg-white/10 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">Telepon</p>
                <p className="mt-2 text-[13px] font-semibold text-white/92">+62 812 3456 7890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-32 pt-6">
          <section>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#7B95AE]">Ringkasan</p>
                <h2 className="mt-2 text-[22px] font-black tracking-tight text-[#13314B]">Status akun hari ini</h2>
              </div>
              <button
                type="button"
                onClick={() => setPage('edit-akun')}
                className="rounded-full border border-[#DDEAF4] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0A76CA]"
              >
                Edit Profil
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {quickStats.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} tone={item.tone} />
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[28px] border border-[#EAF0F5] bg-white p-5 shadow-[0_18px_45px_rgba(100,135,168,0.12)]">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#7B95AE]">Aktivitas</p>
            <div className="mt-4 space-y-3">
              {activityItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-[20px] bg-[#F7FAFC] px-4 py-3"
                >
                  <span className="text-[13px] font-semibold text-[#48627B]">{item.title}</span>
                  <span className="text-[13px] font-bold text-[#123451]">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#7B95AE]">Pengaturan Cepat</p>
            <div className="mt-4 space-y-3">
              {profileMenus.map((item) => (
                <MenuRow
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  onClick={
                    item.id === 'akun'
                      ? () => setPage('edit-akun')
                      : item.id === 'keamanan'
                        ? () => setPage('keamanan')
                        : undefined
                  }
                />
              ))}
            </div>
          </section>
        </div>

        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}
