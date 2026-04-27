import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import DetailProdukPage from './pages/DetailProdukPage'
import EditProdukPage from './pages/EditProdukPage'
import RiwayatAktivitasProdukPage from './pages/RiwayatAktivitasProdukPage'
import ScanProdukPage from './pages/ScanProdukPage'
import StokListPage from './pages/StokListPage'
import TambahStokBaruPage from './pages/TambahStokBaruPage'
import UpdateStokPage from './pages/UpdateStokPage'
import { clampStock } from './utils'

const STOCK_PRODUCTS_STORAGE_KEY = 'pos-stock-products'

const initialCreateForm = {
  name: '',
  category: '',
  sku: '',
  stock: '',
  minStock: '',
  capitalPrice: '',
  price: '',
  photo: '',
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
    photo: product.photo ?? '',
    photoFile: null,
  }
}

function normalizeScanCode(value) {
  return String(value ?? '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
}

// loadStoredProducts dihapus, diganti fetch API

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

function mapApiProductToFrontend(apiProduct) {
  const thumb = apiProduct.thumb || routeThumbMap[apiProduct.category] || 'rice';
  return {
    ...apiProduct,
    minStock: apiProduct.min_stock || 0,
    capitalPrice: apiProduct.capital_price || 0,
    unitsPerSale: apiProduct.sold || 0,
    revenue: formatCompactRevenue(apiProduct.revenue || 0),
    revenueTarget: 'Target 10%',
    lastMonthGrowth: 0,
    lastMonthLabel: 'Bulan ini',
    badge: apiProduct.badge || 'New',
    thumb: thumb,
    accent: routeAccentMap[thumb] ?? routeAccentMap.rice,
  };
}

export default function StokFeature({ onMainTabChange }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
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

  const scanLookupProducts = useMemo(() => {
    const routeProducts = routedProduct ? [routedProduct] : []
    return [...products, ...routeProducts]
  }, [products, routedProduct])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts((res.data || []).map(mapApiProductToFrontend));
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };
    fetchProducts();
  }, [])

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

      setCreateForm((current) => ({
        ...current,
        [field]: rawValue,
      }))
    }
  }

  function handleCreatePhotoChange(photo) {
    setCreateForm((current) => ({
      ...current,
      photo,
    }))
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

  function handleEditPhotoChange({ photo, photoFile }) {
    setEditForm((current) => ({
      ...(current ?? buildEditForm(selectedProduct)),
      photo,
      photoFile,
    }))
  }

  function handleOpenScan(source = 'create') {
    setScanReturnPage(source)
    setPage('scan')
  }

  function handleOpenScanHistory() {
    setPage('scan-history')
  }

  function handleScanResult(sku) {
    const normalizedResult = normalizeScanCode(sku)
    const matchedProduct =
      scanLookupProducts.find((product) => normalizeScanCode(product.sku) === normalizedResult) ?? null
    const resolvedSku = matchedProduct?.sku ?? String(sku ?? '').trim()

    if (scanReturnPage === 'edit') {
      setEditForm((current) => ({
        ...(current ?? buildEditForm(selectedProduct)),
        sku: resolvedSku,
      }))
      setPage('edit')
      return
    }

    setCreateForm((current) => ({
      ...current,
      sku: resolvedSku,
    }))
    setPage('create')
  }

  async function handleSaveProduct(nextValues) {
    const { photoFile, ...persistedValues } = nextValues

    if (String(selectedProductId).startsWith('laporan-')) {
      // Logic Laporan (Tidak usah di-API-kan karena Laporan bersifat read-only / simulasi)
      setRoutedProduct((currentProduct) =>
        currentProduct ? { ...currentProduct, ...persistedValues } : currentProduct
      )
      setEditForm(null)
      setPage('detail')
      return
    }

    try {
      const payload = {
        name: persistedValues.name,
        sku: persistedValues.sku,
        category: persistedValues.category,
        stock: persistedValues.stock,
        min_stock: persistedValues.minStock,
        price: persistedValues.price,
        capital_price: persistedValues.capitalPrice,
        thumb: persistedValues.photo || routeThumbMap[persistedValues.category] || 'rice'
      };
      const res = await api.put(`/products/${selectedProductId}`, payload);
      const mapped = mapApiProductToFrontend(res.data);
      setProducts(currentProducts => currentProducts.map(p => p.id === selectedProductId ? mapped : p));
      setEditForm(null)
      setPage('detail')
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan produk');
    }
  }

  async function handleDeleteProduct() {
    const productToDelete = selectedProduct
    if (!productToDelete) return

    if (String(selectedProductId).startsWith('laporan-')) {
      handleBackToPreviousPage()
      return
    }

    try {
      if (window.confirm(`Hapus produk ${productToDelete.name}?`)) {
        await api.delete(`/products/${selectedProductId}`);
        setProducts((currentProducts) => currentProducts.filter((product) => product.id !== selectedProductId))
        setEditForm(null)
        setPage('list')
        setSelectedProductId(null)
      }
    } catch (err) {
      alert('Gagal menghapus produk');
    }
  }

  async function handleSaveStock({ mode, amount }) {
    if (String(selectedProductId).startsWith('laporan-')) {
      setPage('detail')
      return
    }

    try {
      const type = mode === 'add' ? 'add' : 'subtract';
      const res = await api.patch(`/products/${selectedProductId}/stock`, {
        type, amount, reason: `Penyesuaian stok manual (${mode})`
      });
      const mapped = mapApiProductToFrontend(res.data);
      setProducts(currentProducts => currentProducts.map(p => p.id === selectedProductId ? mapped : p));
      setPage('detail')
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengubah stok');
    }
  }

  async function handleCreateProduct(formValues) {
    try {
      const payload = {
        name: formValues.name,
        sku: formValues.sku || `SKU-${Date.now()}`,
        category: formValues.category || 'Sembako',
        stock: Number(formValues.stock || 0),
        min_stock: Number(formValues.minStock || 0),
        price: Number(formValues.price || 0),
        capital_price: Number(formValues.capitalPrice || 0),
        thumb: formValues.photo || routeThumbMap[formValues.category] || 'rice'
      };
      
      const res = await api.post('/products', payload);
      const mapped = mapApiProductToFrontend(res.data);
      setProducts(currentProducts => [mapped, ...currentProducts]);
      setSelectedProductId(res.data.id);
      setCreateForm(initialCreateForm);
      setPage('detail');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menambah produk');
    }
  }

  if (page !== 'list' && !selectedProduct) {
    if (page === 'create') {
      return (
        <TambahStokBaruPage
          form={createForm}
          onBack={handleBackToList}
          onFieldChange={handleCreateFieldChange}
          onPhotoChange={handleCreatePhotoChange}
          onOpenScan={() => handleOpenScan('create')}
          onSave={handleCreateProduct}
        />
      )
    }

    if (page === 'scan') {
      return (
        <ScanProdukPage
          products={scanLookupProducts}
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
        onPhotoChange={handleEditPhotoChange}
        onOpenScan={() => handleOpenScan('edit')}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
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
        onPhotoChange={handleCreatePhotoChange}
        onOpenScan={() => handleOpenScan('create')}
        onSave={handleCreateProduct}
      />
    )
  }

  if (page === 'scan') {
    return (
      <ScanProdukPage
        products={scanLookupProducts}
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
