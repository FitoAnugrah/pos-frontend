import { useState } from 'react'
import { stockReasons } from '../../../mock/stokData'
import ProductThumb from '../components/ProductThumb'
import { ArrowLeftIcon, MinusIcon, PlusIcon } from '../../../components/ui/icons'

function ChevronRightSmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function UpdateStokPage({ product, onBack, onSave }) {
  const [mode, setMode] = useState('add')
  const [amount, setAmount] = useState(12)
  const [reason, setReason] = useState(stockReasons[0])

  function handleChange(delta) {
    setAmount((current) => Math.max(current + delta, 1))
  }

  function handleAmountInput(e) {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val) && val >= 1) setAmount(val)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({ mode, amount, reason })
  }

  const projectedStock = mode === 'add'
    ? product.stock + amount
    : Math.max(product.stock - amount, 0)

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="w-full max-w-2xl mx-auto py-12 px-8">

        {/* Page Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label="Kembali ke detail produk"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Update Stok</h1>
          </div>
        </header>

        {/* Product Identity Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 mb-6">
          <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0">
            <ProductThumb kind={product.thumb} className="h-full w-full object-contain p-1" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800">{product.name}</p>
            <p className="text-sm text-slate-400 mt-0.5">SKU: {product.sku}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok Saat Ini</p>
            <p className="text-2xl font-black text-slate-800 mt-0.5">{product.stock} <span className="text-sm font-medium text-slate-400">unit</span></p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Core Logic Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-6">

            {/* Segmented Control */}
            <div className="bg-slate-100 p-1 rounded-xl flex w-full mb-8">
              <button
                type="button"
                onClick={() => setMode('add')}
                className={`py-2 flex-1 text-center text-sm font-semibold rounded-lg transition-all ${
                  mode === 'add'
                    ? 'bg-white shadow-sm text-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Tambah Stok
              </button>
              <button
                type="button"
                onClick={() => setMode('subtract')}
                className={`py-2 flex-1 text-center text-sm font-semibold rounded-lg transition-all ${
                  mode === 'subtract'
                    ? 'bg-white shadow-sm text-blue-600 font-bold'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Kurangi Stok
              </button>
            </div>

            {/* Number Stepper */}
            <div className="flex flex-col items-center mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Jumlah Perubahan</p>
              <div className="flex items-center gap-8">
                <button
                  type="button"
                  onClick={() => handleChange(-1)}
                  className="w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Kurangi jumlah"
                >
                  <MinusIcon className="h-5 w-5" />
                </button>

                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={handleAmountInput}
                  className="text-6xl font-black text-slate-800 text-center w-32 bg-transparent outline-none tabular-nums"
                />

                <button
                  type="button"
                  onClick={() => handleChange(1)}
                  className="w-12 h-12 rounded-full bg-slate-50 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  aria-label="Tambah jumlah"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Stock Comparison */}
              <div className="flex items-center gap-4 text-base font-medium text-slate-500 bg-slate-50 px-6 py-3 rounded-full mt-6">
                <span>Stok Awal: <span className="font-bold text-slate-700">{product.stock}</span></span>
                <ChevronRightSmall />
                <span>Stok Akhir: <span className="font-bold text-blue-600">{projectedStock}</span></span>
              </div>
            </div>

            {/* Reason Dropdown */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-600">Alasan Perubahan</label>
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="bg-slate-50 w-full rounded-xl px-4 py-3.5 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-semibold text-sm transition-all cursor-pointer"
              >
                {stockReasons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all"
          >
            Simpan Perubahan Stok
          </button>
        </form>

      </div>
    </div>
  )
}

