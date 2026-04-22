import { formatCurrency, getStockInfo } from '../utils'
import ProductThumb from './ProductThumb'

export default function ProductCard({ product, onOpen }) {
  const stockInfo = getStockInfo(product.stock, product.minStock)

  return (
    <button
      type="button"
      onClick={() => onOpen(product.id)}
      className="block w-full text-left bg-white p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all hover:border-blue-100 group relative cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-start gap-4 h-full">
        {/* Kiri: Ikon/Gambar Produk */}
        <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center p-2 shrink-0 border border-slate-100/50">
          <ProductThumb kind={product.thumb} src={product.photo} alt={product.name} />
        </div>

        {/* Kanan: Detail Produk */}
        <div className="flex-1 min-w-0 flex flex-col h-full">
          
          <h3 className="text-slate-800 font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors truncate mt-0.5">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
            <span className="font-bold text-slate-500 uppercase tracking-wide">{product.category}</span>
            <span>•</span>
            <span className="truncate">{product.sku}</span>
          </div>

          <div className="mt-auto flex items-end justify-between gap-2">
            <p className={`flex items-center gap-1.5 text-xs font-semibold ${stockInfo.textClassName}`}>
              <span className={`h-2 w-2 rounded-full ${stockInfo.dotClassName}`} aria-hidden="true" />
              Stok {product.stock} unit
            </p>
            <p className="text-[17px] font-bold text-slate-800 tracking-tight">{formatCurrency(product.price)}</p>
          </div>

        </div>
      </div>
    </button>
  )
}

