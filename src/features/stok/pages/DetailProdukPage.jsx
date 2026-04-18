import ActionButton from '../components/ActionButton'
import PageCanvas from '../components/PageCanvas'
import ProductThumb from '../components/ProductThumb'
import {
  ArrowLeftIcon,
  BoxIcon,
  CheckIcon,
  ChartIcon,
  DotsIcon,
  EditIcon,
  MoneyIcon,
  RefreshIcon,
  TagIcon,
} from '../components/icons'
import { calculateMargin, calculateMarginYield, formatCurrency, getStockInfo } from '../utils'

function toneClasses(tone) {
  if (tone === 'alert') {
    return {
      statusCard: 'bg-[linear-gradient(135deg,#fff1f2_0%,#ffe0e3_100%)]',
      statusIcon: 'bg-[#ef4444] text-white',
      statusText: 'text-[#c72635]',
      stockCard: 'bg-[linear-gradient(135deg,#f8fbff_0%,#e8f1fb_100%)]',
    }
  }

  return {
    statusCard: 'bg-[linear-gradient(135deg,#edf8f0_0%,#dff1e6_100%)]',
    statusIcon: 'bg-[#0b9b55] text-white',
    statusText: 'text-[#0d8f4f]',
    stockCard: 'bg-[linear-gradient(135deg,#e5f5ff_0%,#d5eafb_100%)]',
  }
}

function DetailStatCard({ icon, label, value, sublabel, className = '' }) {
  return (
    <div className={`rounded-[20px] px-4 py-4 ${className}`}>
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#0d74c8]">
        {icon}
      </div>
      <p className="text-[11px] font-medium text-[#6888a6]">{label}</p>
      <div className="mt-1 flex items-end gap-1.5">
        <span className="text-[18px] font-black tracking-tight text-[#16324d]">{value}</span>
        {sublabel ? <span className="pb-0.5 text-[12px] text-[#6888a6]">{sublabel}</span> : null}
      </div>
    </div>
  )
}

function PriceRow({ icon, label, value, valueClassName = 'text-[#16324d]' }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf3fa] text-[#5f83a4]">
          {icon}
        </div>
        <span className="text-[13px] font-medium text-[#537291]">{label}</span>
      </div>
      <span className={`text-[18px] font-black tracking-tight ${valueClassName}`}>{value}</span>
    </div>
  )
}

export default function DetailProdukPage({ product, onBack, onOpenEdit, onOpenStockUpdate }) {
  const stockInfo = getStockInfo(product.stock, product.minStock)
  const tones = toneClasses(stockInfo.tone)
  const margin = calculateMargin(product.price, product.capitalPrice)
  const marginYield = calculateMarginYield(product.price, product.capitalPrice)

  return (
    <PageCanvas caption="Detail Produk (Tanpa Navbar) - POS Ai">
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#16324d]"
          aria-label="Kembali ke daftar produk"
        >
          <ArrowLeftIcon className="h-5 w-5 text-[#0d74c8]" />
          <span className="text-[17px] font-semibold">{product.title}</span>
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#0d74c8] transition hover:bg-white/80"
          aria-label="Menu detail"
        >
          <DotsIcon />
        </button>
      </header>

      <div className="mt-6 rounded-[22px] bg-[linear-gradient(180deg,#572e74_0%,#4a2867_100%)] px-4 pb-5 pt-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="flex justify-end">
          <span className="rounded-full bg-[#dfeaf8] px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#355f8e]">
            {product.badge}
          </span>
        </div>

        <div className="relative mt-1 flex justify-center">
          <div className="absolute bottom-4 h-5 w-48 rounded-full blur-md" style={{ backgroundColor: product.accent.glow }} />
          <ProductThumb kind={product.thumb} large accent={product.accent} className="h-[210px] w-[210px] rounded-[28px]" />
        </div>
      </div>

      <div className="mt-4 rounded-[22px] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#6f8daa]">{product.category}</p>
          <span className="rounded-full bg-[#eaf5ff] px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#487db0]">
            SKU : {product.sku}
          </span>
        </div>
        <h1 className="mt-2 text-[18px] font-black tracking-tight text-[#16324d]">{product.name}</h1>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <DetailStatCard
          icon={<BoxIcon className="h-4 w-4" />}
          label="Stok Saat Ini"
          value={String(product.stock)}
          sublabel="unit"
          className={tones.stockCard}
        />

        <div className={`rounded-[20px] px-4 py-4 ${tones.statusCard}`}>
          <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full ${tones.statusIcon}`}>
            <CheckIcon />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6888a6]">Status</p>
          <p className={`mt-1 text-[18px] font-black tracking-tight ${tones.statusText}`}>{stockInfo.status}</p>
        </div>
      </div>

      <div className="mt-5 rounded-[22px] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa]">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#16324d]">Harga & Margin</p>

        <div className="mt-4 space-y-4">
          <PriceRow icon={<MoneyIcon className="h-4 w-4" />} label="Harga Modal" value={formatCurrency(product.capitalPrice)} />
          <PriceRow
            icon={<TagIcon className="h-4 w-4" />}
            label="Harga Jual"
            value={formatCurrency(product.price)}
            valueClassName="text-[#0d74c8]"
          />
        </div>

        <div className="mt-4 border-t border-[#edf3f7] pt-4">
          <div className="flex items-end justify-between gap-3">
            <p className="text-[13px] font-bold text-[#16324d]">Margin Keuntungan</p>
            <div className="text-right">
              <p className="text-[18px] font-black tracking-tight text-[#1ca164]">{formatCurrency(margin)}</p>
              <p className="text-[11px] font-semibold text-[#45b07b]">{marginYield} Yield</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[22px] bg-[linear-gradient(135deg,#eaf5ff_0%,#d9eefb_100%)] px-4 py-4 shadow-[0_10px_30px_rgba(111,152,193,0.1)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#16324d]">Statistik Penjualan</p>
          <span className="rounded-full bg-[#f2f8ff] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-[#4d84b6]">
            Bulan Ini
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6888a6]">Unit Terjual</p>
            <p className="mt-1 text-[18px] font-black tracking-tight text-[#16324d]">{product.unitsPerSale}</p>
            <p className="mt-1 text-[11px] font-semibold text-[#5d90b8]">{`+${product.lastMonthGrowth}% ${product.lastMonthLabel}`}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6888a6]">Pendapatan</p>
            <p className="mt-1 text-[18px] font-black tracking-tight text-[#16324d]">{product.revenue}</p>
            <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#5d90b8]">
              <ChartIcon className="h-3.5 w-3.5" />
              {product.revenueTarget}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <ActionButton
          label="Update Stok"
          icon={<RefreshIcon className="h-4 w-4" />}
          variant="secondary"
          className="flex-1"
          onClick={onOpenStockUpdate}
        />
        <ActionButton
          label="Edit Produk"
          icon={<EditIcon className="h-4 w-4" />}
          className="flex-1"
          onClick={onOpenEdit}
        />
      </div>
    </PageCanvas>
  )
}
