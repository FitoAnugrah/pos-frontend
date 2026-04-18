import { useEffect, useId, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import PageCanvas from '../components/PageCanvas'
import {
  ArrowLeftIcon,
  ClockIcon,
  FlashIcon,
  GalleryIcon,
  ListIcon,
  ScanIcon,
} from '../components/icons'

function FooterButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center gap-2 rounded-[12px] bg-white/70 px-3 py-3 text-[#16324d] transition hover:bg-white"
    >
      <div className="text-[#0d74c8]">{icon}</div>
      <span className="text-[12px] font-semibold">{label}</span>
    </button>
  )
}

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

export default function ScanProdukPage({ onBack, onManualInput, onOpenHistory, onScanResult }) {
  const scannerRegionId = useId().replace(/:/g, '')
  const hiddenScanRegionId = `${scannerRegionId}-file`
  const scannerRef = useRef(null)
  const fileInputRef = useRef(null)
  const handledRef = useRef(false)

  const [statusText, setStatusText] = useState('Menyiapkan kamera...')
  const [errorText, setErrorText] = useState('')
  const [infoText, setInfoText] = useState('Arahkan barcode atau QR ke kotak scan.')

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
            aspectRatio: 1,
          },
          async (decodedText) => {
            if (handledRef.current) return

            handledRef.current = true
            setStatusText('Kode terdeteksi, membuka produk...')

            try {
              await scanner.stop()
            } catch {
              // Ignore stop errors; navigation happens immediately after.
            }

            if (!disposed) {
              onScanResult(decodedText)
            }
          },
          () => {
            // Silent by design; live scanning produces many transient decode misses.
          },
        )

        if (!disposed) {
          setStatusText('Kamera aktif')
          setInfoText('Posisikan barcode atau QR di dalam kotak hingga terdeteksi otomatis.')
        }
      } catch (error) {
        if (!disposed) {
          setStatusText('Scanner tidak aktif')
          setErrorText(normalizeScannerError(error))
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
    } catch (error) {
      setStatusText('Kamera aktif')
      setErrorText('Barcode pada gambar tidak terbaca. Coba foto yang lebih jelas atau scan langsung dari kamera.')
    } finally {
      event.target.value = ''
    }
  }

  function handleFlashClick() {
    setInfoText('Flash kamera tergantung dukungan browser dan perangkat. Scan utama sudah aktif memakai kamera.')
  }

  return (
    <PageCanvas frameClassName="border border-[#dadfe6] bg-[#eaf3f9]" contentClassName="p-0">
      <header className="flex items-center justify-between bg-white px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#16324d]"
          aria-label="Kembali ke tambah stok baru"
        >
          <ArrowLeftIcon className="h-5 w-5 text-[#0d74c8]" />
          <span className="text-[17px] font-semibold">Scan Produk</span>
        </button>

        <div className="flex items-center gap-2 text-[#0d74c8]">
          <button
            type="button"
            onClick={handleFlashClick}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#eef7ff]"
            aria-label="Info flash kamera"
          >
            <FlashIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenHistory}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#eef7ff]"
            aria-label="Riwayat aktivitas produk"
          >
            <ClockIcon className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_42%),linear-gradient(180deg,#20363c_0%,#5d6f70_22%,#7f8c88_52%,#5b6866_100%)] px-4 pb-8 pt-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.02)_30%,rgba(0,0,0,0.2)_100%)]" />

        <div className="relative z-10 flex min-h-[700px] flex-col justify-end">
          <div className="relative h-[430px] overflow-hidden rounded-[26px] border border-white/35 bg-black/30 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm">
            <div
              id={scannerRegionId}
              className="h-full w-full [&_*]:border-0 [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
            />

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.02)_24%,rgba(0,0,0,0.18)_100%)]" />
              <div className="absolute inset-x-[13%] top-[24%] h-[44%] rounded-[8px] border border-white/75 shadow-[0_0_0_999px_rgba(0,0,0,0.18)]" />
              <div className="absolute inset-x-[16%] top-[46%] h-1 rounded-full bg-[#0d74c8]/85 shadow-[0_0_18px_rgba(13,116,200,0.6)]" />
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-white/92 px-6 py-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5fb] text-[#0d74c8]">
              <ScanIcon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-[15px] font-semibold text-[#304a61]">{statusText}</p>
            <p className="mt-2 text-[14px] leading-7 text-[#455c71]">{errorText || infoText}</p>
          </div>

          <button
            type="button"
            onClick={onManualInput}
            className="mt-4 rounded-[12px] bg-[#a8cbf8] px-4 py-4 text-[15px] font-semibold text-[#1c4668] transition hover:bg-[#98c0f3]"
          >
            Input Kode Manual
          </button>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <FooterButton
              icon={<GalleryIcon className="h-4 w-4" />}
              label="Galeri"
              onClick={() => fileInputRef.current?.click()}
            />
            <FooterButton icon={<ListIcon className="h-4 w-4" />} label="Daftar Produk" onClick={onManualInput} />
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
    </PageCanvas>
  )
}
