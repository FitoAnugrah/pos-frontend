import { useEffect, useMemo, useState } from 'react'
import { productActivityHistory } from '../../../mock/stokData'
import {
  ArrowLeftIcon,
  BoxIcon,
  CalendarIcon,
  CheckIcon,
  EditIcon,
  MoneyIcon,
  SearchIcon,
} from '../../../components/ui/icons'

const filters = [
  { id: 'all', label: 'Semua' },
  { id: 'stock', label: 'Perubahan Stok' },
  { id: 'price', label: 'Update Harga' },
]

function buildActivityDate(item) {
  return new Date(`${item.date}T${item.time}:00`)
}

function buildMonthKey(dateString) {
  const date = new Date(`${dateString}T00:00:00`)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatMonthLabel(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  })
}

function formatDateLabel(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

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
    const unitMatch = item.description.match(/([+-]?\d+)\s*unit/i)
    const fallbackMatch = item.description.match(/([+-]?\d+)/)
    const match = unitMatch ?? fallbackMatch
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
    const parts = item.description.split(/(Rp[\d.,]+)/g)
    return (
      <p className="text-sm mt-0.5 text-slate-500">
        {parts.map((part, index) =>
          part.startsWith('Rp') ? (
            <span key={index} className="font-bold text-slate-700">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
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
      <div className="flex items-center gap-5 min-w-0">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.iconWrap}`}>
          {meta.icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-800 truncate">{item.productName}</h3>
          {getDescriptionNode(item)}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0 ml-6">
        <span className="text-sm font-bold text-slate-700">{item.time}</span>
        <span className="text-xs text-slate-400 group-hover:text-blue-500 transition-colors">
          Oleh: {item.actor}
        </span>
      </div>
    </article>
  )
}

function MonthPickerModal({ monthOptions, selectedMonthId, onClose, onSelect }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-4 backdrop-blur-sm md:items-center">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(219,234,254,0.95),_transparent_45%),linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] px-6 pb-6 pt-7 md:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm">
              <CalendarIcon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-500">Filter Bulan</p>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">Pilih periode aktivitas</h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Lihat semua aktivitas produk berdasarkan bulan, misalnya Agustus, Desember, atau bulan terbaru.
          </p>

          <div className="mt-6 space-y-3">
            {monthOptions.map((month) => {
              const isActive = month.id === selectedMonthId

              return (
                <button
                  key={month.id}
                  type="button"
                  onClick={() => onSelect(month.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all ${
                    isActive
                      ? 'border-blue-200 bg-blue-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-blue-100 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <p className={`text-base font-bold ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>{month.label}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {month.count} aktivitas
                      {month.latestDateLabel ? ` - aktivitas terakhir ${month.latestDateLabel}` : ''}
                    </p>
                  </div>

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      isActive ? 'border-blue-200 bg-white text-blue-600' : 'border-slate-200 text-slate-300'
                    }`}
                  >
                    {isActive ? <CheckIcon className="h-4 w-4" /> : <CalendarIcon className="h-4 w-4" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RiwayatAktivitasProdukPage({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false)

  const monthOptions = useMemo(() => {
    const monthsMap = new Map()

    ;[...productActivityHistory]
      .sort((left, right) => buildActivityDate(right) - buildActivityDate(left))
      .forEach((item) => {
        const monthId = buildMonthKey(item.date)

        if (!monthsMap.has(monthId)) {
          monthsMap.set(monthId, {
            id: monthId,
            label: formatMonthLabel(item.date),
            count: 0,
            latestDateLabel: formatDateLabel(item.date),
          })
        }

        monthsMap.get(monthId).count += 1
      })

    return Array.from(monthsMap.values())
  }, [])

  const [selectedMonthId, setSelectedMonthId] = useState(monthOptions[0]?.id ?? '')

  const selectedMonth = useMemo(
    () => monthOptions.find((month) => month.id === selectedMonthId) ?? monthOptions[0] ?? null,
    [monthOptions, selectedMonthId],
  )

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return [...productActivityHistory]
      .filter((item) => {
        const matchesFilter = activeFilter === 'all' || item.type === activeFilter
        const matchesQuery =
          normalizedQuery.length === 0 ||
          item.productName.toLowerCase().includes(normalizedQuery) ||
          item.actor.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery)
        const matchesMonth = selectedMonthId ? buildMonthKey(item.date) === selectedMonthId : true

        return matchesFilter && matchesQuery && matchesMonth
      })
      .sort((left, right) => buildActivityDate(right) - buildActivityDate(left))
  }, [activeFilter, query, selectedMonthId])

  const groupedItems = useMemo(() => {
    const groupsMap = new Map()

    filteredItems.forEach((item) => {
      if (!groupsMap.has(item.date)) {
        groupsMap.set(item.date, [])
      }

      groupsMap.get(item.date).push(item)
    })

    return Array.from(groupsMap.entries()).map(([date, items]) => ({
      date,
      label: formatDateLabel(date),
      items,
    }))
  }, [filteredItems])

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="w-full max-w-5xl mx-auto py-10 px-8">
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
            onClick={() => setIsMonthPickerOpen(true)}
            className="bg-white border border-slate-200 text-slate-600 p-3 rounded-full hover:bg-slate-100 hover:border-blue-200 hover:text-blue-600 transition-all"
            aria-label="Pilih bulan aktivitas"
          >
            <CalendarIcon className="h-5 w-5" />
          </button>
        </header>

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

        <div className="mb-6 rounded-2xl border border-blue-100 bg-[linear-gradient(135deg,_rgba(239,246,255,0.95),_rgba(255,255,255,1))] p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-500">Periode Aktif</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                {selectedMonth?.label ?? 'Belum ada aktivitas'}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Gunakan tombol kalender untuk melihat aktivitas produk pada bulan lain, termasuk Agustus dan bulan berikutnya.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Jumlah Aktivitas</p>
                <p className="text-lg font-extrabold text-slate-800">{filteredItems.length}</p>
              </div>
            </div>
          </div>
        </div>

        {groupedItems.length > 0 ? (
          <div>
            {groupedItems.map((group) => (
              <section key={group.date} className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-bold tracking-wider text-slate-500 uppercase">Aktivitas Produk</p>
                  <p className="text-sm font-medium text-slate-400">{group.label}</p>
                </div>

                {group.items.map((item) => (
                  <ActivityRow key={item.id} item={item} />
                ))}
              </section>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
              <SearchIcon className="h-7 w-7" />
            </div>
            <p className="text-base font-bold text-slate-600">Tidak ada aktivitas di periode ini</p>
            <p className="text-sm text-slate-400 mt-1">Coba pilih bulan lain atau ubah kata kunci pencarian</p>
          </div>
        )}

        {filteredItems.length > 0 && (
          <p className="text-xs text-slate-400 text-center mt-6 font-medium">
            Menampilkan {filteredItems.length} aktivitas untuk {selectedMonth?.label?.toLowerCase()}
          </p>
        )}
      </div>

      {isMonthPickerOpen ? (
        <MonthPickerModal
          monthOptions={monthOptions}
          selectedMonthId={selectedMonthId}
          onClose={() => setIsMonthPickerOpen(false)}
          onSelect={(monthId) => {
            setSelectedMonthId(monthId)
            setIsMonthPickerOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}
