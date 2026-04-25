import { useMemo, useState } from 'react'
const categories = ['Semua', 'Sembako', 'Minuman', 'Snack', 'Kebutuhan Rumah'];
import ProductCard from '../components/ProductCard'
import { SearchIcon } from '../../../components/ui/icons'

export default function StokListPage({ products, onOpenDetail, onMainTabChange, onOpenCreate }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [query, setQuery] = useState('')

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, products, query])

  return (
    <div className="flex flex-1 bg-slate-50 w-full font-sans">

      {/* Main Container */}
      <div className="flex-1 overflow-x-hidden p-6 md:p-10 relative flex flex-col w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col pb-24 md:pb-10">

          {/* Header Section */}
          <div className="flex justify-between items-center mb-8 mt-4 md:mt-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Stok Barang</h1>
              <p className="mt-1 text-xs md:text-sm font-medium text-slate-500">Kelola master data inventori produk Anda.</p>
            </div>
            <button
              type="button"
              onClick={onOpenCreate}
              className="flex items-center gap-2 bg-blue-600 text-white p-3 md:px-5 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden md:block font-bold mt-0.5">Tambah Baru</span>
            </button>
          </div>

          {/* Search Bar & Filter Panel */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
            {/* Search */}
            <div className="flex items-center gap-3 w-full bg-slate-50 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 rounded-xl px-5 py-3.5 transition-all text-slate-700">
              <span className="text-slate-400">
                <SearchIcon className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari nama produk atau SKU..."
                className="w-full bg-transparent outline-none text-sm font-bold placeholder:font-medium placeholder:text-slate-400"
              />
            </div>

            {/* Filter Chips */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => {
                const active = category === activeCategory
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Product Grid Header */}
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xs font-bold text-slate-400 tracking-wider">DAFTAR PRODUK</h2>
            <p className="text-xs font-bold text-slate-400 tracking-wider">{filteredProducts.length} Items</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOpen={onOpenDetail} />
            ))}

            {filteredProducts.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/50 px-5 py-12 text-center">
                <p className="text-base font-bold text-slate-700">Produk tidak ditemukan</p>
                <p className="mt-1 text-sm text-slate-500">Coba kata kunci lain atau ubah filter kategori.</p>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  )
}


