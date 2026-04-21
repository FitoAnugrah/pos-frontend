import { useEffect, useId, useRef, useState } from 'react'
import {
  ArrowLeftIcon,
  CheckIcon,
  ClockIcon,
  FlashIcon,
  GalleryIcon,
  ScanIcon,
  WarnIcon,
} from '../../../components/ui/icons'

const RECENT_SCANS = [
  { name: 'Coca-Cola 330ml', sku: 'CC-330-CAN' },
  { name: 'Beras Premium 5kg', sku: 'BR-PRM-005' },
]

const PREFERRED_FORMATS = [
  'qr_code',
  'ean_13',
  'ean_8',
  'code_128',
  'code_39',
  'upc_a',
  'upc_e',
  'itf',
  'codabar',
  'pdf417',
  'data_matrix',
  'aztec',
]

function normalizeScannerError(error) {
  const message = String(error?.message ?? error ?? '')
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('permission') || lowerMessage.includes('notallowederror')) {
    return 'Akses kamera ditolak. Izinkan kamera di browser agar bisa memindai barcode.'
  }

  if (lowerMessage.includes('notfounderror') || lowerMessage.includes('no camera')) {
    return 'Kamera tidak ditemukan di perangkat ini.'
  }

  if (lowerMessage.includes('notreadableerror') || lowerMessage.includes('trackstart')) {
    return 'Kamera sedang dipakai aplikasi lain. Tutup aplikasi lain yang memakai kamera lalu coba lagi.'
  }

  if (lowerMessage.includes('secure') || lowerMessage.includes('https')) {
    return 'Scanner kamera hanya berjalan di localhost atau koneksi HTTPS.'
  }

  if (lowerMessage.includes('barcodedetector') || lowerMessage.includes('detector')) {
    return 'Browser ini belum mendukung engine scan bawaan. Mencoba fallback scanner lain.'
  }

  return 'Scanner belum bisa dijalankan. Coba lagi atau gunakan Chrome atau Edge terbaru.'
}

async function getDetectorFormats() {
  if (typeof window === 'undefined' || !('BarcodeDetector' in window)) {
    return null
  }

  if (typeof window.BarcodeDetector.getSupportedFormats === 'function') {
    const supportedFormats = await window.BarcodeDetector.getSupportedFormats()
    const usableFormats = PREFERRED_FORMATS.filter((format) => supportedFormats.includes(format))

    return usableFormats.length ? usableFormats : supportedFormats
  }

  return PREFERRED_FORMATS
}

function applyHtml5ScannerLayout(regionId) {
  const region = document.getElementById(regionId)
  if (!region) return

  region.style.width = '100%'
  region.style.height = '100%'
  region.style.background = 'transparent'

  region.querySelectorAll('div').forEach((element) => {
    element.style.width = '100%'
    element.style.height = '100%'
    element.style.padding = '0'
    element.style.margin = '0'
    element.style.border = '0'
    element.style.background = 'transparent'
  })

  region.querySelectorAll('video').forEach((video) => {
    video.setAttribute('playsinline', 'true')
    video.setAttribute('muted', 'true')
    video.style.width = '100%'
    video.style.height = '100%'
    video.style.objectFit = 'cover'
    video.style.background = '#0f172a'
    video.style.border = '0'
  })
}

