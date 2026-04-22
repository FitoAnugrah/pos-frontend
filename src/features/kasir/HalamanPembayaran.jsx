import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Banknote,
  QrCode,
  CheckCircle2,
  Printer,
  ShoppingBag,
  Loader2,
  ImageIcon,
  ChevronRight,
  Tag,
  User,
  Sparkles,
  Landmark,
  Wallet,
  Copy,
  Check,
  Info,
} from 'lucide-react';

// ── Mock cart items (later replaced by shared cart state / API) ──────────────
const MOCK_CART = [
  { id: 1, name: 'Minyak Goreng 1L',   price: 25000, qty: 2, image: '/images/products/cooking_oil.png'  },
  { id: 2, name: 'Beras Premium 5kg',  price: 68000, qty: 1, image: '/images/products/premium_rice.png' },
  { id: 3, name: 'Kopi Arabika 250g',  price: 45000, qty: 1, image: '/images/products/arabica_coffee.png' },
];

const TAX_RATE   = 0.11; // 11% PPN
const POINT_RATE = 1;    // 1 poin per Rp 1.000

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const fmtShort = (n) =>
  new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(n);

// ── Payment method config ─────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: 'Tunai',
    label: 'Tunai',
    icon: Banknote,
    desc: 'Bayar dengan uang tunai',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    id: 'QRIS',
    label: 'QRIS',
    icon: QrCode,
    desc: 'GoPay, OVO, Dana, ShopeePay, dll.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    id: 'SeaBank',
    label: 'SeaBank',
    icon: Landmark,
    desc: 'Transfer via SeaBank / SeaMoney',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    accountNumber: '901234567890',
    accountName: 'Vault POS A\'i',
    steps: [
      'Buka aplikasi SeaBank di HP pelanggan',
      'Pilih menu Transfer → Antar Bank / SeaBank',
      'Masukkan nomor rekening di atas',
      'Masukkan nominal sesuai Total Akhir',
      'Konfirmasi & tunjukkan bukti transfer ke kasir',
    ],
  },
  {
    id: 'ShopeePay',
    label: 'ShopeePay',
    icon: Wallet,
    desc: 'Transfer saldo ShopeePay',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    accountNumber: '0812-3456-7890',
    accountName: 'Vault POS A\'i',
    steps: [
      'Buka aplikasi Shopee / ShopeePay di HP pelanggan',
      'Pilih ShopeePay → Kirim Uang',
      'Masukkan nomor HP di atas sebagai tujuan',
      'Masukkan nominal sesuai Total Akhir',
      'Konfirmasi & tunjukkan bukti transfer ke kasir',
    ],
  },
];

