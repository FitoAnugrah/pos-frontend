import { ArrowLeftIcon, BoxIcon, CheckIcon, ChartIcon, DotsIcon, EditIcon, MoneyIcon, RefreshIcon, TagIcon } from '../components/icons'
import ProductThumb from '../components/ProductThumb'
import { calculateMargin, calculateMarginYield, formatCurrency, getStockInfo } from '../utils'

function toneClasses(tone) {
  if (tone === 'alert') {
    return {
      statusCard: 'bg-red-50 border border-red-100',
      statusIcon: 'bg-red-50 text-red-600 shadow-sm border border-red-100',
      statusText: 'text-red-700',
      stockCard: 'bg-white border border-slate-100 shadow-sm',
    }
  }

  return {
    statusCard: 'bg-emerald-50 border border-emerald-100',
    statusIcon: 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100',
    statusText: 'text-emerald-700',
    stockCard: 'bg-white border border-slate-100 shadow-sm',
  }
}

export default function DetailProdukPage({ product, onBack, onOpenEdit, onOpenStockUpdate }) {
  const stockInfo = getStockInfo(product.stock, product.minStock)
  const tones = toneClasses(stockInfo.tone)
  const margin = calculateMargin(product.price, product.capitalPrice)
  const marginYield = calculateMarginYield(product.price, product.capitalPrice)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 w-full font-sans">
      <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="w-full max-w-6xl mx-auto flex gap-4 items-center mb-10">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-200/50"
            aria-label="Kembali ke daftar produk"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm font-semibold">Kembali</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto pb-12">
          
          {/* Left Column: Media */}
          <div className="lg:col-span-5 h-fit">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center">
              <div className="relative w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-inner">
                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-full bg-slate-700/50 border border-slate-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    {product.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 h-1/2 w-4/5 rounded-full blur-3xl opacity-50" style={{ backgroundColor: product.accent.glow }} />
                <ProductThumb kind={product.thumb} large accent={product.accent} className="h-48 w-48 rounded-[24px] z-10 relative shadow-2xl" />
              </div>
            </div>

            {/* Action Buttons below image for quick access */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={onOpenStockUpdate}
                className="flex flex-1 items-center justify-center gap-2 py-4 rounded-xl border border-slate-200 text-slate-700 font-bold bg-white shadow-sm hover:bg-slate-50 transition-all active:scale-95"
              >
                <RefreshIcon className="h-5 w-5" />
                Update Stok
              </button>
              <button
                onClick={onOpenEdit}
                className="flex flex-1 items-center justify-center gap-2 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95"
              >
                <EditIcon className="h-5 w-5 text-white" />
                Edit Produk
              </button>
            </div>
          </div>

          {/* Right Column: Data & Financial */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Header Info */}
            <div className="mb-2">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-blue-100 text-blue-700 px-2.5 py-1 text-xs font-bold uppercase tracking-wide">
                  {product.category}
                </span>
                <span className="rounded-md bg-white border border-slate-200 shadow-sm px-2.5 py-1 text-xs font-bold tracking-wide text-slate-500">
                  SKU: {product.sku}
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-800 mt-4 mb-2">{product.name}</h1>
            </div>

            {/* Status & Stok Card */}
            <div className="grid grid-cols-2 gap-5 mt-4">
              {/* Card Stok */}
              <div className={`p-6 rounded-2xl ${tones.stockCard}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
                    <BoxIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Stok Saat Ini</p>
                </div>
                <div className="mt-4 flex items-end gap-1.5">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-800">{product.stock}</span>
                  <span className="pb-1 text-sm font-semibold text-slate-500">unit</span>
                </div>
              </div>

              {/* Card Status */}
              <div className={`p-6 rounded-2xl ${tones.statusCard}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tones.statusIcon}`}>
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Status Stok</p>
                </div>
                <p className={`mt-4 text-xl font-bold tracking-tight ${tones.statusText}`}>{stockInfo.status}</p>
              </div>
            </div>

            {/* Financial Card */}
            <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm mt-2">
              <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-6 uppercase">Harga & Margin Profit</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                      <MoneyIcon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-500">Harga Modal</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800 tracking-tight">{formatCurrency(product.capitalPrice)}</span>
                </div>

                <div className="flex justify-between items-center border-b border-slate-50 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500 border border-blue-100">
                      <TagIcon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-500">Harga Jual</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600 tracking-tight">{formatCurrency(product.price)}</span>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 border border-slate-100 p-5 rounded-xl">
                <p className="text-sm font-semibold text-slate-500 mb-2">Keuntungan Kasar per Unit</p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-600 text-3xl font-extrabold tracking-tight">{formatCurrency(margin)}</span>
                  <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                    {marginYield} Margin
                  </span>
                </div>
              </div>
            </div>

            {/* Statistik Penjualan */}
            <div className="bg-blue-50/50 border border-blue-100/50 p-7 rounded-2xl shadow-sm mt-2">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-800/60">Statistik Penjualan</p>
                <span className="bg-white border border-blue-100 shadow-sm px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  Bulan Ini
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 p-5 rounded-xl border border-blue-100/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Unit Terjual</p>
                  <p className="text-2xl font-bold tracking-tight text-slate-800">{product.unitsPerSale}</p>
                  <p className="mt-1 text-xs font-semibold text-blue-500">{`+${product.lastMonthGrowth}% ${product.lastMonthLabel}`}</p>
                </div>
                <div className="bg-white/80 p-5 rounded-xl border border-blue-100/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Pendapatan</p>
                  <p className="text-2xl font-bold tracking-tight text-slate-800">{product.revenue}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-blue-500">
                    <ChartIcon className="h-4 w-4" />
                    {product.revenueTarget}
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

