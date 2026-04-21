import { ArrowLeftIcon, ChartIcon, CheckIcon, PhotoIcon, ScanIcon } from '../../../components/ui/icons'
import { calculateMargin, calculateMarginYield, formatCurrency } from '../utils'

// Refactored InputField
function InputField({ label, value, onChange, placeholder, type = 'text', prefix, suffixButton }) {
  return (
    <label className="block w-full">
      <span className="mb-2 block text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-transparent px-4 py-3.5 transition-all text-slate-800 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none w-full shadow-sm">
        {prefix ? <span className="text-sm font-bold text-slate-500">{prefix}</span> : null}
        <input
          type={type}
          min={type === 'number' ? '0' : undefined}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400 placeholder:font-medium"
        />
        {suffixButton ? suffixButton : null}
      </div>
    </label>
  )
}

const categoryOptions = ['Sembako', 'Minuman', 'Snack']

export default function TambahStokBaruPage({ form, onBack, onFieldChange, onOpenScan, onSave }) {
  const margin = calculateMargin(Number(form.price), Number(form.capitalPrice))
  const marginYield = calculateMarginYield(Number(form.price), Number(form.capitalPrice))

  function handleSubmit(event) {
    event?.preventDefault()
    onSave({
      ...form,
      name: form.name.trim(),
      category: form.category || 'Sembako',
      sku: form.sku.trim(),
      stock: Math.max(Number(form.stock), 0),
      minStock: Math.max(Number(form.minStock), 0),
      capitalPrice: Math.max(Number(form.capitalPrice), 0),
      price: Math.max(Number(form.price), 0),
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 w-full font-sans">
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 relative w-full">
        <div className="w-full max-w-3xl mx-auto flex flex-col pb-12">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10 mt-4 md:mt-0">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-lg hover:bg-slate-200/50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tambah Stok Baru
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white rounded-xl py-2.5 px-6 font-semibold shadow-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
            >
              <CheckIcon className="h-4 w-4" />
              Save Stok
            </button>
          </div>

          <h1 className="text-3xl font-semibold text-slate-800 mb-8 hidden md:block">Tambah Stok Baru</h1>

          {/* Restrukturisasi Zona Media */}
          <div className="flex flex-col items-center mb-8">
            <button
              type="button"
              className="flex flex-col items-center justify-center bg-white border-4 border-slate-50 shadow-sm w-32 h-32 rounded-[2rem] hover:bg-slate-50 transition-colors group relative"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <PhotoIcon className="h-5 w-5" />
              </div>
            </button>
            <p className="mt-4 text-[13px] font-bold text-slate-500 hidden md:block">Upload Foto Produk (Maks 5MB)</p>
          </div>

          {/* Form */}
          <form className="bg-white rounded-2xl p-8 shadow-sm mb-6 space-y-8 border border-slate-100" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Informasi Dasar</h2>
              <InputField
                label="Nama Produk"
                value={form.name}
                onChange={onFieldChange('name')}
                placeholder="Contoh: Kopi Arabica 250g"
              />

              <label className="block w-full">
                <span className="mb-2 block text-xs font-bold text-slate-600 uppercase tracking-wide">Kategori</span>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-transparent px-4 py-3.5 transition-all text-slate-800 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none w-full shadow-sm">
                  <select
                    value={form.category}
                    onChange={onFieldChange('category')}
                    className={`w-full bg-transparent text-sm font-semibold outline-none ${
                      form.category ? 'text-slate-800' : 'text-slate-400 font-medium'
                    }`}
                  >
                    <option value="">Pilih Kategori</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <InputField
                label="Kode SKU (Barcode)"
                value={form.sku}
                onChange={onFieldChange('sku')}
                placeholder="AUTO-12345"
                suffixButton={
                  <button
                    type="button"
                    onClick={onOpenScan}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition hover:bg-blue-200"
                    aria-label="Scan kode SKU"
                  >
                    <ScanIcon className="h-4 w-4" />
                  </button>
                }
              />
            </div>

            <div className="pt-4 space-y-6">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Finansial & Modal</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <InputField
                  label="Harga Modal"
                  prefix="Rp"
                  value={form.capitalPrice}
                  onChange={onFieldChange('capitalPrice')}
                  type="number"
                />
                <InputField
                  label="Harga Jual"
                  prefix="Rp"
                  value={form.price}
                  onChange={onFieldChange('price')}
                  type="number"
                />
              </div>

              {/* Estimasi Omset / Margin */}
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 mt-2 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-600 mb-1">Estimasi Margin Laba</p>
                  <p className="text-[17px] font-bold text-emerald-900 tracking-tight">{formatCurrency(margin)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-emerald-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[70%]" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700">{marginYield}</span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm text-emerald-500 border border-emerald-100">
                  <ChartIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-6">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Manajemen Stok Aktual</h2>
              <div className="flex gap-6 justify-between items-end">
                <InputField
                  label="Stok Awal"
                  value={form.stock}
                  onChange={onFieldChange('stock')}
                  type="number"
                />
                <InputField
                  label="Minimal Stok"
                  value={form.minStock}
                  onChange={onFieldChange('minStock')}
                  type="number"
                />
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

