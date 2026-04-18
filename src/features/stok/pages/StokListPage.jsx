import { useMemo, useState } from 'react'
import { categories } from '../data'
import ProductCard from '../components/ProductCard'
import { DotsIcon, SearchIcon, StockHeaderIcon } from '../components/icons'
import BottomNav from '../../dashboard/components/BottomNav'

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
    <div className="min-h-screen bg-[#1b1b1c] px-3 py-5 text-[#17324d]">
      <div className="mx-auto max-w-[430px]">
        <section className="relative overflow-hidden rounded-[30px] border border-[#0c81dd] bg-[#f4f9fd] shadow-[0_18px_60px_rgba(7,35,65,0.32)]">
          <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top_right,rgba(146,211,255,0.35),transparent_50%),radial-gradient(circle_at_top_left,rgba(13,119,200,0.08),transparent_45%)]" />

          <div className="relative min-h-[calc(100dvh-58px)] px-4 pb-40 pt-4 sm:min-h-[920px]">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <StockHeaderIcon />
                <h1 className="text-[28px] font-black tracking-tight text-[#14324f]">Stok Barang</h1>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#6e86a0] transition hover:bg-white/70"
                  aria-label="Cari"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[#6e86a0] transition hover:bg-white/70"
                  aria-label="Menu lainnya"
                >
                  <DotsIcon />
                </button>
              </div>
            </header>

            <div className="mt-5 rounded-[18px] bg-[linear-gradient(90deg,#d8eefc_0%,#cfe9fb_100%)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <label className="flex items-center gap-3 text-[#7391ad]">
                <SearchIcon />
                <span className="sr-only">Cari nama produk atau SKU</span>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari nama produk atau SKU..."
                  className="w-full border-none bg-transparent text-[14px] font-medium text-[#36516c] outline-none placeholder:text-[#7fa0bb]"
                />
              </label>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => {
                const active = category === activeCategory

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition ${
                      active
                        ? 'bg-[#0d74c8] text-white shadow-[0_12px_24px_rgba(13,116,200,0.32)]'
                        : 'bg-[#eaf4fb] text-[#6888a6]'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            <div className="mt-5 flex items-end justify-between">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#6989a7]">Daftar Produk</p>
              <p className="text-[12px] font-medium text-[#879cb1]">{filteredProducts.length} Items</p>
            </div>

            <div className="mt-4 space-y-3.5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpen={onOpenDetail} />
              ))}

              {filteredProducts.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-[#c8d9e8] bg-white/80 px-5 py-10 text-center shadow-[0_10px_30px_rgba(111,152,193,0.08)]">
                  <p className="text-base font-bold text-[#254564]">Produk tidak ditemukan</p>
                  <p className="mt-1 text-sm text-[#7d93a8]">Coba kata kunci lain atau ubah filter kategori.</p>
                </div>
              ) : null}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-28 flex justify-center px-4">
              <button
                type="button"
                onClick={onOpenCreate}
                className="pointer-events-auto flex items-center gap-2 rounded-[18px] bg-[#0d74c8] px-5 py-4 text-sm font-bold text-white shadow-[0_16px_34px_rgba(13,116,200,0.35)] transition hover:bg-[#0866b2]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Tambah Stok Baru
              </button>
            </div>

            <BottomNav activeTab="stok" onTabChange={onMainTabChange} />
          </div>
        </section>
      </div>
    </div>
  )
}
