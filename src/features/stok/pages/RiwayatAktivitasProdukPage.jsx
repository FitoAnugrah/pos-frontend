import { useMemo, useState } from 'react'
import { productActivityHistory } from '../data'
import ActionButton from '../components/ActionButton'
import PageCanvas from '../components/PageCanvas'
import {
  ArrowLeftIcon,
  BoxIcon,
  CalendarIcon,
  ChevronRightIcon,
  EditIcon,
  MoneyIcon,
  ScanIcon,
  SearchIcon,
} from '../components/icons'

const filters = [
  { id: 'all', label: 'Semua' },
  { id: 'stock', label: 'Perubahan Stok' },
  { id: 'price', label: 'Update Harga' },
]

function getActivityMeta(type) {
  switch (type) {
    case 'stock':
      return {
        icon: <BoxIcon className="h-4 w-4" />,
        iconWrap: 'bg-[#e6f4ff] text-[#0d74c8]',
      }
    case 'price':
      return {
        icon: <MoneyIcon className="h-4 w-4" />,
        iconWrap: 'bg-[#eaf6ff] text-[#0d74c8]',
      }
    default:
      return {
        icon: <EditIcon className="h-4 w-4" />,
        iconWrap: 'bg-[#ecf6ff] text-[#0d74c8]',
      }
  }
}

function ActivityCard({ item }) {
  const meta = getActivityMeta(item.type)

  return (
    <article className="rounded-[18px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(111,152,193,0.1)] ring-1 ring-[#edf4fa]">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] ${meta.iconWrap}`}>{meta.icon}</div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-bold text-[#17324d]">{item.productName}</h3>
              <p className="mt-1 text-[13px] font-semibold text-[#0d74c8]">{item.description}</p>
            </div>
            <span className="shrink-0 text-[11px] font-medium text-[#7d93a8]">{item.time}</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[11px] font-medium text-[#9aabb9]">{`Oleh: ${item.actor}`}</p>
            <span className="text-[#b5c4d1]">
              <ChevronRightIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function RiwayatAktivitasProdukPage({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return productActivityHistory.filter((item) => {
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.productName.toLowerCase().includes(normalizedQuery) ||
        item.actor.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, query])

  return (
    <PageCanvas frameClassName="border border-[#dadfe6] bg-[#f4f9fd]" contentClassName="px-3 pb-5 pt-4">
      <header className="flex items-center justify-between gap-3 px-1">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#16324d]"
          aria-label="Kembali ke scanner"
        >
          <ArrowLeftIcon className="h-5 w-5 text-[#0d74c8]" />
          <span className="text-[17px] font-semibold">Riwayat Aktivitas Produk</span>
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#0d74c8] transition hover:bg-[#eef7ff]"
          aria-label="Filter tanggal"
        >
          <CalendarIcon className="h-4 w-4" />
        </button>
      </header>

      <div className="mt-4 rounded-[16px] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(111,152,193,0.08)] ring-1 ring-[#edf4fa]">
        <label className="flex items-center gap-3 text-[#7d99b2]">
          <SearchIcon className="h-4 w-4" />
          <span className="sr-only">Cari aktivitas produk</span>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama produk atau admin..."
            className="w-full bg-transparent text-[14px] font-medium text-[#36516c] outline-none placeholder:text-[#8fa9bf]"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((filter) => {
          const active = activeFilter === filter.id

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition ${
                active ? 'bg-[#0d74c8] text-white' : 'bg-[#eaf4fb] text-[#6888a6]'
              }`}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between px-1">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#17324d]">Aktivitas Terbaru</p>
        <p className="text-[12px] font-medium text-[#7d93a8]">Hari Ini, 24 Okt</p>
      </div>

      <div className="mt-3 space-y-3">
        {filteredItems.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>

      <ActionButton
        label="Kembali ke Scanner"
        icon={<ScanIcon className="h-4 w-4" />}
        variant="primary"
        className="mt-6 w-full rounded-[16px]"
        onClick={onBack}
      />
    </PageCanvas>
  )
}