// ── Success Modal ─────────────────────────────────────────────────────────────
function SuccessModal({ total, method, kembalian, onClose, onPrint }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center text-center animate-in zoom-in-95 fade-in duration-300">
        {/* Check Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5 border border-emerald-100 shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={1.8} />
        </div>

        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-1">Transaksi Berhasil!</h2>
        <p className="text-sm text-slate-500 font-medium mb-6">
          Pembayaran via <span className="font-bold text-slate-700">{method}</span> telah dikonfirmasi
        </p>

        {/* Summary Chip Row */}
        <div className="flex gap-3 mb-8 w-full">
          <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total</p>
            <p className="text-base font-black text-slate-800 tracking-tight">{fmt(total)}</p>
          </div>
          {method === 'Tunai' && kembalian > 0 && (
            <div className="flex-1 bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Kembalian</p>
              <p className="text-base font-black text-emerald-700 tracking-tight">{fmt(kembalian)}</p>
            </div>
          )}
          <div className="flex-1 bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Poin +</p>
            <p className="text-base font-black text-amber-700 tracking-tight">{Math.floor(total / 1000)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onPrint}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl transition-colors text-sm active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Cetak Struk
          </button>
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-lg shadow-blue-600/30 text-sm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Transaksi Baru
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const HalamanPembayaran = () => {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState('QRIS');
  const [nominalInput, setNominalInput]   = useState('');
  const [copied, setCopied]               = useState(false);
  const [showSuccess, setShowSuccess]     = useState(false);
  const [isProcessing, setIsProcessing]   = useState(false);

  // ── Calculations ────────────────────────────────────────────────────────────
  const subtotal    = MOCK_CART.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax         = Math.round(subtotal * TAX_RATE);
  const totalAkhir  = subtotal + tax;
  const totalPoin   = Math.floor(totalAkhir / 1000) * POINT_RATE;

  const nominalAngka  = parseInt(nominalInput.replace(/[^0-9]/g, ''), 10) || 0;
  const kembalian     = Math.max(nominalAngka - totalAkhir, 0);
  const isTransfer    = activeMethod === 'SeaBank' || activeMethod === 'ShopeePay';
  const sudahCukup    = activeMethod !== 'Tunai' || nominalAngka >= totalAkhir;

  const activeMethodData = PAYMENT_METHODS.find(m => m.id === activeMethod);

  const handleCopyAccount = () => {
    const num = activeMethodData?.accountNumber ?? '';
    navigator.clipboard.writeText(num.replace(/[^0-9]/g, '')).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Quick-nominal suggestions: uang pas, nearest 50K above, nearest 100K above
  const quickNominals = [
    { label: 'Uang Pas', value: totalAkhir },
    { label: fmtShort(Math.ceil(totalAkhir / 50000) * 50000), value: Math.ceil(totalAkhir / 50000) * 50000 },
    { label: fmtShort(Math.ceil(totalAkhir / 100000) * 100000), value: Math.ceil(totalAkhir / 100000) * 100000 },
  ].filter((item, idx, arr) => idx === 0 || item.value !== arr[idx - 1].value); // deduplicate

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleNominalChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setNominalInput(raw);
  };

  const handleSelesaikan = () => {
    if (!sudahCukup) return;
    setIsProcessing(true);
    // Simulate a brief processing delay (will be replaced by API call)
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 900);
  };

  const handleTransaksiBaru = () => {
    setShowSuccess(false);
    setCopied(false);
    navigate('/');
  };

  const handleCetakStruk = () => {
    const invId   = 'INV-' + Date.now().toString().slice(-8);
    const now     = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const itemRows = MOCK_CART.map(i =>
      '<tr>' +
        '<td class="nm">' + i.name + '</td>' +
        '<td class="qt">' + i.qty + 'x</td>' +
        '<td class="pr">' + fmt(i.price) + '</td>' +
        '<td class="tl">' + fmt(i.price * i.qty) + '</td>' +
      '</tr>'
    ).join('');

    const tunaiRows = activeMethod === 'Tunai' && nominalAngka > 0
      ? '<div class="rw"><span>Uang Diterima</span><span>' + fmt(nominalAngka) + '</span></div>' +
        '<div class="rw bld grn"><span>Kembalian</span><span>' + fmt(kembalian) + '</span></div>'
      : '';

    const html = [
      '<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/>',
      '<title>Struk ' + invId + '</title>',
      '<style>',
      '@page{margin:0;size:80mm auto}',
      '*{box-sizing:border-box;margin:0;padding:0}',
      'body{font-family:"Courier New",Courier,monospace;font-size:11px;color:#111;width:80mm;margin:0 auto;padding:10px 8px 20px}',
      '.ct{text-align:center}',
      '.sn{font-size:17px;font-weight:900;letter-spacing:1px;margin-bottom:2px}',
      '.ss{font-size:10px;color:#444;line-height:1.5}',
      '.ds{border-top:1px dashed #888;margin:7px 0}',
      '.sl{border-top:2px solid #111;margin:7px 0}',
      '.rw{display:flex;justify-content:space-between;padding:1.5px 0}',
      '.rw.bld span{font-weight:bold}',
      '.rw.ttl{font-size:14px;font-weight:900;margin-top:3px}',
      '.rw.grn span{color:#1a7a3c}',
      'table{width:100%;border-collapse:collapse}',
      'td{padding:2px 0;vertical-align:top;line-height:1.5}',
      '.nm{width:45%;word-break:break-word}',
      '.qt{width:12%;text-align:center}',
      '.pr{width:23%;text-align:right}',
      '.tl{width:20%;text-align:right;font-weight:bold}',
      'thead td{font-weight:bold;border-bottom:1px solid #ccc;padding-bottom:3px}',
      '.bg{display:inline-block;background:#111;color:#fff;padding:2px 10px;border-radius:99px;font-size:10px;letter-spacing:1px;margin:5px 0}',
      '.fn{font-size:10px;color:#555;line-height:1.6;margin-top:4px}',
      '</style></head><body>',

      '<div class="ct">',
        '<div class="sn">VAULT POS A\'i</div>',
        '<div class="ss">Jl. Contoh No. 1, Kota Anda<br/>Telp: 0812-3456-7890</div>',
      '</div>',

      '<div class="ds"></div>',
      '<div class="rw"><span>No. Invoice</span><span><b>' + invId + '</b></span></div>',
      '<div class="rw"><span>Tanggal</span><span>' + dateStr + '</span></div>',
      '<div class="rw"><span>Waktu</span><span>' + timeStr + '</span></div>',
      '<div class="rw"><span>Kasir</span><span>Admin Ali</span></div>',
      '<div class="rw"><span>Pelanggan</span><span>Umum</span></div>',

      '<div class="sl"></div>',
      '<table><thead><tr>',
        '<td class="nm">Item</td><td class="qt">Qty</td><td class="pr">Harga</td><td class="tl">Total</td>',
      '</tr></thead><tbody>' + itemRows + '</tbody></table>',

      '<div class="sl"></div>',
      '<div class="rw"><span>Subtotal</span><span>' + fmt(subtotal) + '</span></div>',
      '<div class="rw"><span>PPN 11%</span><span>' + fmt(tax) + '</span></div>',
      '<div class="rw"><span>Diskon</span><span>Rp 0</span></div>',
      '<div class="ds"></div>',
      '<div class="rw ttl"><span>TOTAL AKHIR</span><span>' + fmt(totalAkhir) + '</span></div>',

      '<div class="ds"></div>',
      '<div class="rw"><span>Metode Bayar</span><span><b>' + activeMethod + '</b></span></div>',
      tunaiRows,

      '<div class="ds"></div>',
      '<div class="ct">',
        '<div class="bg">+' + totalPoin + ' POIN DIDAPAT</div>',
        '<div class="fn">Terima kasih atas kunjungan Anda!<br/>Barang yang sudah dibeli tidak dapat<br/>dikembalikan tanpa struk asli.</div>',
        '<div style="margin-top:8px;font-size:9px;color:#aaa">Dicetak: ' + dateStr + ' ' + timeStr + '</div>',
      '</div>',

      '</body></html>',
    ].join('');

    const pw = window.open('', '_blank', 'width=420,height=650');
    if (!pw) return;
    pw.document.open();
    pw.document.write(html);
    pw.document.close();
    pw.focus();
    setTimeout(function() { pw.print(); }, 500);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Top Header ── */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors active:scale-95 text-slate-600"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">Pembayaran</h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">#INV-{Date.now().toString().slice(-8)}</p>
            </div>
          </div>

          {/* Total chip di header */}
          <div className="hidden sm:flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2">
            <Tag className="w-4 h-4 text-blue-500" />
            <span className="font-black text-blue-700 tracking-tight">{fmt(totalAkhir)}</span>
          </div>
        </div>
      </div>

      {/* ── Main 2-Column Grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

        {/* ══════════════════ KOLOM KIRI — RINGKASAN PESANAN ══════════════════ */}
        <div className="flex flex-col gap-5">

          {/* Customer identifier strip */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pelanggan</p>
              <p className="text-sm font-bold text-slate-700">Umum / Tanpa Member</p>
            </div>
            <button className="ml-auto text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
              Pilih Member <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Order Items Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-700 tracking-wide">Ringkasan Pesanan</h2>
              <span className="bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold px-2.5 py-1 rounded-full">
                {MOCK_CART.reduce((a, i) => a + i.qty, 0)} item
              </span>
            </div>

            <div className="divide-y divide-slate-50">
              {MOCK_CART.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200/60 flex-shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-300" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-[15px] truncate">{item.name}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {fmt(item.price)} × {item.qty}
                    </p>
                  </div>

                  {/* Subtotal */}
                  <p className="font-black text-slate-800 tracking-tight text-[15px] flex-shrink-0">
                    {fmt(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>

            {/* Billing summary */}
            <div className="px-6 py-5 bg-slate-50/60 border-t border-slate-100 space-y-2.5">
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-slate-700">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>PPN 11%</span>
                <span className="font-bold text-slate-700">{fmt(tax)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>Diskon</span>
                <span className="font-bold text-slate-400">— Rp 0</span>
              </div>
              <div className="h-px bg-slate-200 my-1" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 text-base">Total Akhir</span>
                <span className="font-black text-blue-700 text-xl tracking-tight">{fmt(totalAkhir)}</span>
              </div>
            </div>
          </div>

          {/* Points teaser */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-sm font-semibold text-amber-700">
              Pelanggan mendapat <span className="font-black">+{totalPoin} poin</span> dari transaksi ini
            </p>
          </div>
        </div>

        {/* ══════════════════ KOLOM KANAN — METODE PEMBAYARAN ══════════════════ */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-[80px]">

          {/* Method selector */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50">
              <h2 className="text-sm font-bold text-slate-700 tracking-wide">Metode Pembayaran</h2>
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon, desc, color, bg }) => {
                const active = activeMethod === id;
                return (
                  <button
                    key={id}
                    onClick={() => { setActiveMethod(id); setNominalInput(''); }}
                    className={`flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all active:scale-[0.99] text-left ${
                      active
                        ? 'border-blue-500 bg-blue-50/60 shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl ${active ? 'bg-blue-100' : bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : color}`} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${active ? 'text-blue-800' : 'text-slate-700'}`}>{label}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">{desc}</p>
                    </div>
                    {/* Radio indicator */}
                    <div className={`w-4.5 h-4.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      active ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                    }`}>
                      {active && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Dynamic Panel berdasarkan metode ── */}

          {/* TUNAI — input nominal + kembalian */}
          {activeMethod === 'Tunai' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-700">Nominal Uang Diterima</h3>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-black text-slate-400 select-none pointer-events-none">
                  Rp
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={nominalInput ? fmtShort(parseInt(nominalInput)) : ''}
                  onChange={handleNominalChange}
                  placeholder="0"
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3.5 pl-11 pr-4 text-xl font-black text-slate-800 placeholder:text-slate-300 outline-none transition-all text-right"
                />
              </div>

              {/* Quick nominal buttons */}
              <div className="grid grid-cols-3 gap-2">
                {quickNominals.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => setNominalInput(q.value.toString())}
                    className={`py-2.5 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                      nominalInput && parseInt(nominalInput) === q.value
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              {/* Kembalian row */}
              <div className={`flex justify-between items-center p-4 rounded-xl border transition-colors ${
                nominalAngka >= totalAkhir
                  ? 'bg-emerald-50 border-emerald-100'
                  : 'bg-slate-50 border-slate-100'
              }`}>
                <span className="text-sm font-bold text-slate-500">Kembalian</span>
                <span className={`text-xl font-black tracking-tight ${
                  nominalAngka >= totalAkhir ? 'text-emerald-600' : 'text-slate-300'
                }`}>
                  {fmt(kembalian)}
                </span>
              </div>
            </div>
          )}

          {/* QRIS — QR placeholder */}
          {activeMethod === 'QRIS' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center gap-4">
              <div className="w-44 h-44 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-slate-300" strokeWidth={1} />
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
                Arahkan pelanggan untuk scan QR di atas menggunakan aplikasi pembayaran digital masing-masing.
              </p>
              <div className="flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 px-4 py-2 rounded-full text-xs font-bold">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Menunggu konfirmasi pembayaran...
              </div>
            </div>
          )}

          {/* SeaBank / ShopeePay — Transfer panel */}
          {isTransfer && activeMethodData && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

              {/* Header strip dengan warna brand */}
              <div className={`px-5 py-3.5 flex items-center gap-2.5 ${
                activeMethod === 'SeaBank' ? 'bg-sky-50 border-b border-sky-100' : 'bg-orange-50 border-b border-orange-100'
              }`}>
                <activeMethodData.icon className={`w-4 h-4 ${activeMethodData.color}`} />
                <p className={`text-xs font-bold uppercase tracking-wider ${activeMethodData.color}`}>
                  Transfer {activeMethodData.label}
                </p>
              </div>

              <div className="p-5 flex flex-col gap-4">

                {/* Nomor rekening / HP */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {activeMethod === 'SeaBank' ? 'Nomor Rekening' : 'Nomor HP / ShopeePay'}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-2xl font-black text-slate-800 tracking-widest leading-none">
                        {activeMethodData.accountNumber}
                      </p>
                      <p className="text-xs text-slate-400 font-semibold mt-1.5">
                        a.n. {activeMethodData.accountName}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyAccount}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                        copied
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300 border border-slate-200'
                      }`}
                    >
                      {copied ? (
                        <><Check className="w-3.5 h-3.5" /> Disalin!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Salin</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Nominal yang harus ditransfer */}
                <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Nominal Transfer</span>
                  <span className="font-black text-blue-700 text-base tracking-tight">{fmt(totalAkhir)}</span>
                </div>

                {/* Langkah-langkah */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Petunjuk Transfer</p>
                  </div>
                  <ol className="flex flex-col gap-2.5">
                    {activeMethodData.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center mt-0.5 ${
                          activeMethod === 'SeaBank'
                            ? 'bg-sky-100 text-sky-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}>
                          {i + 1}
                        </span>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Waiting indicator */}
                <div className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border ${
                  activeMethod === 'SeaBank'
                    ? 'bg-sky-50 border-sky-100 text-sky-600'
                    : 'bg-orange-50 border-orange-100 text-orange-600'
                }`}>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Menunggu konfirmasi transfer...
                </div>
              </div>
            </div>
          )}

          {/* ── Tombol Selesaikan Transaksi ── */}
          <button
            onClick={handleSelesaikan}
            disabled={!sudahCukup || isProcessing}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all ${
              sudahCukup && !isProcessing
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 active:scale-[0.98]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Memproses Pembayaran...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 stroke-[2.5px]" />
                Selesaikan Transaksi
              </>
            )}
          </button>

          {/* Disclaimer */}
          {activeMethod === 'Tunai' && !sudahCukup && (
            <p className="text-center text-xs text-red-400 font-semibold -mt-2">
              Nominal belum cukup. Kurang {fmt(totalAkhir - nominalAngka)}.
            </p>
          )}
        </div>

      </div>

      {/* ── Success Modal ── */}
      {showSuccess && (
        <SuccessModal
          total={totalAkhir}
          method={activeMethod}
          kembalian={kembalian}
          onClose={handleTransaksiBaru}
          onPrint={handleCetakStruk}
        />
      )}
    </div>
  );
};

export default HalamanPembayaran;
