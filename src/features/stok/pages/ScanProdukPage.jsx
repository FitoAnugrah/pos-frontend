import { useEffect, useId, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import {
  ArrowLeftIcon,
  CheckIcon,
  ClockIcon,
  FlashIcon,
  GalleryIcon,
  ScanIcon,
  WarnIcon,
} from '../components/icons'

function normalizeScannerError(error) {
  const message = String(error?.message ?? error ?? '')

  if (message.toLowerCase().includes('permission')) {
    return 'Akses kamera ditolak. Izinkan kamera di browser agar bisa memindai barcode.'
  }

  if (message.toLowerCase().includes('notfounderror') || message.toLowerCase().includes('no camera')) {
    return 'Kamera tidak ditemukan di perangkat ini.'
  }

  return 'Scanner belum bisa dijalankan. Coba refresh halaman atau gunakan browser Chrome/Edge terbaru.'
}

const RECENT_SCANS = [
  { name: 'Coca-Cola 330ml', sku: 'CC-330-CAN' },
  { name: 'Beras Premium 5kg', sku: 'BR-PRM-005' },
]

export default function ScanProdukPage({ onBack, onManualInput, onOpenHistory, onScanResult }) {
  const scannerRegionId = useId().replace(/:/g, '')
  const hiddenScanRegionId = `${scannerRegionId}-file`
  const scannerRef = useRef(null)
  const fileInputRef = useRef(null)
  const manualInputRef = useRef(null)
  const handledRef = useRef(false)

  const [statusText, setStatusText] = useState('Menyiapkan kamera...')
  const [errorText, setErrorText] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const [manualCode, setManualCode] = useState('')

  useEffect(() => {
    let disposed = false

    async function startScanner() {
      setErrorText('')
      setStatusText('Meminta akses kamera...')
      handledRef.current = false

      try {
        const cameras = await Html5Qrcode.getCameras()

        if (!cameras.length) {
          throw new Error('No camera found')
        }

        const preferredCamera =
          cameras.find((camera) => /back|rear|environment/gi.test(camera.label)) ?? cameras[0]

        const scanner = new Html5Qrcode(scannerRegionId)
        scannerRef.current = scanner

        await scanner.start(
          preferredCamera.id,
          {
            fps: 10,
            qrbox: { width: 230, height: 230 },
            aspectRatio: 1.77,
          },
          async (decodedText) => {
            if (handledRef.current) return

            handledRef.current = true
            setStatusText('Kode terdeteksi, membuka produk...')

            try {
              await scanner.stop()
            } catch {
              // Ignore stop errors
            }

            if (!disposed) {
              onScanResult(decodedText)
            }
          },
          () => {
            // Silent by design
          },
        )

        if (!disposed) {
          setStatusText('Kamera aktif')
          setCameraActive(true)
        }
      } catch (error) {
        if (!disposed) {
          setStatusText('Scanner tidak aktif')
          setErrorText(normalizeScannerError(error))
          setCameraActive(false)
        }
      }
    }

    startScanner()

    return () => {
      disposed = true

      const scanner = scannerRef.current
      scannerRef.current = null

      if (scanner) {
        Promise.resolve(scanner.stop())
          .catch(() => undefined)
          .finally(() => {
            Promise.resolve(scanner.clear()).catch(() => undefined)
          })
      }
    }
  }, [onScanResult, scannerRegionId])

  async function handleGalleryPick(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setErrorText('')
    setStatusText('Memproses gambar...')

    try {
      const tempScanner = new Html5Qrcode(hiddenScanRegionId)
      const decodedText = await tempScanner.scanFile(file, true)
      await Promise.resolve(tempScanner.clear()).catch(() => undefined)
      onScanResult(decodedText)
    } catch {
      setErrorText('Barcode pada gambar tidak terbaca. Coba foto yang lebih jelas atau scan langsung.')
      setStatusText('Kamera aktif')
    } finally {
      event.target.value = ''
    }
  }

  function handleManualSubmit(e) {
    e.preventDefault()
    if (manualCode.trim()) {
      onScanResult(manualCode.trim())
    }
  }

  async function handleRequestPermission() {
    const scanner = scannerRef.current
    if (scanner) {
      try {
        await scanner.stop()
      } catch { /* ignore */ }
    }
    scannerRef.current = null
    setErrorText('')
    setStatusText('Menyiapkan kamera...')
    setCameraActive(false)

    // Trigger re-start by reloading — simplest approach without extra state
    window.location.reload()
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="w-full max-w-6xl mx-auto p-8 h-full flex flex-col">

        {/* Page Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label="Kembali"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Scan Produk</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border border-slate-200 text-slate-600 p-3 rounded-full hover:bg-slate-100 transition-all"
              aria-label="Pilih dari galeri"
            >
              <GalleryIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="bg-white border border-slate-200 text-slate-600 p-3 rounded-full hover:bg-slate-100 transition-all"
              aria-label="Flash kamera"
            >
              <FlashIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onOpenHistory}
              className="bg-white border border-slate-200 text-slate-600 p-3 rounded-full hover:bg-slate-100 transition-all"
              aria-label="Riwayat aktivitas"
            >
              <ClockIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">

          {/* Left Column — Camera Viewfinder */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-slate-500">Kamera Pemindai</p>
              <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cameraActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                {cameraActive ? 'Aktif' : statusText}
              </span>
            </div>

            {/* Camera Box */}
            <div className="w-full flex-1 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800 min-h-0">
              {/* Scanner mount point */}
              <div
                id={scannerRegionId}
                className="absolute inset-0 [&_*]:border-0 [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
              />

              {/* Scan overlay — corners + line */}
              {!errorText && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="relative w-56 h-56">
                    {/* Corner brackets */}
                    <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-md" />
                    <span className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-md" />
                    <span className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-md" />
                    <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-md" />
                    {/* Scan line */}
                    <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                  </div>
                </div>
              )}

              {/* Error State — floating in camera */}
              {errorText && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900/90 p-8 text-center">
                  <WarnIcon className="h-10 w-10 text-amber-400 mb-4" />
                  <p className="text-white font-medium text-sm leading-relaxed max-w-xs">{errorText}</p>
                  <button
                    type="button"
                    onClick={handleRequestPermission}
                    className="bg-blue-600 text-white px-6 py-2.5 mt-6 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all"
                  >
                    Minta Izin Kamera
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column — Manual Input & History */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-8 overflow-y-auto no-scrollbar">

            {/* Section 1: Manual Input */}
            <div>
              <p className="text-sm font-bold text-slate-500 mb-3">Input Barcode / SKU</p>
              <form onSubmit={handleManualSubmit}>
                <input
                  ref={manualInputRef}
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Ketik atau arahkan scanner USB..."
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 text-base font-semibold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-slate-700 placeholder:text-slate-300 placeholder:font-normal"
                  autoFocus
                />
                {manualCode.trim() && (
                  <button
                    type="submit"
                    className="mt-3 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md"
                  >
                    Cari Produk
                  </button>
                )}
              </form>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Scan menggunakan barcode scanner USB, atau ketik kode SKU produk secara manual.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Section 2: Recent Scans */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-slate-500">Scan Terakhir</p>
                <button
                  type="button"
                  onClick={onOpenHistory}
                  className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Lihat Semua
                </button>
              </div>

              <div className="space-y-1">
                {RECENT_SCANS.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onScanResult(item.sku)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.sku}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Scan Icon Hint */}
            <div className="flex items-center gap-3 bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <ScanIcon className="h-5 w-5" />
              </div>
              <p className="text-xs text-blue-700 font-medium leading-relaxed">
                Arahkan barcode atau QR code ke kamera kiri. Produk akan terdeteksi secara otomatis.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Hidden file input & scanner region */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleGalleryPick}
      />
      <div id={hiddenScanRegionId} className="hidden" />
    </div>
  )
}
