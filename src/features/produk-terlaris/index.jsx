import {
  ArrowLeft,
  ChevronDown,
  ClipboardCheck,
  ListFilter,
  Loader2,
  Package2,
  Search,
  TrendingUp,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../utils/api'

const CATEGORIES = ['Semua', 'Sembako', 'Minuman', 'Snack', 'Kebutuhan Rumah']

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}

export default function ProdukTerlaris() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTopProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get('/reports/top-products?limit=20')
      setProducts(res.data)
    } catch (err) {
      console.error('Gagal memuat produk terlaris:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTopProducts()
  }, [fetchTopProducts])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    return products.filter((product) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        product.product_name.toLowerCase().includes(normalizedQuery)
      return matchesSearch
    })
  }, [searchQuery, products])

  const totalRevenue = useMemo(
    () => filteredProducts.reduce((acc, p) => acc + p.revenue, 0),
    [filteredProducts]
  )

  function handleBack() {
    navigate(-1)
  }

  function handleCategorySelect(category) {
    setSelectedCategory(category)
    setIsFilterOpen(false)
  }

  function openStokPage(product) {
    navigate('/stok', {
      state: {
        stokTarget: 'detail',
        returnTo: location.pathname,
        product: { id: product.product_id, name: product.product_name },
      },
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-700 transition hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-lg font-bold sm:text-xl">Top Selling Products</span>
          </button>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            POS A&apos;i
          </span>
        </header>

        {/* Search & Filter */}
        <section className="mt-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="relative mt-3">
            <button
              type="button"
              onClick={() => setIsFilterOpen((current) => !current)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-100"
            >
              <ListFilter className="h-4 w-4" />
              {`Kategori: ${selectedCategory}`}
              <ChevronDown
                className={`h-4 w-4 transition ${isFilterOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isFilterOpen ? (
              <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                      selectedCategory === category
                        ? 'bg-blue-50 font-semibold text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{category}</span>
                    {selectedCategory === category ? (
                      <span className="text-xs font-semibold text-blue-600">Aktif</span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Summary Cards */}
        <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <article className="rounded-3xl bg-blue-600 p-5 text-white shadow-sm transition-all duration-300 lg:col-span-7">
            <p className="text-sm text-blue-100">Total Revenue (dari data tampil)</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight transition-all duration-300 sm:text-4xl">
              {loading ? '...' : formatRupiah(totalRevenue)}
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-medium text-white">
              <TrendingUp className="h-4 w-4" />
              {products.length} produk terlaris
            </div>
          </article>

          <article className="flex items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-5">
            <div>
              <h3 className="text-base font-semibold text-sky-900">Inventory Health</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Data penjualan langsung dari database produksi.{' '}
                <span className="font-semibold text-blue-600">Real-time</span>{' '}
                dan selalu diperbarui.
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-blue-600">
              <ClipboardCheck className="h-6 w-6" />
            </div>
          </article>
        </section>

        {/* Product List */}
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Product Performance
            </p>
            <p className="text-xs text-slate-400">
              {loading ? 'Memuat...' : `${filteredProducts.length} produk`}
            </p>
          </div>

          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 animate-pulse">
                  <div className="h-14 w-14 rounded-2xl bg-slate-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 bg-slate-200 rounded-full" />
                    <div className="h-3 w-24 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-4 w-20 bg-slate-200 rounded-full" />
                </div>
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-slate-500 shadow-sm ring-1 ring-slate-100">
                Tidak ada produk yang cocok dengan pencarian.
              </div>
            ) : (
              filteredProducts.map((product, idx) => (
                <article
                  key={product.product_id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openStokPage(product)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openStokPage(product)
                    }
                  }}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Rank badge */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 font-black text-xl">
                    #{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                      {product.product_name}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-slate-500">{`Terjual: ${formatNumber(product.sold)}`}</span>
                      <Package2 className="h-3 w-3 text-slate-400" />
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs text-slate-400">Revenue</p>
                    <p className="mt-1 text-sm font-bold text-blue-600 sm:text-base">
                      {formatRupiah(product.revenue)}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
