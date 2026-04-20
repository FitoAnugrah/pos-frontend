import { useState } from 'react'
import { ArrowLeft, Barcode, Delete, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const keypadRows = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

export default function ManualEntry() {
  const navigate = useNavigate()
  const [barcode, setBarcode] = useState('')

  function handleAppendDigit(value) {
    setBarcode((current) => `${current}${value}`)
  }

  function handleBackspace() {
    setBarcode((current) => current.slice(0, -1))
  }

  function handleClear() {
    setBarcode('')
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 text-slate-900 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-[430px] flex-col">
        <header className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-900 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-bold tracking-tight">Manual Entry</span>
          </button>

          <button
            type="button"
            className="rounded-full p-1 text-blue-600 transition hover:bg-blue-50"
            aria-label="Bantuan input manual"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </header>

        <p className="mx-auto mt-10 max-w-[24ch] text-center text-sm leading-6 text-slate-500">
          Masukkan kode barcode atau SKU produk secara manual
        </p>

        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-600">
            Barcode / SKU
          </p>

          <div className="mt-4 flex items-end gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center text-slate-400">
              <Barcode className="h-6 w-6" />
            </div>

            <div className="min-h-[58px] flex-1 border-b-2 border-blue-500 pb-2">
              {barcode ? (
                <p className="break-all text-[30px] font-semibold leading-none tracking-[0.04em] text-slate-900">
                  {barcode}
                </p>
              ) : (
                <p className="text-[31px] leading-none tracking-tight text-slate-300">
                  <span className="block text-[15px] font-medium text-slate-300">Contoh:</span>
                  899123456789
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
          {keypadRows.flat().map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleAppendDigit(digit)}
              className="rounded-2xl bg-sky-50 py-5 text-2xl font-bold text-slate-900 shadow-sm transition active:scale-[0.97]"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClear}
            className="rounded-2xl bg-orange-50 py-5 text-sm font-bold uppercase tracking-wide text-orange-700 shadow-sm transition active:scale-[0.97]"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handleAppendDigit('0')}
            className="rounded-2xl bg-sky-50 py-5 text-2xl font-bold text-slate-900 shadow-sm transition active:scale-[0.97]"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            className="flex items-center justify-center rounded-2xl bg-sky-50 py-5 text-slate-500 shadow-sm transition active:scale-[0.97]"
            aria-label="Hapus satu digit"
          >
            <Delete className="h-6 w-6" />
          </button>
        </section>

        <div className="mt-auto pt-8">
          <div className="sticky bottom-0 bg-gradient-to-t from-slate-50 via-slate-50 pt-4">
            <button
              type="button"
              className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Masukkan Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
