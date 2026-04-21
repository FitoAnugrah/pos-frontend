import { useMemo, useState } from 'react'
import { productActivityHistory } from '../data'
import {
  ArrowLeftIcon,
  BoxIcon,
  CalendarIcon,
  EditIcon,
  MoneyIcon,
  SearchIcon,
} from '../../../components/ui/icons'

const filters = [
  { id: 'all', label: 'Semua' },
  { id: 'stock', label: 'Perubahan Stok' },
  { id: 'price', label: 'Update Harga' },
]

function getActivityMeta(type) {
  switch (type) {
    case 'stock':
      return {
        icon: <BoxIcon className="h-5 w-5" />,
        iconWrap: 'bg-blue-50 text-blue-600',
      }
    case 'price':
      return {
        icon: <MoneyIcon className="h-5 w-5" />,
        iconWrap: 'bg-violet-50 text-violet-600',
      }
    default:
      return {
        icon: <EditIcon className="h-5 w-5" />,
        iconWrap: 'bg-slate-100 text-slate-600',
      }
  }
}

function getDescriptionNode(item) {
  if (item.type === 'stock') {
    // Detect positive/negative pattern like "+50 unit" or "-12 unit"
    const match = item.description.match(/([+-]?\d+)\s*unit/i)
    const delta = match ? parseInt(match[1], 10) : null
    const isPositive = delta !== null && delta > 0

    return (
      <p className="text-sm mt-0.5">
        <span className="text-slate-500">{item.description.replace(match?.[0] ?? '', '').trim()}</span>
        {match && (
          <span className={`ml-1 font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {match[0]}
          </span>
        )}
      </p>
    )
  }

  if (item.type === 'price') {
    // Bold any currency-like strings (Rp...)
    const parts = item.description.split(/(Rp[\d.,]+)/g)
    return (
      <p className="text-sm mt-0.5 text-slate-500">
        {parts.map((part, i) =>
          part.startsWith('Rp') ? (
            <span key={i} className="font-bold text-slate-700">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    )
  }

  return <p className="text-sm mt-0.5 text-slate-500">{item.description}</p>
}

function ActivityRow({ item }) {
  const meta = getActivityMeta(item.type)

  return (
    <article className="bg-white p-5 rounded-xl border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all mb-3 flex items-center justify-between group cursor-pointer">
      {/* Left — Icon + Details */}
      <div className="flex items-center gap-5 min-w-0">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.iconWrap}`}>
          {meta.icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-800 truncate">{item.productName}</h3>
          {getDescriptionNode(item)}
        </div>
      </div>

      {/* Right — User & Time */}
      <div className="flex flex-col items-end gap-1 shrink-0 ml-6">
        <span className="text-sm font-bold text-slate-700">{item.time}</span>
        <span className="text-xs text-slate-400 group-hover:text-blue-500 transition-colors">
          Oleh: {item.actor}
        </span>
      </div>
    </article>
  )
}

export default function RiwayatAktivitasProdukPage({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')

  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

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
    <div className="bg-slate-50 min-h-screen">
      <div className="w-full max-w-5xl mx-auto py-10 px-8">

        {/* Page Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label="Kembali"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Riwayat Aktivitas Produk</h1>
          </div>

          <button
            type="button"
            className="bg-white border border-slate-200 text-slate-600 p-3 rounded-full hover:bg-slate-100 transition-all"
            aria-label="Filter tanggal"
          >
            <CalendarIcon className="h-5 w-5" />
          </button>
        </header>

        {/* Search & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <label className="flex items-center gap-3 flex-1 w-full bg-slate-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <SearchIcon className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="sr-only">Cari aktivitas produk</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari nama produk, aksi, atau admin..."
              className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300 placeholder:font-normal"
            />
          </label>

          {/* Filter Chips */}
          <div className="flex gap-2 shrink-0">
            {filters.map((filter) => {
              const active = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-bold tracking-wider text-slate-500 uppercase">Aktivitas Terbaru</p>
          <p className="text-sm font-medium text-slate-400">{today}</p>
        </div>

        {/* History Log Rows */}
        {filteredItems.length > 0 ? (
          <div>
            {filteredItems.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
              <SearchIcon className="h-7 w-7" />
            </div>
            <p className="text-base font-bold text-slate-600">Tidak ada hasil ditemukan</p>
            <p className="text-sm text-slate-400 mt-1">Coba ubah kata kunci atau filter pencarian</p>
          </div>
        )}

        {/* Footer Count */}
        {filteredItems.length > 0 && (
          <p className="text-xs text-slate-400 text-center mt-6 font-medium">
            Menampilkan {filteredItems.length} aktivitas
          </p>
        )}

      </div>
    </div>
  )
}
