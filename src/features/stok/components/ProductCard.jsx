import { formatCurrency, getStockInfo } from '../utils'
import { ChevronRightIcon } from './icons'
import ProductThumb from './ProductThumb'

export default function ProductCard({ product, onOpen }) {
  const stockInfo = getStockInfo(product.stock, product.minStock)

  return (
    <button
      type="button"
      onClick={() => onOpen(product.id)}
      className="block w-full rounded-[24px] bg-white px-3.5 py-3 text-left shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(111,152,193,0.16)]"
    >
      <div className="flex items-start gap-3">
        <ProductThumb kind={product.thumb} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1c7bc6]">{product.category}</p>
              <h3 className="truncate text-[15px] font-bold text-[#17324d]">{product.name}</h3>
            </div>

            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#c3d0db]">
              <ChevronRightIcon />
            </div>
          </div>

          <div className="mt-2 flex items-end justify-between gap-3">
            <div className="space-y-1">
              <p className={`flex items-center gap-2 text-[13px] font-medium ${stockInfo.textClassName}`}>
                <span className={`h-2.5 w-2.5 rounded-full ${stockInfo.dotClassName}`} aria-hidden="true" />
                {`Stok: ${product.stock} unit`}
              </p>
              <p className="text-[10px] font-medium tracking-[0.08em] text-[#9cb0c1]">{product.sku}</p>
            </div>

            <p className="text-[18px] font-black tracking-tight text-[#142c45]">{formatCurrency(product.price)}</p>
          </div>
        </div>
      </div>
    </button>
  )
}
