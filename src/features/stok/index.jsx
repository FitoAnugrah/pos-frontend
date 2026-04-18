import { useMemo, useState } from 'react'
import { initialProducts } from './data'
import DetailProdukPage from './pages/DetailProdukPage'
import EditProdukPage from './pages/EditProdukPage'
import RiwayatAktivitasProdukPage from './pages/RiwayatAktivitasProdukPage'
import ScanProdukPage from './pages/ScanProdukPage'
import StokListPage from './pages/StokListPage'
import TambahStokBaruPage from './pages/TambahStokBaruPage'
import UpdateStokPage from './pages/UpdateStokPage'
import { clampStock } from './utils'

const initialCreateForm = {
  name: '',
  category: '',
  sku: 'AUTO-12345',
  stock: 0,
  minStock: 5,
  capitalPrice: 45000,
  price: 65000,
}

function buildEditForm(product) {
  return {
    name: product.name,
    category: product.category,
    sku: product.sku,
    stock: product.stock,
    minStock: product.minStock,
    capitalPrice: product.capitalPrice,
    price: product.price,
  }
}

export default function StokFeature({ onMainTabChange }) {
  const [products, setProducts] = useState(initialProducts)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [page, setPage] = useState('list')
  const [createForm, setCreateForm] = useState(initialCreateForm)
  const [editForm, setEditForm] = useState(null)
  const [scanReturnPage, setScanReturnPage] = useState('create')

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [products, selectedProductId],
  )

  function openDetail(productId) {
    setSelectedProductId(productId)
    setEditForm(null)
    setPage('detail')
  }

  function handleBackToList() {
    setPage('list')
    setSelectedProductId(null)
    setEditForm(null)
  }

  function handleOpenCreate() {
    setSelectedProductId(null)
    setCreateForm(initialCreateForm)
    setEditForm(null)
    setPage('create')
  }

  function handleCreateFieldChange(field) {
    return (event) => {
      const rawValue = event.target.value
      const nextValue =
        field === 'stock' || field === 'minStock' || field === 'capitalPrice' || field === 'price'
          ? Number(rawValue || 0)
          : rawValue

      setCreateForm((current) => ({
        ...current,
        [field]: nextValue,
      }))
    }
  }

  function handleEditFieldChange(field) {
    return (event) => {
      const rawValue = event.target.value
      const nextValue =
        field === 'stock' || field === 'minStock' || field === 'capitalPrice' || field === 'price'
          ? Number(rawValue || 0)
          : rawValue

      setEditForm((current) => ({
        ...(current ?? buildEditForm(selectedProduct)),
        [field]: nextValue,
      }))
    }
  }

  function handleOpenScan(source = 'create') {
    setScanReturnPage(source)
    setPage('scan')
  }

  function handleOpenScanHistory() {
    setPage('scan-history')
  }

  function handleScanResult(sku) {
    if (scanReturnPage === 'edit') {
      setEditForm((current) => ({
        ...(current ?? buildEditForm(selectedProduct)),
        sku,
      }))
      setPage('edit')
      return
    }

    setCreateForm((current) => ({
      ...current,
      sku,
    }))
    setPage('create')
  }

  function handleSaveProduct(nextValues) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === selectedProductId
          ? {
              ...product,
              ...nextValues,
            }
          : product,
      ),
    )
    setEditForm(null)
    setPage('detail')
  }

  function handleSaveStock({ mode, amount }) {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id !== selectedProductId) return product

        const nextStock = mode === 'add' ? product.stock + amount : clampStock(product.stock - amount)

        return {
          ...product,
          stock: nextStock,
        }
      }),
    )
    setPage('detail')
  }

  function buildProductPayload(formValues) {
    const nextId = Math.max(...products.map((product) => product.id), 0) + 1
    const categoryThumbMap = {
      Sembako: 'rice',
      Minuman: 'drink',
      Snack: 'chips',
    }
    const accentMap = {
      rice: {
        shell: 'from-[#5b2f74] via-[#61307a] to-[#4c2866]',
        glow: 'rgba(105,55,142,0.45)',
      },
      drink: {
        shell: 'from-[#2f3441] via-[#20262f] to-[#141a22]',
        glow: 'rgba(70,83,105,0.45)',
      },
      chips: {
        shell: 'from-[#47240d] via-[#72350f] to-[#231107]',
        glow: 'rgba(130,79,35,0.45)',
      },
    }
    const thumb = categoryThumbMap[formValues.category] ?? 'rice'

    return {
      id: nextId,
      category: formValues.category,
      name: formValues.name || 'Produk Baru',
      sku: formValues.sku || `AUTO-${String(nextId).padStart(5, '0')}`,
      stock: formValues.stock,
      minStock: formValues.minStock,
      price: formValues.price,
      capitalPrice: formValues.capitalPrice,
      unitsPerSale: 0,
      revenue: 'Rp 0',
      revenueTarget: 'Target 0%',
      thumb,
      lastMonthGrowth: 0,
      lastMonthLabel: 'vs lalu',
      badge: 'Produk Baru',
      title: 'Product Details',
      accent: accentMap[thumb],
    }
  }

  function handleCreateProduct(formValues) {
    const newProduct = buildProductPayload(formValues)

    setProducts((currentProducts) => [newProduct, ...currentProducts])
    setSelectedProductId(newProduct.id)
    setCreateForm(initialCreateForm)
    setPage('detail')
  }

  if (page !== 'list' && !selectedProduct) {
    if (page === 'create') {
      return (
        <TambahStokBaruPage
          form={createForm}
          onBack={handleBackToList}
          onFieldChange={handleCreateFieldChange}
          onOpenScan={() => handleOpenScan('create')}
          onSave={handleCreateProduct}
        />
      )
    }

    if (page === 'scan') {
      return (
        <ScanProdukPage
          onBack={() => setPage(scanReturnPage)}
          onManualInput={() => setPage(scanReturnPage)}
          onOpenHistory={handleOpenScanHistory}
          onScanResult={handleScanResult}
        />
      )
    }

    if (page === 'scan-history') {
      return <RiwayatAktivitasProdukPage onBack={() => setPage('scan')} />
    }

    return (
      <StokListPage
        products={products}
        onOpenDetail={openDetail}
        onMainTabChange={onMainTabChange}
        onOpenCreate={handleOpenCreate}
      />
    )
  }

  if (page === 'detail' && selectedProduct) {
    return (
      <DetailProdukPage
        product={selectedProduct}
        onBack={handleBackToList}
        onOpenEdit={() => {
          setEditForm(buildEditForm(selectedProduct))
          setPage('edit')
        }}
        onOpenStockUpdate={() => setPage('update-stock')}
      />
    )
  }

  if (page === 'edit' && selectedProduct) {
    return (
      <EditProdukPage
        product={selectedProduct}
        form={editForm ?? buildEditForm(selectedProduct)}
        onBack={() => {
          setEditForm(null)
          setPage('detail')
        }}
        onFieldChange={handleEditFieldChange}
        onOpenScan={() => handleOpenScan('edit')}
        onSave={handleSaveProduct}
      />
    )
  }

  if (page === 'update-stock' && selectedProduct) {
    return <UpdateStokPage product={selectedProduct} onBack={() => setPage('detail')} onSave={handleSaveStock} />
  }

  if (page === 'create') {
    return (
      <TambahStokBaruPage
        form={createForm}
        onBack={handleBackToList}
        onFieldChange={handleCreateFieldChange}
        onOpenScan={() => handleOpenScan('create')}
        onSave={handleCreateProduct}
      />
    )
  }

  if (page === 'scan') {
    return (
      <ScanProdukPage
        onBack={() => setPage(scanReturnPage)}
        onManualInput={() => setPage(scanReturnPage)}
        onOpenHistory={handleOpenScanHistory}
        onScanResult={handleScanResult}
      />
    )
  }

  if (page === 'scan-history') {
    return <RiwayatAktivitasProdukPage onBack={() => setPage('scan')} />
  }

  return (
    <StokListPage
      products={products}
      onOpenDetail={openDetail}
      onMainTabChange={onMainTabChange}
      onOpenCreate={handleOpenCreate}
    />
  )
}
