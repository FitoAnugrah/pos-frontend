import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

const routeThumbMap = {
  Sembako: 'rice',
  Minuman: 'drink',
  Snack: 'chips',
  'Kebutuhan Rumah': 'candy',
}

const routeAccentMap = {
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
  candy: {
    shell: 'from-[#181818] via-[#101010] to-[#050505]',
    glow: 'rgba(73,73,73,0.45)',
  },
}

function formatCompactRevenue(value) {
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`
  }

  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`
  }

  return `Rp ${value}`
}

function buildRoutedProduct(routeProduct) {
  const sold = Math.max(Number(routeProduct?.sold ?? 0), 0)
  const revenueValue = Math.max(Number(routeProduct?.revenue ?? 0), 0)
  const derivedPrice = Math.max(Math.round(revenueValue / Math.max(sold, 1)), 0)
  const price = Math.max(Number(routeProduct?.price ?? derivedPrice), 0)
  const capitalPrice = Math.max(Number(routeProduct?.capitalPrice ?? Math.round(price * 0.82)), 0)
  const stock = Math.max(Number(routeProduct?.stock ?? Math.ceil(sold / 10)), 0)
  const minStock = Math.max(Number(routeProduct?.minStock ?? Math.max(Math.ceil(stock * 0.4), 5)), 0)
  const trendValue = Number(String(routeProduct?.trend ?? '0').replace(/[^\d.]/g, '')) || 0
  const category = routeProduct?.category ?? 'Sembako'
  const thumb = routeProduct?.thumb ?? routeThumbMap[category] ?? 'rice'

  return {
    id: `laporan-${routeProduct?.id ?? 'produk'}`,
    category,
    name: routeProduct?.name ?? 'Produk Terlaris',
    sku: routeProduct?.sku ?? `TOP-${String(routeProduct?.id ?? 1).padStart(3, '0')}`,
    stock,
    minStock,
    price,
    capitalPrice,
    unitsPerSale: sold,
    revenue: formatCompactRevenue(revenueValue),
    revenueTarget: routeProduct?.trend ? `Trend ${routeProduct.trend}` : 'Target 0%',
    thumb,
    lastMonthGrowth: trendValue,
    lastMonthLabel: 'vs lalu',
    badge: 'Top Seller',
    title: 'Product Details',
    accent: routeAccentMap[thumb] ?? routeAccentMap.rice,
  }
}

export default function StokFeature({ onMainTabChange }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState(initialProducts)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [page, setPage] = useState('list')
  const [createForm, setCreateForm] = useState(initialCreateForm)
  const [editForm, setEditForm] = useState(null)
  const [scanReturnPage, setScanReturnPage] = useState('create')
  const [routedProduct, setRoutedProduct] = useState(null)
  const [externalNavigation, setExternalNavigation] = useState({
    enabled: false,
    returnTo: '/',
    entryPage: 'detail',
  })

  const selectedProduct = useMemo(
    () =>
      products.find((product) => product.id === selectedProductId) ??
      (routedProduct?.id === selectedProductId ? routedProduct : null),
    [products, routedProduct, selectedProductId],
  )

  useEffect(() => {
    const routeState = location.state

    if (!routeState?.stokTarget || !routeState?.product) {
      return
    }

    const nextProduct = buildRoutedProduct(routeState.product)

    setSelectedProductId(nextProduct.id)
    setRoutedProduct(nextProduct)
    setExternalNavigation({
      enabled: true,
      returnTo: routeState.returnTo ?? '/',
      entryPage: routeState.stokTarget,
    })

    if (routeState.stokTarget === 'edit') {
      setEditForm(buildEditForm(nextProduct))
      setPage('edit')
      return
    }

    if (routeState.stokTarget === 'scan') {
      setEditForm(buildEditForm(nextProduct))
      setScanReturnPage('edit')
      setPage('scan')
      return
    }

    setEditForm(null)
    setPage('detail')
  }, [location.state])

  function openDetail(productId) {
    setSelectedProductId(productId)
    setRoutedProduct(null)
    setExternalNavigation({
      enabled: false,
      returnTo: '/',
      entryPage: 'detail',
    })
    setEditForm(null)
    setPage('detail')
  }

  function handleBackToPreviousPage() {
    if (externalNavigation.enabled) {
      navigate(externalNavigation.returnTo, { replace: true })
      return
    }

    handleBackToList()
  }

  function handleBackToList() {
    setPage('list')
    setSelectedProductId(null)
    setRoutedProduct(null)
    setExternalNavigation({
      enabled: false,
      returnTo: '/',
      entryPage: 'detail',
    })
    setEditForm(null)
  }

  function handleOpenCreate() {
    setSelectedProductId(null)
    setRoutedProduct(null)
    setExternalNavigation({
      enabled: false,
      returnTo: '/',
      entryPage: 'detail',
    })
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
    if (String(selectedProductId).startsWith('laporan-')) {
      setRoutedProduct((currentProduct) =>
        currentProduct
          ? {
              ...currentProduct,
              ...nextValues,
            }
          : currentProduct,
      )
      setEditForm(null)
      setPage('detail')
      return
    }

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
    if (String(selectedProductId).startsWith('laporan-')) {
      setRoutedProduct((currentProduct) => {
        if (!currentProduct) return currentProduct

        const nextStock =
          mode === 'add'
            ? currentProduct.stock + amount
            : clampStock(currentProduct.stock - amount)

        return {
          ...currentProduct,
          stock: nextStock,
        }
      })
      setPage('detail')
      return
    }

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
        onBack={handleBackToPreviousPage}
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
          if (externalNavigation.enabled && externalNavigation.entryPage === 'edit') {
            handleBackToPreviousPage()
            return
          }

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
