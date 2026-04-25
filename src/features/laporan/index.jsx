import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  UserCircle2,
  Package2,
  Loader2,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../utils/api'

/* ─── Formatters ──────────────────────────────────────────────── */
function formatRupiah(value) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

function formatShortRupiah(value) {
  if (value >= 1000000) {
    const short = (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 2)
    return `Rp ${short.replace(/\.00$/, '')}jt`
  }
  if (value >= 1000) {
    const short = (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)
    return `Rp ${short.replace(/\.0$/, '')}k`
  }
  return formatRupiah(value)
}

/* ─── Sub-components ──────────────────────────────────────────── */
function SummaryCard({ label, value, accentClassName = 'text-slate-900', children, className = '' }) {
  return (
    <article className={`w-full rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 ${className}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-bold tracking-tight ${accentClassName}`}>{value}</p>
      {children ? <div className="mt-3">{children}</div> : null}
    </article>
  )
}

function ProductItem({ product, onOpenProduct }) {
  return (
    <button
      type="button"
      onClick={() => onOpenProduct(product)}
      className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
        <Package2 className="h-6 w-6 text-blue-500" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900">{product.product_name}</h3>
        <p className="mt-1 text-sm text-slate-500">{`Terjual: ${product.sold}`}</p>
      </div>
      <p className="shrink-0 text-sm font-bold text-slate-900">{formatRupiah(product.revenue)}</p>
    </button>
  )
}

function SkeletonCard({ className = '' }) {
  return (
    <div className={`w-full rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 animate-pulse ${className}`}>
      <div className="h-4 w-32 bg-slate-200 rounded-full mb-3" />
      <div className="h-8 w-48 bg-slate-200 rounded-full" />
    </div>
  )
}

