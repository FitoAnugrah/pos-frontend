import { useState } from 'react'
import { stockReasons } from '../data'
import ActionButton from '../components/ActionButton'
import PageCanvas from '../components/PageCanvas'
import ProductThumb from '../components/ProductThumb'
import { ArrowLeftIcon, CheckIcon, MinusIcon, PlusIcon, RefreshIcon } from '../components/icons'

export default function UpdateStokPage({ product, onBack, onSave }) {
  const [mode, setMode] = useState('add')
  const [amount, setAmount] = useState(12)
  const [reason, setReason] = useState(stockReasons[0])

  function handleChange(delta) {
    setAmount((current) => Math.max(current + delta, 1))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({ mode, amount, reason })
  }

  const projectedStock = mode === 'add' ? product.stock + amount : Math.max(product.stock - amount, 0)

  return (
    <PageCanvas caption="Update Stok - POS Ai">
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#0d74c8]"
          aria-label="Kembali ke detail produk"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="text-[17px] font-semibold">Update Stok</span>
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#0d74c8] transition hover:bg-white/80"
          aria-label="Refresh stok"
        >
          <RefreshIcon className="h-4 w-4" />
        </button>
      </header>

      <div className="mt-5 rounded-[20px] bg-white px-4 py-3 shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa]">
        <div className="flex items-center gap-3">
          <ProductThumb kind={product.thumb} className="h-12 w-12 rounded-[16px]" />
          <div>
            <p className="text-[15px] font-bold text-[#16324d]">{product.name}</p>
            <p className="text-[12px] font-medium text-[#6d8ba7]">SKU: {product.sku}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 rounded-[16px] bg-[linear-gradient(135deg,#0e69b6_0%,#1a86da_100%)] px-5 py-4 text-white shadow-[0_16px_30px_rgba(13,116,200,0.2)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">Stok Saat Ini</p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-[22px] font-black tracking-tight">{product.stock}</span>
            <span className="pb-1 text-[14px] text-white/80">unit</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 rounded-[16px] bg-[#e4f2fd] p-1.5">
          <button
            type="button"
            onClick={() => setMode('add')}
            className={`rounded-[12px] px-4 py-3 text-[13px] font-semibold transition ${
              mode === 'add' ? 'bg-white text-[#0d74c8] shadow-[0_8px_20px_rgba(111,152,193,0.12)]' : 'text-[#6684a2]'
            }`}
          >
            Tambah Stok
          </button>
          <button
            type="button"
            onClick={() => setMode('subtract')}
            className={`rounded-[12px] px-4 py-3 text-[13px] font-semibold transition ${
              mode === 'subtract' ? 'bg-white text-[#0d74c8] shadow-[0_8px_20px_rgba(111,152,193,0.12)]' : 'text-[#6684a2]'
            }`}
          >
            Kurangi Stok
          </button>
        </div>

        <div className="mt-4 rounded-[20px] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa]">
          <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6d8ba7]">Jumlah Perubahan</p>
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleChange(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce9f7] text-[#6f8da9] transition hover:bg-[#f3f8fd]"
              aria-label="Kurangi jumlah"
            >
              <MinusIcon />
            </button>

            <div className="text-center">
              <p className="text-[38px] font-black leading-none tracking-tight text-[#16324d]">{amount}</p>
              <p className="mt-2 text-[12px] font-medium text-[#6d8ba7]">
                Stok akhir: <span className="font-bold text-[#0d74c8]">{projectedStock} unit</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleChange(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b9d7f5] text-[#0d74c8] transition hover:bg-[#eef7ff]"
              aria-label="Tambah jumlah"
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block">
            <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6d8ba7]">Alasan Perubahan</span>
            <div className="rounded-[14px] bg-[#cfe9fb] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              <select
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="w-full bg-transparent text-[14px] font-semibold text-[#1a3a57] outline-none"
              >
                {stockReasons.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>

        <ActionButton
          type="submit"
          label="Simpan Perubahan Stok"
          icon={<CheckIcon className="h-4 w-4" />}
          className="mt-6 w-full"
        />

        <div className="mt-4 h-3 rounded-sm bg-[#cfe9fb]" />
      </form>
    </PageCanvas>
  )
}
