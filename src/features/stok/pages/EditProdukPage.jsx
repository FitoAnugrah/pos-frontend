import { productCategories } from '../data'
import ActionButton from '../components/ActionButton'
import PageCanvas from '../components/PageCanvas'
import ProductThumb from '../components/ProductThumb'
import { ArrowLeftIcon, EditIcon, PhotoIcon, ScanIcon, TrashIcon, WarnIcon } from '../components/icons'
import { calculateMargin, calculateMarginYield, formatCurrency, getStockInfo } from '../utils'

function Section({ title, children }) {
  return (
    <section className="mt-4">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#6d8ba7]">{title}</p>
      <div className="mt-2 rounded-[22px] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa]">
        {children}
      </div>
    </section>
  )
}

function TextField({ label, value, onChange, rightIcon }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6d8ba7]">{label}</span>
      <div className="flex items-center rounded-[14px] bg-[#cfe9fb] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-[14px] font-semibold text-[#1a3a57] outline-none"
        />
        {rightIcon ? rightIcon : null}
      </div>
    </label>
  )
}

function NumberField({ label, value, onChange, prefix, accent = 'text-[#1a3a57]' }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6d8ba7]">{label}</span>
      <div className="flex items-center gap-2 rounded-[14px] bg-[#cfe9fb] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        {prefix ? <span className="text-sm font-bold text-[#2d70a4]">{prefix}</span> : null}
        <input
          type="number"
          min="0"
          value={value}
          onChange={onChange}
          className={`w-full appearance-none bg-transparent text-[14px] font-semibold outline-none ${accent}`}
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
    <PageCanvas>
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#16324d]"
          aria-label="Kembali ke detail produk"
        >
          <ArrowLeftIcon className="h-5 w-5 text-[#0d74c8]" />
          <span className="text-[17px] font-semibold">Edit Produk</span>
        </button>

        <ActionButton label="Simpan" className="px-5 py-2.5 text-[13px]" onClick={handleSubmit} />
      </header>

      <div className="mt-5 rounded-[22px] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa]">
        <div className="flex items-center gap-3">
          <ProductThumb kind={product.thumb} className="h-16 w-16 rounded-[18px]" />
          <div>
            <p className="text-[16px] font-bold text-[#16324d]">{product.name}</p>
            <button type="button" className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-[#0d74c8]">
              <PhotoIcon className="h-3.5 w-3.5" />
              Ganti Foto
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Section title="Informasi Dasar">
          <div className="space-y-4">
            <TextField label="Nama Produk" value={form.name} onChange={onFieldChange('name')} />

            <label className="block">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6d8ba7]">Kategori</span>
              <div className="rounded-[14px] bg-[#cfe9fb] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                <select
                  value={form.category}
                  onChange={onFieldChange('category')}
                  className="w-full bg-transparent text-[14px] font-semibold text-[#1a3a57] outline-none"
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
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#0d74c8] transition hover:bg-[#dff0fd]"
                  aria-label="Scan kode SKU"
                >
                  <ScanIcon className="h-4 w-4" />
                </button>
              }
            />
          </div>
        </Section>

        <Section title="Manajemen Stok">
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Stok Saat Ini" value={form.stock} onChange={onFieldChange('stock')} />
            <NumberField label="Minimal Stok" value={form.minStock} onChange={onFieldChange('minStock')} accent="text-[#b26000]" />
          </div>

          <div className="mt-4 rounded-[16px] border border-[#efd9bc] bg-[#fff5ea] px-3 py-3 text-[#996233]">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-current">
                <WarnIcon className="h-3 w-3" />
              </div>
              <p className="text-[11px] leading-5">
                {stockInfo.tone === 'alert'
                  ? 'Peringatan stok aktif karena jumlah item menyentuh atau berada di bawah batas minimal.'
                  : 'Stok produk masih berada di atas batas minimal dan aman untuk dijual.'}
              </p>
            </div>
          </div>
        </Section>

        <Section title="Harga & Keuangan">
          <div className="space-y-4">
            <NumberField label="Harga Modal" value={form.capitalPrice} onChange={onFieldChange('capitalPrice')} prefix="Rp" />
            <NumberField label="Harga Jual" value={form.price} onChange={onFieldChange('price')} prefix="Rp" />

            <div className="rounded-[18px] bg-[#f3f8fd] px-4 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6d8ba7]">Margin Keuntungan</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[18px] font-black tracking-tight text-[#0d74c8]">{formatCurrency(margin)}</p>
                  <p className="text-[11px] font-semibold text-[#4c84b6]">({marginYield})</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#deedf9] text-[#0d74c8]">
                  <EditIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <div className="mt-7 flex justify-center">
          <ActionButton label="Hapus Produk" icon={<TrashIcon className="h-4 w-4" />} variant="danger" className="px-6 py-3" />
        </div>
        <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-[#9fb0bf]">
          Tindakan ini tidak dapat dibatalkan
        </p>
      </form>
    </PageCanvas>
  )
}
