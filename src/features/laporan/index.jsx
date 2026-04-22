import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  ChevronUp,
  MoreHorizontal,
  UserCircle2,
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
import { reportDataByFilter, topProducts } from './text'

function formatRupiah(value) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

function formatShortRupiah(value) {
  if (value >= 1000000) {
    const shortValue = (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 2)
    return `Rp ${shortValue.replace(/\.00$/, '')}jt`
  }

  if (value >= 1000) {
    const shortValue = (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)
    return `Rp ${shortValue.replace(/\.0$/, '')}k`
  }

  return formatRupiah(value)
}

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
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${product.bgClassName}`}>
        {product.icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{`Terjual: ${product.sold}`}</p>
      </div>
      <p className="shrink-0 text-sm font-bold text-slate-900">{formatRupiah(product.revenue)}</p>
    </button>
  )
}

export default function LaporanPenjualan() {
  const [activeFilter, setActiveFilter] = useState('hari')
  const [selectedDate, setSelectedDate] = useState('')
  const dateInputRef = useRef(null)
  const navigate = useNavigate()

  const currentReport = useMemo(() => reportDataByFilter[activeFilter], [activeFilter])

  const periodLabel = useMemo(() => {
    if (activeFilter === 'custom' && selectedDate) {
      return new Date(selectedDate).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      })
    }

    return currentReport.label
  }, [activeFilter, currentReport.label, selectedDate])

  function handleDateChange(event) {
    setSelectedDate(event.target.value)
    setActiveFilter('custom')
  }

  function buildStokPayload(product) {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      sold: product.sold,
      trend: product.trend,
      revenue: product.revenue,
      thumb: product.thumb,
    }
  }

  function handleOpenTopProduct(product) {
    navigate('/stok', {
      state: {
        stokTarget: 'detail',
        returnTo: '/laporan',
        product: buildStokPayload(product),
      },
    })
  }

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
        <header className="flex items-center justify-between gap-3 rounded-3xl bg-white/80 px-4 py-3 shadow-sm ring-1 ring-slate-100 backdrop-blur sm:px-5">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
            aria-label="Kembali ke dashboard"
          >
            <ArrowLeft className="h-5 w-5 cursor-pointer hover:text-blue-600" />
          </button>

          <h1 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">Laporan Penjualan</h1>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 ring-2 ring-white"
            aria-label="Profil pengguna"
          >
            <UserCircle2 className="h-5 w-5" />
          </button>
        </header>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActiveFilter('hari')}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeFilter === 'hari' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/70' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Hari Ini
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('minggu')}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeFilter === 'minggu' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/70' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Minggu Ini
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('bulan')}
            className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition ${
              activeFilter === 'bulan' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/70' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Bulan Ini
          </button>

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

        <section className="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-12">
          <SummaryCard
            label={`Total Penjualan ${periodLabel}`}
            value={formatRupiah(currentReport.totalPenjualan)}
            className="w-full lg:col-span-12"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
              <ChevronUp className="h-3.5 w-3.5" />
              {`${currentReport.growth}%`}
            </span>
          </SummaryCard>

          <SummaryCard
            label="Total Transaksi"
            value={String(currentReport.totalTransaksi)}
            className="w-full lg:col-span-6"
          />
          <SummaryCard
            label="Laba Bersih"
            value={formatShortRupiah(currentReport.labaBersih)}
            accentClassName="text-blue-600"
            className="w-full lg:col-span-6"
          />
        </section>

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
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentReport.chart} margin={{ top: 10, right: 4, left: 4, bottom: 8 }}>
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
          </div>
        </section>

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
            {topProducts.map((product) => (
              <ProductItem key={product.id} product={product} onOpenProduct={handleOpenTopProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