export default function ScanProdukPage({ onBack, onManualInput, onOpenHistory, onScanResult }) {
  const scannerRegionId = useId().replace(/:/g, '')
  const hiddenScanRegionId = `${scannerRegionId}-file`

  const videoRef = useRef(null)
  const html5QrcodeRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const detectorRef = useRef(null)
  const scannerRef = useRef(null)
  const fileInputRef = useRef(null)
  const animationFrameRef = useRef(null)
  const lastScanAttemptRef = useRef(0)
  const detectionInFlightRef = useRef(false)
  const handledRef = useRef(false)

  const [scannerNonce, setScannerNonce] = useState(0)
  const [statusText, setStatusText] = useState('Menyiapkan kamera...')
  const [errorText, setErrorText] = useState('')
  const [rawErrorText, setRawErrorText] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const [manualCode, setManualCode] = useState('')
  const [activeEngine, setActiveEngine] = useState(null)

  async function getHtml5QrcodeClass() {
    if (html5QrcodeRef.current) {
      return html5QrcodeRef.current
    }

    const module = await import('html5-qrcode')
    html5QrcodeRef.current = module.Html5Qrcode

    return html5QrcodeRef.current
  }

  async function stopAllScanning() {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    detectionInFlightRef.current = false

    const scanner = scannerRef.current
    scannerRef.current = null

    if (scanner) {
      await Promise.resolve(scanner.stop()).catch(() => undefined)
      await Promise.resolve(scanner.clear()).catch(() => undefined)
    }

    const stream = mediaStreamRef.current
    mediaStreamRef.current = null

    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
    }

    detectorRef.current = null
    setCameraActive(false)
    setActiveEngine(null)
  }

  async function handleDetectedCode(decodedText) {
    if (handledRef.current) return

    handledRef.current = true
    setStatusText('Kode terdeteksi, membuka produk...')
    await stopAllScanning()
    onScanResult(decodedText)
  }

  async function startNativeScanner() {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      throw new Error('MediaDevices API not available')
    }

    const detectorFormats = await getDetectorFormats()
    if (!detectorFormats || !detectorFormats.length) {
      throw new Error('BarcodeDetector not supported')
    }

    const detector = new window.BarcodeDetector({ formats: detectorFormats })
    detectorRef.current = detector

    let stream

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
    } catch {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })
    }

    const video = videoRef.current
    if (!video) {
      stream.getTracks().forEach((track) => track.stop())
      throw new Error('Video element not available')
    }

    mediaStreamRef.current = stream
    video.srcObject = stream
    await video.play()

    const scanFrame = async () => {
      if (handledRef.current || !videoRef.current) {
        return
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        void scanFrame()
      })

      if (video.readyState < 2 || detectionInFlightRef.current) {
        return
      }

      const now = performance.now()
      if (now - lastScanAttemptRef.current < 220) {
        return
      }

      lastScanAttemptRef.current = now
      detectionInFlightRef.current = true

      try {
        const results = await detector.detect(video)

        if (results.length > 0 && results[0]?.rawValue) {
          await handleDetectedCode(results[0].rawValue)
        }
      } catch {
        // Silent by design
      } finally {
        detectionInFlightRef.current = false
      }
    }

    setActiveEngine('native')
    animationFrameRef.current = requestAnimationFrame(() => {
      void scanFrame()
    })
  }

  async function startHtml5Scanner() {
    const Html5QrcodeClass = await getHtml5QrcodeClass()
    const scanner = new Html5QrcodeClass(scannerRegionId)
    scannerRef.current = scanner

    const config = {
      fps: 10,
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        const edge = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.58)

        return {
          width: Math.max(edge, 180),
          height: Math.max(edge, 180),
        }
      },
    }

    const onDecode = async (decodedText) => {
      await handleDetectedCode(decodedText)
    }

    try {
      await scanner.start(
        { facingMode: 'environment' },
        config,
        onDecode,
        () => {
          // Silent by design
        },
      )
    } catch {
      try {
        await scanner.start(
          { facingMode: 'user' },
          config,
          onDecode,
          () => {
            // Silent by design
          },
        )
      } catch {
        const cameras = await Html5QrcodeClass.getCameras()

        if (!cameras.length) {
          throw new Error('No camera found')
        }

        const preferredCamera =
          cameras.find((camera) => /back|rear|environment/gi.test(camera.label)) ?? cameras[0]

        await scanner.start(
          preferredCamera.id,
          config,
          onDecode,
          () => {
            // Silent by design
          },
        )
      }
    }

    requestAnimationFrame(() => {
      applyHtml5ScannerLayout(scannerRegionId)
    })

    setActiveEngine('html5')
  }

  useEffect(() => {
    let cancelled = false

    async function startScanner() {
      setErrorText('')
      setRawErrorText('')
      setStatusText('Meminta akses kamera...')
      setCameraActive(false)
      handledRef.current = false

      try {
        await startNativeScanner()

        if (!cancelled) {
          setStatusText('Kamera aktif')
          setCameraActive(true)
        }
      } catch (nativeError) {
        try {
          await stopAllScanning()
          await startHtml5Scanner()

          if (!cancelled) {
            setStatusText('Kamera aktif')
            setCameraActive(true)
          }
        } catch (html5Error) {
          if (!cancelled) {
            const finalError = html5Error ?? nativeError
            setStatusText('Scanner tidak aktif')
            setErrorText(normalizeScannerError(finalError))
            setRawErrorText(String(finalError?.message ?? finalError ?? ''))
            setCameraActive(false)
            setActiveEngine(null)
          }
        }
      }
    }

    void startScanner()

    return () => {
      cancelled = true
      void stopAllScanning()
    }
  }, [scannerNonce, scannerRegionId])

  async function handleGalleryPick(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setErrorText('')
    setRawErrorText('')
    setStatusText('Memproses gambar...')

    try {
      const detectorFormats = await getDetectorFormats()

      if (detectorFormats && detectorFormats.length) {
        const detector = new window.BarcodeDetector({ formats: detectorFormats })
        const imageUrl = URL.createObjectURL(file)

        try {
          const image = new Image()
          image.src = imageUrl

          await new Promise((resolve, reject) => {
            image.onload = resolve
            image.onerror = reject
          })

          const results = await detector.detect(image)
          if (results.length > 0 && results[0]?.rawValue) {
            onScanResult(results[0].rawValue)
            return
          }
        } finally {
          URL.revokeObjectURL(imageUrl)
        }
      }

      const Html5QrcodeClass = await getHtml5QrcodeClass()
      const tempScanner = new Html5QrcodeClass(hiddenScanRegionId)
      const decodedText = await tempScanner.scanFile(file, true)
      await Promise.resolve(tempScanner.clear()).catch(() => undefined)
      onScanResult(decodedText)
    } catch (error) {
      setErrorText('Barcode pada gambar tidak terbaca. Coba foto yang lebih jelas atau scan langsung.')
      setRawErrorText(String(error?.message ?? error ?? ''))
      setStatusText(cameraActive ? 'Kamera aktif' : 'Scanner tidak aktif')
    } finally {
      event.target.value = ''
    }
  }

  function handleManualSubmit(event) {
    event.preventDefault()

    if (!manualCode.trim()) return

    onManualInput?.()
    onScanResult(manualCode.trim())
  }

  async function handleRestartScanner() {
    handledRef.current = false
    await stopAllScanning()
    setErrorText('')
    setRawErrorText('')
    setStatusText('Menyiapkan kamera...')
    setScannerNonce((current) => current + 1)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <header className="mb-5 flex items-start justify-between gap-4 sm:mb-8 sm:items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
              aria-label="Kembali"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <h1 className="max-w-[8ch] text-[32px] font-black leading-[1.05] tracking-tight text-slate-800 sm:max-w-none sm:text-2xl">
              Scan Produk
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition-all hover:bg-slate-100"
              aria-label="Pilih dari galeri"
            >
              <GalleryIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition-all hover:bg-slate-100"
              aria-label="Flash kamera"
            >
              <FlashIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onOpenHistory}
              className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 transition-all hover:bg-slate-100"
              aria-label="Riwayat aktivitas"
            >
              <ClockIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] lg:gap-6">
          <div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-500">Kamera Pemindai</p>
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  cameraActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    cameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                {cameraActive ? 'Aktif' : statusText}
              </span>
            </div>

            <div className="relative min-h-[320px] w-full overflow-hidden rounded-[28px] border-4 border-slate-800 bg-slate-900 sm:min-h-[420px] lg:min-h-[560px]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`absolute inset-0 z-0 h-full w-full object-cover ${
                  activeEngine === 'native' ? 'block' : 'hidden'
                }`}
              />

              <div
                id={scannerRegionId}
                className={`absolute inset-0 z-0 h-full w-full ${
                  activeEngine === 'html5' ? 'block' : 'hidden'
                } [&>*]:!h-full [&>*]:!w-full [&_*]:!border-0 [&_video]:!h-full [&_video]:!w-full [&_video]:!object-cover`}
              />

              {!errorText ? (
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
                  {!cameraActive ? (
                    <div className="mb-6 rounded-full bg-slate-950/65 px-4 py-2 text-xs font-semibold tracking-wide text-slate-200 backdrop-blur">
                      {statusText}
                    </div>
                  ) : null}

                  <div className="relative h-52 w-52 sm:h-60 sm:w-60">
                    <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-md border-l-2 border-t-2 border-blue-400" />
                    <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-md border-r-2 border-t-2 border-blue-400" />
                    <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-md border-b-2 border-l-2 border-blue-400" />
                    <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-md border-b-2 border-r-2 border-blue-400" />
                    <div className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                  </div>
                </div>
              ) : null}

              {errorText ? (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/92 p-8 text-center">
                  <WarnIcon className="mb-4 h-10 w-10 text-amber-400" />
                  <p className="max-w-xs text-sm font-medium leading-relaxed text-white">{errorText}</p>
                  {rawErrorText ? (
                    <p className="mt-3 max-w-sm text-[11px] leading-relaxed text-slate-400">{rawErrorText}</p>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleRestartScanner}
                    className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700"
                  >
                    Coba Lagi
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div>
              <p className="mb-3 text-sm font-bold text-slate-500">Input Barcode / SKU</p>
              <form onSubmit={handleManualSubmit}>
                <input
                  type="text"
                  value={manualCode}
                  onChange={(event) => setManualCode(event.target.value)}
                  placeholder="Ketik atau arahkan scanner USB..."
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-700 outline-none transition-all placeholder:font-normal placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20"
                  autoFocus
                />
                {manualCode.trim() ? (
                  <button
                    type="submit"
                    className="mt-3 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
                  >
                    Cari Produk
                  </button>
                ) : null}
              </form>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                Scan menggunakan barcode scanner USB, atau ketik kode SKU produk secara manual.
              </p>
            </div>

            <div className="border-t border-slate-100" />

            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-500">Scan Terakhir</p>
                <button
                  type="button"
                  onClick={onOpenHistory}
                  className="text-xs font-semibold text-blue-500 transition-colors hover:text-blue-700"
                >
                  Lihat Semua
                </button>
              </div>

              <div className="space-y-1">
                {RECENT_SCANS.map((item) => (
                  <button
                    key={item.sku}
                    type="button"
                    onClick={() => onScanResult(item.sku)}
                    className="flex w-full items-center gap-4 rounded-xl border border-transparent p-3 text-left transition-all hover:border-slate-100 hover:bg-slate-50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">{item.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{item.sku}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <ScanIcon className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium leading-relaxed text-blue-700">
                Arahkan barcode atau QR code ke kamera kiri. Produk akan terdeteksi secara otomatis.
              </p>
            </div>
          </div>
        </div>
      </div>

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

