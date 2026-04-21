import { productCategories } from '../../../mock/stokData'
import ProductThumb from '../components/ProductThumb'
import { ArrowLeftIcon, CheckIcon, EditIcon, PhotoIcon, ScanIcon, TrashIcon, WarnIcon } from '../../../components/ui/icons'
import { calculateMargin, calculateMarginYield, formatCurrency, getStockInfo } from '../utils'

function FormCard({ title, children }) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
      {title && <h2 className="text-lg font-bold text-slate-800 mb-6">{title}</h2>}
      {children}
    </section>
  )
}

function TextField({ label, value, onChange, rightIcon, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-600">{label}</span>
      <div className="flex items-center gap-2 bg-slate-50 w-full rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all outline-none">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
        />
        {rightIcon ? rightIcon : null}
      </div>
    </label>
  )
}

function NumberField({ label, value, onChange, prefix, accent = 'text-slate-800', className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-600">{label}</span>
      <div className="flex items-center gap-2 bg-slate-50 w-full rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all outline-none">
        {prefix ? <span className="text-sm font-bold text-slate-500">{prefix}</span> : null}
        <input
          type="number"
          min="0"
          value={value}
          onChange={onChange}
          className={`w-full appearance-none bg-transparent text-sm font-semibold outline-none ${accent}`}
        />
      </div>
    </label>
  )
}

export default function EditProdukPage({ product, form, onBack, onFieldChange, onOpenScan, onSave }) {
  const stockInfo = getStockInfo(Number(form.stock), Number(form.minStock))
  const margin = calculateMargin(Number(form.price), Number(form.capitalPrice))
  const marginYield = calculateMarginYield(Number(form.price), Number(form.capitalPrice))

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      ...form,
      stock: Math.max(Number(form.stock), 0),
      minStock: Math.max(Number(form.minStock), 0),
      capitalPrice: Math.max(Number(form.capitalPrice), 0),
      price: Math.max(Number(form.price), 0),
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="w-full max-w-4xl mx-auto h-full overflow-y-auto pb-16 px-8 no-scrollbar">
        <form onSubmit={handleSubmit}>
          
          <header className="flex justify-between items-center mb-10 mt-8">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-3 text-slate-800 hover:text-blue-600 transition-colors"
              aria-label="Kembali ke detail produk"
            >
              <ArrowLeftIcon className="h-6 w-6 text-blue-600" />
              <span className="text-2xl font-bold">Edit Produk</span>
            </button>

            <button 
              type="submit" 
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all"
            >
              Simpan
            </button>
          </header>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-slate-50 rounded-xl flex-shrink-0 flex items-center justify-center p-2 border border-slate-100 shadow-sm relative overflow-hidden">
               <ProductThumb kind={product.thumb} className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{product.name}</p>
              <div className="mt-2 text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 cursor-pointer">
                <PhotoIcon className="h-4 w-4" />
                Ganti Foto
              </div>
            </div>
          </div>

          <FormCard title="Informasi Dasar">
            <div className="grid grid-cols-2 gap-6">
              <TextField label="Nama Produk" value={form.name} onChange={onFieldChange('name')} className="col-span-2" />

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-600">Kategori</span>
                <div className="bg-slate-50 w-full rounded-xl px-4 py-3.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all outline-none">
                  <select
                    value={form.category}
                    onChange={onFieldChange('category')}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer"
                  >
                    {productCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <TextField
                label="Kode SKU"
                value={form.sku}
                onChange={onFieldChange('sku')}
                rightIcon={
                  <button
                    type="button"
                    onClick={onOpenScan}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-blue-600 transition hover:bg-blue-50"
                    aria-label="Scan kode SKU"
                  >
                    <ScanIcon className="h-5 w-5" />
                  </button>
                }
              />
            </div>
          </FormCard>

          <FormCard title="Manajemen Stok">
            <div className="grid grid-cols-2 gap-6">
              <NumberField label="Stok Saat Ini" value={form.stock} onChange={onFieldChange('stock')} />
              <NumberField label="Minimal Stok" value={form.minStock} onChange={onFieldChange('minStock')} accent="text-amber-600" />
            </div>

            <div className={`mt-6 p-5 rounded-xl flex items-start gap-3 shadow-sm border ${stockInfo.tone === 'alert' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
              <div className={`mt-0.5 shrink-0 ${stockInfo.tone === 'alert' ? 'text-amber-500' : 'text-emerald-500'}`}>
                {stockInfo.tone === 'alert' ? (
                  <WarnIcon className="h-5 w-5" />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-current">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {stockInfo.tone === 'alert'
                  ? 'Peringatan stok aktif karena jumlah item menyentuh atau berada di bawah batas minimal.'
                  : 'Stok produk masih berada di atas batas minimal dan aman untuk dijual.'}
              </p>
            </div>
          </FormCard>

          <FormCard title="Harga & Keuangan">
            <div className="grid grid-cols-2 gap-6">
              <NumberField label="Harga Modal" value={form.capitalPrice} onChange={onFieldChange('capitalPrice')} prefix="Rp" />
              <NumberField label="Harga Jual" value={form.price} onChange={onFieldChange('price')} prefix="Rp" />
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-6">
              <p className="text-sm font-semibold text-blue-600">Margin Keuntungan</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-3xl font-black tracking-tight text-slate-800">{formatCurrency(margin)}</p>
                  <p className="text-sm font-semibold text-slate-500 mt-1">Rentang: {marginYield}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm text-blue-600">
                  <EditIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </FormCard>

          <div className="mt-10 flex justify-center">
            <button 
              type="button" 
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold border border-red-500 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 hover:shadow-md transition-all active:scale-95"
            >
              <TrashIcon className="h-5 w-5" />
              Hapus Produk
            </button>
          </div>
          <p className="mt-4 pb-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            Tindakan ini tidak dapat dibatalkan
          </p>

        </form>
      </div>
    </div>
  )
}