const PERIOD_LABELS = {
  hari: 'Hari Ini',
  minggu: 'Minggu Ini',
  bulan: 'Bulan Ini',
  custom: 'Periode Pilihan',
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function LaporanPenjualan() {
  const [activeFilter, setActiveFilter] = useState('hari')
  const [selectedDate, setSelectedDate] = useState('')
  const dateInputRef = useRef(null)
  const navigate = useNavigate()

  // API state
  const [summary, setSummary] = useState(null)
  const [chartData, setChartData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [loadingSummary, setLoadingSummary] = useState(true)
  const [loadingChart, setLoadingChart] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)

  const periodLabel = useMemo(() => {
    if (activeFilter === 'custom' && selectedDate) {
      return new Date(selectedDate).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      })
    }
    return PERIOD_LABELS[activeFilter] ?? 'Periode'
  }, [activeFilter, selectedDate])

  const fetchAll = useCallback(async (period) => {
    setLoadingSummary(true)
    setLoadingChart(true)

    try {
      const [summaryRes, chartRes] = await Promise.all([
        api.get(`/reports/summary?period=${period}`),
        api.get(`/reports/chart?period=${period}`),
      ])
      setSummary(summaryRes.data)
      setChartData(chartRes.data)
    } catch (err) {
      console.error('Gagal memuat laporan:', err)
    } finally {
      setLoadingSummary(false)
      setLoadingChart(false)
    }
  }, [])

  const fetchTopProducts = useCallback(async () => {
    setLoadingProducts(true)
    try {
      const res = await api.get('/reports/top-products?limit=5')
      setTopProducts(res.data)
    } catch (err) {
      console.error('Gagal memuat produk terlaris:', err)
    } finally {
      setLoadingProducts(false)
    }
  }, [])

  useEffect(() => {
    if (activeFilter !== 'custom') {
      fetchAll(activeFilter)
    }
  }, [activeFilter, fetchAll])

  useEffect(() => {
    fetchTopProducts()
  }, [fetchTopProducts])

  function handleDateChange(event) {
    setSelectedDate(event.target.value)
    setActiveFilter('custom')
    // For custom date, fall back to 'hari' period data as approximation
    // A real implementation would pass a specific date range to the API
    fetchAll('hari')
  }

  function handleOpenTopProduct(product) {
    navigate('/stok', {
      state: {
        stokTarget: 'detail',
        returnTo: '/laporan',
        product: { id: product.product_id, name: product.product_name },
      },
    })
  }

  const growthPositive = (summary?.growth ?? 0) >= 0

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-8">

        {/* Header */}
        <header className="flex items-center justify-between gap-3 rounded-3xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-slate-100 backdrop-blur sm:px-5">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
            aria-label="Kembali ke dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">Laporan Penjualan</h1>
          <button
            type="button"
            onClick={() => navigate('/profil')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 ring-2 ring-white"
            aria-label="Profil pengguna"
          >
            <UserCircle2 className="h-5 w-5" />
          </button>
        </header>

        {/* Period Filters */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {['hari', 'minggu', 'bulan'].map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => setActiveFilter(period)}
              className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeFilter === period ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/70' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {PERIOD_LABELS[period]}
            </button>
          ))}

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => dateInputRef.current?.showPicker()}
              className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                activeFilter === 'custom'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/70'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
              aria-label="Pilih tanggal"
            >
              <CalendarDays className="h-5 w-5" />
            </button>
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="absolute opacity-0 w-0 h-0 overflow-hidden"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <section className="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-12">
          {loadingSummary ? (
            <>
              <SkeletonCard className="lg:col-span-12" />
              <SkeletonCard className="lg:col-span-6" />
              <SkeletonCard className="lg:col-span-6" />
            </>
          ) : (
            <>
              <SummaryCard
                label={`Total Penjualan ${periodLabel}`}
                value={formatRupiah(summary?.total_penjualan ?? 0)}
                className="w-full lg:col-span-12"
              >
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                  growthPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {growthPositive
                    ? <ChevronUp className="h-3.5 w-3.5" />
                    : <ChevronDown className="h-3.5 w-3.5" />
                  }
                  {`${Math.abs(summary?.growth ?? 0)}% vs periode lalu`}
                </span>
              </SummaryCard>

              <SummaryCard
                label="Total Transaksi"
                value={String(summary?.total_transaksi ?? 0)}
                className="w-full lg:col-span-6"
              />
              <SummaryCard
                label="Laba Bersih"
                value={formatShortRupiah(summary?.laba_bersih ?? 0)}
                accentClassName="text-blue-600"
                className="w-full lg:col-span-6"
              />
            </>
          )}
        </section>

        {/* Sales Chart */}
        <section className="mt-6 w-full rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">{`Tren Penjualan ${periodLabel}`}</h2>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100"
              aria-label="Opsi grafik"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 h-72 w-full sm:h-80">
            {loadingChart ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
              </div>
            ) : chartData.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-400 font-medium">Belum ada data penjualan untuk periode ini.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 4, left: 4, bottom: 8 }}>
                  <defs>
                    <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip
                    cursor={{ stroke: '#93c5fd', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                    contentStyle={{
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
                    }}
                    formatter={(value) => [formatRupiah(Number(value)), 'Penjualan']}
                    labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="penjualan"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fill="url(#salesFill)"
                    activeDot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563eb' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        {/* Top Products */}
        <section className="mt-6 w-full">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Produk Terlaris</h2>
            <Link
              to="/produk-terlaris"
              className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3">
            {loadingProducts ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 animate-pulse">
                  <div className="h-14 w-14 rounded-2xl bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-36 bg-slate-200 rounded-full" />
                    <div className="h-3 w-24 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-4 w-20 bg-slate-200 rounded-full" />
                </div>
              ))
            ) : topProducts.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 text-center">
                <p className="text-sm text-slate-400 font-medium">Belum ada data produk terlaris.</p>
              </div>
            ) : (
              topProducts.map((product) => (
                <ProductItem key={product.product_id} product={product} onOpenProduct={handleOpenTopProduct} />
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
