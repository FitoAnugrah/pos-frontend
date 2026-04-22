import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Zap, ShoppingCart, ShoppingBasket, 
  Tag, Barcode, Home, Clock, Box, Settings, 
  Minus, Plus, Edit3
} from 'lucide-react';

const ScanBarang = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(3);
  const [scanStatus, setScanStatus] = useState('Position barcode within the frame');
  
  const scannerRef = useRef(null);
  const scannerId = 'kasir-scanner';

  useEffect(() => {
    let isMounted = true;
    
    const initScanner = async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        if (!isMounted) return;
        
        const scanner = new Html5Qrcode(scannerId);
        scannerRef.current = scanner;
        
        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            // Hilangkan qrbox agar library tidak meng-inject SVG/Overlay bawaan yang merusak layout
          },
          (decodedText) => {
            if (isMounted) setScanStatus('Barcode terdeteksi: ' + decodedText);
          },
          () => {
            // Silent
          }
        );
        
        if (isMounted) setScanStatus('Kamera aktif. Arahkan barcode ke frame.');

        // Paksa styling video agar memenuhi layar (cover)
        setTimeout(() => {
          const videoEl = document.querySelector(`#${scannerId} video`);
          if (videoEl) {
            videoEl.style.objectFit = 'cover';
            videoEl.style.width = '100%';
            videoEl.style.height = '100%';
            videoEl.style.position = 'absolute';
            videoEl.style.top = '0';
            videoEl.style.left = '0';
          }
        }, 500);
      } catch (err) {
        console.error("Scanner Error:", err);
        if (isMounted) setScanStatus('Akses kamera ditolak atau tidak tersedia.');
      }
    };
    
    initScanner();
    
    return () => {
      isMounted = false;
      if (scannerRef.current) {
        // Safe unmount
        try {
          scannerRef.current.stop().then(() => {
            scannerRef.current.clear();
          }).catch(() => {});
        } catch (e) {}
      }
    };
  }, []);

  // Variabel dummy produk
  const product = {
    name: "Minyak Goreng 1L",
    price: 25000,
    stock: 142,
    sku: "MG-10042",
    category: "Cooking Oil"
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:grid md:grid-cols-2 overflow-hidden relative">
      
      {/* Header (Top Bar) */}
      <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between p-5 md:p-6 text-white pointer-events-none">
        <div className="flex items-center space-x-4 pointer-events-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2.5 bg-slate-800/60 hover:bg-slate-700/80 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-lg tracking-wide shadow-black drop-shadow-md">Scan Items</span>
        </div>
        <div className="flex items-center space-x-3 pointer-events-auto">
          <button className="p-2.5 bg-slate-800/60 hover:bg-slate-700/80 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg">
            <Zap className="w-5 h-5" />
          </button>
          <button className="relative p-2.5 bg-slate-800/60 hover:bg-slate-700/80 rounded-full backdrop-blur-md transition-all border border-white/10 shadow-lg">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-slate-900 min-w-[20px] text-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Style khusus untuk memaksa html5-qrcode agar patuh pada layout */}
      <style>{`
        #${scannerId} {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
        }
        #${scannerId} video {
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }
        /* Sembunyikan elemen UI bawaan html5-qrcode yang bikin rusak layout */
        #${scannerId} img, 
        #${scannerId} canvas, 
        #${scannerId} #qr-shaded-region {
          display: none !important;
        }
      `}</style>

      {/* Area Kamera (Scanner View) */}
      <div className="flex-1 relative flex flex-col items-center justify-center bg-slate-900 min-h-[50vh] md:min-h-screen overflow-hidden">
        
        {/* Container Scanner Camera */}
        <div id={scannerId} className="absolute inset-0 z-0 h-full w-full" />

        {/* Visual Frame Kamera (Sama dengan Stok Barang) */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="relative h-52 w-52 sm:h-60 sm:w-60 mb-8 mt-16 md:mt-0">
            <span className="absolute left-0 top-0 h-8 w-8 rounded-tl-md border-l-2 border-t-2 border-blue-400" />
            <span className="absolute right-0 top-0 h-8 w-8 rounded-tr-md border-r-2 border-t-2 border-blue-400" />
            <span className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-md border-b-2 border-l-2 border-blue-400" />
            <span className="absolute bottom-0 right-0 h-8 w-8 rounded-br-md border-b-2 border-r-2 border-blue-400" />
            <div className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse" />
          </div>
          
          <p className="text-slate-200 font-medium text-sm md:text-base px-6 text-center tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10 bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full mt-4">
            {scanStatus}
          </p>
        </div>
      </div>

      {/* Panel Detail Produk (Bottom Sheet / Sidebar) */}
      <div className="bg-white flex flex-col justify-between p-6 sm:p-8 rounded-t-[40px] md:rounded-3xl md:m-6 md:h-[calc(100vh-3rem)] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:shadow-2xl relative z-20 pb-28 md:pb-8 flex-shrink-0 animate-in slide-in-from-bottom-1/4 md:slide-in-from-right-1/4 duration-500">
        
        <div className="flex flex-col">
          {/* Handle Pill Khusus Mobile */}
          <div className="w-14 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 md:hidden"></div>

          {/* Header Produk */}
          <div className="mb-7">
            <span className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase">Product Detected</span>
            <div className="flex justify-between items-start mt-3 gap-4">
              <h2 className="text-2xl font-black text-slate-800 leading-tight flex-1">{product.name}</h2>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-black text-blue-700 tracking-tight">Rp {product.price.toLocaleString('id-ID')}</p>
                <p className="text-[13px] font-semibold text-slate-500 mt-1.5 bg-slate-100 inline-block px-2.5 py-1 rounded-md">
                  Stock: {product.stock} units
                </p>
              </div>
            </div>
          </div>

          {/* Info Badges (Grid 2 Kolom) */}
          <div className="grid grid-cols-2 gap-4 mb-9">
            {/* Box SKU */}
            <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center space-x-3 border border-blue-100/50">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
                <Barcode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest mb-0.5">SKU ID</p>
                <p className="text-sm font-bold text-slate-700">{product.sku}</p>
              </div>
            </div>
            {/* Box Category */}
            <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center space-x-3 border border-blue-100/50">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
                <Tag className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest mb-0.5">Category</p>
                <p className="text-sm font-bold text-slate-700 truncate">{product.category}</p>
              </div>
            </div>
          </div>

          {/* Kontrol Kuantitas */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <h3 className="font-bold text-slate-800 text-[15px]">Set Quantity</h3>
              <span className="text-xs font-semibold text-slate-400">Max. 10 per sale</span>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center p-2 shadow-sm">
              <button 
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className={`w-14 h-14 flex items-center justify-center rounded-[14px] transition-all ${quantity <= 1 ? 'text-slate-300 bg-transparent' : 'text-slate-700 bg-white shadow-md border border-slate-100 hover:bg-slate-50 active:scale-95'}`}
              >
                <Minus className="w-6 h-6 stroke-[2.5px]" />
              </button>
              
              <span className="text-3xl font-black text-slate-800 w-16 text-center tabular-nums">
                {quantity}
              </span>
              
              <button 
                onClick={handleIncrease}
                disabled={quantity >= 10}
                className={`w-14 h-14 flex items-center justify-center rounded-[14px] transition-all ${quantity >= 10 ? 'text-slate-300 bg-transparent' : 'text-slate-700 bg-white shadow-md border border-slate-100 hover:bg-slate-50 active:scale-95'}`}
              >
                <Plus className="w-6 h-6 stroke-[2.5px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col space-y-3 mt-auto pt-4">
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4.5 px-4 rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2.5 h-14"
          >
            <ShoppingCart className="w-[18px] h-[18px] stroke-[2.5px]" />
            <span className="text-[15px]">Tambah ke Keranjang</span>
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('/keranjang')}
              className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] text-blue-600 font-bold py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center space-x-2.5 h-14"
            >
              <ShoppingBasket className="w-[18px] h-[18px] stroke-[2.5px]" />
              <span className="text-[13px]">Lihat Keranjang</span>
            </button>
            
            <button 
              onClick={() => navigate('/input-sku')}
              className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] text-slate-600 font-bold py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center space-x-2.5 h-14"
            >
              <Edit3 className="w-[18px] h-[18px] stroke-[2.5px]" />
              <span className="text-[13px]">Input Manual</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Navigation (Khusus Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-2.5 flex justify-between items-center z-50 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
        <button className="flex flex-col items-center space-y-1 text-blue-600 w-16">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl">
            <Home className="w-[22px] h-[22px] stroke-[2.5px]" />
          </div>
          <span className="text-[10px] font-bold">Register</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors w-16">
          <div className="p-1.5">
            <Clock className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">History</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors w-16">
          <div className="p-1.5">
            <Box className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">Inventory</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1 text-slate-400 hover:text-slate-600 transition-colors w-16">
          <div className="p-1.5">
            <Settings className="w-[22px] h-[22px]" />
          </div>
          <span className="text-[10px] font-semibold">Settings</span>
        </button>
      </div>

    </div>
  );
};

export default ScanBarang;
