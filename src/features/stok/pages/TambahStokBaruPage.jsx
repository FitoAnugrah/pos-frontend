import ActionButton from '../components/ActionButton'
import PageCanvas from '../components/PageCanvas'
import { ArrowLeftIcon, ChartIcon, CheckIcon, PhotoIcon, ScanIcon } from '../components/icons'
import { calculateMargin, calculateMarginYield, formatCurrency } from '../utils'

function Section({ title, children }) {
  return (
    <section className="mt-5">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#6d8ba7]">{title}</p>
      <div className="mt-3 rounded-[22px] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(111,152,193,0.12)] ring-1 ring-[#edf4fa]">
        {children}
      </div>
    </section>
  )
}

function InputField({ label, value, onChange, placeholder, type = 'text', prefix, suffixButton }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6d8ba7]">{label}</span>
      <div className="flex items-center gap-2 rounded-[14px] bg-[#cfe9fb] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
        {prefix ? <span className="text-sm font-bold text-[#2d70a4]">{prefix}</span> : null}
        <input
          type={type}
          min={type === 'number' ? '0' : undefined}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-[14px] font-semibold text-[#1a3a57] outline-none placeholder:text-[#87a8c3]"
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
    <PageCanvas>
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#16324d]"
          aria-label="Kembali ke daftar stok"
        >
          <ArrowLeftIcon className="h-5 w-5 text-[#0d74c8]" />
          <span className="text-[17px] font-semibold">Tambah Stok Baru</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#0d74c8] transition hover:bg-[#eaf5ff]"
          aria-label="Simpan produk baru"
        >
          <CheckIcon className="h-4 w-4" />
        </button>
      </header>

      <Section title="Media">
        <button
          type="button"
          className="flex w-full flex-col items-center justify-center rounded-[20px] border border-dashed border-[#9fc8e6] bg-[#cfe9fb] px-4 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dff0fd] text-[#0d74c8]">
            <PhotoIcon className="h-5 w-5" />
          </div>
          <p className="mt-3 text-[15px] font-semibold text-[#3b6182]">Upload Foto Produk</p>
          <p className="mt-1 text-[11px] font-medium text-[#7b99b4]">JPG, PNG up to 5MB</p>
        </button>
      </Section>

      <form onSubmit={handleSubmit}>
        <Section title="Informasi Dasar">
          <div className="space-y-4">
            <InputField
              label="Nama Produk"
              value={form.name}
              onChange={onFieldChange('name')}
              placeholder="Contoh: Kopi Arabica 250g"
            />

            <label className="block">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6d8ba7]">Kategori</span>
              <div className="rounded-[14px] bg-[#cfe9fb] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                <select
                  value={form.category}
                  onChange={onFieldChange('category')}
                  className={`w-full bg-transparent text-[14px] font-semibold outline-none ${
                    form.category ? 'text-[#1a3a57]' : 'text-[#87a8c3]'
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
              label="Kode SKU"
              value={form.sku}
              onChange={onFieldChange('sku')}
              placeholder="AUTO-12345"
              suffixButton={
                <button
                  type="button"
                  onClick={onOpenScan}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#0d74c8] transition hover:bg-[#dff0fd]"
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
            <div className="rounded-[18px] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(111,152,193,0.08)] ring-1 ring-[#edf4fa]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0d74c8]">Stok Awal</p>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={onFieldChange('stock')}
                  className="w-full bg-transparent text-[28px] font-black tracking-tight text-[#16324d] outline-none"
                />
              </div>
            </div>

            <div className="rounded-[18px] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(111,152,193,0.08)] ring-1 ring-[#edf4fa]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#d97c1f]">Minimal Stok</p>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={form.minStock}
                  onChange={onFieldChange('minStock')}
                  className="w-full bg-transparent text-[28px] font-black tracking-tight text-[#16324d] outline-none"
                />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Harga & Keuangan">
          <div className="space-y-4">
            <InputField
              label="Harga Modal (Rp)"
              value={form.capitalPrice}
              onChange={onFieldChange('capitalPrice')}
              type="number"
            />
            <InputField
              label="Harga Jual (Rp)"
              value={form.price}
              onChange={onFieldChange('price')}
              type="number"
            />

            <div className="rounded-[18px] bg-[#f3f8fd] px-4 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#6d8ba7]">Estimasi Margin Keuntungan</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[18px] font-black tracking-tight text-[#0d74c8]">{formatCurrency(margin)}</p>
                  <p className="text-[11px] font-semibold text-[#4c84b6]">({marginYield})</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#deedf9] text-[#0d74c8]">
                  <ChartIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <ActionButton
          type="submit"
          label="Simpan Produk"
          icon={<CheckIcon className="h-4 w-4" />}
          className="mt-8 w-full rounded-[18px] py-4"
        />
      </form>
    </PageCanvas>
  )
}
